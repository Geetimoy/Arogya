import React, { useState, useEffect, useContext } from 'react';
import Appfooter from "./AppFooter";
import AppTop from "./AppTop";





import SystemContext from '../context/system/SystemContext';
import AlertContext from "../context/alert/AlertContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function MyConsent(){
  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);


  

   // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      //console.log('submit the form');
      let jsonData = {};
        jsonData['system_id']             = systemContext.systemDetails.system_id;
        jsonData['device_type']           = DEVICE_TOKEN;
        jsonData['device_token']          = DEVICE_TYPE;
        jsonData['user_lat']              = localStorage.getItem('latitude');
        jsonData['user_long']             = localStorage.getItem('longitude');
  
        jsonData['account_key']           = "0uu232206c628";
        jsonData['account_type']          = "5";
        jsonData['consent_status']        = "2";
       
        
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
        <div className="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="dont_save_info" name="consent" className="custom-control-input" value="f" /><label className="custom-control-label no-style" htmlFor="dont_save_info">Don't save my information </label></div>
        <div className="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="save_info" name="consent" className="custom-control-input" value="t"  /><label className="custom-control-label no-style" htmlFor="save_info">Yes, save my information </label></div>
        <div className="custom-control custom-radio custom-control-inline mt-2"><input type="radio" id="withdraw_consent" name="consent" className="custom-control-input" value="f" /><label className="custom-control-label no-style" htmlFor="withdraw_consent">Withdraw my consent </label></div>
      </div>
      <div className="btns-group d-flex justify-content-center"><button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2">Save</button></div>
      </form>
    </div>
    <Appfooter></Appfooter>
    </>
    
  );
}

export default MyConsent;
