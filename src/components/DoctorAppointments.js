import { useState, useContext } from 'react';
import Appfooter from "./AppFooter";

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import './patientprofiles/PatientProfiles.css'

function DoctorAppointments(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);
  
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

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
                (decryptedLoginDetails.account_type == 3 || decryptedLoginDetails.account_type == 31 || decryptedLoginDetails.account_type == 32 || decryptedLoginDetails.account_type == 33) && <h5 className='mx-2 mb-0'>My Doctor Appointments </h5>
              }
              {
                (decryptedLoginDetails.account_type == 4) && <h5 className='mx-2 mb-0'> Appointments </h5>
              }
              {
                (decryptedLoginDetails.account_type == 5) && <h5 className='mx-2 mb-0'>My Bookings </h5>
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
        
      <div className="row">
          <div className="col-12">
            <div className="button-box mb-3 position-relative"> 
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  {
                    (decryptedLoginDetails.account_type == 5) &&<li><Link to={"#"}>Confirm Booking</Link></li>}
                  <li><Link to={"/"}>Cancel Appointment</Link></li>
                  <li><Link to={"/"}>Send Notifications</Link></li>
                  
                  {
                    (decryptedLoginDetails.account_type == 4) &&<li> <Link to={"/"}>Doctor Details</Link>
                      
                  </li>}
                  <li><Link to={"/"}>Patient Details</Link></li>
                  <li><Link to={"#"}>Upload Prescriptions</Link></li>
                  <li><Link to={"#"}>Download Prescriptions</Link></li>
                  <li><Link to={"#"}>Upload Test Reports</Link></li>
                  <li><Link to={"#"}>Download Test Reports</Link></li>
                  
                </ul>
              </div>
              {
                    (decryptedLoginDetails.account_type == 4) &&<p><span className="d-block">Doctor Name:</span> Geetimoy Sahu</p>}
                {
                    (decryptedLoginDetails.account_type == 4) &&<p><span className="d-block">Specialization:</span> Heart</p>}
                <p><span className="d-block">Patient Name:</span> D Samanta (Mobile - 9876543213)</p>
                <p><span className="d-block">Date of Visit & Appointment Time:</span><label>Friday 27th September, 2024 @ 03:00 PM - 05:00 AM</label></p>
                <p><span className="d-block">Place:</span> Kalipark</p>
                <p><span className="d-block">Consultation Mode:</span> Offline</p>
                <p><span className="d-block">Status:</span> Doctor yet to confirm</p>
                {/* <div className="mb-3 mt-3 text-center">
                  <a href='/patientprofiles' className="btn primary-bg-color text-light">Confirm</a>
                </div> */}
            </div>

            <div className="button-box mb-3"> 
              <p><span className="d-block">Doctor Name:</span> S Pradhan</p>
              <p><span className="d-block">Specialization:</span> Neuro</p>
              <p><span className="d-block">Patient Name:</span> B Patra (Mobile - 9263647748)</p>
              <p><span className="d-block">Date of Visit & Appointment Time:</span><label>Friday 25th September, 2024 @ 03:00 PM - 05:00 AM</label></p>
              <p><span className="d-block">Place:</span> Kalipark</p>
              <p><span className="d-block">Consultation Mode:</span> Offline</p>
              {/* <div className="mb-3 mt-3 text-center">
                <a href='/patientprofiles' className="btn primary-bg-color text-light">Confirm</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default DoctorAppointments;