import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import SliderRating from '../SliderRating';
import AppTopNotifications from '../AppTopNotifications';

function ElderAwarenessSuevey(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

  const [urlParam, setUrlParam] = useState(useParams());
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const editAccountKey = urlParam.accountKey;
  
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    question_1_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_2_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_3_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_4_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_5_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_6_value: {required: false, value:0, errorClass:"", errorMessage:""},
    question_7_value: {required: false, value:0, errorClass:"", errorMessage:""},
    remarks: {required: false, value:"", errorClass:"", errorMessage:""}
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
      jsonData["elder_account_key"]         = editAccountKey;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["sub_volunteer_id"]          = "";
  
      jsonData["question_1_value"]                = formData['question_1_value'].value;
      jsonData["question_2_value"]                = formData['question_2_value'].value;
      jsonData["question_3_value"]                = formData['question_3_value'].value;
      jsonData["question_4_value"]                = formData['question_4_value'].value;
      jsonData["question_5_value"]                = formData['question_5_value'].value;
      jsonData["question_6_value"]                = formData['question_6_value'].value;
      jsonData["question_7_value"]                = formData['question_7_value'].value;
      jsonData["remarks"]                         = formData['remarks'].value;
      
      
      const response = await fetch(`${API_URL}/addUpdateElderHealthAwarenessSurvey`, {
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
      jsonData["elder_account_key"]   = editAccountKey;
      jsonData["elder_account_type"]  = 3;
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
      
      const response1 = await fetch(`${API_URL}/elderHealthAwarenessSurveyList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result1     = await response1.json();
  
      if(result1.data.length > 0){
        let userDetails = result1.data[0];
        
        formData['question_1_value']      = {value:userDetails.question_1_value, errorClass:"", errorMessage:""};
        formData['question_2_value']      = {value:userDetails.question_2_value, errorClass:"", errorMessage:""};
        formData['question_3_value']      = {value:userDetails.question_3_value, errorClass:"", errorMessage:""};
        formData['question_4_value']      = {value:userDetails.question_4_value, errorClass:"", errorMessage:""};
        formData['question_5_value']      = {value:userDetails.question_5_value, errorClass:"", errorMessage:""};
        formData['question_6_value']      = {value:userDetails.question_6_value, errorClass:"", errorMessage:""};
        formData['question_7_value']      = {value:userDetails.question_7_value, errorClass:"", errorMessage:""};
        formData['remarks']               = {value:userDetails.remarks, errorClass:"", errorMessage:""};
        
        setFormData({...formData, ...formData});
  
      }
  
    }
  
    useEffect(() => {
  
      if(systemContext.systemDetails.system_id){
        getUserDetails();
      }
  
      // eslint-disable-next-line
      
    }, [systemContext.systemDetails.system_id]);

  const getUserBasicDetails = async () => {
            
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 34;
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
            <Link to="/elder-persons" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>Update Awareness Survey</h5>
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
    <div className='app-body form-all update-awareness-survey'>
      <p>
          {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
      </p>
      <p><strong>Health Awareness Survey</strong></p>
      <p>How knowledgeable do you feel about the following areas of elder person's health</p>
      <form name="awareness_survey_form" id="awareness_survey_form" onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label>1. Menstruation Cycle - why and how it happens? </label>
            <SliderRating initialRating={formData['question_1_value'].value} onChange={(value)=>handleRatingChange(value, 'question_1_value')}  />
          </div>
          <div className='form-group'>
            <label>2. Menstruation Hygiene - methods available including, pads, cups, etc. </label>
            <SliderRating initialRating={formData['question_2_value'].value} onChange={(value)=>handleRatingChange(value, 'question_2_value')} />
          </div>
          <div className='form-group'>
            <label>3. General cleanliness and regular washing </label>
            <SliderRating initialRating={formData['question_3_value'].value} onChange={(value)=>handleRatingChange(value, 'question_3_value')} />
          </div>
          <div className='form-group'>
            <label>4. Iron and blood loss due to menstruation,  Anemia and treatments </label>
            <SliderRating initialRating={formData['question_4_value'].value} onChange={(value)=>handleRatingChange(value, 'question_4_value')} />
          </div>
          <div className='form-group'>
            <label>5. Nutrition choices for young women's health </label>
            <SliderRating initialRating={formData['question_5_value'].value} onChange={(value)=>handleRatingChange(value, 'question_5_value')} />
          </div>
          <div className='form-group'>
            <label>6. Pregnancy prevention </label>
            <SliderRating initialRating={formData['question_6_value'].value} onChange={(value)=>handleRatingChange(value, 'question_6_value')} />
          </div>
          <div className='form-group'>
            <label>7. Resources available from ASHA workers, community </label>
            <SliderRating initialRating={formData['question_7_value'].value} onChange={(value)=>handleRatingChange(value, 'question_7_value')} />
          </div>
          <div className='form-group'>
            <label>8. Any other areas you would like further education and support (write)</label>
            <textarea name="remarks" rows="3" className="form-control pt-5" placeholder="" onChange={handleChange} defaultValue={formData['remarks'].value}></textarea>
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

export default ElderAwarenessSuevey;