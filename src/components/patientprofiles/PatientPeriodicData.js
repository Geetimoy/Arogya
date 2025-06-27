import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { Link, useNavigate, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Category from "./Category";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";
import AppTopNotifications from '../AppTopNotifications';

function PatientPeriodicData(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [periodicDate, setPeriodicDate]     = useState('');

  const [inputValues, setInputValues] = useState({
    select1: {category:"", value:""},
    select2: {category:"", value:""},
    select3: {category:"", value:""},
    select4: {category:"", value:""},
    select5: {category:"", value:""},
    select6: {category:"", value:""},
    select7: {category:"", value:""},
    select8: {category:"", value:""},
    select9: {category:"", value:""},
    select10: {category:"", value:""},
    select11: {category:"", value:""},
    select12: {category:"", value:""},
    select13: {category:"", value:""},
    select14: {category:"", value:""},
    select15: {category:"", value:""},
    select16: {category:"", value:""}
  });

  const [isMActive, setIsMActive] = useState(false);
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [remarks, setRemarks] = useState(''); 
  const [periodicList, setPeriodicList] = useState([]); 
  const [userDetails, setUserDetails] = useState([]);
  const [urlParam, setUrlParam] = useState(useParams());
  const editAccountKey = urlParam.accountKey;

  const selectCategory = (e) => {
    const { name, value } = e.target;
    inputValues[name].category = value;
    console.log(inputValues);
  }
  const changeCategoryValue = (e) => {
    const { name, value } = e.target;
    inputValues[name].value = value;
    console.log(inputValues);
  }

  const [inputList, setInputList] = useState([<Category key={1} name="select1" changefunc={selectCategory} changecatval={changeCategoryValue}/>]);

  const changePeriodicDate = (date) => {
    setPeriodicDate(date);
  }

  useEffect(() => {
    // eslint-disable-next-line
  }, [inputValues]);

  const onAddBtnClick = event => {

    if(inputList.length < 16){
      
      var newKey = 'select'+(inputList.length+1);
      setInputList(inputList.concat(<Category key={inputList.length+1} name={`${newKey}`} changefunc={selectCategory} changecatval={changeCategoryValue}/>));

    }
    else{
      return false;
    }

  };

  const handleRemarks = (e) => {
    const { name, value } = e.target;
    setRemarks(value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    var patientCategory = [];
    Object.keys(inputValues).forEach(function(k, i){
      if(inputValues[k].category != '' && parseInt(inputValues[k].category) > 0){
        patientCategory[i] = {category: inputValues[k].category, value: inputValues[k].value}
      }
    });

    if(patientCategory.length > 0){

      let strday   = String(periodicDate.getDate()).padStart(2, '0');  // Add leading zero if needed
      let strmonth = String(periodicDate.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
      let stryear  = periodicDate.getFullYear();
      
      let dataProcessedOn = `${strday}-${strmonth}-${stryear}`;

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["data_added_by"]             = decryptedLoginDetails.account_key;
      jsonData["data_added_by_type"]        = decryptedLoginDetails.account_type;
      jsonData["patient_account_key"]       = editAccountKey;
      jsonData["data_processed_on"]         = dataProcessedOn;
      jsonData["remarks"]                   = remarks;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      jsonData["patient_cat_value"]         = patientCategory;

      const response = await fetch(`${API_URL}/patientPeriodicDataAdd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: "Please select at least one category!"});
    }
  }
  
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
    jsonData["patient_account_type"]      = 3;
    jsonData["patient_account_key"]       = editAccountKey;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": "",
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "data_processed_on",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/patientPeriodicDataList`, {
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

  const getProfileDetails = async () => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 3;
    jsonData["account_key"]               = editAccountKey;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getProfileDetails`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      setUserDetails(result.data);
    }
    else{
      setUserDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editAccountKey){
      getProfileDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editAccountKey]);

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>{decryptedLoginDetails.account_type !== '5' && 'Update'} Periodic Data</h5>
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
        <p><small>{decryptedLoginDetails.account_type !== '5' && 'Update'} Patient Periodic Data</small></p>
        
        {decryptedLoginDetails.account_type !== '5' && <form className="mt-3" name="periodicDataForm" id="periodicDataForm" onSubmit={handleFormSubmit}>
          <div className="position-absolute mt-1 patient-details">
             {(userDetails.display_name) && <span className="text-muted d-flex"><span>{userDetails.display_name}</span>, {userDetails.gender}, {userDetails.age}yrs</span>}
          </div>
          <div className='mb-3 mt-3 text-end'>
            <button type="button" className='btn btn-sm primary-bg-color text-light' onClick={onAddBtnClick}>Add More Category</button>
          </div>

          <div className={`form-group`}>
            <label htmlFor="period_missed">Date <span className="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd"  className='form-control' selected={periodicDate} onChange={(date) => changePeriodicDate(date)} placeholderText="YYYY-MM-DD" maxDate={new Date()}/>
          </div>

          {[...inputList].reverse()}

          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea name="remarks" id="remarks" rows="3" onChange={handleRemarks} className="form-control" placeholder="Describe / Explain Problems"></textarea>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div>
        </form>}

        <div className="saved-periodic-data">
          <div className="row mt-4">

            
            {periodicList.map((patient, index) => (
              <div className="col-6" key={index}>
                <div className="jumbotron rounded p-2">
                  <div className="periodic-data position-relative">
                    {/* <div className="btn-delete" onClick={()=>{ deletePeriodicData(child.data_processed_on) }}><FontAwesomeIcon icon={faTrash} /></div> */}
                    <p className="primary-color"><strong>Date -  {patient.data_processed_on}</strong></p>
                    {
                      patient.sub_periodic_data.map((category, categoryindex) => {
                        return <p key={`${index}${categoryindex}`}>{category.category_name} - {category.value}</p>
                      })
                    }
                  </div>
                </div>
              </div>
            ))}
            

          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default PatientPeriodicData;