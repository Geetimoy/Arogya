import { useState, useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

import Appfooter from '../AppFooter';
import './UpdatePeriodicData.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { Link, useNavigate, useParams } from "react-router-dom";
import AppTopNotifications from "../AppTopNotifications";

function YoungWomanViewPeriodicData(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [periodicList, setPeriodicList] = useState([]); 
  const [urlParam, setUrlParam] = useState(useParams());
  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };


  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listPeriodicData();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const listPeriodicData = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["woman_account_type"]        = 3;
    jsonData["woman_account_key"]         = editAccountKey;
    jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": "",
                                              "limit": "10",
                                              "offset": "0",
                                              "order_by_field": "data_processed_on",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/womanPeriodicDataListFromDoctorLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      setPeriodicList(result.data.data);
    }
    else{
      setPeriodicList([]); 
    }

  }

  const getUserBasicDetails = async () => {
          
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getProfileDetailsFromDoctorLogin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      setUserBasicDetails(result.data);
    }
    else{
      setUserBasicDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editAccountKey){
      getUserBasicDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editAccountKey]);
  
  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/youngwomens" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Periodic Data</h5>
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
      <div className='app-body form-all upadte-periodic-data'>
        {/* <p><small>View Young Women Periodic Data</small></p> */}
        <p className='patient-details'>
          {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <div className="saved-periodic-data">
            <div className="row mt-4">

              {periodicList.map((women, index) => (
                <div className="col-6" key={index}>
                  <div className="jumbotron rounded p-2">
                    <div className="periodic-data position-relative">
                      {/* <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div> */}
                      <p className="primary-color"><strong>Date -  {women.data_processed_on}</strong></p>
                      {
                        women.sub_periodic_data.map((category, categoryindex) => {
                          return <p key={`${index}${categoryindex}`}>{category.category_name} - {category.value}</p>
                        })
                      }
                    </div>
                  </div>
                </div>
              ))}

              {periodicList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}

            </div>
        </div>
      </div>
    <Appfooter></Appfooter>
    </>
  )

}


export default YoungWomanViewPeriodicData;