import { useState, useContext, useEffect, useRef } from 'react';

import Appfooter from "./AppFooter";

import AlertContext from '../context/alert/AlertContext';
import SystemContext from "../context/system/SystemContext";

import CryptoJS from "crypto-js";

import './Settings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

function Settings(){

  const alertContext  = useContext(AlertContext);
  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const smsCheckboxRef    = useRef(false);
  const emailCheckboxRef  = useRef(false);
  const pushCheckboxRef   = useRef(false);
  const callCheckboxRef   = useRef(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

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
    
    const response1 = await fetch(`${API_URL}/mySettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let systemDetails = result1.data.results;

    var prefNotifyCommunicationArray = [];
    
    if(systemDetails.pref_notify_communication){
      prefNotifyCommunicationArray = systemDetails.pref_notify_communication.split(",");
      if(prefNotifyCommunicationArray.includes('sms')){
        smsCheckboxRef.current.checked = true;
      }
      if(prefNotifyCommunicationArray.includes('email')){
        emailCheckboxRef.current.checked = true;
      }
      if(prefNotifyCommunicationArray.includes('push')){
        pushCheckboxRef.current.checked = true;
      }
      if(prefNotifyCommunicationArray.includes('mobile')){
        callCheckboxRef.current.checked = true;
      } 
    }

  }

  
  useEffect(() => {

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [getUserDetails])

  const saveSettings = async () =>{

    let settingArray = [];
    if(smsCheckboxRef.current.checked === true){
      settingArray.push('sms');
    }
    if(emailCheckboxRef.current.checked === true){
      settingArray.push('email');
    }
    if(pushCheckboxRef.current.checked === true){
      settingArray.push('push');
    }
    if(callCheckboxRef.current.checked === true){
      settingArray.push('mobile');
    }

    let settingsData =  settingArray.join();
    
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData['device_type']               = DEVICE_TYPE;
    jsonData['device_token']              = DEVICE_TOKEN;
    jsonData['user_lat']                  = localStorage.getItem('latitude');
    jsonData['user_long']                 = localStorage.getItem('longitude');
    jsonData['account_key']               = decryptedLoginDetails.account_key;
    jsonData['account_type']              = decryptedLoginDetails.account_type;
    jsonData['user_login_id']             = decryptedLoginDetails.login_id;
    jsonData['pref_notify_communication'] = settingsData;

    const response = await fetch(`${API_URL}/mySettingsSave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result = await response.json();

    if (result.success) { 
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
    } 
    else {
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  return(
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>General Settings </h5>
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
      <div className="app-body settings">
          <div className='brdr-btm d-flex justify-content-between align-items-center'>
            <h5 className='title mb-0'>Notifications</h5>
            <Link to="#" className="btn btn-primary min-width-100 primary-bg-color border-0" onClick={saveSettings}>Save</Link>
          </div>
          <div className="mb-4">
            <div className="form-check form-switch px-0 mb-2">
              <input ref={smsCheckboxRef} className="form-check-input float-end" type="checkbox" id="sms" name="darkmode" value="sms"/>
              <label className="form-check-label" htmlFor="sms"><strong>SMS</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input ref={emailCheckboxRef} className="form-check-input float-end" type="checkbox" id="email" name="darkmode" value="email"/>
              <label className="form-check-label" htmlFor="email"><strong>Email</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input ref={pushCheckboxRef} className="form-check-input float-end" type="checkbox" id="push" name="darkmode" value="push"/>
              <label className="form-check-label" htmlFor="push"><strong>Push</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input ref={callCheckboxRef} className="form-check-input float-end" type="checkbox" id="call" name="darkmode" value="mobile"/>
              <label className="form-check-label" htmlFor="call"><strong>Call</strong></label>
            </div>
          </div>

          <h5 className='title brdr-btm'>Another Category</h5>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default Settings;