import React, { useContext, useState, useEffect } from "react";

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './Help.css'

import SystemContext from '../context/system/SystemContext';

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function Help(){

  const systemContext = useContext(SystemContext);
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [data, setData] = useState({page_content:'', page_title:''});

  const [profileImage, setProfileImage] = useState('/assets/images/profile.jpg');

  let jsonData = {};
      //jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TYPE;
      jsonData['device_token']          = DEVICE_TOKEN;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');
      jsonData["page_key"] = "HELP";
      jsonData["page_id"] = 42;
      jsonData["system_id"] = "ukhra.serviceplace.org.in";

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_URL}/staticPage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });
            
            const responseData = await response.json();
            // console.log(responseData.data.results[0]);
            
            setData(responseData.data.results[0]);
            // console.log('Hi');
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData();
        // eslint-disable-next-line
      }, []);


  return(
      <>
        <AppTop></AppTop>
          <div className="app-body help">
              {/* <h5 className="title">{data.page_title}</h5>
              <p dangerouslySetInnerHTML={{ __html: data.page_content }}></p> */}
              <div className='d-flex justify-content-between mb-4'>
                <div className='d-flex align-items-center'>
                  <div className="profile-img"><img src={profileImage} className='thumb' alt='' style={{height:'50px', width:'50px'}}/></div>
                  <h5 className='mb-0 mx-3 primary-color'>Hello Volunteer!</h5>
                </div>
                <div>
                  <img src={systemContext.systemDetails.thp_sp_global_logo_url} alt='' style={{height:'50px'}} />
                </div>
              </div>
              <h2 className="mb-3">{decryptedLoginDetails.user_name}</h2>
              <div className='red-box primary-bg-color'>
                <div className='d-flex align-items-center'>
                  <FontAwesomeIcon icon={faPhone} />
                  <div className='mx-3'>
                    <h6 className='mb-2'>Call {systemContext.systemDetails.thp_system_name} Office</h6>
                    <p className='mb-0'>Give a call for any query</p>
                  </div>
                </div>
              </div>
              <div className='red-box primary-bg-color'>
                  <div className='d-flex align-items-center'>
                  <FontAwesomeIcon icon={faEnvelope} />
                    <div className='mx-3'>
                      <h6 className='mb-2'>Email {systemContext.systemDetails.thp_system_name} </h6>
                      <p className='mb-0'>Send us a Email and we will get back to you within 2 days</p>
                    </div>
                  </div>
              </div>
          </div>
        <Appfooter></Appfooter>
      </>
  );
}


export default Help;