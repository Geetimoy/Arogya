import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import Appfooter from "../AppFooter";

import './CreateYoungWoman.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import youngwomenprescription from '../../assets/images/sample-rx.png';
import AppTopNotifications from '../AppTopNotifications';

function YoungWomanUploadTestReports(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editPatientKey    = urlParam.patientKey;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    report_name: {required: true, value:"", errorClass:"", errorMessage:""},
    report_date: {required: true, value:"", errorClass:"", errorMessage:""},
    report_clinic: {required: true, value:"", errorClass:"", errorMessage:""},
    report_approved_doctor: {required: true, value:"", errorClass:"", errorMessage:""},
    report_summary: {required: true, value:"", errorClass:"", errorMessage:""},
    report_file: {required: true, value:"", errorClass:"", errorMessage:""},
    report_file_name: {required: true, value:"", errorClass:"", errorMessage:""},
    report_file_extension: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if(name === "report_file"){
      var fileName            = e.target.files[0].name;
      var fileExtension       = fileName.split('.').pop();
      var uploadedFileBase64  = await convertFileToBase64(e.target.files[0]);

      var uploadedFileBase64Array = uploadedFileBase64.split(';base64,');
      
      formData['report_file_name']      = {required: false, value:fileName, errorClass:"", errorMessage:""};
      formData['report_file_extension'] = {required: false, value:fileExtension, errorClass:"", errorMessage:""};
      formData['report_file']           = {required: false, value:uploadedFileBase64Array[1], errorClass:"", errorMessage:""};

      setFormData({...formData, ...formData});
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
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
        formData[element].errorMessage = "";
        formData[element].errorClass = "";
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const onChangeReportDate = (date) => {

    formData['report_date']      = {required: false, value:date, errorClass:"", errorMessage:""};
    setFormData({...formData, ...formData});

  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    let errorCounter = validateForm();console.log(formData);

    if(errorCounter === 0){

      if(formData['report_file'] == ""){
        alertContext.setAlertMessage({show:true, type: "error", message: "Please choose a report file!"});
      }
      else{
        
        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  
        let jsonData = {};
  
        var reportDate = '';
        if(formData['report_date'].value != ''){
          reportDate = new Date(formData['report_date'].value);
  
          const year  = reportDate.getFullYear();
          const month = String(reportDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day   = String(reportDate.getDate()).padStart(2, '0');
  
          reportDate  = `${year}-${month}-${day}`;
        }
  
        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["user_account_key"]          = editPatientKey;
        jsonData["user_account_type"]         = 3;
        jsonData["appointment_key"]           = appointmentId;
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["initial_summary"]           = formData['report_summary'].value;
        jsonData["report_name"]               = formData['report_name'].value;
        jsonData["file"]                      = formData['report_file'].value;
        jsonData["report_date"]               = reportDate;
        jsonData["report_done_from"]          = formData['report_clinic'].value;
        jsonData["report_done_dr_name"]       = formData['report_approved_doctor'].value;
        jsonData["file_extension"]            = formData['report_file_extension'].value;
        jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
        jsonData["device_token"]              = DEVICE_TOKEN;
        jsonData["user_lat"]                  = localStorage.getItem('latitude');
        jsonData["user_long"]                 = localStorage.getItem('longitude');
  
        const response = await fetch(`${API_URL}/uploadTestReportForWoman`, {
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
    
    

  }

  const getUserBasicDetails = async () => {
        
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editPatientKey;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getProfileDetails`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      setUserBasicDetails(result.data);
    }
    else{
      setUserBasicDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editPatientKey){
      getUserBasicDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editPatientKey]);

  return(
    <>  
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={`/youngwomens/young-woman-test-reports/${editPatientKey}/${appointmentId}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Upload Test Reports </h5>
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
      <div className="app-body create-patient-profiles young-womens upload-prescription upload-certifiate">
        <div className='row'>
          <p>
              {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
          </p>
          <form className="mt-3 select-box" name="test_report_form" id="test_report_form" onSubmit={handleFormSubmit}>
            <div className={`form-group ${formData["report_name"].errorClass}`}>
              <label htmlFor="name">Report Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="report_name" id="report_name" placeholder="Report Name" onChange={handleChange} value={formData["report_name"].value ? formData["report_name"].value : ''}/>
              <small className="error-mesg">{formData["report_name"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["report_date"].errorClass}`}>
              <label htmlFor="report_date">Report Date <span className="text-danger">*</span></label>
              <DatePicker dateFormat="yyyy-MM-dd" selected={formData["report_date"].value ? formData["report_date"].value : ''} onChange={(date) => onChangeReportDate(date)} className='form-control' placeholderText="Report Date"/>
              <small className="error-mesg">{formData["report_date"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["report_clinic"].errorClass}`}>
              <label htmlFor="report_clinic">Report Clinic/Center <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="report_clinic" id="report_clinic" placeholder="Report Clinic/Center" onChange={handleChange} value={formData["report_clinic"].value ? formData["report_clinic"].value : ''}/>
              <small className="error-mesg">{formData["report_clinic"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["report_approved_doctor"].errorClass}`}>
              <label htmlFor="report_approved_doctor">Report Approved By Doctor <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="report_approved_doctor" id="report_approved_doctor" placeholder="Report Approved By Doctor" onChange={handleChange} value={formData["report_approved_doctor"].value ? formData["report_approved_doctor"].value : ''}/>
              <small className="error-mesg">{formData["report_approved_doctor"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["report_summary"].errorClass}`}>
              <label htmlFor="report_summary">Report Summary <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="report_summary" id="report_summary" placeholder="Report Summary" onChange={handleChange} value={formData["report_summary"].value ? formData["report_summary"].value : ''}/>
              <small className="error-mesg">{formData["report_summary"].errorMessage}</small>
            </div>
            <div className={`form-group brdr-btm parent ${formData["report_file_name"].errorClass}`}>
              <input className='pt-0 pb-0' type="file" name="report_file" id="report_file" onChange={handleChange}/>
              <label>{(formData['report_file_name'].value === '') ? 'Upload Test Report' : formData['report_file_name'].value}</label>
              <small className="error-mesg d-block">{formData["report_file_name"].errorMessage}</small>
            </div>
            <div className='mb-3 mt-3 text-center'>
              <button type="submit" className='btn primary-bg-color text-light min-width-100'>Save</button>
            </div>
          </form>
          {/* <div className='col-12 text-center' style={{'marginTop':'10px'}}>
            <button type="button" className='btn primary-bg-color text-light'>Save</button>
          </div> */}
          
          <div className='col-12 mt-4'>
            {/* <button type="button" class="btn btn-primary primary-bg-color border-0">
              Use Camera
            </button> */}
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default YoungWomanUploadTestReports;