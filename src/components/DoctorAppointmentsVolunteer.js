import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import {Modal, Button} from 'react-bootstrap'; 

import './patientprofiles/PatientProfiles.css'

function DoctorAppointmentsVolunteer(){

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
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
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
      <div className='d-flex justify-content-between align-items-center'>
          <div className='status d-flex mb-2'>
            <p className='me-1 mb-0'><small>Approved: <strong>{approvedCounter}</strong></small>,</p>
            <p className='me-1 mb-0'><small>Pending: <strong>{pendingCounter}</strong></small>,</p>
            <p className='me-0 mb-0'><small>Rejected: <strong>{rejectedCounter}</strong></small></p>
          </div>
          <div className='filter'>
            <div class="form-check mb-2">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" name="remember" /> <small>Pending</small>
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
                      <li><Link to={"/"}>Send Notifications</Link></li>
                      {
                        (decryptedLoginDetails.account_type === '4') &&<li> <Link to={"/"}>Doctor Details</Link></li>
                      }
                      <li><Link to={"/"}>Patient Details</Link></li>
                      <li><Link to={"#"}>Upload Prescriptions</Link></li>
                      <li><Link to={"#"}>Download Prescriptions</Link></li>
                      <li><Link to={"#"}>Upload Test Reports</Link></li>
                      <li><Link to={"#"}>Download Test Reports</Link></li>
                      
                    </ul>
                  </div>
                }
                {
                  (decryptedLoginDetails.account_type === '4') &&<p><span className="d-block">Doctor Name:</span> Dr. {appointment.doctor_display_name}</p>
                }
                <p><span className="d-block">Appointment ID:</span> {appointment.appointment_key}</p>
                <p><span className="d-block">Patient Name:</span> {appointment.patient_display_name}</p>
                <p><span className="d-block">Date of Visit & Appointment Time:</span><label>{appointment.appointment_date} @ {appointment.appointment_time}</label></p>
                <p><span className="d-block">Place:</span> {appointment.location} - {(appointment.consultation_mode === '1') ? `Offline (Clinic)` : ((appointment.consultation_mode === '2') ? `Online` : `Call on Emergency`)}</p>
                {/* <p><span className="d-block">Consultation Mode:</span> {(appointment.consultation_mode === '1') ? `Offline (Clinic)` : ((appointment.consultation_mode === '2') ? `Online` : `Call on Emergency`)}</p> */}
                <p><span className="d-block">Status:</span> {appointment.appt_status}</p>
              </div>
            ))}


          </div>
        </div>

      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default DoctorAppointmentsVolunteer;