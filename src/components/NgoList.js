import React, { useState, useContext, useEffect } from "react";

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import SystemContext from "../context/system/SystemContext";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

import './NgoList.css';


import globallogo from '../assets/images/global-icon.png';
import rgvnlogo from '../assets/images/rgvn-icon.png';
import b2hlogo from '../assets/images/b2h-icon.png';
import ukhralogo from '../assets/images/ukhra-icon.png';


function NgoList(){
  const systemContext = useContext(SystemContext);
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [profileImage, setProfileImage] = useState('/assets/images/profile.jpg');

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

    let userDetails = result1.data;console.log(userDetails);
    
    if(userDetails.shared_image !== ""){
      setProfileImage(userDetails.shared_image+'?timestamp='+Math.random());
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
      <div className="app-body ngo-list">
        <div className='d-flex justify-content-between mb-4'>
            <div className='d-flex align-items-center'>
              <div className="profile-img"><img src={profileImage} className='thumb' alt='' style={{height:'50px', width:'50px'}}/></div>
              <h5 className='mb-0 mx-3 primary-color'>Hello {decryptedLoginDetails.user_name}!</h5>
            </div>
            <div>
              <img src={systemContext.systemDetails.thp_sp_global_logo_url} alt='' style={{height:'50px'}} />
            </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="button-box">
              <Link to="/">
                <img src={globallogo} alt='' />
                <h6>For Anywhere</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="/">
                <img src={b2hlogo} alt='' />
                <h6>Near Kharagpur City</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="/">
                <img src={rgvnlogo} alt='' />
                <h6>Near Morigaon, Assam</h6>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="button-box">
              <Link to="/">
                <img src={ukhralogo} alt='' />
                <h6>Ukhra, Near Durgapur, WestBengal</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default NgoList;