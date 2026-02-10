import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faLeaf } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import Appfooter from "./AppFooter";

import './childmalnutrition/ChildUploadPrescription.css'

import './childmalnutrition/CreateChildMalnutrition.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppTopNotifications from './AppTopNotifications';

function DoctorAppointmentsUploadPresciption(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentKey     = (urlParam.appointmentKey) ? urlParam.appointmentKey : '';
  const patientType       = urlParam.patientType;
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  if(prescriptionType == 'initial'){
    var appointmentInitialType = 0;
  }
  else if(prescriptionType == 'doctor'){
    var appointmentInitialType = 1;
  }

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    prescription_date: {required: true, value:"", errorClass:"", errorMessage:""},
    previous_history: {required: true, value:"", errorClass:"", errorMessage:""},
    prescription_summary: {required: true, value:"", errorClass:"", errorMessage:""},
    advice: {required: true, value:"", errorClass:"", errorMessage:""},
    recheck_date: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
    }
  }

  const onChangePrescriptionDate = (date) => {
    formData['prescription_date']  = {required: false, value:date, errorClass:"", errorMessage:""};
    setFormData({...formData, ...formData});
  }

  const onChangeRecheckDate = (date) => {
    formData['recheck_date']  = {required: false, value:date, errorClass:"", errorMessage:""};
    setFormData({...formData, ...formData});
  }

  const [fileUpload, setFileUpload] = useState({
    inputPrescription1 : {'upload': true, 'fileName': '', 'file': '', 'fileExt': ''},
    inputPrescription2 : {'upload': false, 'fileName': '', 'file': '', 'fileExt': ''}
  });

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const uploadCertificateChange = async (event, seq) => {
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    if(event.target.files[0]){

      var fileName        = event.target.files[0].name;
      var fileExtension   = fileName.split('.').pop();

      const uploadedFileBase64 = await convertFileToBase64(event.target.files[0]);
      var uploadedFileBase64Array = uploadedFileBase64.split(';base64,');

      fileUpload[`inputPrescription${seq}`].upload    = true;
      fileUpload[`inputPrescription${seq}`].fileName  = event.target.files[0].name;
      fileUpload[`inputPrescription${seq}`].file      = uploadedFileBase64Array[1];
      fileUpload[`inputPrescription${seq}`].fileExt   = fileExtension;

      let nextSeq = seq+1;
      if(fileUpload[`inputPrescription${nextSeq}`]){
        fileUpload[`inputPrescription${nextSeq}`].upload    = true;
        fileUpload[`inputPrescription${nextSeq}`].fileName  = '';
        fileUpload[`inputPrescription${nextSeq}`].file      = '';
        fileUpload[`inputPrescription${nextSeq}`].fileExt   = '';
      }

      setFileUpload({...fileUpload, ...fileUpload});

      
      
      /*let jsonData = {};

      jsonData['system_id']               = systemContext.systemDetails.system_id;
      jsonData["device_type"]             = DEVICE_TYPE;
      jsonData["device_token"]            = DEVICE_TOKEN;
      jsonData["user_lat"]                = localStorage.getItem('latitude');
      jsonData["user_long"]               = localStorage.getItem('longitude');
      jsonData["appointment_initial_type"]= appointmentInitialType;
      jsonData["volunteer_account_key"]   = decryptedLoginDetails.account_key;
      jsonData["user_account_key"]        = editAccountKey;
      jsonData["user_account_type"]       = 3;
      jsonData["file"]                    = uploadedFileBase64Array[1];
      jsonData["file_seq"]                = 'initialpatient'+seq;
      jsonData["file_extension"]          = fileExtension;
      jsonData["initial_summary"]         = '';

      console.log(jsonData);

      const response = await fetch(`${API_URL}/uploadInitialAppointmentDocumentForPatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }*/

    }
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm();
    if(errorCounter === 0){
      let fileUploadErrorCounter = validateUploadFile();
      if(fileUploadErrorCounter > 0){
        alertContext.setAlertMessage({show:true, type: "error", message: "Please upload at least one prescription"});
        return false;
      }
      else{

        var prescriptionDate = '';
        if(formData['prescription_date'].value != ''){
          prescriptionDate = new Date(formData['prescription_date'].value);
          var year  = prescriptionDate.getFullYear();
          var month = String(prescriptionDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          var day   = String(prescriptionDate.getDate()).padStart(2, '0');
          prescriptionDate  = `${year}-${month}-${day}`;
        }

        var recheckDate = '';
        if(formData['recheck_date'].value != ''){
          recheckDate = new Date(formData['recheck_date'].value);
          var year  = recheckDate.getFullYear();
          var month = String(recheckDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          var day   = String(recheckDate.getDate()).padStart(2, '0');
          recheckDate  = `${year}-${month}-${day}`;
        }

        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

        let fileUploadArray = [];
        let fieldName = Object.keys(fileUpload);
        fieldName.forEach((element) => {
          if(fileUpload[element].fileName != ''){
            fileUploadArray.push({'file':fileUpload[element].file, 'file_extension':fileUpload[element].fileExt, 'fileName':fileUpload[element].fileName})
          }
        })

        let jsonData = {};

        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["device_type"]               = DEVICE_TYPE;
        jsonData["device_token"]              = DEVICE_TOKEN;
        jsonData["user_lat"]                  = localStorage.getItem('latitude');
        jsonData["user_long"]                 = localStorage.getItem('longitude');

        //Geetimoy da
        jsonData["upload_for"]                = patientType;

        jsonData["appointment_initial_type"]  = appointmentInitialType;
        jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
        jsonData["user_account_key"]          = editAccountKey;
        jsonData["user_account_type"]         = 3;
        jsonData["appointment_key"]           = appointmentKey;
        jsonData["prescription_date"]         = prescriptionDate;
        jsonData["prescription_prev_history"] = formData['previous_history'].value;
        jsonData["prescription_summary"]      = formData['prescription_summary'].value;
        jsonData["prescription_advice"]       = formData['advice'].value;
        jsonData["recheck_date"]              = recheckDate;
        jsonData["files"]                     = fileUploadArray;

        if(patientType === 'child'){
          var response = await fetch(`${API_URL}/uploadAppointmentDocumentForChildFromDoctorLogin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });
        }
        else{
          var response = await fetch(`${API_URL}/uploadAppointmentDocumentForElderFromDoctorLogin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });
        }
  
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

  const validateUploadFile = () => {
    const fieldName = Object.keys(fileUpload);
    let errorCounter    = 0;
    let uploadedCounter = 0;
    fieldName.forEach((element) => {
      if(fileUpload[element].fileName === '' || fileUpload[element].fileName === null){
        errorCounter++;
      }
      else{
        uploadedCounter++;
      }
    })

    if(uploadedCounter > 0){
      return 0;
    }
    else{
      return errorCounter;
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

    const inputName = Object.keys(fileUpload);
    inputName.forEach((element, index) => {
      if(index == 0){
        fileUpload[element].upload        = true;
      }
      else{
        fileUpload[element].upload        = false;
      }
      fileUpload[element].fileName        = "";
      fileUpload[element].file            = "";
      fileUpload[element].fileExt         = "";
    })
    setFileUpload({...fileUpload, ...fileUpload});
  }

  const getUserBasicDetails = async () => {
      
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    if(decryptedLoginDetails.account_type == 5){
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 31;
      jsonData["account_key"]               = editAccountKey;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      
      var response1 = await fetch(`${API_URL}/getProfileDetailsFromDoctorLogin`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
      });
    }
    else{
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 31;
      jsonData["account_key"]               = editAccountKey;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      
      var response1 = await fetch(`${API_URL}/getProfileDetails`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
      });
    } 

    let result = await response1.json();

    if(result.success){
      setUserBasicDetails(result.data);
    }
    else{
      setUserBasicDetails([]); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id && editAccountKey){
      getUserBasicDetails();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, editAccountKey]);

  return(
    <>  
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={`/doctor-appointments-prescription/${appointmentKey}/${editAccountKey}/${prescriptionType}/${patientType}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0 me-0'>Upload Doctor Prescriptions </h5>
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
      <div className="app-body young-womens upload-prescription upload-certifiate create-patient-profiles">
        <p className='patient-details'>
            Appointment Id: {appointmentKey.toUpperCase()}
        </p>
        <p>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <form className="mt-3 select-box" name="prescription_upload_form" id="prescription_upload_form" onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className={`form-group ${formData["prescription_date"].errorClass}`}>
              <label htmlFor="prescription_date">Prescription Date <span className="text-danger">*</span></label>
              <DatePicker dateFormat="yyyy-MM-dd" selected={formData["prescription_date"].value ? formData["prescription_date"].value : ''} onChange={(date) => onChangePrescriptionDate(date)} className='form-control' placeholderText="Prescription Date"/>
              <small className="error-mesg">{formData["prescription_date"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["previous_history"].errorClass}`}>
              <label htmlFor="name">Previous History <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="previous_history" id="previous_history" placeholder="Previous History" onChange={handleChange} value={formData["previous_history"].value ? formData["previous_history"].value : ''}/>
              <small className="error-mesg">{formData["previous_history"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["prescription_summary"].errorClass}`}>
              <label htmlFor="name">Prescription Summary <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="prescription_summary" id="prescription_summary" placeholder="Prescription Summary" onChange={handleChange} value={formData["prescription_summary"].value ? formData["prescription_summary"].value : ''}/>
              <small className="error-mesg">{formData["prescription_summary"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["advice"].errorClass}`}>
              <label htmlFor="name">Advice <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="advice" id="advice" placeholder="Advice" onChange={handleChange} value={formData["advice"].value ? formData["advice"].value : ''}/>
              <small className="error-mesg">{formData["advice"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["recheck_date"].errorClass}`}>
              <label htmlFor="recheck_date">Recheck Date <span className="text-danger">*</span></label>
              <DatePicker dateFormat="yyyy-MM-dd" selected={formData["recheck_date"].value ? formData["recheck_date"].value : ''} onChange={(date) => onChangeRecheckDate(date)} className='form-control' placeholderText="Recheck Date"/>
              <small className="error-mesg">{formData["recheck_date"].errorMessage}</small>
            </div>
            <div className={`col-12`}>
              <div className={`form-group brdr-btm parent`}>
                <input type="file" className='pt-0' name="inputPrescription" id="inputPrescription1" onChange={(event) => uploadCertificateChange(event, 1)}/>
                <label>{(fileUpload['inputPrescription1'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription1'].fileName}</label>
              </div>
            </div>
            <div className={`col-12 ${fileUpload['inputPrescription2'].upload === true ? '' : 'disabled'}`} style={{'marginTop':'10px'}}>
              <div className={`form-group brdr-btm parent`}>
                <input type="file" className='pt-0' name="inputPrescription" id="inputPrescription2" onChange={(event) => uploadCertificateChange(event, 2)}/>
                <label>{(fileUpload['inputPrescription2'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription2'].fileName}</label>
              </div>
            </div>
            <div className='mb-3 mt-3 text-center'>
              <button type="submit" className='btn primary-bg-color text-light min-width-100'>Save</button>
            </div>
            {/* <div className='col-12 text-center' style={{'marginTop':'10px'}}>
              <button type="button" className='btn primary-bg-color text-light'>Save</button>
            </div> */}
            
            <div className='col-12 mt-4'>
              {/* <button type="button" class="btn btn-primary primary-bg-color border-0">
                Use Camera
              </button> */}
            </div>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default DoctorAppointmentsUploadPresciption;