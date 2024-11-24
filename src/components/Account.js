import CryptoJS from "crypto-js";

import Appfooter from './AppFooter';
import AppTop from './AppTop';
import './Account.css'

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
 
//import profilephoto from '../assets/images/profile.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faImage, faLock, faCertificate, faAngleRight, faBell, faCamera, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import SystemContext from "../context/system/SystemContext";

function Account(){
  
  const systemContext = useContext(SystemContext);

  const [image, setImage] = useState('/assets/images/profile.jpg');
  const [accountStatus, setAccountStatus] = useState('');

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

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

    setAccountStatus(userDetails.account_status_descr);
    
    if(userDetails.shared_image !== ""){
      setImage(userDetails.shared_image+'?timestamp='+Math.random());
    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])

  return(
    <>
    <AppTop></AppTop>
      <div className='app-body account'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='rounded jumbotron p-4 text-center'>
              <div className='profile-thumb-box'>
                <img src={image} className='thumb' alt=''/>
                <Link to ="/profilephoto"><FontAwesomeIcon icon={faCamera} color='primary-color' /></Link>
              </div>
              <h5 className='title mb-0'>{decryptedLoginDetails.user_name}</h5>
              <div className='status float-end'><span className='red-text'><b>Status: {accountStatus}</b></span></div>
            </div>
            <ul>
              <li><FontAwesomeIcon icon={faInfoCircle} /> <Link to ="/basicinfo">Update Basic Information <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></Link></li>
              <li><FontAwesomeIcon icon={faImage} /> <Link to ="/profilephoto">Update Profile Photo<FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></Link> </li>  

              {(decryptedLoginDetails.account_type == 3) && <li><FontAwesomeIcon icon={faCertificate} /> <Link to ="/initialhistory">Initial History <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /> </Link></li>}

              {(decryptedLoginDetails.account_type == 3) && <li><FontAwesomeIcon icon={faCertificate} /> <Link to ="/medicalhistory">Medical History <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /> </Link></li>}

              {(decryptedLoginDetails.account_type != 3) && <li><FontAwesomeIcon icon={faCertificate} /> <Link to ="/uploadcertificates">Upload Certificates <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></Link></li>}
              
              <li><FontAwesomeIcon icon={faBell} /> <Link to ="/settings">Settings <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></Link></li>
              <li><FontAwesomeIcon icon={faLock} /> <Link to ="/changepassword">Change Password<FontAwesomeIcon icon={faAngleRight} className='ms-auto' /> </Link> </li>
              <li><FontAwesomeIcon icon={faSignOutAlt} /> <Link to ="/logout">Logout <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default Account;