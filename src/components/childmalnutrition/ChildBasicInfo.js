import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import './ChildMalnutrition.css';

import Select from 'react-select';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

export default function ChildBasicInfo() {
    const systemContext = useContext(SystemContext);
    const alertContext  = useContext(AlertContext);
  
    const [urlParam, setUrlParam] = useState(useParams());
    const editAccountKey = urlParam.accountKey;

    const [isMActive, setIsMActive] = useState(false);
  
    const handle2Click = () => {
      setIsMActive(!isMActive); // Toggle the state
    };
  
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [serviceAreaOption, setServiceAreaOption] = useState([
      { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
      { label: 'Navagraha Temple, Guwahati', value: '2' },
      { label: 'Umananda Temple, Guwahati', value: '3' },
      { label: 'Morigaon', value: '4' },
      { label: 'Saparam Bera', value: '5' }
    ]);
    const handleChange1 = (values) => {
      var selectedArea = [];
      if(values.length > 0){
        values.forEach((item, index) => {
          selectedArea.push(item.value);
        })
      }
      if(selectedArea.length > 0){
        setFormData({...formData, ['child_service_area']: {...formData['child_service_area'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
      }
      else{
        setFormData({...formData, ['child_service_area']: {...formData['child_service_area'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
      }
      setSelectedOptions(values);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target; console.log(value);
      if(value.trim() !== ""){
        setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
      }
      else{
        setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
      }
    }

    const [formData, setFormData] = useState({
      child_full_name: {required: true, value:"", errorClass:"", errorMessage:""},
      child_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
      child_mother_name: {required: true, value:"", errorClass:"", errorMessage:""},
      is_premature_birth: {required: true, value:"", errorClass:"", errorMessage:""},
      child_guardian_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
      child_bpl_apl: {required: true, value:"t", errorClass:"", errorMessage:""},
      child_gender: {required: true, value:"1", errorClass:"", errorMessage:""},
      child_age: {required: true, value:"", errorClass:"", errorMessage:""},
      is_your_personal_mobile_number: {required: true, value:"t", errorClass:"", errorMessage:""},
      child_phone_no: {required: true, value:"", errorClass:"", errorMessage:""},
      child_whatsapp_no: {required: false, value:"", errorClass:"", errorMessage:""},
      child_email: {required: false, value:"", errorClass:"", errorMessage:""},
      child_address: {required: true, value:"", errorClass:"", errorMessage:""},
      child_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
      child_landmark: {required: false, value:"", errorClass:"", errorMessage:""},
      child_city: {required: true, value:"", errorClass:"", errorMessage:""},
      child_state: {required: true, value:"", errorClass:"", errorMessage:""},
      child_pincode: {required: true, value:"", errorClass:"", errorMessage:""},
      child_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
      child_school_name: {required: true, value:"", errorClass:"", errorMessage:""},
      child_school_class: {required: true, value:"", errorClass:"", errorMessage:""},
      child_school_section: {required: true, value:"", errorClass:"", errorMessage:""},
      house_type: {required: true, value:"1", errorClass:"", errorMessage:""},
      drinking_water_type: {required: true, value:"1", errorClass:"", errorMessage:""},
      toilet_type: {required: true, value:"1", errorClass:"", errorMessage:""},
      special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
    });
  
    const getUserDetails = async () => {

        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

        let jsonData = {};

        jsonData['system_id']           = systemContext.systemDetails.system_id;
        jsonData["child_account_key"]   = editAccountKey;
        jsonData["child_account_type"]  = 3;
        jsonData["user_login_id"]       = decryptedLoginDetails.login_id
        jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
        jsonData["device_token"]        = DEVICE_TOKEN;
        jsonData["user_lat"]            = localStorage.getItem('latitude');
        jsonData["user_long"]           = localStorage.getItem('longitude');
        jsonData["search_param"]        = {
                                            "by_keywords": "",
                                            "limit": "10",
                                            "offset": "0",
                                            "order_by_field": "account_id",
                                            "order_by_value": "desc"
                                            }
        
        const response1 = await fetch(`${API_URL}/childBasicInformationList`, {
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

            var serviceAreaArray = [];
            if(userDetails.service_area_ids && userDetails.service_area_ids !== ''){
              serviceAreaArray = userDetails.service_area_ids.replace(/^\{|\}$/g,'').split(',');
              console.log(serviceAreaArray);
              var array1 = new Array();
              serviceAreaArray.forEach((item)=>{
                serviceAreaOption.forEach((opt)=>{
                  if(opt.value == item){
                    array1.push(opt);
                  }
                })
              })
              setSelectedOptions(array1);

            }
            console.log(serviceAreaArray.join(","));
            formData['child_full_name']    = {value:userDetails.child_name, errorClass:"", errorMessage:""};
            formData['child_father_name']  = {value:userDetails.child_father_name, errorClass:"", errorMessage:""};
            formData['child_mother_name']  = {value:userDetails.child_mother_name, errorClass:"", errorMessage:""};
            formData['is_premature_birth'] = {value:userDetails.child_is_premature_birth, errorClass:"", errorMessage:""};
            formData['child_guardian_occupation'] = {value:userDetails.child_father_occupation, errorClass:"", errorMessage:""};
            formData['child_bpl_apl']      = {value:userDetails.child_is_under_previledged, errorClass:"", errorMessage:""};
            formData['child_gender']       = {value:userDetails.child_gender, errorClass:"", errorMessage:""};
            formData['child_age']          = {value:userDetails.child_age, errorClass:"", errorMessage:""};
            formData['is_your_personal_mobile_number']   = {value:userDetails.is_your_personal_number, errorClass:"", errorMessage:""};
            formData['child_phone_no']     = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
            formData['child_whatsapp_no']  = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
            formData['child_email']        = {value:userDetails.email_id, errorClass:"", errorMessage:""};
            formData['child_address']      = {value:userDetails.child_addr_1, errorClass:"", errorMessage:""};
            formData['child_address_2']    = {value:userDetails.child_addr_2, errorClass:"", errorMessage:""};
            formData['child_landmark']     = {value:userDetails.child_addr_landmark, errorClass:"", errorMessage:""};
            formData['child_city']         = {value:userDetails.child_city, errorClass:"", errorMessage:""};
            formData['child_state']        = {value:userDetails.child_state, errorClass:"", errorMessage:""};
            formData['child_pincode']      = {value:userDetails.child_postal_code, errorClass:"", errorMessage:""};
            formData['child_service_area'] = {value:serviceAreaArray.join(","), errorClass:"", errorMessage:""};
            formData['child_school_name']  = {value:userDetails.child_school_name, errorClass:"", errorMessage:""};
            formData['child_school_class'] = {value:userDetails.child_school_class, errorClass:"", errorMessage:""};
            formData['child_school_section']  = {value:userDetails.child_school_section, errorClass:"", errorMessage:""};
            formData['house_type']         = {value:userDetails.child_house_type, errorClass:"", errorMessage:""};
            formData['drinking_water_type']= {value:userDetails.child_drinking_water_type, errorClass:"", errorMessage:""};
            formData['toilet_type']        = {value:userDetails.child_toilet_type, errorClass:"", errorMessage:""};
            formData['special_notes']      = {value:userDetails.special_notes, errorClass:"", errorMessage:""};

            setFormData({...formData, ...formData});

            
        }

    }

    const handleFormSubmit = async (e) => {
      e.preventDefault(); 
      let errorCounter = validateForm();
      if(errorCounter === 0){
  
        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  
        let jsonData = {};
        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["child_account_key"]         = editAccountKey;
        jsonData["child_account_type"]        = 3;
        jsonData["introducer_account_key"]    = decryptedLoginDetails.account_key;
        jsonData["introducer_account_type"]   = decryptedLoginDetails.account_type;
        jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
        jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
        jsonData["device_token"]              = DEVICE_TOKEN;
        jsonData["user_lat"]                  = localStorage.getItem('latitude');
        jsonData["user_long"]                 = localStorage.getItem('longitude');
  
        var serviceArea                       = '{'+formData['child_service_area'].value+'}';
  
        jsonData["child_body_height"]         = '0';
        jsonData["child_body_weight"]         = '0';
        jsonData["child_name"]                = formData['child_full_name'].value;
        jsonData["child_father_name"]         = formData['child_father_name'].value;
        jsonData["child_mother_name"]         = formData['child_mother_name'].value;
        jsonData["is_premature_birth"]        = formData['is_premature_birth'].value;
        jsonData["child_father_occupation"]   = formData['child_guardian_occupation'].value;
        jsonData["is_bpl"]                    = formData['child_bpl_apl'].value;
        jsonData["child_age"]                 = formData['child_age'].value;
        jsonData["child_gender"]              = formData['child_gender'].value;
        jsonData["is_your_personal_number"]   = formData['is_your_personal_mobile_number'].value;
        jsonData["child_contact_number"]      = formData['child_phone_no'].value;
        jsonData["child_whatsup_number"]      = formData['child_whatsapp_no'].value;
        jsonData["child_email_id"]            = formData['child_email'].value;
        jsonData["child_address"]             = formData['child_address'].value;
        jsonData["child_address_2"]           = formData['child_address_2'].value;
        jsonData["child_landmark"]            = formData['child_landmark'].value;
        jsonData["child_city"]                = formData['child_city'].value;
        jsonData["child_state"]               = formData['child_state'].value;
        jsonData["child_postal_code"]         = formData['child_pincode'].value;
        jsonData["service_area"]              = serviceArea;
        jsonData["child_school_name"]         = formData['child_school_name'].value;
        jsonData["child_school_class"]        = formData['child_school_class'].value;
        jsonData["child_school_section"]      = formData['child_school_section'].value;
        jsonData["house_type"]                = formData['house_type'].value;
        jsonData["drinking_water_type"]       = formData['drinking_water_type'].value;
        jsonData["toilet_type"]               = formData['toilet_type'].value;
        jsonData["special_note"]              = formData['special_notes'].value;
  
        const response = await fetch(`${API_URL}/addUpdateChildBasicInformation`, {
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
          if((element === "child_email") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
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

    useEffect(() => {

      if(systemContext.systemDetails.system_id){
        getUserDetails();
      }
  
      // eslint-disable-next-line
      
    }, [systemContext.systemDetails.system_id]);

    useEffect(() => {
      if(systemContext.systemDetails.system_id){
        getMasterServicesArea();
      }
      // eslint-disable-next-line
    }, [systemContext.systemDetails.system_id]);
  
    useEffect(() => {
  
    }, [serviceAreaOption])
  
    const getMasterServicesArea = async (e) => {
  
      let jsonData = {};
  
      jsonData['system_id']        = systemContext.systemDetails.system_id;
      jsonData["device_type"]      = DEVICE_TYPE;
      jsonData["device_token"]     = DEVICE_TOKEN;
      jsonData["user_lat"]         = localStorage.getItem('latitude');
      jsonData["user_long"]        = localStorage.getItem('longitude');
      jsonData["center_id"]        = 1;
  
      const response = await fetch(`${API_URL}/masterServiceAreas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
  
      let result = await response.json();
  
      if(result.data.rows > 0){
        var areas         = result.data.results;
        var optionsArray  = [];
        for(var i=0; i<areas.length; i++){
          optionsArray[i] = {label: areas[i].service_area_name+', '+areas[i].service_area_state, value: areas[i].service_area_id}
        }
        setServiceAreaOption(optionsArray);
      }
  
    }
  
    return(
      <>
        <div className='app-top inner-app-top services-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/child-malnutrition" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Update Child Basic Info </h5>
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
        <div className='app-body create-patient-profiles create-child-malnutrition'>
         
          <p><small>To update your profile information</small></p>
          <form className="mt-3 select-box" name="child_malnutrition_form" id="child_malnutrition_form" onSubmit={handleFormSubmit}>
            <div className={`form-group ${formData["child_full_name"].errorClass}`}>
              <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_full_name" id="child_full_name" placeholder="Full Name" onChange={handleChange} value={formData["child_full_name"].value ? formData["child_full_name"].value : ''}/>
              <small className="error-mesg">{formData["child_full_name"].errorMessage}</small>
            </div>
            {/* <div className={`form-group ${formData["child_user_id"].errorClass}`}>
              <label htmlFor="name">User ID <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_user_id" id="child_user_id" placeholder="User ID" onChange={handleChange} value={formData["child_user_id"].value ? formData["child_user_id"].value : ''}/>
              <small className="error-mesg">{formData["child_user_id"].errorMessage}</small>
            </div> */}
            <div className={`form-group ${formData["child_father_name"].errorClass}`}>
              <label htmlFor="child_father_name">Name of Father <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_father_name" id="child_father_name" placeholder="Name of Father" onChange={handleChange} value={formData["child_father_name"].value ? formData["child_father_name"].value : ''}/>
              <small className="error-mesg">{formData["child_father_name"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_mother_name"].errorClass}`}>
              <label htmlFor="child_mother_name">Name of Mother <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_mother_name" id="child_mother_name" placeholder="Name of Mother" onChange={handleChange} value={formData["child_mother_name"].value ? formData["child_mother_name"].value : ''}/>
              <small className="error-mesg">{formData["child_mother_name"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["is_premature_birth"].errorClass}`}>
              <label htmlFor="premature_birth" className='no-style'>Premature Birth? <span className="text-danger">*</span></label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="premature_birth_y" name="is_premature_birth" value="t" className="custom-control-input" onChange={handleChange} checked={(formData["is_premature_birth"].value === 't') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="premature_birth_y">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="premature_birth_n" name="is_premature_birth" value="f" className="custom-control-input" onChange={handleChange} checked={(formData["is_premature_birth"].value === 'f') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="premature_birth_n">No</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="premature_birth_na" name="is_premature_birth" value="n" className="custom-control-input" onChange={handleChange} checked={(formData["is_premature_birth"].value === 'n') ? true : false}/>
                  <label className="custom-control-label no-style" htmlFor="premature_birth_na">N/A</label>
                </div>
              </div>
              <small className="error-mesg">{formData["is_premature_birth"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["child_guardian_occupation"].errorClass}`}>
              <label htmlFor="child_guardian_occupation">Occupation of Guardian <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_guardian_occupation" id="child_guardian_occupation" placeholder="Occupation of Guardian" onChange={handleChange} value={formData["child_guardian_occupation"].value ? formData["child_guardian_occupation"].value : ''}/>
              <small className="error-mesg">{formData["child_guardian_occupation"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["child_bpl_apl"].errorClass}`}>
              <label className=""><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
              <select className="form-control" id="child_bpl_apl" name="child_bpl_apl" value={formData["child_bpl_apl"].value} onChange={handleChange}>
                <option value="t">BPL</option>
                <option value="f">APL</option>
              </select>
              <small className="error-mesg">{formData["child_bpl_apl"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_gender"].errorClass}`}>
              <label className=""><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
              <select className="form-control" id="child_gender" name="child_gender" value={formData["child_gender"].value} onChange={handleChange}>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              <small className="error-mesg">{formData["child_gender"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_age"].errorClass}`}>
              <label htmlFor="child_age">Age <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_age" id="child_age" placeholder="Age"  onChange={handleChange} value={formData["child_age"].value ? formData["child_age"].value : ''}/>
              <small className="error-mesg">{formData["child_age"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["is_your_personal_mobile_number"].errorClass}`}>
              <label className=""><span className="d-block">Is guardian's personal mobile number? <span className="text-danger">*</span></span> </label>
              <select className="form-control" id="is_your_personal_mobile_number" name="is_your_personal_mobile_number" value={formData["is_your_personal_mobile_number"].value} onChange={handleChange}>
                <option value="t">Yes</option>
                <option value="f">No</option>
              </select>
              <small className="error-mesg">{formData["is_your_personal_mobile_number"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_phone_no"].errorClass}`}>
              <label htmlFor="child_phone_no">Phone No <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" name="child_phone_no" id="child_phone_no" placeholder="Phone No" onChange={handleChange} value={formData["child_phone_no"].value ? formData["child_phone_no"].value : ''}/>
              <small className="error-mesg">{formData["child_phone_no"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_whatsapp_no"].errorClass}`}>
              <label htmlFor="child_whatsapp_no">WhatsApp No </label>
              <input type="tel" className="form-control" name="child_whatsapp_no" id="child_whatsapp_no" placeholder="WhatsApp No" onChange={handleChange} value={formData["child_whatsapp_no"].value ? formData["child_whatsapp_no"].value : ''}/>
              <small className="error-mesg">{formData["child_whatsapp_no"].errorMessage}</small>
            </div>
            <div className="form-group">
              <label htmlFor="child_email">Email </label>
              <input type="text" className="form-control" name="child_email" id="child_email" placeholder="Email" onChange={handleChange} value={formData["child_email"].value ? formData["child_email"].value : ''}/>
              {/* <small className="error-mesg">{formData["child_email"].errorMessage}</small> */}
            </div>
            <div className={`form-group ${formData["child_address"].errorClass}`}>
              <label htmlFor="child_address">Address <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_address" id="child_address" placeholder="Address" onChange={handleChange} value={formData["child_address"].value ? formData["child_address"].value : ''}/>
              <small className="error-mesg">{formData["child_address"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_address_2"].errorClass}`}>
              <label htmlFor="child_address_2">Address 2 <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_address_2" id="child_address_2" placeholder="Address 2" onChange={handleChange} value={formData["child_address_2"].value ? formData["child_address_2"].value : ''}/>
              <small className="error-mesg">{formData["child_address_2"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_landmark"].errorClass}`}>
              <label htmlFor="child_landmark">Landmark </label>
              <input type="text" className="form-control" name="child_landmark" id="child_landmark" placeholder="Landmark" onChange={handleChange} value={formData["child_landmark"].value ? formData["child_landmark"].value : ''}/>
              <small className="error-mesg">{formData["child_landmark"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_city"].errorClass}`}>
              <label htmlFor="child_city">Village/Town/City <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_city" id="child_city" placeholder="Village/Town/City" onChange={handleChange} value={formData["child_city"].value ? formData["child_city"].value : ''}/>
              <small className="error-mesg">{formData["child_city"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["child_state"].errorClass}`}>
              <label htmlFor="child_state">State <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_state" id="child_state" placeholder="State" onChange={handleChange} value={formData["child_state"].value ? formData["child_state"].value : ''}/>
              <small className="error-mesg">{formData["child_state"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_pincode"].errorClass}`}>
              <label htmlFor="child_pincode">Pincode <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_pincode" id="child_pincode" placeholder="Pincode" onChange={handleChange} value={formData["child_pincode"].value ? formData["child_pincode"].value : ''}/>
              <small className="error-mesg">{formData["child_pincode"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_service_area"].errorClass}`}>
              <label>Service Area <span className='text-danger'> *</span></label>
              <Select className='form-control select-multi' isMulti value={selectedOptions} onChange={handleChange1} options={serviceAreaOption} />
              <small className="error-mesg">{formData["child_service_area"].errorMessage}</small>
            </div>
  
            <div className={`sp-notes form-group ${formData["child_school_name"].errorClass}`}>
              <label htmlFor="child_school_name">School Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_school_name" id="child_school_name" placeholder="School Name" onChange={handleChange} value={formData["child_school_name"].value ? formData["child_school_name"].value : ''}/>
              <small className="error-mesg">{formData["child_school_name"].errorMessage}</small>
            </div>
            <div className={`sp-notes form-group ${formData["child_school_class"].errorClass}`}>
              <label htmlFor="child_school_class">Class <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_school_class" id="child_school_class" placeholder="Class" onChange={handleChange} value={formData["child_school_class"].value ? formData["child_school_class"].value : ''}/>
              <small className="error-mesg">{formData["child_school_class"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["child_school_section"].errorClass}`}>
              <label htmlFor="child_school_section">Section <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="child_school_section" id="child_school_section" placeholder="Section" onChange={handleChange} value={formData["child_school_section"].value ? formData["child_school_section"].value : ''}/>
              <small className="error-mesg">{formData["child_school_section"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["house_type"].errorClass}`}>
              <label htmlFor="house_type">House<span className="text-danger">*</span></label>
              <select className="form-control" name="house_type" id="house_type" value={formData["house_type"].value} onChange={handleChange}>
                <option value="1">Mud House</option>
                <option value="2">Paved House</option>
              </select>
              <small className="error-mesg">{formData["house_type"].errorMessage}</small>
            </div>
  
            <div className={`form-group ${formData["drinking_water_type"].errorClass}`}>
              <label htmlFor="drinking_water_type">Drinking Water<span className="text-danger">*</span></label>
              <select className="form-control" name="drinking_water_type" id="drinking_water_type" value={formData["drinking_water_type"].value} onChange={handleChange}>
                <option value="1">Tap</option>
                <option value="2">Well</option>
                <option value="3">Pond</option>
              </select>
              <small className="error-mesg">{formData["drinking_water_type"].errorMessage}</small>
            </div>

            <div className={`form-group ${formData["toilet_type"].errorClass}`}>
            <label htmlFor="toilet_type">Toilet<span className="text-danger">*</span></label>
            <select className="form-control" name="toilet_type" id="toilet_type" value={formData["toilet_type"].value ? formData["toilet_type"].value : '1'} onChange={handleChange}>
              <option value="1">Open-field</option>
              <option value="2">Country-latrine</option>
              <option value="3">Flush-toilet</option>
            </select>
            <small className="error-mesg">{formData["toilet_type"].errorMessage}</small>
          </div>
  
            <div className={`form-group ${formData["special_notes"].errorClass}`}>
              <label htmlFor="special_notes">Special Notes </label>
              <input type="text" className="form-control" name="special_notes" id="special_notes" placeholder="Special Notes" onChange={handleChange} value={formData["special_notes"].value ? formData["special_notes"].value : ''}/>
              <small className="error-mesg">{formData["special_notes"].errorMessage}</small>
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
