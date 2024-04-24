import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import './BasicInformation.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import SystemContext from "../context/system/SystemContext";

import Dropdown from 'react-dropdown-select';

function BasicInformation(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive]           = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);
  // Define the selectedOptions state and the corresponding setter function
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ];


  const [formData, setFormData] = useState({
    basicInfoName: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMobileNo: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoWhatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    basicInfoEmail: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoGender: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoAge: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoCommute: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMedicalExperience: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMedicalCertificate: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoAddress1: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoAddress2: {required: false, value:"", errorClass:"", errorMessage:""},
    basicInfoLandmark: {required: false, value:"", errorClass:"", errorMessage:""},
    basicInfoTown: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoPostalCode: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoServiceArea: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoSpecialNotes: {required: false, value:"", errorClass:"", errorMessage:""}
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

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["account_key"]       = decryptedLoginDetails.account_key;
    jsonData["account_type"]      = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getUserProfileDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let userDetails = result1.data;
    console.log(userDetails);

    setAccountDetails(userDetails);

    formData['basicInfoName']         = {value:userDetails.display_name, errorClass:"", errorMessage:""};
    formData['basicInfoMobileNo']     = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
    formData['basicInfoWhatsapp']     = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
    formData['basicInfoEmail']        = {value:userDetails.email_id, errorClass:"", errorMessage:""};
    formData['basicInfoGender']       = {value:userDetails.gender, errorClass:"", errorMessage:""};
    formData['basicInfoAge']          = {value:userDetails.age, errorClass:"", errorMessage:""};
    formData['basicInfoCommute']      = {value:userDetails.how_commute, errorClass:"", errorMessage:""};
    formData['basicInfoMedicalExperience']  = {value:userDetails.medical_experiences, errorClass:"", errorMessage:""};
    formData['basicInfoMedicalCertificate'] = {value:userDetails.medical_certificates, errorClass:"", errorMessage:""};
    formData['basicInfoAddress1']     = {value:userDetails.addr_1, errorClass:"", errorMessage:""};
    formData['basicInfoAddress2']     = {value:userDetails.addr_2, errorClass:"", errorMessage:""};
    formData['basicInfoLandmark']     = {value:userDetails.addr_landmark, errorClass:"", errorMessage:""};
    formData['basicInfoTown']         = {value:userDetails.city, errorClass:"", errorMessage:""};
    formData['basicInfoPostalCode']   = {value:userDetails.postal_code, errorClass:"", errorMessage:""};
    formData['basicInfoServiceArea']  = {value:userDetails.service_area_ids, errorClass:"", errorMessage:""};
    formData['basicInfoSpecialNotes'] = {value:userDetails.special_notes, errorClass:"", errorMessage:""};

    setFormData({...formData, ...formData});
    
    if(userDetails.service_area_ids && userDetails.service_area_ids !== ''){
      var serviceAreaArray = userDetails.service_area_ids.replace(/^\{|\}$/g,'').split(',');
      var array1 = new Array();
      serviceAreaArray.forEach((item)=>{
        options.forEach((opt)=>{
          if(opt.value == item){
            array1.push(opt);
          }
        })
      })
      setSelectedOptions(array1);
    }
  }

  const handleChange1 = (values) => {
    //console.log(values);
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['basicInfoServiceArea']: {...formData['basicInfoServiceArea'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['basicInfoServiceArea']: {...formData['basicInfoServiceArea'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); console.log(formData['basicInfoName'].value);
    let errorCounter = validateForm();
    if(errorCounter == 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      jsonData['system_id']         = systemContext.systemDetails.system_id;
      jsonData["account_key"]       = decryptedLoginDetails.account_key;
      jsonData["account_type"]      = decryptedLoginDetails.account_type;
      jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
      jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]      = DEVICE_TOKEN;
      jsonData["user_lat"]          = localStorage.getItem('latitude');
      jsonData["user_long"]         = localStorage.getItem('longitude');

      jsonData["basicInfoName"]             = formData['basicInfoName'].value;
      jsonData["basicInfoMobileNo"]         = formData['basicInfoMobileNo'].value;
      jsonData["basicInfoWhatsapp"]         = formData['basicInfoWhatsapp'].value;
      jsonData["basicInfoEmail"]            = formData['basicInfoEmail'].value;
      jsonData["basicInfoGender"]           = formData['basicInfoGender'].value;
      jsonData["basicInfoAge"]              = formData['basicInfoAge'].value;
      jsonData["basicInfoCommute"]          = formData['basicInfoCommute'].value;
      jsonData["basicInfoMedicalExperience"]  = formData['basicInfoMedicalExperience'].value;
      jsonData["basicInfoMedicalCertificate"] = formData['basicInfoMedicalCertificate'].value;
      jsonData["basicInfoAddress1"]         = formData['basicInfoAddress1'].value;
      jsonData["basicInfoAddress2"]         = formData['basicInfoAddress2'].value;
      jsonData["basicInfoLandmark"]         = formData['basicInfoLandmark'].value;
      jsonData["basicInfoTown"]             = formData['basicInfoTown'].value;
      jsonData["basicInfoPostalCode"]       = formData['basicInfoPostalCode'].value;
      jsonData["basicInfoServiceArea"]      = formData['basicInfoServiceArea'].value;
      jsonData["basicInfoSpecialNotes"]     = formData['basicInfoSpecialNotes'].value;

      console.log(jsonData);

    }
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && (formData[element].value === "" || formData[element].value === null)){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if((element === "basicInfoEmail") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
          formData[element].errorMessage = "Please enter a valid email!";
          formData[element].errorClass = "form-error";
        }
        else{
          formData[element].errorMessage = "";
          formData[element].errorClass = "";
        }
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  return(
    <>
        <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Update Basic Information </h5>
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
        <div className="app-body basic-info">
          <p>To update your profile information</p>
          <p style={{textAlign:'right'}} className="mb-0"><span className="text-danger">*</span>marks are mandatory</p>

          <div className="row">
            <div className="col-6">
              <div className="normal-box">
                <span>Volunteer ID :</span>
                {(accountDetails.account_key) ? accountDetails.account_key.toUpperCase() : ''}
              </div>
            </div>
            <div className="col-6">
              <div className="normal-box">
                <span>User ID <small className="text-danger">*</small>  <FontAwesomeIcon icon={faQuestionCircle} /> : </span> {(accountDetails.user_login_id) ? accountDetails.user_login_id.toUpperCase() : ''}
              </div>
            </div>
            
          </div>

          <form className="basic-information" name="basic_information" id="basic_information" onSubmit={handleFormSubmit}>
            <div className={`form-group ${formData["basicInfoName"].errorClass}`}>
              <label htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="basicInfoName" id="basicInfoName" placeholder="Volunteer H" onChange={handleChange} value={formData["basicInfoName"].value ? formData["basicInfoName"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoName"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoMobileNo"].errorClass}`}> 
              <label> Mobile Number <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" name="basicInfoMobileNo" id="basicInfoMobileNo" placeholder="9038888991" onChange={handleChange} maxLength={12} value={formData["basicInfoMobileNo"].value ? formData["basicInfoMobileNo"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoMobileNo"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoWhatsapp"].errorClass}`}>
              <label>WhatsApp :</label>
              <input type="text" className="form-control" name="basicInfoWhatsapp" id="basicInfoWhatsapp" placeholder="9038888991" onChange={handleChange} maxLength={12} value={formData["basicInfoWhatsapp"].value ? formData["basicInfoWhatsapp"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoWhatsapp"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoEmail"].errorClass}`}>
              <label>Email ID <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoEmail" id="basicInfoEmail" placeholder="abcd@xyz.com" onChange={handleChange} value={formData["basicInfoEmail"].value ? formData["basicInfoEmail"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoEmail"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoGender"].errorClass}`}>
              <label className="pos-relative no-style">Gender  <span className="text-danger">*</span> </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_m" name="basicInfoGender" className="custom-control-input" onChange={handleChange} value="male" checked={(formData["basicInfoGender"].value === 'male') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_m">Male</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_f" name="basicInfoGender" className="custom-control-input" onChange={handleChange} value="female" checked={(formData["basicInfoGender"].value === 'female') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_f">Female</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_o" name="basicInfoGender" className="custom-control-input" onChange={handleChange} value="others" checked={(formData["basicInfoGender"].value === 'others') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_o">Others</label>
                </div>
              </div>
              <small className="error-mesg">{formData["basicInfoGender"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoAge"].errorClass}`}>
              <label style={{zIndex:1}}>Age  <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="basicInfoAge" id="basicInfoAge" onChange={handleChange} maxLength={3} value={formData["basicInfoAge"].value ? formData["basicInfoAge"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoAge"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoCommute"].errorClass}`}>
              <label>How You Commute  <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoCommute" id="basicInfoCommute" placeholder="Bike" onChange={handleChange} value={formData["basicInfoCommute"].value ? formData["basicInfoCommute"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoCommute"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoMedicalExperience"].errorClass}`}>
              <label>Medical Experiences   <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoMedicalExperience" id="basicInfoMedicalExperience" placeholder="" onChange={handleChange} value={formData["basicInfoMedicalExperience"].value ? formData["basicInfoMedicalExperience"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoMedicalExperience"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoMedicalCertificate"].errorClass}`}>
              <label className="no-style">Do you have Medical Certificates?    <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> : </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_y" name="basicInfoMedicalCertificate" className="custom-control-input" value="yes" onChange={handleChange} checked={(formData["basicInfoMedicalCertificate"].value === 'yes') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Yes</label>
              </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_n" name="basicInfoMedicalCertificate" className="custom-control-input" value="no" onChange={handleChange} checked={(formData["basicInfoMedicalCertificate"].value === 'no') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">No</label>
                </div>
              </div>
              <small className="error-mesg">{formData["basicInfoMedicalCertificate"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoAddress1"].errorClass}`}>
              <label>Address 1   <span className="text-danger">*</span> : </label>
              <input type="text" className="form-control" name="basicInfoAddress1" id="basicInfoAddress1" placeholder="" onChange={handleChange} value={formData["basicInfoAddress1"].value ? formData["basicInfoAddress1"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoAddress1"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoAddress2"].errorClass}`}>
              <label>Address 2 :</label>
              <input type="text" className="form-control" name="basicInfoAddress2" id="basicInfoAddress2" placeholder="" onChange={handleChange} value={formData["basicInfoAddress2"].value ? formData["basicInfoAddress2"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoAddress2"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoLandmark"].errorClass}`}>
              <label>Nearest Landmark :</label>
              <input type="text" className="form-control" name="basicInfoLandmark" id="basicInfoLandmark" placeholder="" onChange={handleChange} value={formData["basicInfoLandmark"].value ? formData["basicInfoLandmark"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoLandmark"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoTown"].errorClass}`}>
              <label>Village / Town / City <span className="text-danger">*</span> :</label>
              <input type="text" className="form-control" name="basicInfoTown" id="basicInfoTown" placeholder="" onChange={handleChange} value={formData["basicInfoTown"].value ? formData["basicInfoTown"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoTown"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoPostalCode"].errorClass}`}>
              <label>Postal Code / Pincode <span className="text-danger">*</span> :</label>
              <input type="text" className="form-control" name="basicInfoPostalCode" id="basicInfoPostalCode" placeholder="" onChange={handleChange} maxLength={6} value={formData["basicInfoPostalCode"].value ? formData["basicInfoPostalCode"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoPostalCode"].errorMessage}</small>
            </div>
            
            <div className={`form-group ${formData["basicInfoServiceArea"].errorClass}`}>
              <label>Service Area : <span className='text-danger'> *</span></label>
              <Dropdown className='form-control select-multi' multi options={options} values={selectedOptions} onChange={handleChange1} />
              <small className="error-mesg">{formData["basicInfoServiceArea"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["basicInfoSpecialNotes"].errorClass}`}>
              <label>Special Notes :</label>
              <input type="text" className="form-control" name="basicInfoSpecialNotes" id="basicInfoSpecialNotes" placeholder="Special Notes" onChange={handleChange} value={formData["basicInfoSpecialNotes"].value ? formData["basicInfoSpecialNotes"].value : ''}/>
              <small className="error-mesg">{formData["basicInfoSpecialNotes"].errorMessage}</small>
            </div>

            <div className='btns-group d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2">Update My Profile</button>
              <Link to="/account"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></Link>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default BasicInformation;