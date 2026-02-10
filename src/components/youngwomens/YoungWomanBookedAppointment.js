import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";
import Rating from "../Ratingsave"

import { Link, useParams } from "react-router-dom";

import SystemContext from '../../context/system/SystemContext';
import AlertContext from "../../context/alert/AlertContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from '../util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import {Modal, Button} from 'react-bootstrap'; 
import AppTopNotifications from '../AppTopNotifications';

function YoungWomanBookedAppointment(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [urlParam, setUrlParam]       = useState(useParams());

  const editAccountKey    = urlParam.patientKey;

  const [isMActive, setIsMActive] = useState(false);
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [appointmentList, setAppointmentList]   = useState([]);
  const [approvedCounter, setApprovedCounter]   = useState(0);
  const [pendingCounter, setPendingCounter]     = useState(0);
  const [rejectedCounter, setRejectedCounter]   = useState(0);

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

  const listAppointment = async (searchKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["patient_key"]               = editAccountKey;
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
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
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

  const getUserBasicDetails = async () => {
        
   let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getProfileDetailsFromDoctorLogin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      setUserBasicDetails(result.data);
    }
    else{
      setUserBasicDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editAccountKey){
      getUserBasicDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editAccountKey]);
  
  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/youngwomens" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Young Woman Booked Appointment </h5>
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
        <p className='patient-details mt-4'>
          {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='status d-flex mb-2'>
            <p className='me-1 mb-0'><small>Approved: <strong>{approvedCounter}</strong></small>,</p>
            <p className='me-1 mb-0'><small>Pending: <strong>{pendingCounter}</strong></small>,</p>
            <p className='me-0 mb-0'><small>Rejected: <strong>{rejectedCounter}</strong></small></p>
          </div>
          <div className='filter'>
            <div class="form-check mb-2">
              <label class="form-check-label">
              <input className="form-check-input" type="checkbox" name="filter_appointment" value="pending" onChange={()=>setFilterPendingAppointmentChecked(!filterPendingAppointmentChecked)} checked={filterPendingAppointmentChecked}/> <small>Pending</small>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          {appointmentList.map((appointment, index) => (
            <div className="col-12">
              <div className='button-box mb-3 position-relative' key={appointment.appointment_id}>
                <div className='scheduleactive position-absolute'>
                  {
                    (appointment.appt_status === 'Active') && <div className='actives'>A</div>
                  }
                  {
                    (appointment.appt_status !== 'Active') && <div className='not-active'>N-A</div>
                  }
                </div>
                <p><span className="d-block">Doctor Name:</span> Dr. {appointment.doctor_display_name}</p>
                <p><span className="d-block">Appointment ID:</span> {appointment.appointment_key}</p>
                <p><span className="d-block">Patient Name:</span> {appointment.patient_display_name}</p>
                <p><span className="d-block">Date of Visit & Appointment Time:</span><label>{appointment.appointment_date} @ {appointment.appointment_time}</label></p>
                <p><span className="d-block">Place:</span> {appointment.location} - {(appointment.consultation_mode === '1') ? `Offline (Clinic)` : ((appointment.consultation_mode === '2') ? `Online` : `Call on Emergency`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default YoungWomanBookedAppointment;