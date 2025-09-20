import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import AppTopNotifications from '../AppTopNotifications';
import SystemContext from "../../context/system/SystemContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN, PAGINATION_LIMIT } from "../util/Constants";


import nursinghome from '../../assets/images/nursing-home.png';
import pathology from '../../assets/images/pathology.png';
import pharmacy from '../../assets/images/pharmacy.png';
import nursecare from '../../assets/images/nurse-care.png';
import hospital from '../../assets/images/hospital.png';
import aaya from '../../assets/images/aaya.png';

import './ServiceProviders.css'

function ServiceProviders(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [providerCategory, setProviderCategory] = useState([]);

  const fetchProviderCategory = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');

    const response = await fetch(`${API_URL}/getServiceProviderCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success && result.data.length > 0){
      let resultData = result.data.map((category, index) => {
        if(category.id == '1') {
          category.url = '/clinic-nursing-home';
        }
        if(category.id == '2') {
          category.url = '/pathology';
        }
        if(category.id == '3') {
          category.url = '/pharmacy';
        }
        if(category.id == '4') {
          category.url = '/nurse-care';
        }
        if(category.id == '10') {
          category.url = '/home-care';
        }
        if(category.id == '9') {
          category.url = '/prefered-hospital';
        }

        return category;
      })
      setProviderCategory(resultData); // Append new data to existing list
    }
    else{
      setProviderCategory([]); 
    }
    
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){ 
      fetchProviderCategory();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  return(
    <>
    <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/services" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Service Providers </h5>
          </div>
          <div className='app-top-right d-flex'> 
            <AppTopNotifications /> 
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
    <div className="app-body service-provider">
      <div className='row'>
        {/* <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/prefered-hospital"><img src={hospital} alt='' />
            <h6 className='mb-0'>Prefered Hospital</h6></Link>
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/clinic-nursing-home"><img src={nursinghome} alt='' />
            <h6 className='mb-0'>Clinic, Nursing Home</h6></Link>
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/pathology"><img src={pathology} alt='' />
            <h6 className='mb-0'>Pathology</h6></Link>
            
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/pharmacy"><img src={pharmacy} alt='' />
            <h6 className='mb-0'>Pharmacy</h6></Link>
            
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/nurse-care"><img src={nursecare} alt='' />
            <h6 className='mb-0'>Nurse Care</h6></Link>
            
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='button-box'>
            <Link to="/home-care"><img src={aaya} alt='' />
            <h6 className='mb-0'>In Home Care</h6></Link>
          </div>
        </div> */}

        {
          providerCategory && providerCategory.map((category, index) => (
            <div className='col-6 mb-3' key={category.id}>
              <div className='button-box'>
                <Link to={category.url}><img src={category.category_icon} alt='' />
                <h6 className='mb-0'>{category.category_name}</h6></Link>
              </div>
            </div>
          ))
        }


      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default ServiceProviders;