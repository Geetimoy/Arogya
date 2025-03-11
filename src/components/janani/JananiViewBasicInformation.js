import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function JananiViewBasicInformation(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

  const [periodMissedDate, setPeriodMissedDate] = useState('');
  const [conceptionDate, setConceptionDate]     = useState('');

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    janani_name: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_age: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_husband: {required: true, value:"", errorClass:"", errorMessage:""},
    period_missed: {required: true, value:"", errorClass:"", errorMessage:""},
    conception_date: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_education: {required: true, value:"", errorClass:"", errorMessage:""},
    doctor_name: {required: true, value:"", errorClass:"", errorMessage:""},
    hospital_name: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_contact_number: {required: true, value:"", errorClass:"", errorMessage:""},
    whatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    janani_email_id: {required: false, value:"", errorClass:"", errorMessage:""},
    janani_address: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    janani_state: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_city: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_landmark: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    special_note: {required: false, value:"", errorClass:"", errorMessage:""},
  });

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']           = systemContext.systemDetails.system_id;
    jsonData["janani_account_key"]  = editAccountKey;
    jsonData["janani_account_type"] = 3;
    jsonData["doctor_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"] = decryptedLoginDetails.account_type;
    jsonData["device_type"]         = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]        = DEVICE_TOKEN;
    jsonData["user_lat"]            = localStorage.getItem('latitude');
    jsonData["user_long"]           = localStorage.getItem('longitude');
    jsonData["search_param"]        = {
                                        "by_keywords": "",
                                        "limit": "2",
                                        "offset": "0",
                                        "order_by_field": "account_id",
                                        "order_by_value": "desc"
                                      }
    
    const response1 = await fetch(`${API_URL}/jananiBasicInformationListFromDoctorLogin`, {
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

        formData['janani_name']       = {value:userDetails.janani_name, errorClass:"", errorMessage:""};
        formData['janani_age']        = {value:userDetails.janani_age, errorClass:"", errorMessage:""};
        formData['janani_husband']    = {value:userDetails.janani_husband_name, errorClass:"", errorMessage:""};
        formData['period_missed']     = {value:userDetails.date_missed_first_period, errorClass:"", errorMessage:""};
        setPeriodMissedDate(userDetails.date_missed_first_period);
        formData['conception_date']   = {value:userDetails.estimate_conception_date, errorClass:"", errorMessage:""};
        setConceptionDate(userDetails.estimate_conception_date);
        formData['janani_education']  = {value:userDetails.janani_education, errorClass:"", errorMessage:""};
        formData['doctor_name']       = {value:userDetails.involved_doctor_name, errorClass:"", errorMessage:""};
        formData['hospital_name']     = {value:userDetails.involved_hospital_name, errorClass:"", errorMessage:""};
        formData['is_personal_mobile_number'] = {value:userDetails.is_your_personal_number, errorClass:"", errorMessage:""};
        formData['janani_contact_number']  = {value:userDetails.contact_no, errorClass:"", errorMessage:""};
        formData['whatsapp']          = {value:userDetails.whatsapp_no, errorClass:"", errorMessage:""};
        formData['janani_email_id']   = {value:userDetails.email_id, errorClass:"", errorMessage:""};
        formData['janani_address']    = {value:userDetails.janani_addr_1, errorClass:"", errorMessage:""};
        formData['janani_address_2']  = {value:userDetails.janani_addr_2, errorClass:"", errorMessage:""};
        formData['janani_state']      = {value:userDetails.janani_city, errorClass:"", errorMessage:""};
        formData['janani_city']       = {value:userDetails.janani_state, errorClass:"", errorMessage:""};
        formData['janani_landmark']   = {value:userDetails.janani_addr_landmark, errorClass:"", errorMessage:""};
        formData['janani_postal_code']= {value:userDetails.janani_postal_code, errorClass:"", errorMessage:""};
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
              <Link to="/janani" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>View Janani Basic Info</h5>
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
      <div className='app-body form-all create-janani'>
        <p><small>View your profile information</small></p>
        <form className="mt-3" name="create_janani_form" id="create_janani_form">
          <div className={`form-group`}>
            <label htmlFor="janani_name">Janani Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_name" id="janani_name" placeholder="Janani Name" value={formData["janani_name"].value ? formData["janani_name"].value : ''}/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_age" id="janani_age" placeholder="Age" value={formData["janani_age"].value ? formData["janani_age"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_husband">Husband Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_husband" id="janani_husband" placeholder="Husband Name" value={formData["janani_husband"].value ? formData["janani_husband"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="period_missed">First Period Missed Date <span className="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={periodMissedDate} className='form-control' />
          </div>
          <div className={`form-group ${formData["conception_date"].errorClass}`}>
            <label htmlFor="conception_date">Estimated Conception Date <span className="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={conceptionDate} className='form-control'/>
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_education">Janani Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_education" id="janani_education" placeholder="Janani Education" value={formData["janani_education"].value ? formData["janani_education"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="doctor_name">Involved Doctor Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="doctor_name" id="doctor_name" placeholder="Involved Doctor Name" value={formData["doctor_name"].value ? formData["doctor_name"].value : ''} />
            <small className="error-mesg">{formData["doctor_name"].errorMessage}</small>
          </div>
          <div className={`form-group`}>
            <label htmlFor="hospital_name">Involved Hospital Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="hospital_name" id="hospital_name" placeholder="Involved Hospital Name" value={formData["hospital_name"].value ? formData["hospital_name"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label className="no-style"><span className="d-block">Is janani's personal mobile number? <span className="text-danger">*</span></span> </label>
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
          <div className={`form-group`}>
            <label htmlFor="janani_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="janani_contact_number" id="janani_contact_number" placeholder="Phone No" value={formData["janani_contact_number"].value ? formData["janani_contact_number"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} />
          </div>
          <div className="form-group">
            <label htmlFor="janani_email_id">Email </label>
            <input type="text" className="form-control" name="janani_email_id" id="janani_email_id" placeholder="Email" value={formData["janani_email_id"].value ? formData["janani_email_id"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_address">Janani Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_address" id="janani_address" placeholder="Janani Address" value={formData["janani_address"].value ? formData["janani_address"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_address_2">Address 2 </label>
            <input type="text" className="form-control" name="janani_address_2" id="janani_address_2" placeholder="Address 2" value={formData["janani_address_2"].value ? formData["janani_address_2"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_state" id="janani_state" placeholder="State" value={formData["janani_state"].value ? formData["janani_state"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_city">City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_city" id="janani_city" placeholder="City" value={formData["janani_city"].value ? formData["janani_city"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_landmark" id="janani_landmark" placeholder="Landmark"  value={formData["janani_landmark"].value ? formData["janani_landmark"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="janani_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_postal_code" id="janani_postal_code" placeholder="Pincode" value={formData["janani_postal_code"].value ? formData["janani_postal_code"].value : ''} />
          </div>
          <div className={`form-group`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" name="special_note" id="special_note" placeholder="Special Notes" value={formData["special_note"].value ? formData["special_note"].value : ''} />
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default JananiViewBasicInformation;