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

import './patientprofiles/PatientProfiles.css'

function PreviouBookings(){

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
    jsonData["search_type"]               = 'past';
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


  return(
    <>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='status d-flex mb-2'>
            <p className='me-1 mb-0'><small>Approved: <strong>{approvedCounter}</strong></small>,</p>
            <p className='me-1 mb-0'><small>Pending: <strong>{pendingCounter}</strong></small>,</p>
            <p className='me-0 mb-0'><small>Rejected: <strong>{rejectedCounter}</strong></small></p>
          </div>
          <div className='filter'>
            <div className="form-check mb-2">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" name="filter_appointment" value="pending" onChange={()=>setFilterPendingAppointmentChecked(!filterPendingAppointmentChecked)} checked={filterPendingAppointmentChecked}/> <small>Pending</small>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          
          {/* <div className="col-4 mb-3">Approved: {approvedCounter}</div>
          <div className="col-4 mb-3">Pending: {pendingCounter}</div>
          <div className="col-4 mb-3">Rejected: {rejectedCounter}</div> */}

          

          <div className="col-12">

            {appointmentList.map((appointment, index) => (
              <div className='button-box mb-3 position-relative' key={appointment.appointment_id}>
                <div className={`three-dot my-element2 ${openMenuId === appointment.appointment_id ? 'active' : ''}`} onClick={() => handleMenuClick(appointment.appointment_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>
                {openMenuId === appointment.appointment_id && 
                  <div className='drop-menu'>
                    <ul>
                      {
                        (decryptedLoginDetails.account_type === '5' && appointment.appt_status === 'Pending') &&<li><Link to={"#"} onClick={() => modalConfirmationShow('approve', appointment.appointment_key)}>Confirm Booking</Link></li>
                      }
                      {
                        (decryptedLoginDetails.account_type === '5' && appointment.appt_status === 'Pending') &&<li><Link to={"#"} onClick={() => modalConfirmationShow('cancel', appointment.appointment_key)}>Cancel Booking</Link></li>
                      }
                      {
                        (decryptedLoginDetails.account_type === '5' && appointment.appt_status === 'Approved') &&<li><Link to={"#"} onClick={() => modalConfirmationShow('reject', appointment.appointment_key)}>Reject Booking</Link></li>
                      }
                      {/* <li><Link to={"/"}>Send Notifications</Link></li>
                      {
                        (decryptedLoginDetails.account_type === '4') &&<li> <Link to={"/"}>Doctor Details</Link></li>
                      } */}
                      {/* <li><Link to={"/"}>Patient Details</Link></li>
                      <li><Link to={"#"}>Upload Prescriptions</Link></li>
                      <li><Link to={"#"}>Download Prescriptions</Link></li>
                      <li><Link to={"#"}>Upload Test Reports</Link></li>
                      <li><Link to={"#"}>Download Test Reports</Link></li> */}
                      <li><Link onClick={() => { modalReviewShow(appointment.appointment_key, appointment.patient_display_name, appointment.volunteer_display_name, appointment.patient_key, appointment.volunteer_key, appointment.appt_status); }} to="#">Write/View Review</Link></li>
                    </ul>
                  </div>
                }
                {
                  (decryptedLoginDetails.account_type === '4') &&<p><span className="d-block">Doctor Name:</span> {appointment.doctor_display_name}</p>
                }
                <p><span className="d-block">Appointment ID:</span> {appointment.appointment_key}</p>
                <p><span className="d-block">Patient Name:</span> {appointment.patient_display_name}</p>
                <p><span className="d-block">Date of Visit & Appointment Time:</span><label>{appointment.appointment_date} @ {appointment.appointment_time}</label></p>
                <p><span className="d-block">Place:</span> {appointment.location}</p>
                <p><span className="d-block">Consultation Mode:</span> {(appointment.consultation_mode === '1') ? `Offline (Clinic)` : ((appointment.consultation_mode === '2') ? `Online` : `Call on Emergency`)}</p>
                <p><span className="d-block">Status:</span> {appointment.appt_status}</p>
              </div>
            ))}


          </div>
        </div>
        
        <Modal show={showConfirmationModal} onHide={modalConfirmationClose}>
          <Modal.Header>  
            <h4>{confirmationModalHeaderText}</h4> 
          </Modal.Header>
          <Modal.Body className='form-all'>  
            <p>{confirmationModalBodyText}</p> 
            {(statusToBeChanged === 'cancel') && <div className="form-group">
              <label htmlFor="describe">Reason <span className="text-danger">*</span></label>
              <textarea name="reason" id="reason" rows="3" value={confirmationReason} className="form-control" placeholder="Please write reason to cancel it." onChange={inputCancelRejectReason}></textarea>
            </div>}

            {(statusToBeChanged === 'reject') && <div className="form-group">
              <label htmlFor="describe">Reason <span className="text-danger">*</span></label>
              <textarea name="reason" id="reason" rows="3" value={confirmationReason} className="form-control" placeholder="Please write your reason to reject it." onChange={inputCancelRejectReason}></textarea>
              <small>Note: If you reject it...</small>
            </div>}
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0' onClick={confirmBookedAppointment}>{confirmationModalButtonText}</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalConfirmationClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showReviewModal} onHide={modalReviewClose}>
          <Modal.Header>  
            <h3>Write Review</h3>
          </Modal.Header>  
          <Modal.Body className='feedback-form'>
            <h5>Servicewise Experience</h5>
            <h6 className='mb-1'>Review & Rating for Patient :</h6>
            <p className='mb-0'>Name : {reviewModalDetails.patient_display_name}</p>
            <div className="rating-star mb-3">
              <span>
                <div className="rating-symbol">
                  <Rating sendDataToParent={handleStarClickForPatient} value={ratingForPatient}></Rating>
                </div>
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="comments_for_patient">Would you like to share any other comments: </label>
              <textarea id="comments_for_patient" rows="3"  className="form-control" placeholder="Write a review for patient" name='comments_for_patient' value={commentsForPatient} onChange={commentsChangeHandlerForPatient}></textarea>
            </div>
          </Modal.Body>  
          {
            (reviewForPatientEnabled) && <Modal.Footer className='justify-content-center'> 
              <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={ () => postReview('patient')}>Submit</Button> 
              <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalReviewClose}>Cancel</Button>  
            </Modal.Footer> 
          } 
          <Modal.Body className='feedback-form'>
            <h6 className='mb-1'>Review & Rating for Volunteer :</h6>
            <p className='mb-0'>Name : {reviewModalDetails.volunteer_display_name}</p>
            <div className="rating-star mb-3">
              <span>
                <div className="rating-symbol">
                  <Rating sendDataToParent={handleStarClickForVolunteer} value={ratingForVolunteer}></Rating>
                </div>
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="comments_for_volunteer">Would you like to share any other comments: </label>
              <textarea id="comments_for_volunteer" rows="3"  className="form-control" placeholder="Write a review for volunteer" name='comments_for_volunteer' value={commentsForVolunteer} onChange={commentsChangeHandlerForVolunteer}></textarea>
            </div>
          </Modal.Body>
          {
            (reviewForVolunteerEnabled) && <Modal.Footer className='justify-content-center'> 
              <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={ () => postReview('volunteer')}>Submit</Button> 
              <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalReviewClose}>Cancel</Button>  
            </Modal.Footer> 
          }

          {
            (!reviewForVolunteerEnabled && !reviewForPatientEnabled) && <Modal.Footer className='justify-content-center'> 
              <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalReviewClose}>Close</Button>  
            </Modal.Footer> 
          }

          
        </Modal>
        
      <Appfooter></Appfooter>
    </>
  );
}

export default PreviouBookings;