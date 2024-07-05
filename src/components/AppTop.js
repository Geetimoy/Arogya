import { useState, useContext, useEffect } from 'react';

import CryptoJS from "crypto-js";

import './AppTop.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faUser, faBars, faLongArrowAltLeft, faUsers, faFemale, faChild, faCalendarAlt, faSignOutAlt, faVenusDouble } from '@fortawesome/free-solid-svg-icons';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

function AppTop(){

  const [totalNotifications, setTotalNotifications] = useState(0);

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const [isMActive, setIsMActive] = useState(false);
  const [profileImage, setProfileImage] = useState('/assets/images/profile.jpg');

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const setNotificationCount = async(systemId) => {
    
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    
    let jsonData = {
      'system_id': systemId,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'user_account_key': loginDetails.account_key,
      'user_account_type': loginDetails.account_type
    };

    const response = await fetch(`${API_URL}/myNotifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    });

    let result = await response.json();

    if(result.success){
      setTotalNotifications(result.data.row.length);
    }
  }

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["account_key"]       = decryptedLoginDetails.account_key;
    jsonData["account_type"]      = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getUserProfileDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let userDetails = result1.data;
    
    if(userDetails.shared_image !== ""){
      setProfileImage(userDetails.shared_image+'?timestamp='+Math.random());
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      setNotificationCount(systemContext.systemDetails.system_id);
      getUserDetails();
    }



    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

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
                <div className='profile-img'><img src={profileImage} alt='' style={{height:'40px'}} className='' /></div>
              <h5 className='mb-0 mx-2'>Hello {decryptedLoginDetails.user_name}!</h5>
              </div>
            </div>
            <ul>
              <li className='mm-active'><FontAwesomeIcon icon={faUser} /> <Link to={"/account"}>My Profile</Link></li>
              <li><FontAwesomeIcon icon={faUsers} /> <Link to={"/patientprofiles"}>Patient Profiles</Link></li>
              
              <li><FontAwesomeIcon icon={faChild} /> <Link to={"/child-malnutrition"}>Child Malnutrition</Link></li>
              <li><FontAwesomeIcon icon={faVenusDouble} /> <Link to={"/youngwomens"}>Young Womens</Link></li>
              <li><FontAwesomeIcon icon={faFemale} /> <Link to={"/janani"}>Janani</Link></li>
              
              <li><FontAwesomeIcon icon={faCalendarAlt} /> <Link to={"/bookings"}>Appointments</Link></li>
              <li><FontAwesomeIcon icon={faSignOutAlt} /> <Link to={"/logout"}>Logout</Link></li>
            </ul>
          </div>
          <img src={systemContext.systemDetails.thp_app_logo_url} alt='' style={{height:'40px'}} className='mx-2' />
          <h5 className='mx-2 mb-0'>{systemContext.systemDetails.thp_system_name} </h5>
        </div>
        <div className='app-top-right d-flex'> 
          <div className='position-relative'>
            <Link to="/notifications">
            <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
            <span className='top-header-notification primary-bg-color'>{totalNotifications}</span>
            </Link>
          </div> 
          <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
          <div className='drop-menu'>
              <ul>
                <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                {
                  (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                }
                {/* <li><Link to={"/contactus"}>Contact Us</Link></li> */}
                <li><Link to={"/feedback"}>Feedback</Link></li>
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