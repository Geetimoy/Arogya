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
            <SliderRating onChange={(value)=>handleRatingChange(value, 'menstruation_cycle_value')} />
          </div>
          <div className='form-group'>
            <label>2. Menstruation Hygiene - methods available including, pads, cups, etc. </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'menstruation_hygiene_value')} />
          </div>
          <div className='form-group'>
            <label>3. General cleanliness and regular washing </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'general_cleanliness_value')} />
          </div>
          <div className='form-group'>
            <label>4. Iron and blood loss due to menstruation,  Anemia and treatments </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'iron_blood_menstruation_value')} />
          </div>
          <div className='form-group'>
            <label>5. Nutrition choices for young women's health </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'nutrition_choices_value')} />
          </div>
          <div className='form-group'>
            <label>6. Pregnancy prevention </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'pregnancy_prevention_value')} />
          </div>
          <div className='form-group'>
            <label>7. Resources available from ASHA workers, community </label>
            <SliderRating onChange={(value)=>handleRatingChange(value, 'resources_available_value')} />
          </div>
          <div className='form-group'>
            <label>8. Any other areas you would like further education and support (write)</label>
            <textarea name="education_support_remarks" rows="3" className="form-control" placeholder="" onChange={handleChange}></textarea>
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