import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Dropdown from 'react-dropdown-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import './YoungWomanBasicInformation.css' 


function YoungWomanBasicInformation(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    woman_name: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    is_premature_birth: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_father_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    gender: {required: true, value:"1", errorClass:"", errorMessage:""},
    woman_contact_number: {required: true, value:"", errorClass:"", errorMessage:""},
    whatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    woman_age: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_email_id: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_address: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    woman_landmark: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_city: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_state: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_education: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_name: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_class: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_section: {required: true, value:"", errorClass:"", errorMessage:""},
    toilet_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    house_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    drinking_water_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    special_note: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  const options = [
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ];

  // Define the selectedOptions state and the corresponding setter function
  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleChange1 = (values) => {
    //console.log(values);
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  const getUserDetails = async () => {

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
    
    const response1 = await fetch(`${API_URL}/womanBasicInformationList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    if(result1.data.length > 0){
      let userDetails = result1.data[0];
      console.log(userDetails);
      formData['woman_name']              = {value:userDetails.women_name, errorClass:"", errorMessage:""};
      formData['woman_father_name']       = {value:userDetails.women_father_name, errorClass:"", errorMessage:""};
      formData['is_premature_birth']      = {value:userDetails.women_is_premature_birth, errorClass:"", errorMessage:""};
      formData['woman_father_occupation'] = {value:userDetails.women_father_occupation, errorClass:"", errorMessage:""};
      formData['is_personal_mobile_number'] = {value:userDetails.is_your_personal_number, errorClass:"", errorMessage:""};
      formData['gender']                  = {value:1, errorClass:"", errorMessage:""};
      formData['woman_contact_number']    = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
      formData['woman_contact_number']    = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
      formData['whatsapp']                = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
      formData['woman_age']               = {value:userDetails.women_age, errorClass:"", errorMessage:""};
      formData['woman_email_id']          = {value:userDetails.women_email_id, errorClass:"", errorMessage:""};
      formData['woman_address']           = {value:userDetails.women_addr_1, errorClass:"", errorMessage:""};
      formData['woman_address_2']         = {value:userDetails.women_addr_1, errorClass:"", errorMessage:""};
      formData['woman_landmark']          = {value:userDetails.women_addr_landmark, errorClass:"", errorMessage:""};
      formData['woman_city']              = {value:userDetails.women_city, errorClass:"", errorMessage:""};
      formData['woman_state']             = {value:userDetails.women_state, errorClass:"", errorMessage:""};
      formData['woman_postal_code']       = {value:userDetails.women_postal_code, errorClass:"", errorMessage:""};
      formData['woman_service_area']      = {value:userDetails.service_area_ids, errorClass:"", errorMessage:""};
      formData['woman_education']         = {value:userDetails.women_education, errorClass:"", errorMessage:""};
      formData['woman_school_name']       = {value:userDetails.women_school_name, errorClass:"", errorMessage:""};
      formData['woman_school_class']      = {value:userDetails.women_school_class, errorClass:"", errorMessage:""};
      formData['woman_school_section']    = {value:userDetails.women_school_section, errorClass:"", errorMessage:""};
      formData['toilet_type']             = {value:userDetails.women_toilet_type, errorClass:"", errorMessage:""};
      formData['house_type']              = {value:userDetails.women_house_type, errorClass:"", errorMessage:""};
      formData['drinking_water_type']     = {value:userDetails.women_drinking_water_type, errorClass:"", errorMessage:""};
      formData['special_note']            = {value:userDetails.special_notes, errorClass:"", errorMessage:""};

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

  }

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
      if(formData[element].required && (formData[element].value === "" || formData[element].value === null)){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if((element === "woman_email_id") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm();
    if(errorCounter === 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["introducer_account_key"]    = decryptedLoginDetails.account_key;
      jsonData["introducer_account_type"]   = decryptedLoginDetails.account_type;
      jsonData["woman_account_type"]        = '3';
      jsonData["woman_account_key"]         = editAccountKey;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');

      var serviceArea                       = '{'+formData['woman_service_area'].value+'}';

      jsonData["woman_name"]                = formData['woman_name'].value;
      jsonData["woman_contact_number"]      = formData['woman_contact_number'].value;
      jsonData["woman_email_id"]            = formData['woman_email_id'].value;
      jsonData["woman_body_height"]         = '0';
      jsonData["woman_body_weight"]         = '0';
      jsonData["woman_age"]                 = formData['woman_age'].value;
      jsonData["woman_address"]             = formData['woman_address'].value;
      jsonData["woman_address_2"]           = formData['woman_address_2'].value;
      jsonData["woman_state"]               = formData['woman_state'].value;
      jsonData["woman_postal_code"]         = formData['woman_postal_code'].value;
      jsonData["woman_landmark"]            = formData['woman_landmark'].value;
      jsonData["woman_city"]                = formData['woman_city'].value;
      jsonData["woman_father_name"]         = formData['woman_father_name'].value;
      jsonData["woman_education"]           = formData['woman_education'].value;
      jsonData["woman_school_name"]         = formData['woman_school_name'].value;
      jsonData["woman_school_class"]        = formData['woman_school_class'].value;
      jsonData["woman_school_section"]      = formData['woman_school_section'].value;
      jsonData["toilet_type"]               = formData['toilet_type'].value;
      jsonData["house_type"]                = formData['house_type'].value;
      jsonData["drinking_water_type"]       = formData['drinking_water_type'].value;
      jsonData["is_premature_birth"]        = formData['is_premature_birth'].value;
      jsonData["is_bpl"]                    = 'f';
      jsonData["woman_father_occupation"]   = formData['woman_father_occupation'].value;
      jsonData["is_your_personal_number"]   = formData['is_personal_mobile_number'].value;
      jsonData["special_note"]              = formData['special_note'].value;
      jsonData["woman_whatsup_number"]      = formData['whatsapp'].value;
      jsonData["service_area"]              = serviceArea;

      const response = await fetch(`${API_URL}/addUpdateWomanProfile`, {
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
            <h5 className='mx-2 mb-0'>Update Young Women Basic Info </h5>
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
      <div className='app-body form-all basicinfo-young-woman'>
        <p><small>To update your profile information</small></p>
        <form className="mt-3" name="young_women_form" id="young_women_form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["woman_name"].errorClass}`}>
            <label htmlFor="woman_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_name" id="woman_name" placeholder="Full Name" value={formData["woman_name"].value ? formData["woman_name"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_father_name"].errorClass}`}>
            <label htmlFor="woman_father_name">Name of Parent/Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_father_name" id="woman_father_name" placeholder="Name of Parent/Guardian" value={formData["woman_father_name"].value ? formData["woman_father_name"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_father_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_premature_birth"].errorClass}`}>
            <label htmlFor="premature_birth" className="no-style">Premature Birth? <span className="text-danger">*</span></label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_y" name="is_premature_birth" className="custom-control-input" value="t" checked={(formData["is_premature_birth"].value === 't') ? true : false} onChange={handleChange}/><label className="custom-control-label no-style" htmlFor="premature_birth_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_n" name="is_premature_birth" className="custom-control-input" value="f" checked={(formData["is_premature_birth"].value === 'f') ? true : false} onChange={handleChange}/><label className="custom-control-label no-style" htmlFor="premature_birth_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_premature_birth"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_father_occupation"].errorClass}`}>
            <label htmlFor="woman_father_occupation">Occupation of Guardian <span className="text-danger">*</span></label><input type="text" className="form-control" name="woman_father_occupation" id="woman_father_occupation" placeholder="Occupation of Guardian" value={formData["woman_father_occupation"].value ? formData["woman_father_occupation"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_father_occupation"].errorMessage}</small>
          </div>
          <div className="form-group">
            <label><span className="d-block">Gender  </span></label>
            <select className="form-control" name="gender" id="gender" defaultValue={1}>
              <option value="1">Female</option>
            </select>
          </div>
          <div className={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 't') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_personal_mobile_number"].errorMessage}</small>
          </div>
          <div className="form-group ">
            <label htmlFor="woman_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="woman_contact_number" id="woman_contact_number" placeholder="Phone No" value={formData["woman_contact_number"].value ? formData["woman_contact_number"].value : ''} onChange={handleChange}/>
          </div>
          <div className={`form-group ${formData["whatsapp"].errorClass}`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["whatsapp"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_email_id"].errorClass}`}>
            <label htmlFor="woman_email_id">Email </label>
            <input type="text" className="form-control" name="woman_email_id" id="woman_email_id" placeholder="Email" value={formData["woman_email_id"].value ? formData["woman_email_id"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_email_id"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_age"].errorClass}`}>
            <label htmlFor="woman_age">Age </label>
            <input type="text" className="form-control" name="woman_age" id="woman_age" placeholder="Age" value={formData["woman_age"].value ? formData["woman_age"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_age"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_address"].errorClass}`}>
            <label htmlFor="woman_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_address" id="woman_address" placeholder="Address" value={formData["woman_address"].value ? formData["woman_address"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_address"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_address_2"].errorClass}`}>
            <label htmlFor="woman_address_2">Address 2 </label>
            <input type="text" className="form-control" name="woman_address_2" id="woman_address_2" placeholder="Address 2" value={formData["woman_address_2"].value ? formData["woman_address_2"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_address_2"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_landmark"].errorClass}`}>
            <label htmlFor="woman_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_landmark" id="woman_landmark" placeholder="Landmark" value={formData["woman_landmark"].value ? formData["woman_landmark"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_landmark"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_city"].errorClass}`}>
            <label htmlFor="woman_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_city" id="woman_city" placeholder="Village/Town/City" value={formData["woman_city"].value ? formData["woman_city"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_city"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_state"].errorClass}`}>
            <label htmlFor="woman_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_state" id="woman_state" placeholder="State" value={formData["woman_state"].value ? formData["woman_state"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_state"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_postal_code"].errorClass}`}>
            <label htmlFor="woman_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_postal_code" id="woman_postal_code" placeholder="Pincode" value={formData["woman_postal_code"].value ? formData["woman_postal_code"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_postal_code"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["woman_service_area"].errorClass}`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Dropdown className='form-control select-multi' multi options={options} values={selectedOptions} onChange={handleChange1} />
            <small className="error-mesg">{formData["woman_service_area"].errorMessage}</small>
          </div>
          

          <div className={`d-none form-group ${formData["woman_education"].errorClass}`}>
            <label htmlFor="woman_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_education" id="woman_education" placeholder="Education" value={formData["woman_education"].value ? formData["woman_education"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_education"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_school_name"].errorClass}`}>
            <label htmlFor="woman_school_name">School Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_name" id="woman_school_name" placeholder="School Name" value={formData["woman_school_name"].value ? formData["woman_school_name"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_school_name"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["woman_school_class"].errorClass}`}>
            <label htmlFor="woman_school_class">Class <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_class" id="woman_school_class" placeholder="Class" value={formData["woman_school_class"].value ? formData["woman_school_class"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_school_class"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_school_section"].errorClass}`}>
            <label htmlFor="woman_school_section">Section <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_section" id="woman_school_section" placeholder="Section" value={formData["woman_school_section"].value ? formData["woman_school_section"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["woman_school_section"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["house_type"].errorClass}`}>
            <label htmlFor="house_type">House<span className="text-danger">*</span></label>
            <select className="form-control" name="house_type" id="house_type" defaultValue={formData["house_type"].value ? formData["house_type"].value : '1'} onChange={handleChange}>
              <option value="1">Mud House</option>
              <option value="2">Paved House</option>
            </select>
            <small className="error-mesg">{formData["house_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["drinking_water_type"].errorClass}`}>
            <label htmlFor="drinking_water_type">Drinking Water<span className="text-danger">*</span></label>
            <select className="form-control" name="drinking_water_type" id="drinking_water_type" defaultValue={formData["drinking_water_type"].value ? formData["drinking_water_type"].value : '1'} onChange={handleChange}>
              <option value="1">Tap</option>
              <option value="2">Well</option>
              <option value="3">Pond</option>
            </select>
            <small className="error-mesg">{formData["drinking_water_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["toilet_type"].errorClass}`}>
            <label htmlFor="toilet_type">Toilet<span className="text-danger">*</span></label>
            <select className="form-control" name="toilet_type" id="toilet_type" defaultValue={formData["toilet_type"].value ? formData["toilet_type"].value : '1'} onChange={handleChange}>
              <option value="1">Open-field</option>
              <option value="2">Country-latrine</option>
              <option value="3">Flush-toilet</option>
            </select>
            <small className="error-mesg">{formData["toilet_type"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["special_note"].errorClass}`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" name="special_note" id="special_note" placeholder="Special Notes" value={formData["special_note"].value ? formData["special_note"].value : ''} onChange={handleChange}/>
            <small className="error-mesg">{formData["special_note"].errorMessage}</small>
          </div>
          <div className="mb-3 mt-3 text-center">
            <button type="submit" className="btn primary-bg-color text-light">Update</button></div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default YoungWomanBasicInformation;