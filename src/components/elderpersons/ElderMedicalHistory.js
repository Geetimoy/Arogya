import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from  "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Select from 'react-select';
import AppTopNotifications from '../AppTopNotifications';

function ElderMedicalHistory(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const editAccountKey = urlParam.accountKey;
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const [selectedEyeOptions, setSelectedEyeOptions] = useState([]);
  const [eyeOption, setEyeOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Dimness of Vision', value: '1' },
    { label: 'Eye Pain', value: '2' },
    { label: 'Eye Redness', value: '3' },
    { label: 'Watery Eyes', value: '4' }
  ]);

  const [selectedEarOptions, setSelectedEarOptions] = useState([]);
  const [earOption, setEarOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Hearing Loss', value: '1' },
    { label: 'Water or pus from the ear', value: '2' }
  ]);

  const [selectedNoseOptions, setSelectedNoseOptions] = useState([]);
  const [noseOption, setNoseOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Stuffy Nose', value: '1' },
    { label: 'Runny or watery nose', value: '2' },
    { label: 'Bleeding from the nose', value: '3' }
  ]);


  const [selectedMouthOptions, setSelectedMouthOptions] = useState([]);
  const [mouthOption, setMouthOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Difficulty in Swallowing', value: '1' },
    { label: 'Carries Tooth (cavity etc.)', value: '2' },
    { label: 'Sores on gums', value: '3' }
  ]);

  const [selectedDigestiveOptions, setSelectedDigestiveOptions] = useState([]);
  const [digestiveOption, setDigestiveOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Loss of Appetite', value: '1' },
    { label: 'Nausia/vomiting', value: '2' },
    { label: 'Diarrhea', value: '3' },
    { label: 'Constipation', value: '4' },
    { label: 'Abdominal (stomach) pain', value: '5' },
    { label: 'Blood with stool.', value: '6' }
  ]);


  const [selectedGeneralOptions, setSelectedGeneralOptions] = useState([]);
  const [generalOption, setGeneralOption] = useState([
    { label: 'None', value: '0' },
    { label: 'Skin Problem', value: '1' },
    { label: 'Ankylosing spondylitis(Orthopedics)', value: '2' },
    { label: 'Cough - dry/productive?', value: '3' },
    { label: 'Shortness of breath', value: '4' },
    { label: 'Sound while breathing(whezzing)', value: '5' }
  ]);


  const handleChange1 = (values, element) => {
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, [element]: {...formData[element], required:formData[element].required, value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, [element]: {...formData[element], required:formData[element].required, value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    if(element === 'eye_type'){
      setSelectedEyeOptions(values);
    }
    else if(element === 'ears_type'){ 
      setSelectedEarOptions(values);
    }
    else if(element === 'nose_type'){ 
      setSelectedNoseOptions(values);
    }
    else if(element === 'mouth_type'){ 
      setSelectedMouthOptions(values);
    }
    else if(element === 'digestive_type'){ 
      setSelectedDigestiveOptions(values);
    }
    else if(element === 'general_type'){ 
      setSelectedGeneralOptions(values);
    }
  };

  

  const [formData, setFormData] = useState({
    eye_type: {required: true, value:"", errorClass:"", errorMessage:""},
    ears_type: {required: true, value:"", errorClass:"", errorMessage:""},
    nose_type: {required: true, value:"", errorClass:"", errorMessage:""},
    mouth_type: {required: true, value:"", errorClass:"", errorMessage:""},
    digestive_type: {required: true, value:"", errorClass:"", errorMessage:""},
    lungs_pulmonery_type:{required: true, value:"", errorClass:"", errorMessage:""},
    heart_bp_type:{required: true, value:"", errorClass:"", errorMessage:""},
    diabetic_type:{required: true, value:"", errorClass:"", errorMessage:""},
    general_type: {required: true, value:"", errorClass:"", errorMessage:""},
    remarks: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      setFormData({...formData, [name]: {...formData[name], required:formData[name].required, value:value, errorClass:"", errorMessage:""}});
    }
    else{
      if(formData[name].required){
        setFormData({...formData, [name]: {...formData[name], required:formData[name].required, value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
      }
      else{
        setFormData({...formData, [name]: {...formData[name], required:formData[name].required, value:value, errorClass:"", errorMessage:""}});
      }
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
      formData[element].required = formData[element].required; // Keep the required state intact
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [isActive, setIsActive]     = useState(0);

  const handleMenuClick = () => {
    // Toggle the state when the button is clicked
    setIsActive(!isActive);
  };

  const getMedicalHistory = async () => {

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
                                        "limit": "20",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/elderMedicalHistoryList`, {
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

      var eyeTypeArray = [];
      if(medicalHistory.eye_type && medicalHistory.eye_type !== ''){
        eyeTypeArray = medicalHistory.eye_type.replace(/^\{|\}$/g,'').split(',');
        var array1 = new Array();
        eyeTypeArray.forEach((item)=>{
          eyeOption.forEach((opt)=>{
            if(opt.value === item){
              array1.push(opt);
            }
          })
        })
        setSelectedEyeOptions(array1);
      }

      var earTypeArray = [];
      if(medicalHistory.ears_type && medicalHistory.ears_type !== ''){
        earTypeArray = medicalHistory.ears_type.replace(/^\{|\}$/g,'').split(',');  
        var array2 = new Array();
        earTypeArray.forEach((item)=>{
          earOption.forEach((opt)=>{
            if(opt.value === item){
              array2.push(opt); 
            }
          })
        })
        setSelectedEarOptions(array2);
      }

      var noseTypeArray = [];
      if(medicalHistory.nose_type && medicalHistory.nose_type !== ''){
        noseTypeArray = medicalHistory.nose_type.replace(/^\{|\}$/g,'').split(',');
        var array3 = new Array();
        noseTypeArray.forEach((item)=>{
          noseOption.forEach((opt)=>{
            if(opt.value === item){
              array3.push(opt);
            }
          })
        })
        setSelectedNoseOptions(array3);
      }

      var mouthTypeArray = [];
      if(medicalHistory.mouth_type && medicalHistory.mouth_type !== ''){
        mouthTypeArray = medicalHistory.mouth_type.replace(/^\{|\}$/g,'').split(',');
        var array4 = new Array();
        mouthTypeArray.forEach((item)=>{
          mouthOption.forEach((opt)=>{
            if(opt.value === item){
              array4.push(opt);
            }
          })
        })
        setSelectedMouthOptions(array4);
      }


      var digestiveTypeArray = [];
      if(medicalHistory.digestive_system_type && medicalHistory.digestive_system_type !== ''){
        digestiveTypeArray = medicalHistory.digestive_system_type.replace(/^\{|\}$/g,'').split(',');
        var array5 = new Array();
        digestiveTypeArray.forEach((item)=>{
          digestiveOption.forEach((opt)=>{
            if(opt.value === item){
              array5.push(opt);
            }
          })
        })
        setSelectedDigestiveOptions(array5);
      } 

      var generalTypeArray = [];
      if(medicalHistory.general_type && medicalHistory.general_type !== ''){
        generalTypeArray = medicalHistory.general_type.replace(/^\{|\}$/g,'').split(',');
        var array6 = new Array();
        generalTypeArray.forEach((item)=>{
          generalOption.forEach((opt)=>{
            if(opt.value === item){
              array6.push(opt);
            }
          })
        })
        setSelectedGeneralOptions(array6);
      }

      formData['eye_type']      = {value:eyeTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['ears_type']     = {value:earTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['nose_type']     = {value:noseTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['mouth_type']    = {value:mouthTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['digestive_type'] = {value:digestiveTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
      formData['lungs_pulmonery_type']    = {value:medicalHistory.lungs_pulmonery_type, required: true, errorClass:"", errorMessage:""};
      formData['heart_bp_type']    = {value:medicalHistory.heart_bp_type, required: true, errorClass:"", errorMessage:""};
      formData['diabetic_type']    = {value:medicalHistory.diabetic_type, required: true, errorClass:"", errorMessage:""};
      formData['general_type']  = {value:generalTypeArray.join(","), required: true, errorClass:"", errorMessage:""};
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
      jsonData["elder_account_key"]         = editAccountKey;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');

      jsonData["eye_type"]                  = '{'+formData['eye_type'].value+'}';
      jsonData["ears_type"]                 = '{'+formData['ears_type'].value+'}';
      jsonData["nose_type"]                 = '{'+formData['nose_type'].value+'}';
      jsonData["mouth_type"]                = '{'+formData['mouth_type'].value+'}';
      jsonData["digestive_system_type"]     = '{'+formData['digestive_type'].value+'}';

      jsonData["lungs_pulmonery_type"]      = formData['lungs_pulmonery_type'].value;
      jsonData["heart_bp_type"]             = formData['heart_bp_type'].value;
      jsonData["diabetic_type"]             = formData['diabetic_type'].value;

      jsonData["general_type"]              = '{'+formData['general_type'].value+'}';
      jsonData["remarks"]                   = formData['remarks'].value;

      const response = await fetch(`${API_URL}/addUpdateElderMedicalHistory`, {
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

  const [eyeTypeClass, setEyeTypeClass] = useState('');
  const [earTypeClass, setEarTypeClass] = useState('');
  const [noseTypeClass, setNoseTypeClass] = useState('');
  const [mouthTypeClass, setMouthTypeClass] = useState('');
  const [digestiveTypeClass, setDigestiveTypeClass] = useState('');
  const [generalTypeClass, setGeneralTypeClass] = useState('');

  useEffect(() => {
  }, [earTypeClass, eyeTypeClass, noseTypeClass, mouthTypeClass, digestiveTypeClass, generalTypeClass]);

  const setActiveClass = (element) => {

    setEyeTypeClass('');
    setEarTypeClass('');
    setNoseTypeClass('');
    setMouthTypeClass('');
    setDigestiveTypeClass('');
    setGeneralTypeClass('');

    if(element === 'eye_type'){
      setEyeTypeClass('selected');
    }
    else if(element === 'ears_type'){ 
      setEarTypeClass('selected');
    }
    else if(element === 'nose_type'){ 
      setNoseTypeClass('selected');
    }
    else if(element === 'mouth_type'){ 
      setMouthTypeClass('selected');
    }
    else if(element === 'digestive_type'){ 
      setDigestiveTypeClass('selected');
    }
    else if(element === 'general_type'){ 
      setGeneralTypeClass('selected');
    }
  }

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
      <div className='app-body form-all elder-persons'>
        <p className='patient-details'>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        {/* <p><small>Update Elder Persons Medical History</small></p> */}
        <p><strong>Do you have these problems?</strong></p>
        <form className="mt-3 select-box" name="elderMedicalHistoryForm" id="elderMedicalHistoryForm" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["eye_type"].errorClass}`}>
            <label><span className="d-block">Eye <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedEyeOptions} onChange={(values) =>  handleChange1(values, 'eye_type')} options={eyeOption} onFocus={() =>  setActiveClass('eye_type')}/>
            <small className="error-mesg">{formData["eye_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["ears_type"].errorClass}`}>
            <label><span className="d-block">Ears <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedEarOptions} onChange={(values) =>  handleChange1(values, 'ears_type')} options={earOption} onFocus={() =>  setActiveClass('ears_type')}/>
            <small className="error-mesg">{formData["eye_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["nose_type"].errorClass}`}>
            <label><span className="d-block">Nose <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedNoseOptions} onChange={(values) =>  handleChange1(values, 'nose_type')} options={noseOption} onFocus={() =>  setActiveClass('nose_type')}/>
            <small className="error-mesg">{formData["nose_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["mouth_type"].errorClass}`}>
            <label><span className="d-block">Mouth <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedMouthOptions} onChange={(values) =>  handleChange1(values, 'mouth_type')} options={mouthOption} onFocus={() =>  setActiveClass('mouth_type')}/>
            <small className="error-mesg">{formData["mouth_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["digestive_type"].errorClass}`}>
            <label><span className="d-block">Digestive system <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedDigestiveOptions} onChange={(values) =>  handleChange1(values, 'digestive_type')} options={digestiveOption} onFocus={() =>  setActiveClass('digestive_type')}/>
            <small className="error-mesg">{formData["digestive_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["lungs_pulmonery_type"].errorClass}`}>
            <label><span className="d-block">Lungs/Pulmonary <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["lungs_pulmonery_type"].value ? formData["lungs_pulmonery_type"].value : ''} name="lungs_pulmonery_type" id="lungs_pulmonery_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
            <small className="error-mesg">{formData["lungs_pulmonery_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["heart_bp_type"].errorClass}`}>
            <label><span className="d-block">Heart/BP Issue <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["heart_bp_type"].value ? formData["heart_bp_type"].value : ''} name="heart_bp_type" id="heart_bp_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
            <small className="error-mesg">{formData["heart_bp_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["diabetic_type"].errorClass}`}>
            <label><span className="d-block">Diabetic <span className="text-danger">*</span></span></label>
            <select className="form-control" value={formData["diabetic_type"].value ? formData["diabetic_type"].value : ''} name="diabetic_type" id="diabetic_type" onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
            <small className="error-mesg">{formData["diabetic_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["general_type"].errorClass}`}>
            <label><span className="d-block">General <span className="text-danger">*</span></span></label>
            <Select className='form-control select-multi' isMulti value={selectedGeneralOptions} onChange={(values) =>  handleChange1(values, 'general_type')} options={generalOption} onFocus={() =>  setActiveClass('general_type')}/>
            <small className="error-mesg">{formData["general_type"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["remarks"].errorClass}`}>
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" onChange={handleChange} value={formData["remarks"].value}></textarea>
            <small className="error-mesg">{formData["remarks"].errorMessage}</small>
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


export default ElderMedicalHistory;