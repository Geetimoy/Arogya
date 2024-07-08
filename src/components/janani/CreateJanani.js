import { useState, useContext } from 'react';

import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext"; 

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateJanani(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const [periodMissedDate, setPeriodMissedDate] = useState(new Date());
  const [conceptionDate, setConceptionDate]     = useState(new Date());

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
    janani_email_id: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_address: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    janani_state: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_city: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_landmark: {required: true, value:"", errorClass:"", errorMessage:""},
    janani_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    special_note: {required: false, value:"", errorClass:"", errorMessage:""},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      if(name === 'janani_contact_number'){
        var regex = /[0-9]|\./;
        if( !regex.test(value) ) {
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"Please enter a valid contact number!"}});
        }
        else{
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
        }
      }
      else if(name === 'janani_email_id'){
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if( !regex.match(value)) {
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"Please enter a valid email!"}});
        }
        else{
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
        }
      }
      else{
        setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
      }
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
    }
  }

  const resetForm = () => {
    const fieldName = Object.keys(formData);
    fieldName.forEach((element) => {
      formData[element].value         = "";
      formData[element].errorClass    = "";
      formData[element].errorMessage  = "";
    })
    setFormData({...formData, ...formData});
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && formData[element].value.trim() === ""){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        var validRegex        = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var validMobileRegex  = /[0-9]|\./;
        if((element === "janani_email_id") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
          formData[element].errorMessage  = "Please enter a valid email!";
          formData[element].errorClass    = "form-error";
        }
        else if((element === "janani_contact_number") && (formData[element].value.trim() !== "") && (!formData[element].value.test(validMobileRegex))){
          formData[element].errorMessage  = "Please enter a valid contact number!";
          formData[element].errorClass    = "form-error";
        }
        else{
          formData[element].errorMessage  = "";
          formData[element].errorClass    = "";
        }
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const onChangePeriodMissedDate = (date) => {
    setPeriodMissedDate(date);
    setFormData({...formData, ['period_missed']: {...formData['period_missed'], value:date, errorClass:"", errorMessage:""}});
  }
  const onChangeConceptionDate = (date) => {
    setConceptionDate(date);
    setFormData({...formData, ['conception_date']: {...formData['conception_date'], value:date, errorClass:"", errorMessage:""}});
  }

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
            <h5 className='mx-2 mb-0'>Create Janani Profile</h5>
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
        <p><small>Add Janani Informations</small></p>
        <form className="mt-3" name="create_janani_form" id="create_janani_form">
          <div class={`form-group ${formData["janani_name"].errorClass}`}>
            <label htmlfor="janani_name">Janani Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_name" id="janani_name" onChange={handleChange} placeholder="Janani Name" value={formData["janani_name"].value ? formData["janani_name"].value : ''}/>
            <small className="error-mesg">{formData["janani_name"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_age"].errorClass}`}>
            <label htmlfor="janani_age">Age <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_age" id="janani_age" onChange={handleChange} placeholder="Age" value={formData["janani_age"].value ? formData["janani_age"].value : ''} />
            <small className="error-mesg">{formData["janani_age"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_husband"].errorClass}`}>
            <label htmlfor="janani_husband">Husband Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_husband" id="janani_husband" onChange={handleChange} placeholder="Husband Name" value={formData["janani_husband"].value ? formData["janani_husband"].value : ''} />
            <small className="error-mesg">{formData["janani_husband"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["period_missed"].errorClass}`}>
            <label htmlfor="period_missed">First Period Missed Date <span class="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={periodMissedDate} onChange={(date) => onChangePeriodMissedDate(date)} />
            <small className="error-mesg">{formData["period_missed"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["conception_date"].errorClass}`}>
            <label htmlfor="conception_date">Estimated Conception Date <span class="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={conceptionDate} onChange={(date) => onChangeConceptionDate(date)} />
            <small className="error-mesg">{formData["conception_date"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_education"].errorClass}`}>
            <label htmlfor="janani_education">Janani Education <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_education" id="janani_education" onChange={handleChange} placeholder="Janani Education" value={formData["janani_education"].value ? formData["janani_education"].value : ''} />
            <small className="error-mesg">{formData["janani_education"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["doctor_name"].errorClass}`}>
            <label htmlfor="doctor_name">Involved Doctor Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="doctor_name" id="doctor_name" onChange={handleChange} placeholder="Involved Doctor Name" value={formData["doctor_name"].value ? formData["doctor_name"].value : ''} />
            <small className="error-mesg">{formData["doctor_name"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["hospital_name"].errorClass}`}>
            <label htmlfor="hospital_name">Involved Hospital Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="hospital_name" id="hospital_name"  onChange={handleChange} placeholder="Involved Hospital Name" value={formData["hospital_name"].value ? formData["hospital_name"].value : ''} />
            <small className="error-mesg">{formData["hospital_name"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label class="no-style"><span class="d-block">Is your personal mobile number? <span class="text-danger">*</span></span> </label>
            <div class="d-flex">
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" class="custom-control-input" value="t" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 't') ? true : false}/>
                <label class="custom-control-label no-style" htmlfor="personal_mobile_number_y">Yes</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" class="custom-control-input" value="f" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 'f') ? true : false}/>
                <label class="custom-control-label no-style" htmlfor="personal_mobile_number_n">No</label>
              </div>
              <small className="error-mesg">{formData["is_personal_mobile_number"].errorMessage}</small>
            </div>
          </div>
          <div class={`form-group ${formData["janani_contact_number"].errorClass}`}>
            <label htmlfor="janani_contact_number">Phone No <span class="text-danger">*</span></label>
            <input type="tel" class="form-control" name="janani_contact_number" id="janani_contact_number" onChange={handleChange} placeholder="Phone No" value={formData["janani_contact_number"].value ? formData["janani_contact_number"].value : ''} />
            <small className="error-mesg">{formData["janani_contact_number"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["whatsapp"].errorClass}`}>
            <label htmlfor="whatsapp">WhatsApp No </label>
            <input type="tel" class="form-control" name="whatsapp" id="whatsapp" onChange={handleChange}  placeholder="WhatsApp No" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} />
            <small className="error-mesg">{formData["whatsapp"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_email_id"].errorClass}`}>
            <label htmlfor="janani_email_id">Email <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_email_id" id="janani_email_id" onChange={handleChange} placeholder="Email" value={formData["janani_email_id"].value ? formData["janani_email_id"].value : ''} />
            <small className="error-mesg">{formData["janani_email_id"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_address"].errorClass}`}>
            <label htmlfor="janani_address">Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_address" id="janani_address" onChange={handleChange} placeholder="Address 1" value={formData["janani_address"].value ? formData["janani_address"].value : ''} />
            <small className="error-mesg">{formData["janani_address"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_address_2"].errorClass}`}>
            <label htmlfor="janani_address_2">Address 2 </label>
            <input type="text" class="form-control" name="janani_address_2" id="janani_address_2" onChange={handleChange} placeholder="Address 2" value={formData["janani_address_2"].value ? formData["janani_address_2"].value : ''} />
            <small className="error-mesg">{formData["janani_address_2"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_state"].errorClass}`}>
            <label htmlfor="janani_state">State <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_state" id="janani_state" onChange={handleChange} placeholder="State" value={formData["janani_state"].value ? formData["janani_state"].value : ''} />
            <small className="error-mesg">{formData["janani_state"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_city"].errorClass}`}>
            <label htmlfor="janani_city">City <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_city" id="janani_city" onChange={handleChange} placeholder="City" value={formData["janani_city"].value ? formData["janani_city"].value : ''} />
            <small className="error-mesg">{formData["janani_city"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_landmark"].errorClass}`}>
            <label htmlfor="janani_landmark">Landmark <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_landmark" id="janani_landmark" onChange={handleChange} placeholder="Landmark" value={formData["janani_landmark"].value ? formData["janani_landmark"].value : ''} />
            <small className="error-mesg">{formData["janani_landmark"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["janani_postal_code"].errorClass}`}>
            <label htmlfor="janani_postal_code">Pincode <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_postal_code" id="janani_postal_code" onChange={handleChange} placeholder="Pincode" value={formData["janani_postal_code"].value ? formData["janani_postal_code"].value : ''} />
            <small className="error-mesg">{formData["janani_postal_code"].errorMessage}</small>
          </div>
          <div class={`form-group ${formData["special_note"].errorClass}`}>
            <label htmlfor="special_note">Special Notes </label>
            <input type="text" class="form-control" name="special_note" id="special_note" onChange={handleChange} placeholder="Special Notes" value={formData["special_note"].value ? formData["special_note"].value : ''} />
            <small className="error-mesg">{formData["special_note"].errorMessage}</small>
          </div>
          <div class="mb-3 mt-3 text-center">
            <button type="submit" class="btn primary-bg-color text-light">Create Janani Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateJanani;