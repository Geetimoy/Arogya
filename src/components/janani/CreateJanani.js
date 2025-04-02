import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext"; 
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from 'react-dropdown-select';
import Select from 'react-select';

function CreateJanani(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const redirect = useNavigate();

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
    janani_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
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
        if( !regex.test(value)) {
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
    setPeriodMissedDate('');
    setConceptionDate('');
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && formData[element].value === ""){
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
        else if((element === "janani_contact_number") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validMobileRegex))){
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
      setFormData({...formData, ['janani_service_area']: {...formData['janani_service_area'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['janani_service_area']: {...formData['janani_service_area'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm();
    if(errorCounter == 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      jsonData['system_id']                     = systemContext.systemDetails.system_id;
      jsonData["introducer_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["introducer_account_type"]       = decryptedLoginDetails.account_type;
      jsonData["user_login_id"]                 = decryptedLoginDetails.login_id;
      jsonData["device_type"]                   = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]                  = DEVICE_TOKEN;
      jsonData["user_lat"]                      = localStorage.getItem('latitude');
      jsonData["user_long"]                     = localStorage.getItem('longitude');

      var serviceArea                       = '{'+formData['janani_service_area'].value+'}';

      jsonData["janani_name"]                   = formData['janani_name'].value;
      jsonData["janani_husband_name"]           = formData['janani_husband'].value;
      jsonData["date_missed_first_period"]      = formData['period_missed'].value;
      jsonData["estimate_conception_date"]      = formData['conception_date'].value;
      jsonData["janani_contact_number"]         = formData['janani_contact_number'].value;
      jsonData["janani_whatsup_number"]         = formData['whatsapp'].value;
      jsonData["janani_email_id"]               = formData['janani_email_id'].value;
      jsonData["janani_age"]                    = formData['janani_age'].value;
      jsonData["janani_address"]                = formData['janani_address'].value;
      jsonData["janani_address_2"]              = formData['janani_address_2'].value;
      jsonData["janani_state"]                  = formData['janani_state'].value;
      jsonData["janani_postal_code"]            = formData['janani_postal_code'].value;
      jsonData["janani_landmark"]               = formData['janani_landmark'].value;
      jsonData["janani_city"]                   = formData['janani_city'].value;
      jsonData["is_bpl"]                        = "t";
      jsonData["is_your_personal_number"]       = formData['is_personal_mobile_number'].value;
      jsonData["janani_education"]              = formData['janani_education'].value;
      jsonData["involved_doctor_name"]          = formData['doctor_name'].value;
      jsonData["involved_hospital_name"]        = formData['hospital_name'].value;
      jsonData["special_note"]                  = formData['special_note'].value;
      jsonData["service_area"]                  = '{1,2}';
      jsonData["service_area"]                  = serviceArea;
      
      const response = await fetch(`${API_URL}/addUpdateJananiProfile`, {
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
        resetForm();
        setTimeout(() => {
          redirect('/janani');
        }, 3000);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
      
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
        <form className="select-box mt-3" name="create_janani_form" id="create_janani_form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["janani_name"].errorClass}`}>
            <label htmlFor="janani_name">Janani Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_name" id="janani_name" onChange={handleChange} placeholder="Janani Name" value={formData["janani_name"].value ? formData["janani_name"].value : ''}/>
            <small className="error-mesg">{formData["janani_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_age"].errorClass}`}>
            <label htmlFor="janani_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_age" id="janani_age" onChange={handleChange} placeholder="Age" value={formData["janani_age"].value ? formData["janani_age"].value : ''} />
            <small className="error-mesg">{formData["janani_age"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_husband"].errorClass}`}>
            <label htmlFor="janani_husband">Husband Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_husband" id="janani_husband" onChange={handleChange} placeholder="Husband Name" value={formData["janani_husband"].value ? formData["janani_husband"].value : ''} />
            <small className="error-mesg">{formData["janani_husband"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["period_missed"].errorClass}`}>
            <label htmlFor="period_missed">First Period Missed Date <span className="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={periodMissedDate} onChange={(date) => onChangePeriodMissedDate(date)} className='form-control' />
            <small className="error-mesg">{formData["period_missed"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["conception_date"].errorClass}`}>
            <label htmlFor="conception_date">Estimated Conception Date <span className="text-danger">*</span></label>
            <DatePicker dateFormat="yyyy-MM-dd" selected={conceptionDate} onChange={(date) => onChangeConceptionDate(date)}  className='form-control'/>
            <small className="error-mesg">{formData["conception_date"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_education"].errorClass}`}>
            <label htmlFor="janani_education">Janani Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_education" id="janani_education" onChange={handleChange} placeholder="Janani Education" value={formData["janani_education"].value ? formData["janani_education"].value : ''} />
            <small className="error-mesg">{formData["janani_education"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["doctor_name"].errorClass}`}>
            <label htmlFor="doctor_name">Involved Doctor Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="doctor_name" id="doctor_name" onChange={handleChange} placeholder="Involved Doctor Name" value={formData["doctor_name"].value ? formData["doctor_name"].value : ''} />
            <small className="error-mesg">{formData["doctor_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["hospital_name"].errorClass}`}>
            <label htmlFor="hospital_name">Involved Hospital Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="hospital_name" id="hospital_name"  onChange={handleChange} placeholder="Involved Hospital Name" value={formData["hospital_name"].value ? formData["hospital_name"].value : ''} />
            <small className="error-mesg">{formData["hospital_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is janani's personal mobile number? <span className="text-danger">*</span></span> </label>
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
          <div className={`form-group ${formData["janani_contact_number"].errorClass}`}>
            <label htmlFor="janani_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="janani_contact_number" id="janani_contact_number" onChange={handleChange} placeholder="Phone No" value={formData["janani_contact_number"].value ? formData["janani_contact_number"].value : ''} maxLength={10}/>
            <small className="error-mesg">{formData["janani_contact_number"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["whatsapp"].errorClass}`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" onChange={handleChange}  placeholder="WhatsApp No" value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} maxLength={10}/>
            <small className="error-mesg">{formData["whatsapp"].errorMessage}</small>
          </div>
          <div className="form-group">
            <label htmlFor="janani_email_id">Email </label>
            <input type="text" className="form-control" name="janani_email_id" id="janani_email_id" onChange={handleChange} placeholder="Email" value={formData["janani_email_id"].value ? formData["janani_email_id"].value : ''} />
            {/* <small className="error-mesg">{formData["janani_email_id"].errorMessage}</small> */}
          </div>
          <div className={`form-group ${formData["janani_address"].errorClass}`}>
            <label htmlFor="janani_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_address" id="janani_address" onChange={handleChange} placeholder="Address 1" value={formData["janani_address"].value ? formData["janani_address"].value : ''} />
            <small className="error-mesg">{formData["janani_address"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_address_2"].errorClass}`}>
            <label htmlFor="janani_address_2">Address 2 </label>
            <input type="text" className="form-control" name="janani_address_2" id="janani_address_2" onChange={handleChange} placeholder="Address 2" value={formData["janani_address_2"].value ? formData["janani_address_2"].value : ''} />
            <small className="error-mesg">{formData["janani_address_2"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_state"].errorClass}`}>
            <label htmlFor="janani_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_state" id="janani_state" onChange={handleChange} placeholder="State" value={formData["janani_state"].value ? formData["janani_state"].value : ''} />
            <small className="error-mesg">{formData["janani_state"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_city"].errorClass}`}>
            <label htmlFor="janani_city">City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_city" id="janani_city" onChange={handleChange} placeholder="City" value={formData["janani_city"].value ? formData["janani_city"].value : ''} />
            <small className="error-mesg">{formData["janani_city"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_landmark"].errorClass}`}>
            <label htmlFor="janani_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_landmark" id="janani_landmark" onChange={handleChange} placeholder="Landmark" value={formData["janani_landmark"].value ? formData["janani_landmark"].value : ''} />
            <small className="error-mesg">{formData["janani_landmark"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["janani_postal_code"].errorClass}`}>
            <label htmlFor="janani_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="janani_postal_code" id="janani_postal_code" onChange={handleChange} placeholder="Pincode" value={formData["janani_postal_code"].value ? formData["janani_postal_code"].value : ''} />
            <small className="error-mesg">{formData["janani_postal_code"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["janani_service_area"].errorClass}`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            {/* <Dropdown className='form-control select-multi' multi options={serviceAreaOption} values={selectedOptions} onChange={handleChange1}/> */}
            <Select className='form-control select-multi' isMulti value={selectedOptions}
        onChange={handleChange1} options={serviceAreaOption} />
            <small className="error-mesg">{formData["janani_service_area"].errorMessage}</small>
          </div>
          <div className="form-group "><label htmlFor="sub_volunteer_name">Sub Volunteer Name</label><select className="form-control" name="sub_volunteer_name" id="sub_volunteer_name"><option value="1">Sub Volunteer1</option><option value="2">Sub Volunteer2</option></select></div>
          <div className={`sp-notes form-group ${formData["special_note"].errorClass}`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" name="special_note" id="special_note" onChange={handleChange} placeholder="Special Notes" value={formData["special_note"].value ? formData["special_note"].value : ''} />
            <small className="error-mesg">{formData["special_note"].errorMessage}</small>
          </div>
          <div className="mb-3 mt-3 text-center">
            <button type="submit" className="btn primary-bg-color text-light">Create Janani Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateJanani;