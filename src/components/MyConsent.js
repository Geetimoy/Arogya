import React, { useState, useEffect, useContext } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "./AppFooter";
import AppTop from "./AppTop";
import SystemContext from '../context/system/SystemContext';
import AlertContext from "../context/alert/AlertContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

function MyConsent(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  if(decryptedLoginDetails.account_type === '4' || decryptedLoginDetails.account_type === '5'){
    var accountType = decryptedLoginDetails.account_type;
  }
  else{
    var accountType = 3;
  }

  const [consentStatus, setConsentStatus] = useState('');
  
  const getUserConsent = async () => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = accountType;
    jsonData["account_key"]               = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/myConsentsStatus`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      var myConsentData = result.data.results;
      setConsentStatus(myConsentData.consent_status.toString());
    }
    else{
      setConsentStatus('0'); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      getUserConsent();
    }
  }, [systemContext.systemDetails.system_id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    
    let jsonData = {};

    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData['device_type']           = DEVICE_TOKEN;
    jsonData['device_token']          = DEVICE_TYPE;
    jsonData['user_lat']              = localStorage.getItem('latitude');
    jsonData['user_long']             = localStorage.getItem('longitude');
    jsonData['account_key']           = decryptedLoginDetails.account_key;
    jsonData['account_type']          = accountType;
    jsonData['consent_status']        = consentStatus;
    
    const response = await fetch(`${API_URL}/myConsentsSave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

    //console.log('Form submitted with data:', formData);
  };


  return (
    <>
    <AppTop></AppTop>
    <div className="app-body">
      <h5 className="title">My Consent</h5>
      <form className="" onSubmit={handleSubmit}>
      <div>
        {/* <div className="custom-control custom-radio custom-control-inline mt-2">
          <input type="radio" id="dont_save_info" name="consent" className="custom-control-input" onChange={()=>setConsentStatus('0')}  value="0" checked={(consentStatus === "0") ? true : false} /><label className="custom-control-label no-style" htmlFor="dont_save_info">Don't save my information </label>
        </div> */}
        <div className="custom-control custom-radio custom-control-inline mt-2">
          <input type="radio" id="save_info" name="consent" className="custom-control-input" onChange={()=>setConsentStatus('1')} value="1" checked={(consentStatus === "1") ? true : false} /><label className="custom-control-label no-style" htmlFor="save_info">Yes, save my information </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline mt-2">
          <input type="radio" id="withdraw_consent" name="consent" className="custom-control-input" onChange={()=>setConsentStatus('2')} value="2" checked={(consentStatus === "2") ? true : false} /><label className="custom-control-label no-style" htmlFor="withdraw_consent">Withdraw my consent </label>
        </div>
      </div>
      <div className="btns-group d-flex justify-content-center"><button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2">Save</button></div>
      <div className='mt-3'>With your consent, this information is to be used for patient health and other legitimate purposes only.</div>
      <div className='text-center mt-4'><Link to="/dashboard" className='text-decoration-underline'>Return to Home</Link></div>
      </form>
    </div>
    <Appfooter></Appfooter>
    </>
    
  );
}

export default MyConsent;
