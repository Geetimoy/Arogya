import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "./AppFooter";

import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import docIcon from '../assets/images/doc-icon.jpg';
import AppTopNotifications from './AppTopNotifications';


function DoctorAppointmentUploadSurveyForm(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentKey    = urlParam.appointmentKey;

  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const redirect = useNavigate();

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [fileUpload, setFileUpload] = useState({
    inputPrescription : {'upload': true, 'fileName': ''}
  });

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const getUserBasicDetails = async () => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    if(decryptedLoginDetails.account_type == 5){
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 34;
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
      jsonData["account_type"]              = 34;
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

  const uploadCertificateChange = async (event) => {
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    if(event.target.files[0]){

      var fileName        = event.target.files[0].name;
      var fileExtension   = fileName.split('.').pop();

      fileUpload['inputPrescription'].upload   = true;
      fileUpload['inputPrescription'].fileName = event.target.files[0].name;
      setFileUpload({...fileUpload, ...fileUpload});

      const uploadedFileBase64 = await convertFileToBase64(event.target.files[0]);
      const uploadedFileBase64Array = uploadedFileBase64.split(';base64,');
      
      let jsonData = {};

      jsonData['system_id']               = systemContext.systemDetails.system_id;
      jsonData["device_type"]             = DEVICE_TYPE;
      jsonData["device_token"]            = DEVICE_TOKEN;
      jsonData["user_lat"]                = localStorage.getItem('latitude');
      jsonData["user_long"]               = localStorage.getItem('longitude');
      jsonData["doctor_account_key"]      = decryptedLoginDetails.account_key;
      jsonData["upload_for"]              = userBasicDetails.account_type_name;
      jsonData["user_account_key"]        = editAccountKey;
      jsonData["user_account_type"]       = 3;
      jsonData["file"]                    = uploadedFileBase64Array[1];
      jsonData["file_extension"]          = fileExtension;

      console.log(jsonData);

      if(userBasicDetails.account_type_name === "child"){
        var response = await fetch(`${API_URL}/uploadChildSurveyPrescriptionFromDoctorLogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
      }
      else{
        var response = await fetch(`${API_URL}/uploadElderSurveyPrescriptionFromDoctorLogin`, {
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
        setTimeout(() => {
          fileUpload['inputPrescription'].upload   = true;
          fileUpload['inputPrescription'].fileName = "";
          setFileUpload({...fileUpload, ...fileUpload});
          redirect(`/doctor-appointment-survey-forms/${appointmentKey}/${editAccountKey}/${prescriptionType}`);
        }, 2000);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    }
    
  };

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={`/doctor-appointment-survey-forms/${appointmentKey}/${editAccountKey}/${prescriptionType}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Upload Survey Form </h5>
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
      <div className="app-body young-womens upload-prescription">
        <div className='row'>
          <div className='col-12'>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription" onChange={(event) => uploadCertificateChange(event)}/>
              <label>{(fileUpload['inputPrescription'].fileName === '') ? 'Upload Survey Form' : fileUpload['inputPrescription'].fileName}</label>
            </div>
          </div>
          <div className='col-12 mt-4'>
            {/* <button type="button" class="btn btn-primary primary-bg-color border-0">
              Use Camera
            </button> */}
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default DoctorAppointmentUploadSurveyForm;