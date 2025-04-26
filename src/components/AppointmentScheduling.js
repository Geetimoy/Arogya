import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell, faFaceSmile, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

import "./Bookings.css";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from './util/Constants';

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';

import {Modal, Button} from 'react-bootstrap'; 
import PreviousSchedules from './PreviousSchedules';
import RecentSchedules from './RecentSchedules';

function AppointmentScheduling(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isActive, setIsActive] = useState(false);

  const redirect = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [confirmedBookingCounter, setConfirmedBookingCounter]                 = useState(0);
  const [editScheduleId, setEditScheduleId]                                   = useState(0);
  const [cancellationReason, setCancellationReason]                           = useState('');
  const [cancellationReasonErrorMessage, setCancellationReasonErrorMessage]   = useState(false);
  const [closingReason, setClosingReason]                                     = useState('');
  const [closingReasonErrorMessage, setClosingReasonErrorMessage]             = useState(false);

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

  const [showModal2, setShowModal2] = useState(false); 
  const modalClose2  = () => setShowModal2(false);  
  const modalShow2   = (scheduleId, confirmedBooking) => {
    setEditScheduleId(scheduleId);
    setConfirmedBookingCounter(confirmedBooking);
    setShowModal2(true);
    setCancellationReason('');
  }

  const [showModal3, setShowModal3] = useState(false); 
  const modalClose3  = () => setShowModal3(false);  
  const modalShow3   = (scheduleId, confirmedBooking) => {
    setEditScheduleId(scheduleId);
    setConfirmedBookingCounter(confirmedBooking);
    setShowModal3(true);
    setClosingReasonErrorMessage('');
  }

  const [selectedOption, setSelectedOption] = useState('single');
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const redirectToCreateSchedule = () => {
    if(selectedOption === ''){
      
    }
    else{
      redirect(`/create-schedule/${selectedOption}`);
    }
  }

  const [scheduleList, setScheduleList]   = useState([]);
  const [openMenuId, setOpenMenuId]       = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const listSchedule = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": "",
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "schedule_date_from",
                                              "order_by_value": "asc"
                                            }

    const response = await fetch(`${API_URL}/doctorSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      if(result.data.length > 0){

      }
      setScheduleList(result.data.data);
    }
    else{
      setScheduleList([]); 
    }

  }

  const cancelSchedule = async () => {

    if(cancellationReason === ''){
      setCancellationReasonErrorMessage(true);
      return false;
    }

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["schedule_id"]               = editScheduleId;
    jsonData["cancelled_reason"]          = cancellationReason;

    const response = await fetch(`${API_URL}/cancelDoctorSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      modalClose2();
      listSchedule("");
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const closeBooking = async () => {

    if(closingReason === ''){
      setClosingReasonErrorMessage(true);
      return false;
    }

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["schedule_id"]               = editScheduleId;
    jsonData["closed_reason"]             = closingReason;

    const response = await fetch(`${API_URL}/closeDoctorSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      modalClose3();
      listSchedule("");
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listSchedule("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const changeCancellationReason = (e) => {
    const { name, value } = e.target;
    setCancellationReason(value);
  }

  const changeClosingReason = (e) => {
    const { name, value } = e.target;
    setClosingReason(value);
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
            <h5 className='mx-2 mb-0'>Appointment Schedules </h5>
          </div>
          <div className='app-top-right d-flex'> 
            <div className='position-relative'>
              <Link to="/notifications">
              <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
              <span className='top-header-notification primary-bg-color'>3</span>
              </Link>
            </div> 
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
              }`} > Previous Schedules </button>
            <button onClick={() => setActiveTab('tab2')} className={`${ activeTab === 'tab2' ? 'active' : ''
              }`} > Recent Schedules </button>
          </div>
          <div className="tab-content">
            {activeTab === 'tab1' && <PreviousSchedules />}
            {activeTab === 'tab2' && <RecentSchedules />}
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default AppointmentScheduling;