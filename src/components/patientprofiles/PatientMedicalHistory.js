import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { Link, useParams } from "react-router-dom";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import AppTopNotifications from '../AppTopNotifications';

function PatientMedicalHistory(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const [formData, setFormData] = useState({
    drug_allergy: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_illness: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_operations_if_any: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_recent_medication: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_other_medical_record: {required: true, value:"", errorClass:"", errorMessage:""},
    do_excercise: {required: true, value:"No", errorClass:"", errorMessage:""},
    do_smoke: {required: true, value:"No", errorClass:"", errorMessage:""},
    drink_alcohol: {required: true, value:"No", errorClass:"", errorMessage:""},
    drink_caffeine: {required: true, value:"No", errorClass:"", errorMessage:""},
    do_diet: {required: true, value:"No", errorClass:"", errorMessage:""},
    curent_medication: {required: true, value:"No", errorClass:"", errorMessage:""},
    diabetic: {required: true, value:"No", errorClass:"", errorMessage:""},
    high_low_pressure: {required: true, value:"Normal", errorClass:"", errorMessage:""},
    cholesterol: {required: true, value:"No", errorClass:"", errorMessage:""},
    thyroid: {required: true, value:"No", errorClass:"", errorMessage:""},
    patient_pressure_readings: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_cholesterol_readings: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_sugar_readings: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_thyroid_readings: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_temperature_faren: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_blood_oxygen: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_heart_rate_per_minute: {required: true, value:"", errorClass:"", errorMessage:""},
    remarks: {required: false, value:"", errorClass:"", errorMessage:""},
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
    fieldName.forEach((element) => {
      if(formData[element].required && (formData[element].value === "" || formData[element].value === null || formData[element].value === undefined)){
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

      formData['drug_allergy']                    = {value:medicalHistory.drug_allergy, required: true, errorClass:"", errorMessage:""};
      formData['previous_illness']                = {value:medicalHistory.previous_illness, required: true, errorClass:"", errorMessage:""};
      formData['previous_operations_if_any']      = {value:medicalHistory.previous_operations_if_any, required: true, errorClass:"", errorMessage:""};
      formData['previous_recent_medication']      = {value:medicalHistory.previous_recent_medication, required: true, errorClass:"", errorMessage:""};
      formData['previous_other_medical_record']   = {value:medicalHistory.previous_other_medical_record, required: true, errorClass:"", errorMessage:""};
      formData['do_excercise']                    = {value:medicalHistory.do_excercise, required: true, errorClass:"", errorMessage:""};
      formData['do_smoke']                        = {value:medicalHistory.do_smoke, required: true, errorClass:"", errorMessage:""};
      formData['drink_alcohol']                   = {value:medicalHistory.drink_alcohol, required: true, errorClass:"", errorMessage:""};
      formData['drink_caffeine']                  = {value:medicalHistory.drink_caffeine, required: true, errorClass:"", errorMessage:""};
      formData['do_diet']                         = {value:medicalHistory.do_diet, required: true, errorClass:"", errorMessage:""};
      formData['curent_medication']               = {value:medicalHistory.curent_medication, required: true, errorClass:"", errorMessage:""};
      formData['diabetic']                        = {value:medicalHistory.diabetic, required: true, errorClass:"", errorMessage:""};
      formData['high_low_pressure']               = {value:medicalHistory.high_low_pressure, required: true, errorClass:"", errorMessage:""};
      formData['cholesterol']                     = {value:medicalHistory.cholesterol, required: true, errorClass:"", errorMessage:""};
      formData['thyroid']                         = {value:medicalHistory.thyroid, required: true, errorClass:"", errorMessage:""};
      formData['patient_pressure_readings']       = {value:medicalHistory.patient_pressure_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_cholesterol_readings']    = {value:medicalHistory.patient_cholesterol_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_sugar_readings']          = {value:medicalHistory.patient_sugar_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_thyroid_readings']        = {value:medicalHistory.patient_thyroid_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_temperature_faren']       = {value:medicalHistory.patient_temperature_faren, required: true, errorClass:"", errorMessage:""};
      formData['patient_blood_oxygen']            = {value:medicalHistory.patient_blood_oxygen, required: true, errorClass:"", errorMessage:""};
      formData['patient_heart_rate_per_minute']   = {value:medicalHistory.patient_heart_rate_per_minute, required: true, errorClass:"", errorMessage:""};
      formData['remarks']                         = {value:medicalHistory.remarks, required: false, errorClass:"", errorMessage:""};

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
      jsonData['system_id']                       = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]           = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]          = decryptedLoginDetails.account_type;
      jsonData["sub_volunteer_id"]                = "";
      jsonData["patient_account_key"]             = editAccountKey;
      jsonData["user_login_id"]                   = decryptedLoginDetails.login_id;
      jsonData["device_type"]                     = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]                    = DEVICE_TOKEN;
      jsonData["user_lat"]                        = localStorage.getItem('latitude');
      jsonData["user_long"]                       = localStorage.getItem('longitude');

      jsonData["drug_allergy"]                    = formData['drug_allergy'].value;
      jsonData["previous_illness"]                = formData['previous_illness'].value;
      jsonData["previous_operations_if_any"]      = formData['previous_operations_if_any'].value;
      jsonData["previous_recent_medication"]      = formData['previous_recent_medication'].value;
      jsonData["previous_other_medical_record"]   = formData['previous_other_medical_record'].value;
      jsonData["do_excercise"]                    = formData['do_excercise'].value;
      jsonData["do_smoke"]                        = formData['do_smoke'].value;
      jsonData["drink_alcohol"]                   = formData['drink_alcohol'].value;
      jsonData["drink_caffeine"]                  = formData['drink_caffeine'].value;
      jsonData["do_diet"]                         = formData['do_diet'].value;
      jsonData["curent_medication"]               = formData['curent_medication'].value;
      jsonData["diabetic"]                        = formData['diabetic'].value;
      jsonData["high_low_pressure"]               = formData['high_low_pressure'].value;
      jsonData["cholesterol"]                     = formData['cholesterol'].value;
      jsonData["thyroid"]                         = formData['thyroid'].value;
      jsonData["patient_pressure_readings"]       = formData['patient_pressure_readings'].value;
      jsonData["patient_cholesterol_readings"]    = formData['patient_cholesterol_readings'].value;
      jsonData["patient_sugar_readings"]          = formData['patient_sugar_readings'].value;
      jsonData["patient_thyroid_readings"]        = formData['patient_thyroid_readings'].value;
      jsonData["patient_temperature_faren"]       = formData['patient_temperature_faren'].value;
      jsonData["patient_blood_oxygen"]            = formData['patient_blood_oxygen'].value;
      jsonData["patient_heart_rate_per_minute"]   = formData['patient_heart_rate_per_minute'].value;
      jsonData["remarks"]                         = formData['remarks'].value;

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

  const getUserBasicDetails = async () => {
      
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
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>{decryptedLoginDetails.account_type !== '5' && 'Update'} Medical History </h5>
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
      <div className='app-body form-all create-young-woman'>
        <p>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <p><small>{decryptedLoginDetails.account_type !== '5' && 'Update'} Patient Medical History</small></p>
        <p><strong>Do you have these problems?</strong></p>
        <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["drug_allergy"].errorClass}`}>
            <label><span className="d-block">Any drug allergy  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="drug_allergy" id="drug_allergy" onChange={handleChange} value={formData["drug_allergy"].value ? formData["drug_allergy"].value : ''} placeholder="Any drug allergy"/>
            <small className="error-mesg">{formData["drug_allergy"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_illness"].errorClass}`}>
            <label><span className="d-block">Any previous illness  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_illness" id="previous_illness" onChange={handleChange} value={formData["previous_illness"].value ? formData["previous_illness"].value : ''} placeholder="Any previous illness"/>
            <small className="error-mesg">{formData["previous_illness"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_operations_if_any"].errorClass}`}>
            <label><span className="d-block">Any operation  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_operations_if_any" id="previous_operations_if_any" onChange={handleChange} value={formData["previous_operations_if_any"].value ? formData["previous_operations_if_any"].value : ''} placeholder="Any operation"/>
            <small className="error-mesg">{formData["previous_operations_if_any"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_recent_medication"].errorClass}`}>
            <label><span className="d-block">Any previous or recent Medications  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_recent_medication" id="previous_recent_medication" onChange={handleChange} value={formData["previous_recent_medication"].value ? formData["previous_recent_medication"].value : ''} placeholder="Any previous or recent Medications"/>
            <small className="error-mesg">{formData["previous_recent_medication"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["previous_other_medical_record"].errorClass}`}>
            <label><span className="d-block">Any other medical record  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_other_medical_record" id="previous_other_medical_record" onChange={handleChange} value={formData["previous_other_medical_record"].value ? formData["previous_other_medical_record"].value : ''} placeholder="Any other medical record"/>
            <small className="error-mesg">{formData["previous_other_medical_record"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["do_excercise"].errorClass}`}>
            <label className="pos-relative no-style">Do you Excercise?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_y" name="do_excercise" className="custom-control-input" value="Yes" checked={(formData["do_excercise"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="excercise_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_n" name="do_excercise" className="custom-control-input" value="No" checked={(formData["do_excercise"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="excercise_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["do_excercise"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["do_smoke"].errorClass}`}>
            <label className="pos-relative no-style">Do you Smoke?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_y" name="do_smoke" className="custom-control-input" value="Yes" checked={(formData["do_smoke"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="smoke_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_n" name="do_smoke" className="custom-control-input" value="No" checked={(formData["do_smoke"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="smoke_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["do_smoke"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["drink_alcohol"].errorClass}`}>
            <label className="pos-relative no-style">Do you Drink Alcohol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_y" name="drink_alcohol" className="custom-control-input" value="Yes" checked={(formData["drink_alcohol"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_n" name="drink_alcohol" className="custom-control-input" value="No" checked={(formData["drink_alcohol"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["drink_alcohol"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["drink_caffeine"].errorClass}`}>
            <label className="pos-relative no-style">Do you Drink Caffeine?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_y" name="drink_caffeine" className="custom-control-input" value="Yes" checked={(formData["drink_caffeine"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_n" name="drink_caffeine" className="custom-control-input"  value="No" checked={(formData["drink_caffeine"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["drink_caffeine"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["do_diet"].errorClass}`}>
            <label className="pos-relative no-style">Do you Diet?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_y" name="do_diet" className="custom-control-input" value="Yes" checked={(formData["do_diet"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="diet_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_n" name="do_diet" className="custom-control-input" value="No" checked={(formData["do_diet"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="diet_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["do_diet"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["curent_medication"].errorClass}`}>
            <label className="pos-relative no-style">Do you have Current Medication?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_y" name="curent_medication" className="custom-control-input" value="Yes" checked={(formData["curent_medication"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="current_medication_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_n" name="curent_medication" className="custom-control-input" value="No" checked={(formData["curent_medication"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="current_medication_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["curent_medication"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["diabetic"].errorClass}`}>
            <label className="pos-relative no-style">Do you have Diabetic?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="diabetic" className="custom-control-input" value="Yes" checked={(formData["diabetic"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="diabetic" className="custom-control-input" value="No" checked={(formData["diabetic"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="diabetic_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["diabetic"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["high_low_pressure"].errorClass}`}>
            <label className="pos-relative no-style">Do you have Pressure?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_h" name="high_low_pressure" className="custom-control-input" value="High" checked={(formData["high_low_pressure"].value === 'High') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="pressure_h">High</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_l" name="high_low_pressure" className="custom-control-input" value="Low" checked={(formData["high_low_pressure"].value === 'Low') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="pressure_l">Low</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_n" name="high_low_pressure" className="custom-control-input" value="Normal" checked={(formData["high_low_pressure"].value === 'Normal') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="pressure_n">Normal</label>
              </div>
            </div>
            <small className="error-mesg">{formData["high_low_pressure"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["cholesterol"].errorClass}`}>
            <label className="pos-relative no-style">Do you have Cholesterol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_y" name="cholesterol" className="custom-control-input" value="Yes" checked={(formData["cholesterol"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="cholesterol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_n" name="cholesterol" className="custom-control-input" value="No" checked={(formData["cholesterol"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="cholesterol_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["cholesterol"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["thyroid"].errorClass}`}>
            <label className="pos-relative no-style">Do you have Thyroid?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_y" name="thyroid" className="custom-control-input" value="Yes" checked={(formData["thyroid"].value === 'Yes') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="thyroid_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_n" name="thyroid" className="custom-control-input" value="No" checked={(formData["thyroid"].value === 'No') ? true : false} onChange={handleChange}/>
                <label className="custom-control-label no-style" htmlFor="thyroid_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["thyroid"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["patient_pressure_readings"].errorClass}`}>
            <label><span className="d-block">Blood Pressure  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_pressure_readings" id="patient_pressure_readings" onChange={handleChange} value={formData["patient_pressure_readings"].value ? formData["patient_pressure_readings"].value : ''} placeholder="Blood Pressure"/>
            <small className="error-mesg">{formData["patient_pressure_readings"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_cholesterol_readings"].errorClass}`}>
            <label><span className="d-block">Blood Cholesterol  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_cholesterol_readings" id="patient_cholesterol_readings" onChange={handleChange} value={formData["patient_cholesterol_readings"].value ? formData["patient_cholesterol_readings"].value : ''} placeholder="Blood Cholesterol"/>
            <small className="error-mesg">{formData["patient_cholesterol_readings"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_sugar_readings"].errorClass}`}>
            <label><span className="d-block">Blood Sugar  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_sugar_readings" id="patient_sugar_readings" onChange={handleChange} value={formData["patient_sugar_readings"].value ? formData["patient_sugar_readings"].value : ''} placeholder="Blood Sugar"/>
            <small className="error-mesg">{formData["patient_sugar_readings"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_thyroid_readings"].errorClass}`}>
            <label><span className="d-block">Blood Thyroid  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_thyroid_readings" id="patient_thyroid_readings" onChange={handleChange} value={formData["patient_thyroid_readings"].value ? formData["patient_thyroid_readings"].value : ''} placeholder="Blood Thyroid"/>
            <small className="error-mesg">{formData["patient_thyroid_readings"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_temperature_faren"].errorClass}`}>
            <label><span className="d-block">Body Temperature  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_temperature_faren" id="patient_temperature_faren" onChange={handleChange} value={formData["patient_temperature_faren"].value ? formData["patient_temperature_faren"].value : ''} placeholder="Body Temperature"/>
            <small className="error-mesg">{formData["patient_temperature_faren"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_blood_oxygen"].errorClass}`}>
            <label><span className="d-block">Blood Oxygen  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_blood_oxygen" id="patient_blood_oxygen" onChange={handleChange} value={formData["patient_blood_oxygen"].value ? formData["patient_blood_oxygen"].value : ''} placeholder="Blood Oxygen"/>
            <small className="error-mesg">{formData["patient_blood_oxygen"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_heart_rate_per_minute"].errorClass}`}>
            <label><span className="d-block">Heart Rate(per minute)  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_heart_rate_per_minute" id="patient_heart_rate_per_minute" onChange={handleChange} value={formData["patient_heart_rate_per_minute"].value ? formData["patient_heart_rate_per_minute"].value : ''} placeholder="Heart Rate(per minute)"/>
            <small className="error-mesg">{formData["patient_heart_rate_per_minute"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["remarks"].errorClass}`}>
            <label><span className="d-block">Describe / Explain Problems:  </span></label>
            <textarea rows="3" name="remarks" id="remarks" onChange={handleChange} value={formData["remarks"].value ? formData["remarks"].value : ''} className="form-control" placeholder="Describe / Explain Problems"></textarea>
            <small className="error-mesg">{formData["remarks"].errorMessage}</small>
          </div>
          {decryptedLoginDetails.account_type !== '5' && <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div>}
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default PatientMedicalHistory;