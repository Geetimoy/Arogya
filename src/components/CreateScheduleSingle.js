import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';

import './CreateSchedule.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function CraeteScheduleSingle(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isActive, setIsActive] = useState(false);

  const [urlParam, setUrlParam] = useState(useParams());
  const scheduleType  = urlParam.scheduleType;
  const scheduleId    = urlParam.scheduleId;

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [singleFromDate, setSingleFromDate]     = useState('');
  const [singleToDate, setSingleToDate]         = useState('');

  const changeSingleFromDate = (date) => {
    setSingleFromDate(date);
    setFormData({...formData, ['scheduleFromDate']: {...formData['scheduleFromDate'], value:date, errorClass:"", errorMessage:""}});
  }
  const changeSingleToDate = (date) => {
    setSingleToDate(date);
    setFormData({...formData, ['scheduleToDate']: {...formData['scheduleToDate'], value:date, errorClass:"", errorMessage:""}});
  }

  const generateTimeIntervals = () => {
    const times = [];
    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Start at midnight

    for (let i = 0; i < 96; i++) {
        let hours = startTime.getHours();
        let minutes = startTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        const timeString = `${hours}:${minutes} ${ampm}`;
        times.push(timeString);
        startTime.setMinutes(startTime.getMinutes() + 15); // Increment by 15 minutes
    }

    return times;
  }

  const [timePickerDropDown, setTimePickerDropDown] = useState(generateTimeIntervals);

  useEffect(()=>{

  }, [timePickerDropDown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
    }
  }

  const [formData, setFormData] = useState({
    scheduleFromDate: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleToDate: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleFromTime: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleToTime: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleConsultationMode: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleContactDetails: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleTotalAppoitments: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleIsStrictFull: {required: true, value:"", errorClass:"", errorMessage:""},
    scheduleExtraAppointments: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const resetForm = () => {
    const fieldName = Object.keys(formData);
    fieldName.forEach((element) => {
      formData[element].value         = "";
      formData[element].errorClass    = "";
      formData[element].errorMessage  = "";
    })
    setFormData({...formData, ...formData});
    setSingleFromDate('');
    setSingleToDate('');
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
        formData[element].errorMessage = "";
        formData[element].errorClass = "";
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm();
    if(errorCounter == 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      jsonData['system_id']           = systemContext.systemDetails.system_id;
      jsonData["doctor_account_key"]    = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]   = decryptedLoginDetails.account_type;
      jsonData["user_login_id"]         = decryptedLoginDetails.login_id;
      jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]          = DEVICE_TOKEN;
      jsonData["user_lat"]              = localStorage.getItem('latitude');
      jsonData["user_long"]             = localStorage.getItem('longitude');

      jsonData["consultation_mode"]     = formData['scheduleConsultationMode'].value;
      jsonData["clinic_details"]        = formData['scheduleContactDetails'].value;
      jsonData["schedule_type"]         = 1;
      jsonData["date_range_from"]       = formData['scheduleFromDate'].value;
      jsonData["date_range_to"]         = formData['scheduleToDate'].value;
      jsonData["time_range_from"]       = formData['scheduleFromTime'].value;
      jsonData["time_range_to"]         = formData['scheduleToTime'].value;
      jsonData["total_appointments"]    = formData['scheduleTotalAppoitments'].value;
      jsonData["is_strict_full"]        = formData['scheduleIsStrictFull'].value;
      jsonData["buffer_percentage"]     = formData['scheduleExtraAppointments'].value;
      
      console.log(jsonData);

      const response = await fetch(`${API_URL}/addSingleDayDoctorSchedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        resetForm();
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
      
    }
  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id && scheduleId){
      getSingleScheduleDetails(scheduleId);
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id]);

  const getSingleScheduleDetails = async (scheduleId) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["user_account_key"]  = decryptedLoginDetails.account_key;
    jsonData["user_account_type"] = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    jsonData["schedule_id"]       = scheduleId;
    
    const response1 = await fetch(`${API_URL}/singleDoctorSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let scheduleDetails = result1.data;

    if(scheduleDetails.length > 0){

      scheduleDetails = result1.data[0];
      formData['scheduleFromDate']          = {value:scheduleDetails.display_name, errorClass:"", errorMessage:""};
      formData['scheduleToDate']            = {value:scheduleDetails.contact_no, errorClass:"", errorMessage:""};
      formData['scheduleFromTime']          = {value:scheduleDetails.whatsapp_no, errorClass:"", errorMessage:""};
      formData['scheduleToTime']            = {value:scheduleDetails.email_id, errorClass:"", errorMessage:""};
      formData['scheduleConsultationMode']  = {value:scheduleDetails.gender, errorClass:"", errorMessage:""};
      formData['scheduleContactDetails']    = {value:scheduleDetails.age, errorClass:"", errorMessage:""};
      formData['scheduleTotalAppoitments']  = {value:scheduleDetails.how_commute, errorClass:"", errorMessage:""};
      formData['scheduleIsStrictFull']      = {value:scheduleDetails.medical_experiences, errorClass:"", errorMessage:""};
      formData['scheduleExtraAppointments'] = {value:scheduleDetails.medical_certificates, errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});

    }
  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/appointment-scheduling" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>{(scheduleId) ? 'Edit' : 'Create' } Schedule </h5>
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
      <div className="app-body create-schedule">
        <p><small>{(scheduleId) ? 'Edit' : 'Add' } Your Schedule - Single Day</small></p>
        <div className="row mb-4">
          <div className='col-12'>
            <form id="createScheduleForm" name="createScheduleForm" onSubmit={handleFormSubmit}>
                
              <div className='form-group'>
                <label htmlFor="date_range" className="no-style">Date Range : <small>(If only one date leave next field empty)</small></label>
                <div className='row'>
                  <div className={`col-12 mb-2 ${formData["scheduleFromDate"].errorClass}`}>
                    <label className='pos'>From :</label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={singleFromDate} onChange={(date) => changeSingleFromDate(date)} className='form-control pos' placeholderText="YYYY-MM-DD"/>
                    <small className="error-mesg">{formData["scheduleFromDate"].errorMessage}</small>
                  </div>
                  <div className={`col-12 ${formData["scheduleToDate"].errorClass}`}>
                    <label className='pos'>To :</label>
                    <DatePicker dateFormat="yyyy-MM-dd" selected={singleToDate} onChange={(date) => changeSingleToDate(date)} className='form-control pos' placeholderText="YYYY-MM-DD"/>
                    <small className="error-mesg">{formData["scheduleToDate"].errorMessage}</small>
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor="date_range" className="no-style">Time Range :</label>
                <div className='row'>
                  <div className={`col-6 ${formData["scheduleFromTime"].errorClass}`}>
                    <label className='pos'>From :</label>
                    <select className="form-control pos" id="scheduleFromTime" default={formData["scheduleFromTime"].value} name="scheduleFromTime" onChange={handleChange}>
                      <option value="">Select</option>
                      {timePickerDropDown.map((item, index)=>{ 
                        return <option key={index} value={item}>{item}</option>
                      })}
                    </select>
                    <small className="error-mesg">{formData["scheduleFromTime"].errorMessage}</small>
                  </div>
                  <div className={`col-6 ${formData["scheduleToTime"].errorClass}`}>
                    <label className='pos'>To :</label>
                    <select className="form-control pos" id="scheduleToTime" name="scheduleToTime" default={formData["scheduleToTime"].value} onChange={handleChange}>
                      <option value="">Select</option>
                      {timePickerDropDown.map((item, index)=>{ 
                        return <option key={index} value={item}>{item}</option>
                      })}
                    </select>
                    <small className="error-mesg">{formData["scheduleToTime"].errorMessage}</small>
                  </div>
                </div>
              </div>


              <div className={`form-group ${formData["scheduleConsultationMode"].errorClass}`}>
                <label htmlFor="schedule" className="no-style">Consultation Mode :</label>
                <div className="">
                  <div className="custom-control custom-radio mt-2">
                    <input type="radio" id="offline" onChange={handleChange} name="scheduleConsultationMode" value="1" className="custom-control-input" checked={(formData["scheduleConsultationMode"].value === '1') ? true : false}/>
                    <label className="custom-control-label no-style" htmlFor="offline">Offline <small>(Clinic)</small></label>
                  </div>
                  <div className="custom-control custom-radio mt-2">
                    <input type="radio" id="online" onChange={handleChange} name="scheduleConsultationMode" value="2" className="custom-control-input" checked={(formData["scheduleConsultationMode"].value === '2') ? true : false}/>
                    <label className="custom-control-label no-style" htmlFor="online">Online </label>
                  </div>
                  <div className="custom-control custom-radio mt-2">
                    <input type="radio" id="emergency" onChange={handleChange} name="scheduleConsultationMode" value="3" className="custom-control-input" checked={(formData["scheduleConsultationMode"].value === '3') ? true : false}/>
                    <label className="custom-control-label no-style" htmlFor="emergency">Call on Emergency</label>
                  </div>
                </div>
                <small className="error-mesg">{formData["scheduleConsultationMode"].errorMessage}</small>
              </div>
              <div className={`form-group ${formData["scheduleContactDetails"].errorClass}`}>
                <label>Clinic Name, Location, Timing & Contact Number:</label>
                <textarea id="scheduleContactDetails" name="scheduleContactDetails" rows="3" className="form-control" placeholder="Clinic Name, Location, Timing & Contact Number" value={formData["scheduleContactDetails"].value} onChange={handleChange}></textarea>
                <small className="error-mesg">{formData["scheduleContactDetails"].errorMessage}</small>
              </div>
              <div className={`form-group ${formData["scheduleTotalAppoitments"].errorClass}`}>
                <label>Total Appointments : </label>
                <input type="text" className="form-control" name="scheduleTotalAppoitments" id="scheduleTotalAppoitments"  onChange={handleChange} value={formData["scheduleTotalAppoitments"].value}/>
                <small className="error-mesg">{formData["scheduleTotalAppoitments"].errorMessage}</small>
              </div>
              <div className={`form-group ${formData["scheduleIsStrictFull"].errorClass}`}>
                <label htmlFor="booking_confirm" className="no-style">Is Strict Full? : <small className=''>(If yes, no extra patients on those days)</small></label>
                <div className="d-flex">
                  <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="strict_full_y" name="scheduleIsStrictFull" className="custom-control-input" value="Y" onChange={handleChange} checked={(formData["scheduleIsStrictFull"].value === 'Y') ? true : false}/>
                    <label className="custom-control-label no-style" htmlFor="strict_full_y">Yes</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="strict_full_n" name="scheduleIsStrictFull" className="custom-control-input" value="N" onChange={handleChange} checked={(formData["scheduleIsStrictFull"].value === 'N') ? true : false}/>
                    <label className="custom-control-label no-style" htmlFor="strict_full_n">No</label>
                  </div>
                </div>
                <small className="error-mesg">{formData["scheduleIsStrictFull"].errorMessage}</small>
              </div>
              <div className={`form-group ${formData["scheduleExtraAppointments"].errorClass}`}>
                <label>Extra Appointment (%) : <small>(Buffer percentage. e.g. 10%)</small></label>
                <input type="text" className="form-control" name="scheduleExtraAppointments" id="scheduleExtraAppointments" onChange={handleChange} value={formData["scheduleExtraAppointments"].value}/>
                <small className="error-mesg">{formData["scheduleExtraAppointments"].errorMessage}</small>
              </div>
              <div className="btns-group d-flex justify-content-center">
                <button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2">Add my Schedule</button>
                <a href="/appointment-scheduling"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default CraeteScheduleSingle;