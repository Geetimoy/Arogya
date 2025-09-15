import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import  './ElderPersons.css';
import Select from 'react-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";
import AppTopNotifications from '../AppTopNotifications';

function ElderViewBasicInformation(){

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

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      getMasterServicesArea();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  useEffect(() => {

  }, [serviceAreaOption])

  const [formData, setFormData] = useState({
    is_consent: {required:false, value:"2", errorClass:"", errorMessage:""},
    elder_name: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_gender: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_age: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_is_mobile_phone: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_contact_number: {required: true, value:"", errorClass:"", errorMessage:""},
    whatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_email_id: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_address: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_landmark: {required: true, value:"", errorClass:"", errorMessage:""},

    elder_city: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_state: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_education: {required: true, value:"", errorClass:"", errorMessage:""},
    special_note: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["elder_account_key"]   = editAccountKey;
    jsonData["elder_account_type"]  = 3;
    jsonData["doctor_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"] = decryptedLoginDetails.account_type;
    jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]        = DEVICE_TOKEN;
    jsonData["user_lat"]            = localStorage.getItem('latitude');
    jsonData["user_long"]           = localStorage.getItem('longitude');
    jsonData["search_param"]        = {
                                        "by_keywords": "",
                                        "limit": "0",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/elderBasicInformationListFromDoctorLogin`, {
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
      if(result1.data.length > 0){
        let userDetails = result1.data[0];

        var serviceAreaArray = [];
        if(userDetails.service_area_ids && userDetails.service_area_ids !== ''){
          var serviceAreaArray = userDetails.service_area_ids.replace(/^\{|\}$/g,'').split(',');
          var array1 = new Array();
          serviceAreaArray.forEach((item)=>{
            serviceAreaOption.forEach((opt)=>{
              if(opt.value === item){
                array1.push(opt);
              }
            })
          })
          setSelectedOptions(array1);
        }

        formData['is_consent']         = {value:userDetails.is_consent, errorClass:"", errorMessage:""};
        formData['elder_name']         = {value:userDetails.elder_name, errorClass:"", errorMessage:""};
        formData["elder_father_name"]  = {value:userDetails.elder_father_name, errorClass:"", errorMessage:""};
        formData['elder_occupation']   = {value:userDetails.elder_occupation, errorClass:"", errorMessage:""};

        formData['elder_gender']       = {value:userDetails.elder_gender, errorClass:"", errorMessage:""};
        formData['elder_age']          = {value:userDetails.elder_age, errorClass:"", errorMessage:""};
        formData['elder_is_mobile_phone'] = {value:userDetails.elder_is_mobile_phone, errorClass:"", errorMessage:""};
        formData['elder_contact_number'] = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
        formData['whatsapp']           = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
        formData['elder_email_id']     = {value:userDetails.email_id, errorClass:"", errorMessage:""};
        formData['elder_address']      = {value:userDetails.elder_addr_1, errorClass:"", errorMessage:""};
        formData['elder_address_2']    = {value:userDetails.elder_addr_2, errorClass:"", errorMessage:""};
        formData['elder_landmark']     = {value:userDetails.elder_addr_landmark, errorClass:"", errorMessage:""};
        formData['elder_city']         = {value:userDetails.elder_state, errorClass:"", errorMessage:""};
        formData['elder_state']        = {value:userDetails.elder_city, errorClass:"", errorMessage:""};
        formData['elder_postal_code']  = {value:userDetails.elder_postal_code, errorClass:"", errorMessage:""};
        formData['elder_service_area'] = {value:serviceAreaArray.join(","), errorClass:"", errorMessage:""};
        formData['elder_education']  = {value:userDetails.elder_education, errorClass:"", errorMessage:""};
        
        formData['special_note']      = {value:userDetails.special_notes, errorClass:"", errorMessage:""};
  
        setFormData({...formData, ...formData});

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
              <Link to="/elder-persons" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>View Elder Basic Info</h5>
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
      <div className='app-body form-all basicinfo-elder-persons'>
        <p><small>View Elder profile information</small></p>
        <div className='form-check-box'>     
          <label className="custom-chk custom-checkbox">With your consent, this information is to be used for Elder Person and other legitimate purposes only.
            <input type="checkbox" className="required" name="is_consent" value="1" readOnly checked={formData["is_consent"].value === "1" ? true : false}/>
            <span className="checkmark"></span>
          </label>
        </div>
        <form className="mt-3 select-box" name="elder_person_form" id="elder_person_form">
       
          <div className={`form-group`}>
            <label htmlFor="elder_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_name" id="elder_name" placeholder="Full Name" value={formData["elder_name"].value ? formData["elder_name"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_father_name">Name of Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_father_name" id="elder_father_name" value={formData["elder_father_name"].value ? formData["elder_father_name"].value : ''} placeholder="Name of Guardian" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_occupation">Occupation <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_occupation" id="elder_occupation" value={formData["elder_occupation"].value ? formData["elder_occupation"].value : ''} placeholder="Occupation" />
          </div>
          <div className={`form-group`}>
            <label>Gender  <span className="text-danger">*</span></label>
            <select className="form-control" value={formData["elder_gender"].value} name="elder_gender" id="elder_gender">
              <option value="0">Select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_age" id="elder_age" placeholder="Age" value={formData["elder_age"].value ? formData["elder_age"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is elder's personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="elder_is_mobile_phone" className="custom-control-input" value="t" checked={(formData["elder_is_mobile_phone"].value === 't') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="elder_is_mobile_phone" className="custom-control-input" value="f" checked={(formData["elder_is_mobile_phone"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" value={formData["elder_contact_number"].value ? formData["elder_contact_number"].value : ''} name="elder_contact_number" id="elder_contact_number" placeholder="Phone No" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} name="whatsapp" id="whatsapp" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_email_id">Email </label>
            <input type="text" className="form-control" value={formData["elder_email_id"].value ? formData["elder_email_id"].value : ''} name="elder_email_id" id="elder_email_id" placeholder="Email" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_address"].value ? formData["elder_address"].value : ''} name="elder_address" id="elder_address" placeholder="Address" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_address_2">Address 2 </label>
            <input type="text" className="form-control" value={formData["elder_address"].value ? formData["elder_address"].value : ''} name="elder_address_2" id="elder_address_2" placeholder="Address 2" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_landmark"].value ? formData["elder_landmark"].value : ''} name="elder_landmark" id="elder_landmark" placeholder="Landmark" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_city"].value ? formData["elder_city"].value : ''} name="elder_city" id="elder_city" placeholder="Village/Town/City" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_state"].value ? formData["elder_state"].value : ''} name="elder_state" id="elder_state" placeholder="State" />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_postal_code"].value ? formData["elder_postal_code"].value : ''} name="elder_postal_code" id="elder_postal_code" placeholder="Pincode" />
          </div>
          <div className={`form-group`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions} options={serviceAreaOption} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="elder_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value={formData["elder_education"].value ? formData["elder_education"].value : ''} name="elder_education" id="elder_education" placeholder="Education" />
          </div>
          <div className="form-group">
            <label htmlFor="sub_volunteer_name">Sub Volunteer Name</label>
            <select className="form-control" name="sub_volunteer_name" id="sub_volunteer_name">
              <option value="1">Sub Volunteer1</option>
              <option value="2">Sub Volunteer2</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" value={formData["special_note"].value ? formData["special_note"].value : ''} name="special_note" id="special_note" placeholder="Special Notes" />
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ElderViewBasicInformation;