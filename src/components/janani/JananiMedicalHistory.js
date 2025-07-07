import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Appfooter from '../AppFooter'; 

import './JananiMedicalHistory.css';
import AppTopNotifications from '../AppTopNotifications';

function JananiMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    previous_pregnancy_count: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_boy_birth_count: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_girl_birth_count: {required: true, value:"", errorClass:"", errorMessage:""},
    usg_needed: {required: true, value:"", errorClass:"", errorMessage:""},
    usg_done: {required: true, value:"", errorClass:"", errorMessage:""},
    injection_needed: {required: true, value:"", errorClass:"", errorMessage:""},
    injection_done: {required: true, value:"", errorClass:"", errorMessage:""},
    is_drinking_alcohol: {required: true, value:"", errorClass:"", errorMessage:""},
    drinking_duration: {required: true, value:"", errorClass:"", errorMessage:""},
    is_smoking: {required: true, value:"", errorClass:"", errorMessage:""},
    smoking_duration: {required: true, value:"", errorClass:"", errorMessage:""},
    is_low_body_weight: {required: true, value:"", errorClass:"", errorMessage:""},
    is_adequate_weight: {required: true, value:"", errorClass:"", errorMessage:""},
    prenatal_care: {required: true, value:"", errorClass:"", errorMessage:""},
    is_emotional_stress: {required: true, value:"", errorClass:"", errorMessage:""},
    is_placenta_problems: {required: true, value:"", errorClass:"", errorMessage:""},
    placenta_problems_desc: {required: true, value:"", errorClass:"", errorMessage:""},
    is_diabetic: {required: true, value:"", errorClass:"", errorMessage:""},
    is_conjestive_heart_failure: {required: true, value:"", errorClass:"", errorMessage:""},
    is_existing_infection: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
    }
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {console.log(formData[element].required);
      if(formData[element].required && (formData[element].value === "" || formData[element].value === null)){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        formData[element].errorMessage = "";
        formData[element].errorClass = "";
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const getMedicalHistory = async () => {

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["janani_account_key"]  = editAccountKey;
    jsonData["janani_account_type"] = 3;
    jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]        = DEVICE_TOKEN;
    jsonData["user_lat"]            = localStorage.getItem('latitude');
    jsonData["user_long"]           = localStorage.getItem('longitude');
    jsonData["search_param"]        = {
                                        "by_keywords": "",
                                        "limit": "2",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/jananiMedicalHistoryList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    if(result1.data.length > 0){
      let medicalHistory = result1.data[0];
      console.log(medicalHistory);

      formData['previous_pregnancy_count']    = {value:medicalHistory.previous_pregnancy_count, required: true, errorClass:"", errorMessage:""};
      formData['previous_boy_birth_count']    = {value:medicalHistory.previous_boy_birth_count, required: true, errorClass:"", errorMessage:""};
      formData['previous_girl_birth_count']   = {value:medicalHistory.previous_girl_birth_count, required: true, errorClass:"", errorMessage:""};
      formData['usg_needed']                  = {value:medicalHistory.no_of_ultrasound_needed, required: true, errorClass:"", errorMessage:""};
      formData['usg_done']                    = {value:medicalHistory.no_of_ultrasound_done, required: true, errorClass:"", errorMessage:""};
      formData['injection_needed']            = {value:medicalHistory.no_of_tt_injection_needed, required: true, errorClass:"", errorMessage:""};
      formData['injection_done']              = {value:medicalHistory.no_of_tt_injection_done, required: true, errorClass:"", errorMessage:""};
      formData['is_drinking_alcohol']         = {value:medicalHistory.is_drinking_alcohol, required: true, errorClass:"", errorMessage:""};
      formData['drinking_duration']           = {value:medicalHistory.drinking_duration_months, required: true, errorClass:"", errorMessage:""};
      formData['is_smoking']                  = {value:medicalHistory.is_smoking, required: true, errorClass:"", errorMessage:""};
      formData['smoking_duration']            = {value:medicalHistory.smoking_duration_months, required: true, errorClass:"", errorMessage:""};
      formData['is_low_body_weight']          = {value:medicalHistory.is_low_body_weight, required: true, errorClass:"", errorMessage:""};
      formData['is_adequate_weight']          = {value:medicalHistory.is_adequate_weight_gain, required: true, errorClass:"", errorMessage:""};
      formData['prenatal_care']               = {value:medicalHistory.no_prenatal_care, required: true, errorClass:"", errorMessage:""};
      formData['is_emotional_stress']         = {value:medicalHistory.is_emotional_stress, required: true, errorClass:"", errorMessage:""};
      formData['is_placenta_problems']        = {value:medicalHistory.is_placenta_problems, required: true, errorClass:"", errorMessage:""};
      formData['placenta_problems_desc']      = {value:medicalHistory.placenta_description, required: true, errorClass:"", errorMessage:""};
      formData['is_diabetic']                 = {value:medicalHistory.is_diabetic, required: true, errorClass:"", errorMessage:""};
      formData['is_conjestive_heart_failure'] = {value:medicalHistory.is_conjestive_heart_failure, required: true, errorClass:"", errorMessage:""};
      formData['is_existing_infection']       = {value:medicalHistory.is_existing_infection_done, required: true, errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});

    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getMedicalHistory();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm(); console.log(errorCounter);
    if(errorCounter === 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                     = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]         = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]        = decryptedLoginDetails.account_type;
      jsonData["sub_volunteer_id"]              = "";
      jsonData["janani_account_key"]            = editAccountKey;
      jsonData["user_login_id"]                 = decryptedLoginDetails.login_id;
      jsonData["device_type"]                   = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]                  = DEVICE_TOKEN;
      jsonData["user_lat"]                      = localStorage.getItem('latitude');
      jsonData["user_long"]                     = localStorage.getItem('longitude');

      jsonData["previous_pregnancy_count"]      = formData['previous_pregnancy_count'].value;
      jsonData["previous_boy_birth_count"]      = formData['previous_boy_birth_count'].value;
      jsonData["previous_girl_birth_count"]     = formData['previous_girl_birth_count'].value;
      jsonData["no_of_ultrasound_needed"]       = formData['usg_needed'].value;
      jsonData["no_of_ultrasound_done"]         = formData['usg_done'].value;
      jsonData["no_of_tt_injection_needed"]     = formData['injection_needed'].value;
      jsonData["no_of_tt_injection_done"]       = formData['injection_done'].value;
      jsonData["is_drinking_alcohol"]           = formData['is_drinking_alcohol'].value;
      jsonData["drinking_duration_months"]      = formData['drinking_duration'].value;
      jsonData["is_smoking"]                    = formData['is_smoking'].value;
      jsonData["smoking_duration_months"]       = formData['smoking_duration'].value;
      jsonData["is_low_body_weight"]            = formData['is_low_body_weight'].value;
      jsonData["is_adequate_weight_gain"]       = formData['is_adequate_weight'].value;
      jsonData["no_prenatal_care"]              = formData['prenatal_care'].value;
      jsonData["is_emotional_stress"]           = formData['is_emotional_stress'].value;
      jsonData["is_placenta_problems"]          = formData['is_placenta_problems'].value;
      jsonData["placenta_description"]          = formData['placenta_problems_desc'].value;
      jsonData["is_diabetic"]                   = formData['is_diabetic'].value;
      jsonData["is_conjestive_heart_failure"]   = formData['is_conjestive_heart_failure'].value;
      jsonData["is_existing_infection_done"]    = formData['is_existing_infection'].value;
      jsonData["remarks"]                       = '';

      const response = await fetch(`${API_URL}/addUpdateJananiMedicalHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      console.log(response)
      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
    }
  }

  const getUserBasicDetails = async () => {
          
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 33;
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
              <Link to="/janani" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Update Medical History </h5>
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
      <div className='app-body form-all update-medical-history'>
        <p className='patient-details'>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        {/* <p><small>Update Janani Medical History</small></p> */}
        <p><strong>Update Pregnancy Related Informations:</strong></p>
        <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["previous_pregnancy_count"].errorClass}`}>
            <label htmlFor="previous_pregnancy_count"><span className="d-block">Previous Pregnancy Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_pregnancy_count" placeholder="Previous Pregnancy Count" onChange={handleChange} value={formData["previous_pregnancy_count"].value ? formData["previous_pregnancy_count"].value : ''} />
            <small className="error-mesg">{formData["previous_pregnancy_count"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_boy_birth_count"].errorClass}`}>
            <label htmlFor="previous_boy_birth_count"><span className="d-block">Previous Boy Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_boy_birth_count" placeholder="Previous Boy Birth Count" onChange={handleChange} value={formData["previous_boy_birth_count"].value ? formData["previous_boy_birth_count"].value : ''} />
            <small className="error-mesg">{formData["previous_boy_birth_count"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_girl_birth_count"].errorClass}`}>
            <label htmlFor="previous_girl_birth_count"><span className="d-block">Previous Girl Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_girl_birth_count" placeholder="Previous Girl Birth Count" onChange={handleChange} value={formData["previous_girl_birth_count"].value ? formData["previous_girl_birth_count"].value : ''} />
            <small className="error-mesg">{formData["previous_girl_birth_count"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["usg_needed"].errorClass}`}>
            <label htmlFor="usg_needed"><span className="d-block">No. of Ultrasound(USG) Needed <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="usg_needed" placeholder="No. of Ultrasound(USG) Needed" onChange={handleChange} value={formData["usg_needed"].value ? formData["usg_needed"].value : ''} />
            <small className="error-mesg">{formData["usg_needed"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["usg_done"].errorClass}`}>
            <label htmlFor="usg_done"><span className="d-block">No. of Ultrasound(USG) Done <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="usg_done" placeholder="No. of Ultrasound(USG) Done" onChange={handleChange} value={formData["usg_done"].value ? formData["usg_done"].value : ''} />
            <small className="error-mesg">{formData["usg_done"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["injection_needed"].errorClass}`}>
            <label htmlFor="injection_needed"><span className="d-block">No. of TT Injection Needed <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="injection_needed" placeholder="No. of TT Injection Needed" onChange={handleChange} value={formData["injection_needed"].value ? formData["injection_needed"].value : ''} />
            <small className="error-mesg">{formData["injection_needed"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["injection_done"].errorClass}`}>
            <label htmlFor="injection_done"><span className="d-block">No. of TT Injection Done <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="injection_done" placeholder="No. of TT Injection Done"  onChange={handleChange} value={formData["injection_done"].value ? formData["injection_done"].value : ''} />
            <small className="error-mesg">{formData["injection_done"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_drinking_alcohol"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Drinking Alcohol? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_y" name="is_drinking_alcohol" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_drinking_alcohol"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_n" name="is_drinking_alcohol" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_drinking_alcohol"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_drinking_alcohol"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["drinking_duration"].errorClass}`}>
            <label htmlFor="drinking_duration"><span className="d-block">Drinking Duration in Months <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="drinking_duration" placeholder="Drinking Duration in Months"  onChange={handleChange} value={formData["drinking_duration"].value ? formData["drinking_duration"].value : ''} />
            <small className="error-mesg">{formData["drinking_duration"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_smoking"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Smoking? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_y" name="is_smoking" className="custom-control-input" value="yes"  onChange={handleChange} checked={(formData["is_smoking"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="smoking_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_n" name="is_smoking" className="custom-control-input" value="no"   onChange={handleChange} checked={(formData["is_smoking"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="smoking_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_smoking"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["smoking_duration"].errorClass}`}>
            <label htmlFor="smoking_duration"><span className="d-block">Smoking Duration in Months <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="smoking_duration" placeholder="Smoking Duration in Months"   onChange={handleChange} value={formData["smoking_duration"].value ? formData["smoking_duration"].value : ''} />
            <small className="error-mesg">{formData["smoking_duration"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_low_body_weight"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Low Body Weight? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_y" name="is_low_body_weight" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_low_body_weight"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="low_body_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_n" name="is_low_body_weight" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_low_body_weight"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="low_body_weight_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_low_body_weight"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_adequate_weight"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Adequate Weight Gain? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_y" name="is_adequate_weight" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_adequate_weight"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="adequate_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_n" name="is_adequate_weight" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_adequate_weight"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="adequate_weight_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_adequate_weight"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["prenatal_care"].errorClass}`}>
            <label className="no-style"><span className="d-block">No Prenatal Care <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_y" name="prenatal_care" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["prenatal_care"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="prenatal_care_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_n" name="prenatal_care" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["prenatal_care"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="prenatal_care_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["prenatal_care"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["is_emotional_stress"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Emotional Stress? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_y" name="is_emotional_stress" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_emotional_stress"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="emotional_stress_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_n" name="is_emotional_stress" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_emotional_stress"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="emotional_stress_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_emotional_stress"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_placenta_problems"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Placenta Problems? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_y" name="is_placenta_problems" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_placenta_problems"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="placenta_problems_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_n" name="is_placenta_problems" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_placenta_problems"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="placenta_problems_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_placenta_problems"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["placenta_problems_desc"].errorClass}`}>
            <label htmlFor="placenta_problems_desc"><span className="d-block">Placenta Problems Desc <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="placenta_problems_desc" placeholder="Placenta Problems Desc"  onChange={handleChange} value={formData["placenta_problems_desc"].value ? formData["placenta_problems_desc"].value : ''} />
            <small className="error-mesg">{formData["placenta_problems_desc"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_diabetic"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Diabetic? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="is_diabetic" className="custom-control-input" value="yes"  onChange={handleChange} checked={(formData["is_diabetic"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="is_diabetic" className="custom-control-input" value="no"/>
                <label className="custom-control-label no-style" htmlFor="diabetic_n" onChange={handleChange} checked={(formData["is_diabetic"].value === 'no') ? true : false} >No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_diabetic"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_conjestive_heart_failure"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Conjestive Heart Failure? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_y" name="is_conjestive_heart_failure" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_conjestive_heart_failure"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_n" name="is_conjestive_heart_failure" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_conjestive_heart_failure"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_conjestive_heart_failure"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["is_existing_infection"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is Existing Infection Done? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_y" name="is_existing_infection" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["is_existing_infection"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="existing_infection_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_n" name="is_existing_infection" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["is_existing_infection"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="existing_infection_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_existing_infection"].errorMessage}</small>
          </div>

          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default JananiMedicalHistory;