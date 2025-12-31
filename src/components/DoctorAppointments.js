import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";
import Rating from "./Rating"

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import {Modal, Button} from 'react-bootstrap'; 

import './patientprofiles/PatientProfiles.css';

import RecentBookings from './RecentBookings';
import PreviousBookings from './PreviousBookings';
import AppTopNotifications from './AppTopNotifications';

import allChildInfo from '../assets/reports/all-child-info-19122025.pdf';

function DoctorAppointments(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);
  
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const [patientList, setPatientList]   = useState([]);
  const [openMenuId, setOpenMenuId]     = useState(0);

  const handleMenuClick = (appointmentId) => {
    setOpenMenuId(openMenuId === appointmentId ? 0 : appointmentId);
  };

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [appointmentList, setAppointmentList]   = useState([]);
  const [approvedCounter, setApprovedCounter]   = useState(0);
  const [pendingCounter, setPendingCounter]     = useState(0);
  const [rejectedCounter, setRejectedCounter]   = useState(0);

  const [reviewForPatientEnabled, setReviewForPatientEnabled] = useState(true);
  const [ratingForPatient, setRatingForPatient] = useState(0);
  const handleStarClickForPatient = (data) => {
    setRatingForPatient(data); // Toggle the state
    console.log(data);
  };
  const [reviewForVolunteerEnabled, setReviewForVolunteerEnabled] = useState(true);
  const [ratingForVolunteer, setRatingForVolunteer] = useState(0);
  const handleStarClickForVolunteer = (data) => {
    setRatingForVolunteer(data); // Toggle the state
    console.log(data);
  };

  const [commentsForPatient, setCommentsForPatient] = useState("");
  const commentsChangeHandlerForPatient = (event) =>{
    setCommentsForPatient(event.target.value);
    console.log(commentsForPatient);
  }
  const [commentsForVolunteer, setCommentsForVolunteer] = useState("");
  const commentsChangeHandlerForVolunteer = (event) =>{
    setCommentsForVolunteer(event.target.value);
    console.log(commentsForVolunteer);
  }

  const [reviewModalDetails, setReviewModalDetails] = useState({
    'appointment_key':'',
    'patient_display_name':'',
    'volunteer_display_name':'',
    'patient_key':'',
    'volunteer_key':'',
    'appointment_status':''
  });
  const [showReviewModal, setShowReviewModal]       = useState(false); 
  const modalReviewClose  = () => setShowReviewModal(false);  
  const modalReviewShow   = async (appointment_key, patient_display_name, volunteer_display_name, patient_key, volunteer_key, appointment_status) => {

    if(appointment_status === 'Approved'){

      reviewModalDetails['appointment_key']         = appointment_key;
      reviewModalDetails['patient_display_name']    = patient_display_name;
      reviewModalDetails['volunteer_display_name']  = volunteer_display_name;
      reviewModalDetails['patient_key']             = patient_key;
      reviewModalDetails['volunteer_key']           = volunteer_key;
      reviewModalDetails['appointment_status']      = appointment_status;
      setReviewModalDetails({...reviewModalDetails, ...reviewModalDetails});

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      
      jsonData['system_id']        = systemContext.systemDetails.system_id;
      jsonData["account_key"]      = decryptedLoginDetails.account_key;
      jsonData["appointment_key"]  = appointment_key;
      jsonData["device_type"]      = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]     = DEVICE_TOKEN;
      jsonData["user_lat"]         = localStorage.getItem('latitude');
      jsonData["user_long"]        = localStorage.getItem('longitude');

      const response = await fetch(`${API_URL}/appointmentReviewList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      let result = await response.json();

      setReviewForPatientEnabled(true);
      setReviewForVolunteerEnabled(true);

      if(result.data && result.data.length > 0){

        result.data.forEach(element => {
          
          if(element.patient_id){
            setRatingForPatient(element.review_rating);
            setCommentsForPatient(element.review_comments);
            setReviewForPatientEnabled(false);
          }

          if(element.volunteer_id){
            setRatingForVolunteer(element.review_rating);
            setCommentsForVolunteer(element.review_comments);
            setReviewForVolunteerEnabled(false);
          }

        });

      }
      else{
        setRatingForPatient(0);
        setCommentsForPatient("");
        setRatingForVolunteer(0);
        setCommentsForVolunteer("");
      }

      setShowReviewModal(true);

    }
    else{
      
      alertContext.setAlertMessage({show:true, type: "error", message: "You can write review only for approved appointments!"});

    }
    
  }

  const [filterPendingAppointmentChecked, setFilterPendingAppointmentChecked] = useState(false);

  useEffect(() => {
    if(filterPendingAppointmentChecked){
      listAppointment("");
    }
    else{
      if(systemContext.systemDetails.system_id){
        listAppointment("");
      }
    }
    // eslint-disable-next-line
  }, [filterPendingAppointmentChecked]);

  const searchAppointment = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listAppointment(value);
    }, 1000)
  }

  const listAppointment = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"]       = 5;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    if(filterPendingAppointmentChecked)
    {
      jsonData['status_flag']             = 0;
    }
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "appointment_id",
                                              "order_by_value": "asc"
                                            }

    const response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      setAppointmentList(result.data.appointments);
      setApprovedCounter(result.data.counts.approved_count);
      setPendingCounter(result.data.counts.pending_count);
      setRejectedCounter(result.data.counts.rejected_count);
    }
    else{
      setAppointmentList([]); 
      setApprovedCounter(0);
      setPendingCounter(0);
      setRejectedCounter(0);
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listAppointment("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [statusToBeChanged, setStatusToBeChanged]                     = useState('');
  const [confirmationAppointmentKey, setConfirmationAppointmentKey]   = useState('');
  const [confirmationReason, setConfirmationReason]                   = useState('');
  const [confirmationModalHeaderText, setConfirmationModalHeaderText] = useState('');
  const [confirmationModalBodyText, setConfirmationModalBodyText]     = useState('');
  const [confirmationModalButtonText, setConfirmationModalButtonText] = useState('');

  const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
  const modalConfirmationClose  = () => { setShowConfirmationModal(false); }
  const modalConfirmationShow   = (status, appointmentKey) => { 

    setStatusToBeChanged(status);
    setConfirmationAppointmentKey(appointmentKey);
    setConfirmationReason('');

    if(status === 'approve'){
      setConfirmationModalHeaderText('Confirm Booking');
      setConfirmationModalBodyText('Are you sure you want to Confirm this booking?');
      setConfirmationModalButtonText('Confirm');
    }
    else if(status === 'cancel'){
      setConfirmationModalHeaderText('Cancel Booking');
      setConfirmationModalBodyText('Are you sure you want to Cancel this booking?');
      setConfirmationModalButtonText('Yes, Cancel It');
    }
    else if(status === 'reject'){
      setConfirmationModalHeaderText('Reject Booking');
      setConfirmationModalBodyText('Are you sure you want to Reject this booking?');
      setConfirmationModalButtonText('Reject');
    }

    setShowConfirmationModal(true);
  }

  const inputCancelRejectReason = (e) => {
    setConfirmationReason(e.target.value);
  }

  const confirmBookedAppointment = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    var jsonData = {};

    jsonData['system_id']            = systemContext.systemDetails.system_id;
    jsonData["device_type"]          = DEVICE_TYPE;
    jsonData["device_token"]         = DEVICE_TOKEN;
    jsonData["user_lat"]             = localStorage.getItem('latitude');
    jsonData["user_long"]            = localStorage.getItem('longitude');
    jsonData["doctor_account_type"]  = decryptedLoginDetails.account_type;
    jsonData["doctor_account_key"]   = decryptedLoginDetails.account_key;
    jsonData["appointment_key"]      = confirmationAppointmentKey;

    var apiURL = '';

    if(statusToBeChanged === 'approve'){
      apiURL = `${API_URL}/doctorConfirmBookedAppointment`;
    }
    else if(statusToBeChanged === 'cancel'){
      apiURL = `${API_URL}/doctorCancelBookedAppointment`;
      if(confirmationReason === ''){
        alertContext.setAlertMessage({show:true, type: "error", message: 'Please enter reason to cancel'});
        return false;
      }
      jsonData["cancelled_reason"] = confirmationReason;
    }
    else if(statusToBeChanged === 'reject'){
      apiURL = `${API_URL}/doctorRejectBookedAppointment`;
      if(confirmationReason === ''){
        alertContext.setAlertMessage({show:true, type: "error", message: 'Please enter reason to reject'});
        return false;
      }
      jsonData["reject_reason"]    = confirmationReason;
    }

    const response = await fetch(`${apiURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      modalConfirmationClose();
      listAppointment("");
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const postReview = async (userType) => {
    if(userType === "patient"){
      var reviewAccountKey  = reviewModalDetails['patient_key'];
      var reviewAccountType = 3;
      var reviewRating      = ratingForPatient;
      var reviewComment     = commentsForPatient;
      if(commentsForPatient == ""){
        alertContext.setAlertMessage({show:true, type: "error", message: "Please write a review for patient!"});
        return false;
      }
    }
    else if(userType === "volunteer"){
      var reviewAccountKey  = reviewModalDetails['volunteer_key'];
      var reviewAccountType = 4;
      var reviewRating      = ratingForVolunteer;
      var reviewComment     = commentsForVolunteer;
      if(commentsForVolunteer == ""){
        alertContext.setAlertMessage({show:true, type: "error", message: "Please write a review for volunteer!"});
        return false;
      }
    }

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};
    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["poster_acc_type"]       = decryptedLoginDetails.account_type;
    jsonData["poster_acc_key"]        = decryptedLoginDetails.account_key;
    jsonData["receiver_acc_type"]     = reviewAccountType;
    jsonData["receiver_acc_key"]      = reviewAccountKey;
    jsonData["appointment_key"]       = reviewModalDetails['appointment_key'];
    jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]          = DEVICE_TOKEN;
    jsonData["user_lat"]              = localStorage.getItem('latitude');
    jsonData["user_long"]             = localStorage.getItem('longitude');
    jsonData["rating"]                = reviewRating;
    jsonData["comments"]              = reviewComment;

    const response = await fetch(`${API_URL}/appointmentPostReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    
    let result = await response.json();

    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      //resetReviewForm(userType);
      modalReviewShow(reviewModalDetails['appointment_key'], reviewModalDetails['patient_display_name'], reviewModalDetails['volunteer_display_name'], reviewModalDetails['patient_key'], reviewModalDetails['volunteer_key'], reviewModalDetails['appointment_status']);
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const resetReviewForm = (userType) => {
    if(userType === "patient"){
      setRatingForPatient(0);
      setCommentsForPatient("");
    }
    else if(userType === "volunteer"){
      setRatingForVolunteer(0);
      setCommentsForVolunteer("");
    }
  }

  const [activeTab, setActiveTab] = useState('tab2');

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/services" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
              {
                (decryptedLoginDetails.account_type === '3' || decryptedLoginDetails.account_type === '31' || decryptedLoginDetails.account_type === '32' || decryptedLoginDetails.account_type === '33') && <h5 className='mx-2 mb-0'>My Doctor Appointments </h5>
              }
              {
                (decryptedLoginDetails.account_type === '4') && <h5 className='mx-2 mb-0'> Appointments </h5>
              }
              {
                (decryptedLoginDetails.account_type === '5') && <h5 className='mx-2 mb-0'>My Bookings </h5>
              }
          </div>
          <div className='app-top-right d-flex'> 
            <AppTopNotifications /> 
            <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
            <div className='drop-menu'>
                <ul>
                  <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                  {
                    (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                  }
                  <li><Link to={"/contactus"}>Contact Us</Link></li>
                  <li><Link to={"/feedback"}>Feedback</Link></li>
                  <li><Link to={"/help"}>Help</Link></li>
                  <li><Link to={"/logout"}>Logout</Link></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="app-body bookings">
        
        <div className='tab-container'>
          <div className="d-flex justify-content-center">
            <button onClick={() => setActiveTab('tab1')} className={`${ activeTab === 'tab1' ? 'active' : ''
              }`} > Previous Bookings </button>
            <button onClick={() => setActiveTab('tab2')} className={`${ activeTab === 'tab2' ? 'active' : ''
              }`} > Recent Bookings </button>
          </div>
          {/* <div className='text-end mt-3'><a href={allChildInfo} target='_blank' className='primary-color'>All Child Old Prescriptions</a></div> */}
          <div className="tab-content">
            {activeTab === 'tab1' && <PreviousBookings />}
            {activeTab === 'tab2' && <RecentBookings />}
          </div>
        </div>


        

      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default DoctorAppointments;