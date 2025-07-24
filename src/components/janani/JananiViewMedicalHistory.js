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

function JananiViewMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const editAccountKey = urlParam.accountKey;

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

  const getMedicalHistory = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["janani_account_key"]  = editAccountKey;
    jsonData["janani_account_type"] = 3;
    jsonData["doctor_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"] = decryptedLoginDetails.account_type;
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

  const getUserBasicDetails = async () => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 33;
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
              <Link to="/janani" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>View Janani Medical History </h5>
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
        <p><small>View Janani Medical History</small></p>
        <p className='patient-details'>
          {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm">
          <div className={`form-group`}>
            <label htmlFor="previous_pregnancy_count"><span className="d-block">Previous Pregnancy Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_pregnancy_count" placeholder="Previous Pregnancy Count" value={formData["previous_pregnancy_count"].value ? formData["previous_pregnancy_count"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="previous_boy_birth_count"><span className="d-block">Previous Boy Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_boy_birth_count" placeholder="Previous Boy Birth Count" value={formData["previous_boy_birth_count"].value ? formData["previous_boy_birth_count"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="previous_girl_birth_count"><span className="d-block">Previous Girl Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_girl_birth_count" placeholder="Previous Girl Birth Count" value={formData["previous_girl_birth_count"].value ? formData["previous_girl_birth_count"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="usg_needed"><span className="d-block">No. of Ultrasound(USG) Needed <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="usg_needed" placeholder="No. of Ultrasound(USG) Needed" value={formData["usg_needed"].value ? formData["usg_needed"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="usg_done"><span className="d-block">No. of Ultrasound(USG) Done <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="usg_done" placeholder="No. of Ultrasound(USG) Done" value={formData["usg_done"].value ? formData["usg_done"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="injection_needed"><span className="d-block">No. of TT Injection Needed <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="injection_needed" placeholder="No. of TT Injection Needed" value={formData["injection_needed"].value ? formData["injection_needed"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="injection_done"><span className="d-block">No. of TT Injection Done <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="injection_done" placeholder="No. of TT Injection Done"  value={formData["injection_done"].value ? formData["injection_done"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Drinking Alcohol? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_y" name="is_drinking_alcohol" className="custom-control-input" value="yes" checked={(formData["is_drinking_alcohol"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_n" name="is_drinking_alcohol" className="custom-control-input" value="no" checked={(formData["is_drinking_alcohol"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_drinking_alcohol"].errorMessage}</small>
          </div>
          <div className={`form-group`}>
            <label htmlFor="drinking_duration"><span className="d-block">Drinking Duration in Months <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="drinking_duration" placeholder="Drinking Duration in Months" value={formData["drinking_duration"].value ? formData["drinking_duration"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Smoking? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_y" name="is_smoking" className="custom-control-input" value="yes" checked={(formData["is_smoking"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="smoking_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_n" name="is_smoking" className="custom-control-input" value="no"  checked={(formData["is_smoking"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="smoking_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label htmlFor="smoking_duration"><span className="d-block">Smoking Duration in Months<span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="smoking_duration" placeholder="Smoking Duration in Months"  value={formData["smoking_duration"].value ? formData["smoking_duration"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Low Body Weight? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_y" name="is_low_body_weight" className="custom-control-input" value="yes" checked={(formData["is_low_body_weight"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="low_body_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_n" name="is_low_body_weight" className="custom-control-input" value="no" checked={(formData["is_low_body_weight"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="low_body_weight_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Adequate Weight Gain? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_y" name="is_adequate_weight" className="custom-control-input" value="yes" checked={(formData["is_adequate_weight"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="adequate_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_n" name="is_adequate_weight" className="custom-control-input" value="no" checked={(formData["is_adequate_weight"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="adequate_weight_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">No Prenatal Care <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_y" name="prenatal_care" className="custom-control-input" value="yes" checked={(formData["prenatal_care"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="prenatal_care_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_n" name="prenatal_care" className="custom-control-input" value="no" checked={(formData["prenatal_care"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="prenatal_care_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Emotional Stress? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_y" name="is_emotional_stress" className="custom-control-input" value="yes" checked={(formData["is_emotional_stress"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="emotional_stress_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_n" name="is_emotional_stress" className="custom-control-input" value="no" checked={(formData["is_emotional_stress"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="emotional_stress_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Placenta Problems? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_y" name="is_placenta_problems" className="custom-control-input" value="yes" checked={(formData["is_placenta_problems"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="placenta_problems_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_n" name="is_placenta_problems" className="custom-control-input" value="no" checked={(formData["is_placenta_problems"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="placenta_problems_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label htmlFor="placenta_problems_desc"><span className="d-block">Placenta Problems Desc <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="placenta_problems_desc" placeholder="Placenta Problems Desc"  value={formData["placenta_problems_desc"].value ? formData["placenta_problems_desc"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Diabetic? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="is_diabetic" className="custom-control-input" value="yes" checked={(formData["is_diabetic"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="is_diabetic" className="custom-control-input" value="no"/>
                <label className="custom-control-label no-style" htmlFor="diabetic_n" checked={(formData["is_diabetic"].value === 'no') ? true : false} >No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Conjestive Heart Failure? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_y" name="is_conjestive_heart_failure" className="custom-control-input" value="yes" checked={(formData["is_conjestive_heart_failure"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_n" name="is_conjestive_heart_failure" className="custom-control-input" value="no" checked={(formData["is_conjestive_heart_failure"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is Existing Infection Done? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_y" name="is_existing_infection" className="custom-control-input" value="yes" checked={(formData["is_existing_infection"].value === 'yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="existing_infection_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_n" name="is_existing_infection" className="custom-control-input" value="no" checked={(formData["is_existing_infection"].value === 'no') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="existing_infection_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_existing_infection"].errorMessage}</small>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default JananiViewMedicalHistory;