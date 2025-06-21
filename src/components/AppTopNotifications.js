import { useState, useContext, useEffect } from 'react';

import CryptoJS from "crypto-js";

import './AppTop.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

function AppTopNotifications(){

  const [totalNotifications, setTotalNotifications] = useState(0);

  const systemContext = useContext(SystemContext);

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

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      setNotificationCount(systemContext.systemDetails.system_id);
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  return(
    <div className='position-relative'>
      <Link to="/notifications">
      <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
      <span className='top-header-notification primary-bg-color'>{totalNotifications}</span>
      </Link>
    </div> 
  );
}


export default AppTopNotifications;