import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import SliderRating from '../SliderRating';

import './UpdateAwarenessSurvey.css'

function UpdateAwarenessSurvey(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    menstruation_cycle_value: {required: false, value:0, errorClass:"", errorMessage:""},
    menstruation_hygiene_value: {required: false, value:0, errorClass:"", errorMessage:""},
    general_cleanliness_value: {required: false, value:0, errorClass:"", errorMessage:""},
    iron_blood_menstruation_value: {required: false, value:0, errorClass:"", errorMessage:""},
    nutrition_choices_value: {required: false, value:0, errorClass:"", errorMessage:""},
    pregnancy_prevention_value: {required: false, value:0, errorClass:"", errorMessage:""},
    resources_available_value: {required: false, value:0, errorClass:"", errorMessage:""},
    education_support_remarks: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  const handleRatingChange = (value, name) => {
    setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
    console.log('Rating changed:', value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["woman_account_key"]         = editAccountKey;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["sub_volunteer_id"]          = "";

    jsonData["menstruation_cycle_value"]        = formData['menstruation_cycle_value'].value;
    jsonData["menstruation_hygiene_value"]      = formData['menstruation_hygiene_value'].value;
    jsonData["general_cleanliness_value"]       = formData['general_cleanliness_value'].value;
    jsonData["iron_blood_menstruation_value"]   = formData['iron_blood_menstruation_value'].value;
    jsonData["nutrition_choices_value"]         = formData['nutrition_choices_value'].value;
    jsonData["pregnancy_prevention_value"]      = formData['pregnancy_prevention_value'].value;
    jsonData["resources_available_value"]       = formData['resources_available_value'].value;
    jsonData["education_support_remarks"]       = formData['education_support_remarks'].value;
    
    
    const response = await fetch(`${API_URL}/addUpdateWomanHealthAwarenessSurveyCI`, {
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

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["woman_account_key"]   = editAccountKey;
    jsonData["woman_account_type"]  = 3;
    jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]        = DEVICE_TOKEN;
    jsonData["user_lat"]            = localStorage.getItem('latitude');
    jsonData["user_long"]           = localStorage.getItem('longitude');
    jsonData["search_param"]        = {
                                        "by_keywords": "test",
                                        "limit": "2",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/womanHealthAwarenessSurveyList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1     = await response1.json();

    if(result1.data.length > 0){
      let userDetails = result1.data[0];
      
      formData['menstruation_cycle_value']      = {value:userDetails.menstruation_cycle_value, errorClass:"", errorMessage:""};
      formData['menstruation_hygiene_value']    = {value:userDetails.menstruation_hygiene_value, errorClass:"", errorMessage:""};
      formData['general_cleanliness_value']     = {value:userDetails.general_cleanliness_value, errorClass:"", errorMessage:""};
      formData['iron_blood_menstruation_value'] = {value:userDetails.iron_blood_menstruation_value, errorClass:"", errorMessage:""};
      formData['nutrition_choices_value']       = {value:userDetails.nutrition_choices_value, errorClass:"", errorMessage:""};
      formData['pregnancy_prevention_value']    = {value:userDetails.pregnancy_prevention_value, errorClass:"", errorMessage:""};
      formData['resources_available_value']     = {value:userDetails.resources_available_value, errorClass:"", errorMessage:""};
      formData['education_support_remarks']     = {value:userDetails.education_support_remarks, errorClass:"", errorMessage:""};
      
      setFormData({...formData, ...formData});

    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);

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
            <h5 className='mx-2 mb-0'>Update Awareness Survey </h5>
          </div>
          <div className='app-top-right d-flex'> 
            <div className='position-relative'>
              <Link to="/notifications">
              <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
              <span className='top-header-notification primary-bg-color'>3</span>
              </Link>
            </div> 
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
      <div className='app-body form-all update-awareness-survey'>
        <p><strong>Health Awareness Survey</strong></p>
        <p>How knowledgeable do you feel about the following areas of young women's health</p>
        <form name="awareness_survey_form" id="awareness_survey_form" onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label>1. Menstruation Cycle - why and how it happens? </label>
            <SliderRating initialRating={formData['menstruation_cycle_value'].value} onChange={(value)=>handleRatingChange(value, 'menstruation_cycle_value')} />
          </div>
          <div className='form-group'>
            <label>2. Menstruation Hygiene - methods available including, pads, cups, etc. </label>
            <SliderRating initialRating={formData['menstruation_hygiene_value'].value} onChange={(value)=>handleRatingChange(value, 'menstruation_hygiene_value')} />
          </div>
          <div className='form-group'>
            <label>3. General cleanliness and regular washing </label>
            <SliderRating initialRating={formData['general_cleanliness_value'].value} onChange={(value)=>handleRatingChange(value, 'general_cleanliness_value')} />
          </div>
          <div className='form-group'>
            <label>4. Iron and blood loss due to menstruation,  Anemia and treatments </label>
            <SliderRating initialRating={formData['iron_blood_menstruation_value'].value} onChange={(value)=>handleRatingChange(value, 'iron_blood_menstruation_value')} />
          </div>
          <div className='form-group'>
            <label>5. Nutrition choices for young women's health </label>
            <SliderRating initialRating={formData['nutrition_choices_value'].value} onChange={(value)=>handleRatingChange(value, 'nutrition_choices_value')} />
          </div>
          <div className='form-group'>
            <label>6. Pregnancy prevention </label>
            <SliderRating initialRating={formData['pregnancy_prevention_value'].value} onChange={(value)=>handleRatingChange(value, 'pregnancy_prevention_value')} />
          </div>
          <div className='form-group'>
            <label>7. Resources available from ASHA workers, community </label>
            <SliderRating initialRating={formData['resources_available_value'].value} onChange={(value)=>handleRatingChange(value, 'resources_available_value')} />
          </div>
          <div className='form-group'>
            <label>8. Any other areas you would like further education and support (write)</label>
            <textarea name="education_support_remarks" rows="3" className="form-control pt-5" placeholder="" onChange={handleChange} defaultValue={formData['education_support_remarks'].value}></textarea>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Submit</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default UpdateAwarenessSurvey;