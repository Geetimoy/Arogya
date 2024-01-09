import React, { useContext } from "react";
import './Dashboard.css';

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


import Appfooter from './AppFooter';
import AppTop from './AppTop';

import SystemContext from "../context/system/SystemContext";

function Dashboard() {
 
  const systemContext = useContext(SystemContext);
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

   return(
    <>
    
    <AppTop></AppTop>
    <div className='app-body dashboard'>
      <div className='d-flex justify-content-between mb-4'>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={faUser} />
            <h5 className='mb-0 mx-3 primary-color'>Hello {decryptedLoginDetails.user_name}!</h5>
          </div>
          <div>
            <img src={systemContext.systemDetails.thp_sp_global_logo_url} alt='' style={{height:'50px'}} />
          </div>
      </div>
      <h4 className='mb-3'>Volunteer Abc</h4>
      <div className='red-box primary-bg-color'>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={faPhone} />
            <div className='mx-3'>
              <h6 className='mb-2'>Call Born2Help Arogya Office</h6>
              <p className='mb-0'>Give a call for any query</p>
            </div>
          </div>
      </div>
      <div className='red-box primary-bg-color'>
          <div className='d-flex align-items-center'>
          <FontAwesomeIcon icon={faEnvelope} />
            <div className='mx-3'>
              <h6 className='mb-2'>Email Born2Help Arogya </h6>
              <p className='mb-0'>Send us a Email and we will get back to you within 2 days</p>
            </div>
          </div>
      </div>
    </div>

    <Appfooter></Appfooter>
    </>
   )
}

export default Dashboard;