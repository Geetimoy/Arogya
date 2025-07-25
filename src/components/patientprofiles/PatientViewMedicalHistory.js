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


function PatientViewMedicalHistory(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

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

  const getMedicalHistory = async () => {

    let jsonData = {};

    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["patient_account_key"]   = editAccountKey;
    jsonData["patient_account_type"]  = 3;
    jsonData["doctor_account_key"]    = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"]   = decryptedLoginDetails.account_type;
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
    
    const response1 = await fetch(`${API_URL}/patientMedicalHistoryListFromDoctorLogin`, {
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
      formData['patient_pressure_readings']       = {value:medicalHistory.blood_pressure_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_cholesterol_readings']    = {value:medicalHistory.cholesterol_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_sugar_readings']          = {value:medicalHistory.sugar_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_thyroid_readings']        = {value:medicalHistory.thyroid_readings, required: true, errorClass:"", errorMessage:""};
      formData['patient_temperature_faren']       = {value:medicalHistory.temperature_faren, required: true, errorClass:"", errorMessage:""};
      formData['patient_blood_oxygen']            = {value:medicalHistory.blood_oxygen, required: true, errorClass:"", errorMessage:""};
      formData['patient_heart_rate_per_minute']   = {value:medicalHistory.heart_rate_per_minute, required: true, errorClass:"", errorMessage:""};
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

  const getUserBasicDetails = async () => {
        
   let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 3;
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
            <Link to="/patientprofiles" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'> View Patient Medical History </h5>
          
        </div>
        <div className='app-top-right d-flex'> 
          <AppTopNotifications /> 
          <div className={`my-element2 ${isMActive ? 'active' : ''}`}><FontAwesomeIcon icon={faEllipsisV} /></div>
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
    <div className='app-body form-all create-patient-profiles create-young-woman'>
      {/* <p><small> Patient Medical History</small></p> */}
      <p className='patient-details'>
        {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
      </p>
      <p><strong>Do you have these problems?</strong></p>
      <form className="mt-3" name="medicalHistoryForm" id="medicalHistoryForm">
          <div className={`form-group`}>
            <label><span className="d-block">Any drug allergy  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="drug_allergy" id="drug_allergy" value={formData["drug_allergy"].value ? formData["drug_allergy"].value : ''} placeholder="Any drug allergy"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Any previous illness  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_illness" id="previous_illness" value={formData["previous_illness"].value ? formData["previous_illness"].value : ''} placeholder="Any previous illness"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Any operation  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_operations_if_any" id="previous_operations_if_any" value={formData["previous_operations_if_any"].value ? formData["previous_operations_if_any"].value : ''} placeholder="Any operation"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Any previous or recent Medications  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_recent_medication" id="previous_recent_medication" value={formData["previous_recent_medication"].value ? formData["previous_recent_medication"].value : ''} placeholder="Any previous or recent Medications"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Any other medical record  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="previous_other_medical_record" id="previous_other_medical_record" value={formData["previous_other_medical_record"].value ? formData["previous_other_medical_record"].value : ''} placeholder="Any other medical record"/>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you Excercise?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_y" name="do_excercise" className="custom-control-input" value="Yes" checked={(formData["do_excercise"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="excercise_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="excercise_n" name="do_excercise" className="custom-control-input" value="No" checked={(formData["do_excercise"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="excercise_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you Smoke?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_y" name="do_smoke" className="custom-control-input" value="Yes" checked={(formData["do_smoke"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="smoke_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="smoke_n" name="do_smoke" className="custom-control-input" value="No" checked={(formData["do_smoke"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="smoke_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you Drink Alcohol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_y" name="drink_alcohol" className="custom-control-input" value="Yes" checked={(formData["drink_alcohol"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_alcohol_n" name="drink_alcohol" className="custom-control-input" value="No" checked={(formData["drink_alcohol"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="drink_alcohol_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you Drink Caffeine?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_y" name="drink_caffeine" className="custom-control-input" value="Yes" checked={(formData["drink_caffeine"].value === 'Yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="drink_caffeine_n" name="drink_caffeine" className="custom-control-input"  value="No" checked={(formData["drink_caffeine"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="drink_caffeine_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you Diet?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_y" name="do_diet" className="custom-control-input" value="Yes" checked={(formData["do_diet"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="diet_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diet_n" name="do_diet" className="custom-control-input" value="No" checked={(formData["do_diet"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="diet_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you have Current Medication?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_y" name="curent_medication" className="custom-control-input" value="Yes" checked={(formData["curent_medication"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="current_medication_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="current_medication_n" name="curent_medication" className="custom-control-input" value="No" checked={(formData["curent_medication"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="current_medication_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you have Diabetic?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_y" name="diabetic" className="custom-control-input" value="Yes" checked={(formData["diabetic"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="diabetic_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="diabetic_n" name="diabetic" className="custom-control-input" value="No" checked={(formData["diabetic"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="diabetic_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you have Pressure?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_h" name="high_low_pressure" className="custom-control-input" value="High" checked={(formData["high_low_pressure"].value === 'High') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="pressure_h">High</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_l" name="high_low_pressure" className="custom-control-input" value="Low" checked={(formData["high_low_pressure"].value === 'Low') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="pressure_l">Low</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="pressure_n" name="high_low_pressure" className="custom-control-input" value="Normal" checked={(formData["high_low_pressure"].value === 'Normal') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="pressure_n">Normal</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you have Cholesterol?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_y" name="cholesterol" className="custom-control-input" value="Yes" checked={(formData["cholesterol"].value === 'Yes') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="cholesterol_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="cholesterol_n" name="cholesterol" className="custom-control-input" value="No" checked={(formData["cholesterol"].value === 'No') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="cholesterol_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label className="pos-relative no-style">Do you have Thyroid?  <span className="text-danger">*</span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_y" name="thyroid" className="custom-control-input" value="Yes" checked={(formData["thyroid"].value === 'Yes') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="thyroid_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="thyroid_n" name="thyroid" className="custom-control-input" value="No" checked={(formData["thyroid"].value === 'No') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="thyroid_n">No</label>
              </div>
            </div>
          </div>

          <div className={`form-group`}>
            <label><span className="d-block">Blood Pressure  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_pressure_readings" id="patient_pressure_readings" value={formData["patient_pressure_readings"].value ? formData["patient_pressure_readings"].value : ''} placeholder="Blood Pressure"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Blood Cholesterol  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_cholesterol_readings" id="patient_cholesterol_readings" value={formData["patient_cholesterol_readings"].value ? formData["patient_cholesterol_readings"].value : ''} placeholder="Blood Cholesterol"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Blood Sugar  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_sugar_readings" id="patient_sugar_readings"  value={formData["patient_sugar_readings"].value ? formData["patient_sugar_readings"].value : ''} placeholder="Blood Sugar"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Blood Thyroid  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_thyroid_readings" id="patient_thyroid_readings" value={formData["patient_thyroid_readings"].value ? formData["patient_thyroid_readings"].value : ''} placeholder="Blood Thyroid"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Body Temperature  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_temperature_faren" id="patient_temperature_faren" value={formData["patient_temperature_faren"].value ? formData["patient_temperature_faren"].value : ''} placeholder="Body Temperature"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Blood Oxygen  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_blood_oxygen" id="patient_blood_oxygen" value={formData["patient_blood_oxygen"].value ? formData["patient_blood_oxygen"].value : ''} placeholder="Blood Oxygen"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Heart Rate(per minute)  <span className="text-danger">*</span></span></label>
            <input type="text" className="form-control" name="patient_heart_rate_per_minute" id="patient_heart_rate_per_minute" value={formData["patient_heart_rate_per_minute"].value ? formData["patient_heart_rate_per_minute"].value : ''} placeholder="Heart Rate(per minute)"/>
          </div>
          <div className={`form-group`}>
            <label><span className="d-block">Describe / Explain Problems:  </span></label>
            <textarea rows="3" name="remarks" id="remarks" value={formData["remarks"].value ? formData["remarks"].value : ''} className="form-control" placeholder="Describe / Explain Problems"></textarea>
          </div>
        </form>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}


export default PatientViewMedicalHistory;