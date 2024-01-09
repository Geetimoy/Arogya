import { useState, useContext } from 'react';

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import './AppTop.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faUser, faBars, faLongArrowAltLeft, faUsers, faFemale, faChild, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

function AppTop(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const [isMActive, setIsMActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <div className='app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className={`my-element ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className='left-scroll-menu'>
            <div className='offcanvas-header'>
              <div className='d-flex align-items-center'>
              <div className='scroll-back' onClick={handleClick}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </div>
              <img src={systemContext.systemDetails.thp_app_logo_url} alt='' style={{height:'40px'}} className='mx-2' />
              <h5 className='mb-0 mx-2'>Hello {decryptedLoginDetails.user_name}!</h5>
              </div>
            </div>
            <ul>
              <li className='mm-active'><FontAwesomeIcon icon={faUser} /> <Link to={"/account"}>My Profile</Link></li>
              <li><FontAwesomeIcon icon={faUsers} /> <Link to={"/patientprofile"}>Patient Profiles</Link></li>
              <li><FontAwesomeIcon icon={faFemale} /> <Link to={"/janani"}>Janani</Link></li>
              <li><FontAwesomeIcon icon={faChild} /> <Link to={"/childmalnutrition"}>Child Malnutrition</Link></li>
              <li><FontAwesomeIcon icon={faCalendarAlt} /> <Link to={"/apointments"}>Appointments</Link></li>
            </ul>
          </div>
          <img src={systemContext.systemDetails.thp_app_logo_url} alt='' style={{height:'40px'}} className='mx-2' />
          <h5 className='mx-2 mb-0'>Arogya </h5>
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
                <li><Link to={"/aboutborn2help"}>About Born2Help</Link></li>
                <li><Link to={"/contactus"}>Contact Us</Link></li>
                <li><Link to={"/offers"}>Feedback</Link></li>
                <li><Link to={"/help"}>Help</Link></li>
                <li><Link to={"/logout"}>Logout</Link></li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AppTop;