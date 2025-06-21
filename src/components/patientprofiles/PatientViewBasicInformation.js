import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Select from 'react-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";
import AppTopNotifications from '../AppTopNotifications';

function PatientViewBasicInformation(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

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

  const getUserDetails = async () => {

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
    
    const response1 = await fetch(`${API_URL}/patientBasicInformationListFromDoctorLogin`, {
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

      formData['patient_name']              = {value:userDetails.patient_name, errorClass:"", errorMessage:""};
      formData['patient_father_name']       = {value:userDetails.patient_father_name, errorClass:"", errorMessage:""};
      formData['patient_is_bpl']            = {value:userDetails.is_under_previledged, errorClass:"", errorMessage:""};
      formData['patient_gender']            = {value:userDetails.patient_gender, errorClass:"", errorMessage:""};
      formData['patient_age']               = {value:userDetails.patient_age, errorClass:"", errorMessage:""};
      formData['patient_education']         = {value:userDetails.patient_education, errorClass:"", errorMessage:""};
      formData['is_personal_mobile_number'] = {value:userDetails.is_your_personal_number, errorClass:"", errorMessage:""};
      formData['patient_phone_no']          = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
      formData['patient_whatsapp_no']       = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
      formData['patient_email']             = {value:userDetails.email_id, errorClass:"", errorMessage:""};
      formData['patient_address']           = {value:userDetails.patient_addr_1, errorClass:"", errorMessage:""};
      formData['patient_address_2']         = {value:userDetails.patient_addr_2, errorClass:"", errorMessage:""};
      formData['patient_landmark']          = {value:userDetails.patient_addr_landmark, errorClass:"", errorMessage:""};
      formData['patient_city']              = {value:userDetails.patient_city, errorClass:"", errorMessage:""};
      formData['patient_state']             = {value:userDetails.patient_state, errorClass:"", errorMessage:""};
      formData['patient_pincode']           = {value:userDetails.patient_postal_code, errorClass:"", errorMessage:""};
      formData['patient_service_area']      = {value:serviceAreaArray.join(","), errorClass:"", errorMessage:""};
      formData['patient_special_notes']     = {value:userDetails.special_notes, errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});

    }

  }

  const [formData, setFormData] = useState({
    patient_name: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_is_bpl: {required: true, value:"t", errorClass:"", errorMessage:""},
    patient_gender: {required: true, value:"male", errorClass:"", errorMessage:""},
    patient_age: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_education: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"t", errorClass:"", errorMessage:""},
    patient_phone_no: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_whatsapp_no: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_email: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_address: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_landmark: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_city: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_state: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_pincode: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);

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
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'> View Patient Basic Info </h5>
            
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
      <div className='app-body create-patient-profiles'>
       
        <p><small>View Patient's profile information</small></p>
        <form className="mt-3 select-box" name="patient_form" id="patient_form">
          <div className={`form-group`}>
            <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_name" id="patient_name" placeholder="Full Name" value={formData["patient_name"].value ? formData["patient_name"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Father's Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_father_name" id="patient_father_name" placeholder="Father's Name" value={formData["patient_father_name"].value ? formData["patient_father_name"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="patient_is_bpl" id="patient_is_bpl" value={formData["patient_is_bpl"].value}> 
              <option value="t">BPL</option>
              <option value="f">APL</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control" name="patient_gender" id="patient_gender" value={formData["patient_gender"].value}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_age" id="patient_age" placeholder="Age" value={formData["patient_age"].value ? formData["patient_age"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_education" id="patient_education" placeholder="Education" value={formData["patient_education"].value ? formData["patient_education"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is patient's personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="is_personal_mobile_number" id="is_personal_mobile_number" value={formData["is_personal_mobile_number"].value}>
              <option value="t">Yes</option>
              <option value="f">No</option>
            </select>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_phone_no" id="patient_phone_no" placeholder="Phone No" value={formData["patient_phone_no"].value ? formData["patient_phone_no"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">WhatsApp No </label>
            <input type="text" className="form-control" name="patient_whatsapp_no" id="patient_whatsapp_no" placeholder="WhatsApp No" value={formData["patient_whatsapp_no"].value ? formData["patient_whatsapp_no"].value : ''}/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="patient_email" id="patient_email" placeholder="Email" value={formData["patient_email"].value ? formData["patient_email"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_address" id="patient_address" placeholder="Address" value={formData["patient_address"].value ? formData["patient_address"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="patient_address_2" id="patient_address_2" placeholder="Address 2" value={formData["patient_address_2"].value ? formData["patient_address_2"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="patient_landmark" id="patient_landmark" placeholder="Landmark" value={formData["patient_landmark"].value ? formData["patient_landmark"].value : ''}/>
            <small className="error-mesg">{formData["patient_landmark"].errorMessage}</small>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_city" id="patient_city" placeholder="Village/Town/City" value={formData["patient_city"].value ? formData["patient_city"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_state" id="patient_state" placeholder="State" value={formData["patient_state"].value ? formData["patient_state"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_pincode" id="patient_pincode" placeholder="Pincode" value={formData["patient_pincode"].value ? formData["patient_pincode"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions} options={serviceAreaOption} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="name">Special Notes </label>
            <input type="text" className="form-control" name="patient_special_notes" id="patient_special_notes" placeholder="Special Notes" value={formData["patient_special_notes"].value ? formData["patient_special_notes"].value : ''}/>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default PatientViewBasicInformation;