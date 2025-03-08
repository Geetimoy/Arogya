import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Dropdown from 'react-dropdown-select';
import Select from 'react-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import './YoungWomanBasicInformation.css' 


function YoungWomanViewBasicInformation(){

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
    woman_email_id: {required: false, value:"", errorClass:"", errorMessage:""},
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

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["woman_account_key"]   = editAccountKey;
    jsonData["woman_account_type"]  = 3;
    jsonData["doctor_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"] = decryptedLoginDetails.account_type;
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
    
    const response1 = await fetch(`${API_URL}/womanBasicInformationListFromDoctorLogin`, {
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
      console.log(userDetails.service_area_ids);
      var serviceAreaArray = [];
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
      formData['woman_service_area']      = {value:serviceAreaArray.join(","), errorClass:"", errorMessage:""};
      formData['woman_education']         = {value:userDetails.women_education, errorClass:"", errorMessage:""};
      formData['woman_school_name']       = {value:userDetails.women_school_name, errorClass:"", errorMessage:""};
      formData['woman_school_class']      = {value:userDetails.women_school_class, errorClass:"", errorMessage:""};
      formData['woman_school_section']    = {value:userDetails.women_school_section, errorClass:"", errorMessage:""};
      formData['toilet_type']             = {value:userDetails.women_toilet_type, errorClass:"", errorMessage:""};
      formData['house_type']              = {value:userDetails.women_house_type, errorClass:"", errorMessage:""};
      formData['drinking_water_type']     = {value:userDetails.women_drinking_water_type, errorClass:"", errorMessage:""};
      formData['special_note']            = {value:userDetails.special_notes, errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});

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
            <h5 className='mx-2 mb-0'>View Young Women Basic Info </h5>
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
        <p><small>Young Women profile information</small></p>
        <form className="mt-3 select-box" name="young_women_form" id="young_women_form">
          <div className={`form-group`}>
            <label htmlFor="woman_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_name" id="woman_name" placeholder="Full Name" value={formData["woman_name"].value ? formData["woman_name"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_father_name">Name of Parent/Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_father_name" id="woman_father_name" placeholder="Name of Parent/Guardian" value={formData["woman_father_name"].value ? formData["woman_father_name"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="premature_birth" className="no-style">Premature Birth? <span className="text-danger">*</span></label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_y" name="is_premature_birth" className="custom-control-input" value="t" checked={(formData["is_premature_birth"].value === 't') ? true : false}/><label className="custom-control-label no-style" htmlFor="premature_birth_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_n" name="is_premature_birth" className="custom-control-input" value="f" checked={(formData["is_premature_birth"].value === 'f') ? true : false}/><label className="custom-control-label no-style" htmlFor="premature_birth_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_father_occupation">Occupation of Guardian <span className="text-danger">*</span></label><input type="text" className="form-control" name="woman_father_occupation" id="woman_father_occupation" placeholder="Occupation of Guardian" value={formData["woman_father_occupation"].value ? formData["woman_father_occupation"].value : ''} />
            <small className="error-mesg">{formData["woman_father_occupation"].errorMessage}</small>
          </div>
          <div className="form-group">
            <label><span className="d-block">Gender  </span></label>
            <select className="form-control" name="gender" id="gender" defaultValue={1}>
              <option value="1">Female</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is woman's personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" checked={(formData["is_personal_mobile_number"].value === 't') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f" checked={(formData["is_personal_mobile_number"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group ">
            <label htmlFor="woman_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="woman_contact_number" id="woman_contact_number" placeholder="Phone No" value={formData["woman_contact_number"].value ? formData["woman_contact_number"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''}/>
          </div>
          <div className="form-group">
            <label htmlFor="woman_email_id">Email </label>
            <input type="text" className="form-control" name="woman_email_id" id="woman_email_id" placeholder="Email" value={formData["woman_email_id"].value ? formData["woman_email_id"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_age" id="woman_age" placeholder="Age" value={formData["woman_age"].value ? formData["woman_age"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_address" id="woman_address" placeholder="Address" value={formData["woman_address"].value ? formData["woman_address"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_address_2">Address 2 </label>
            <input type="text" className="form-control" name="woman_address_2" id="woman_address_2" placeholder="Address 2" value={formData["woman_address_2"].value ? formData["woman_address_2"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_landmark" id="woman_landmark" placeholder="Landmark" value={formData["woman_landmark"].value ? formData["woman_landmark"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_city" id="woman_city" placeholder="Village/Town/City" value={formData["woman_city"].value ? formData["woman_city"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_state" id="woman_state" placeholder="State" value={formData["woman_state"].value ? formData["woman_state"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_postal_code" id="woman_postal_code" placeholder="Pincode" value={formData["woman_postal_code"].value ? formData["woman_postal_code"].value : ''}/>
          </div>

          <div className={`form-group`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions} options={options} />
          </div>
          

          <div className={`d-none form-group`}>
            <label htmlFor="woman_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_education" id="woman_education" placeholder="Education" value={formData["woman_education"].value ? formData["woman_education"].value : ''}/>
          </div>
          <div className={`sp-notes form-group`}>
            <label htmlFor="woman_school_name">School Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_name" id="woman_school_name" placeholder="School Name" value={formData["woman_school_name"].value ? formData["woman_school_name"].value : ''} />
          </div>

          <div className={`sp-notes form-group`}>
            <label htmlFor="woman_school_class">Class <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_class" id="woman_school_class" placeholder="Class" value={formData["woman_school_class"].value ? formData["woman_school_class"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="woman_school_section">Section <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_school_section" id="woman_school_section" placeholder="Section" value={formData["woman_school_section"].value ? formData["woman_school_section"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="house_type">House<span className="text-danger">*</span></label>
            <select className="form-control" name="house_type" id="house_type" value={formData["house_type"].value ? formData["house_type"].value : '1'}>
              <option value="1">Mud House</option>
              <option value="2">Paved House</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="drinking_water_type">Drinking Water<span className="text-danger">*</span></label>
            <select className="form-control" name="drinking_water_type" id="drinking_water_type" value={formData["drinking_water_type"].value ? formData["drinking_water_type"].value : '1'}>
              <option value="1">Tap</option>
              <option value="2">Well</option>
              <option value="3">Pond</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="toilet_type">Toilet<span className="text-danger">*</span></label>
            <select className="form-control" name="toilet_type" id="toilet_type" value={formData["toilet_type"].value ? formData["toilet_type"].value : '1'}>
              <option value="1">Open-field</option>
              <option value="2">Country-latrine</option>
              <option value="3">Flush-toilet</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" name="special_note" id="special_note" placeholder="Special Notes" value={formData["special_note"].value ? formData["special_note"].value : ''}/>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default YoungWomanViewBasicInformation;