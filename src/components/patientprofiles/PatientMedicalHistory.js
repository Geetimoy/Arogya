import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { Link, useParams } from "react-router-dom";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

function PatientMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const [formData, setFormData] = useState({
    eye_type: {required: true, value:"", errorClass:"", errorMessage:""},
    ears_type: {required: true, value:"", errorClass:"", errorMessage:""},
    nose_type: {required: true, value:"", errorClass:"", errorMessage:""},
    mouth_type: {required: true, value:"", errorClass:"", errorMessage:""},
    digestive_system_type: {required: true, value:"", errorClass:"", errorMessage:""},
    general_type: {required: true, value:"", errorClass:"", errorMessage:""},
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
    fieldName.forEach((element) => {console.log(element, formData[element].value);
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

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const getMedicalHistory = async () => {

    let jsonData = {};

    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["patient_account_key"]   = editAccountKey;
    jsonData["patient_account_type"]  = 3;
    jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]          = DEVICE_TOKEN;
    jsonData["user_lat"]              = localStorage.getItem('latitude');
    jsonData["user_long"]             = localStorage.getItem('longitude');
    jsonData["search_param"]          = {
                                          "by_keywords": "",
                                          "limit": "2",
                                          "offset": "0",
                                          "order_by_field": "account_id",
                                          "order_by_value": "desc"
                                        }
    
    const response1 = await fetch(`${API_URL}/patientMedicalHistoryList`, {
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

      formData['eye_type']      = {value:medicalHistory.eye_type, required: true, errorClass:"", errorMessage:""};
      formData['ears_type']     = {value:medicalHistory.ears_type, required: true, errorClass:"", errorMessage:""};
      formData['nose_type']     = {value:medicalHistory.nose_type, required: true, errorClass:"", errorMessage:""};
      formData['mouth_type']    = {value:medicalHistory.mouth_type, required: true, errorClass:"", errorMessage:""};
      formData['digestive_system_type'] = {value:medicalHistory.digestive_system_type, required: true, errorClass:"", errorMessage:""};
      formData['general_type']  = {value:medicalHistory.general_type, required: true, errorClass:"", errorMessage:""};
      formData['remarks']   = {value:medicalHistory.remarks, required: false, errorClass:"", errorMessage:""};

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
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["sub_volunteer_id"]          = "";
      jsonData["patient_account_key"]       = editAccountKey;
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
      jsonData["remarks"]                   = formData['remarks'].value;

      const response = await fetch(`${API_URL}/addUpdatePatientMedicalHistory`, {
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
              <Link to="/patientprofiles" className=''>
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
      <div className='app-body form-all create-young-woman'>
        <p><small>Update Patient Medical History</small></p>
        <p><strong>Do you have these problems?</strong></p>
        <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm" onSubmit={handleFormSubmit}>
          {/* <div className={`form-group ${formData["eye_type"].errorClass}`}>
            <label><span className="d-block">Eye <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["eye_type"].value ? formData["eye_type"].value : ''} name="eye_type" id="eye_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Dimness of Vision</option>
              <option value="2">Eye Pain</option>
              <option value="3">Eye Redness</option>
              <option value="4">Watery Eyes</option>
            </select>
            <small className="error-mesg">{formData["eye_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["ears_type"].errorClass}`}>
            <label><span className="d-block">Ears <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["ears_type"].value ? formData["ears_type"].value : ''} name="ears_type" id="ears_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Hearing Loss</option>
              <option value="2">Water or pus from the ear</option>
            </select>
            <small className="error-mesg">{formData["ears_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["nose_type"].errorClass}`}>
            <label><span className="d-block">Nose <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["nose_type"].value ? formData["nose_type"].value : ''} name="nose_type" id="nose_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Stuffy Nose</option>
              <option value="2">Runny or watery nose</option>
              <option value="3">Bleeding from the nose</option>
            </select>
            <small className="error-mesg">{formData["nose_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["mouth_type"].errorClass}`}>
            <label><span className="d-block">Mouth <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["mouth_type"].value ? formData["mouth_type"].value : ''} name="mouth_type" id="mouth_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Difficulty in Swallowing</option>
              <option value="2">Carries Tooth (cavity etc.)</option>
              <option value="3">Sores on gums</option>
            </select>
            <small className="error-mesg">{formData["mouth_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["digestive_system_type"].errorClass}`}>
            <label><span className="d-block">Digestive system <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["digestive_system_type"].value ? formData["digestive_system_type"].value : ''} name="digestive_system_type" id="digestive_system_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Loss of Appetite</option>
              <option value="2">Nausia/vomiting</option>
              <option value="3">Diarrhea</option>
              <option value="4">Constipation</option>
              <option value="5">Abdominal (stomach) pain</option>
              <option value="6">Blood with stool.</option>
            </select>
            <small className="error-mesg">{formData["digestive_system_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["general_type"].errorClass}`}>
            <label><span className="d-block">General <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["general_type"].value ? formData["general_type"].value : ''} name="general_type" id="general_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">None</option>
              <option value="1">Cough - dry/productive?</option>
              <option value="2">Shortness of breath</option>
              <option value="3">Sound while breathing(whezzing)</option>
            </select>
            <small className="error-mesg">{formData["general_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["remarks"].errorClass}`}>
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" onChange={handleChange} value={formData["remarks"].value}></textarea>
            <small className="error-mesg">{formData["remarks"].errorMessage}</small>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div> */}
          <div className='form-group'>
            <label><span className="d-block">User ID  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="user_id" id="user_id" placeholder="User ID"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">User Name  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="user_name" id="user_name" placeholder="User Name"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any drug allergy  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="drug_allergy" id="drug_allergy" placeholder="Any drug allergy"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any previous illness  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_illness" id="previous_illness" placeholder="Any previous illness"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any operation  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="operation" id="operation" placeholder="Any operation"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any previous or recent Medications  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="medications" id="medications" placeholder="Any previous or recent Medications"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Any other medical record  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="medical_record" id="medical_record" placeholder="Any other medical record"/>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Excercise?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_y" name="excercise" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="excercise_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_n" name="excercise" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="excercise_n">No</label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Smoke?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_y" name="smoke" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="smoke_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_n" name="smoke" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="smoke_n">No</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you Drug Allergy?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drug_allergy_y" name="drug" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drug_allergy_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drug_allergy_n" name="drug" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drug_allergy_n">No</label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Drink Alcohol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_y" name="drink_alcohol" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_n" name="drink_alcohol" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_n">No</label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Drink Caffeine?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_y" name="drink_caffeine" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_n" name="drink_caffeine" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_n">No</label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you Diet?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_y" name="diet" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="diet_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_n" name="diet" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="diet_n">No</label>
              </div>
            </div>
          </div>


          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Current Medication?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_y" name="current_medicationtic" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="current_medication_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_n" name="current_medication" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="current_medication_n">No</label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Diabetic?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="diabetic" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="diabetic" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="diabetic_n">No</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Pressure?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_h" name="pressure" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="pressure_h">High</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_l" name="pressure" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="pressure_l">Low</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_n" name="pressure" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="pressure_n">Normal</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Cholesterol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_y" name="cholesterol" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="cholesterol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_n" name="cholesterol" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="cholesterol_n">No</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className="pos-relative no-style">Do you have Thyroid?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_y" name="thyroid" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="thyroid_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_n" name="thyroid" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="thyroid_n">No</label>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label><span className="d-block">Blood Pressure  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="blood_pressure" id="blood_pressure" placeholder="Blood Pressure"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Cholesterol  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="blood_cholesterol" id="blood_cholesterol" placeholder="Blood Cholesterol"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Sugar  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="blood_sugar" id="blood_sugar" placeholder="Blood Sugar"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Thyroid  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="blood_thyroid" id="blood_thyroid" placeholder="Blood Thyroid"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Body Temperature  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="body_temperature" id="blood_temperature" placeholder="Body Temperature"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Blood Oxygen  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="blood_oxygen" id="blood_oxygen" placeholder="Blood Oxygen"/>
          </div>
          <div className='form-group'>
            <label><span className="d-block">Heart Rate(per minute)  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="heart_rate" id="heart_rate" placeholder="Heart Rate"/>
          </div>

          <div className='form-group'>
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems"></textarea>
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

export default PatientMedicalHistory;