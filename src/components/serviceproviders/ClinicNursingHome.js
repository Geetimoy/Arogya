import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import './ServiceProviders.css'
import AppTopNotifications from '../AppTopNotifications';
import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

function ClinicNursingHome() {

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

     const [isMActive, setIsMActive] = useState(false);
  
     const handle2Click = () => {
      setIsMActive(!isMActive); // Toggle the state
    };

      const [providerId, setProviderId] = useState('');
      const [providerList, setProviderList] = useState([]);
      const listClinicNursingHome = async (searchKey) => {
    
        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
        let jsonData = {};
        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        // jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
        jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
        jsonData["device_token"]              = DEVICE_TOKEN;
        jsonData["user_lat"]                  = localStorage.getItem('latitude');
        jsonData["user_long"]                 = localStorage.getItem('longitude');
        jsonData["provider_id"]               = providerId; // 1 - Clinic Nursing Home
        jsonData["search_param"]              = {
                                                  "by_keywords": searchKey,
                                                  "limit": "0",
                                                  "offset": "0",
                                                  "order_by_field": "appointment_id",
                                                  "order_by_value": "desc"
                                                }
    
        const response = await fetch(`${API_URL}/getServiceProviderDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
    
        let result = await response.json();
        console.log(result);
        
        // if(result.success){
        //   alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        // }
        // else{
        //   alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        // }

        if(result.success){
          setProviderList(result.data.results);
        }
        else{
          setProviderList([]); 
        }
    
      }

      useEffect(() => {
          if(systemContext.systemDetails.system_id){
            listClinicNursingHome("");
          }
          // eslint-disable-next-line
        }, [systemContext.systemDetails.system_id]);

  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className='scroll-back'>
            <Link to="/service-providers" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>Clinic Nursing Home</h5>
        </div>
        <div className='app-top-right d-flex'> 
          <AppTopNotifications /> 
          <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
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
      <div className='search-patient mt-3 mb-3'>
        <div className='input-group'>
          <input type="text" className='form-control' placeholder='Search Clinic' id="searchClinic" name="searchClinic"  />
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
        </div>
      </div>
      <div className='row'>
        {/* <div className='col-12 mb-3'>
          <div className='button-box-providers'>
            <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> Samrat Nursing Home</li>
              <li><span className='fw-bold'>Location :</span> Baguiati, Kolkata</li>
              <li><span className='fw-bold'>Contact :</span> 1234567890</li>
              <li><span className='fw-bold'>Services :</span> General Checkup, Vaccination</li>
            </ul>
          </div>
        </div> */}
        <div className='col-12 mb-3'>
          {providerList.map((provider, index) => (
          <div className='button-box-providers'>
            <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> {provider.provider_name}</li>
              <li><span className='fw-bold'>Location :</span> {provider.location}</li>
              <li><span className='fw-bold'>Contact :</span> {provider.contact}</li>
              <li><span className='fw-bold'>Services :</span> {provider.services.join(", ")}</li>
            </ul>
          </div>
           ))}
        </div>
        {/* <div className='col-12 mb-3'>
          <div className='button-box-providers'>
            <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> Samrat Nursing Home</li>
              <li><span className='fw-bold'>Location :</span> Baguiati, Kolkata</li>
              <li><span className='fw-bold'>Contact :</span> 1234567890</li>
              <li><span className='fw-bold'>Services :</span> General Checkup, Vaccination</li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}
export default ClinicNursingHome;