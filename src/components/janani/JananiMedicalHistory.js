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

function JananiMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    eye_type: {required: true, value:"", errorClass:"", errorMessage:""},
    ears_type: {required: true, value:"", errorClass:"", errorMessage:""},
    nose_type: {required: true, value:"", errorClass:"", errorMessage:""},
    mouth_type: {required: true, value:"", errorClass:"", errorMessage:""},
    digestive_system_type: {required: true, value:"", errorClass:"", errorMessage:""},
    general_type: {required: true, value:"", errorClass:"", errorMessage:""},
    urinary_problems_type: {required: true, value:"", errorClass:"", errorMessage:""},
    periods_type: {required: true, value:"", errorClass:"", errorMessage:""},
    remarks: {required: false, value:"", errorClass:"", errorMessage:""}
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

  // const getMedicalHistory = async () => {

  //   let jsonData = {};

  //   jsonData['system_id']           = systemContext.systemDetails.system_id;
  //   jsonData["janani_account_key"]  = editAccountKey;
  //   jsonData["janani_account_type"] = 3;
  //   jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
  //   jsonData["device_token"]        = DEVICE_TOKEN;
  //   jsonData["user_lat"]            = localStorage.getItem('latitude');
  //   jsonData["user_long"]           = localStorage.getItem('longitude');
  //   jsonData["search_param"]        = {
  //                                       "by_keywords": "",
  //                                       "limit": "2",
  //                                       "offset": "0",
  //                                       "order_by_field": "account_id",
  //                                       "order_by_value": "desc"
  //                                     }
    
  //   const response1 = await fetch(`${API_URL}/jananiMedicalHistoryList`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(jsonData),
  //   });
  //   let result1 = await response1.json();

  //   if(result1.data.length > 0){
  //     let medicalHistory = result1.data[0];
  //     console.log(medicalHistory);

  //     formData['eye_type']      = {value:medicalHistory.eye_type, required: true, errorClass:"", errorMessage:""};
  //     formData['ears_type']     = {value:medicalHistory.ears_type, required: true, errorClass:"", errorMessage:""};
  //     formData['nose_type']     = {value:medicalHistory.nose_type, required: true, errorClass:"", errorMessage:""};
  //     formData['mouth_type']    = {value:medicalHistory.mouth_type, required: true, errorClass:"", errorMessage:""};
  //     formData['digestive_system_type'] = {value:medicalHistory.digestive_system_type, required: true, errorClass:"", errorMessage:""};
  //     formData['general_type']  = {value:medicalHistory.general_type, required: true, errorClass:"", errorMessage:""};
  //     formData['urinary_problems_type'] = {value:medicalHistory.urinary_problems_type, required: true, errorClass:"", errorMessage:""};
  //     formData['periods_type']  = {value:medicalHistory.periods_type, required: true, errorClass:"", errorMessage:""};
  //     formData['remarks']   = {value:medicalHistory.remarks, required: false, errorClass:"", errorMessage:""};

  //     setFormData({...formData, ...formData});

  //   }

  // }

  // useEffect(() => {

  //   if(systemContext.systemDetails.system_id){
  //     getMedicalHistory();
  //   }

  //   // eslint-disable-next-line
    
  // }, [systemContext.systemDetails.system_id]);


  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm(); console.log(errorCounter);
    if(errorCounter === 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["sub_volunteer_id"]          = "";
      jsonData["janani_account_key"]        = editAccountKey;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');

      jsonData["eye_type"]                  = formData['eye_type'].value;
      jsonData["ears_type"]                 = formData['ears_type'].value;
      jsonData["nose_type"]                 = formData['nose_type'].value;
      jsonData["mouth_type"]                = formData['mouth_type'].value;
      jsonData["digestive_system_type"]     = formData['digestive_system_type'].value;
      jsonData["general_type"]              = formData['general_type'].value;
      jsonData["urinary_problems_type"]     = formData['urinary_problems_type'].value;
      jsonData["periods_type"]              = formData['periods_type'].value;
      jsonData["remarks"]                   = formData['remarks'].value;

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
            <h5 className='mx-2 mb-0'>Update Medical History </h5>
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
      <div className='app-body form-all update-medical-history'>
        <p><small>Update Janani Medical History</small></p>
        <p><strong>Update Pregnancy Related Informations:</strong></p>
        <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="previous_pregnancy_count"><span className="d-block">Previous Pregnancy Count <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="previous_pregnancy_count" placeholder="Previous Pregnancy Count" />
          </div>
          <div className="form-group">
            <label htmlFor="previous_boy_birth_count"><span className="d-block">Previous Boy Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="previous_boy_birth_count" placeholder="Previous Boy Birth Count" />
          </div>
          <div className="form-group">
            <label htmlFor="previous_girl_birth_count"><span className="d-block">Previous Girl Birth Count <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="previous_girl_birth_count" placeholder="Previous Girl Birth Count" />
          </div>
          <div className="form-group">
            <label htmlFor="usg_needed"><span className="d-block">No. of Ultrasound(USG) Needed <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="usg_needed" placeholder="No. of Ultrasound(USG) Needed" />
          </div>
          <div className="form-group">
            <label htmlFor="usg_done"><span className="d-block">No. of Ultrasound(USG) Done <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="usg_done" placeholder="No. of Ultrasound(USG) Done" />
          </div>
          <div className="form-group">
            <label htmlFor="injection_needed"><span className="d-block">No. of TT Injection Needed <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="injection_needed" placeholder="No. of TT Injection Needed" />
          </div>
          <div className="form-group">
            <label htmlFor="injection_done"><span className="d-block">No. of TT Injection Done <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="injection_done" placeholder="No. of TT Injection Done" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Drinking Alcohol? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_y" name="is_drinking_alcohol" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drinking_alcohol_n" name="is_drinking_alcohol" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="drinking_alcohol_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="drinking_duration"><span className="d-block">Drinking Duration in Months <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="drinking_duration" placeholder="Drinking Duration in Months" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Smoking? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_y" name="is_smoking" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="smoking_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoking_n" name="is_smoking" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="smoking_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="smoking_duration"><span className="d-block">Smoking Duration in Months<span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="smoking_duration" placeholder="Smoking Duration in Months" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Low Body Weight? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_y" name="is_low_body_weight" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="low_body_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="low_body_weight_n" name="is_low_body_weight" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="low_body_weight_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Adequate Weight Gain? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_y" name="is_adequate_weight" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="adequate_weight_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="adequate_weight_n" name="is_adequate_weight" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="adequate_weight_n">No</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="no-style"><span className="d-block">No Prenatal Care <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_y" name="prenatal_care" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="prenatal_care_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="prenatal_care_n" name="prenatal_care" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="prenatal_care_n">No</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Emotional Stress? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_y" name="is_emotional_stress" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="emotional_stress_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="emotional_stress_n" name="is_emotional_stress" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="emotional_stress_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Placenta Problems? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_y" name="is_placenta_problems" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="placenta_problems_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="placenta_problems_n" name="is_placenta_problems" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="placenta_problems_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="drinking_duration"><span className="d-block">Placenta Problems Desc <span className="text-danger">*</span></span></label>
            <input type="text" class="form-control" name="drinking_duration" placeholder="Placenta Problems Desc" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Diabetic? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="is_diabetic" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="is_diabetic" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="diabetic_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Conjestive Heart Failure? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_y" name="is_conjestive_heart_failure" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="conjestive_heart_failure_n" name="is_conjestive_heart_failure" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="conjestive_heart_failure_n">No</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="no-style"><span className="d-block">Is Existing Infection Done? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_y" name="is_existing_infection" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="existing_infection_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="existing_infection_n" name="is_existing_infection" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="existing_infection_n">No</label>
              </div>
            </div>
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