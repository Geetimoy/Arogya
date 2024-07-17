import React, { useState, useContext, useEffect } from "react";
import './Dashboard.css';

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


import Appfooter from './AppFooter';
import AppTop from './AppTop';

import SystemContext from "../context/system/SystemContext";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import banner1 from '../assets/images/banner1.jpg';
// import banner2 from '../assets/images/banner2.jpg';
// import banner3 from '../assets/images/banner3.jpg';
// import banner4 from '../assets/images/banner4.jpg'

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";


import BannerUkhra from "./BannerUkhra";
import BannerB2h from "./BannerB2h";
import BannerRgvn from "./BannerRgvn";
import BannerServiceplace from "./BannerServiceplace";

function Dashboard() {
 
  const systemContext = useContext(SystemContext);
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const currentDomain = window.location.hostname;
  //const domainName = 'ukhraapp.serviceplace.org.in'; //NGO, system_id=3
  //const domainName = 'b2happ.serviceplace.org.in'; //NGO, system_id=1
  //const domainName = 'rgvnapp.serviceplace.org.in';//NGO, system_id=2
  //const domainName = 'telehealth.serviceplace.org.in';//Parent NGO, system_id=0

  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [imageData, setImageData]       = useState({banner1:'', banner2:''});
  const [profileImage, setProfileImage] = useState('/assets/images/profile.jpg');

  let jsonData = {};
      jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');
      jsonData["system_id"] = "ukhra.serviceplace.org.in";

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        //console.log(jsonData);
        const response = await fetch(`${API_URL}/homeBanners`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
        
        const responseData = await response.json();
        
        
        setImageData(responseData.data);
        console.log (JSON.stringify(responseData.data));
        // console.log('Hi');
        console.log("data=" + responseData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchImageData();
    // eslint-disable-next-line
  }, []);

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
    <div className='app-body dashboard'>
      <div className='d-flex justify-content-between mb-4'>
          <div className='d-flex align-items-center'>
            <div className="profile-img"><img src={profileImage} className='thumb' alt='' style={{height:'50px', width:'50px'}}/></div>
            <h5 className='mb-0 mx-3 primary-color'>Hello {decryptedLoginDetails.user_name}!</h5>
          </div>
          <div>
            <img src={systemContext.systemDetails.thp_sp_global_logo_url} alt='' style={{height:'50px'}} />
          </div>
      </div>
      {/* <h4 className='mb-3'>Volunteer Abc</h4> */}
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
      {/* <div className="banner">
        <Slider {...settings}>
          <div>
            <img src={banner1} alt="" />
          </div>
          <div>
            <img src={banner2} alt="" />
          </div>
          <div>
            <img src={banner3} alt="" />
          </div>
          
        </Slider>
      </div> */}
      {/* <BannerUkhra></BannerUkhra> */}

      {currentDomain === 'ukhraapp.serviceplace.org.in' && <BannerUkhra />}
      {currentDomain === 'b2happ.serviceplace.org.in' && <BannerB2h />}
      {currentDomain === 'rgvnapp.serviceplace.org.in' && <BannerRgvn />}
      {currentDomain === 'telehealth.serviceplace.org.in' && <BannerServiceplace />}
      {/* {domainName === 'ukhraapp.serviceplace.org.in' && <BannerUkhra />}
      {domainName === 'b2happ.serviceplace.org.in' && <BannerB2h />}
      {domainName === 'rgvnapp.serviceplace.org.in' && <BannerRgvn />}
      {domainName === 'telehealth.serviceplace.org.in' && <BannerServiceplace />} */}
      {/* <div className="reminder">
        <h5 className='mb-2'>Reminder</h5>
        <ul className="list-style">
        <li>Donec blandit velit eu nunc auctor rutrum.</li>
        <li>Vivamus ac ex non ipsum facilisis malesuada.</li>
        <li>Nam tristique justo sed purus facilisis imperdiet.</li>
        <li>Ut ac dolor ac purus commodo dictum ut nec purus.</li>
        </ul>
      </div> */}
      
    </div>

    <Appfooter></Appfooter>
    </>
   )
}

export default Dashboard;