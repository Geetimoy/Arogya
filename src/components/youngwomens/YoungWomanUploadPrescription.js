import { useState, useContext } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import Appfooter from "../AppFooter";

import './YoungWomanUploadPrescription.css'

import youngwomenprescription from '../../assets/images/sample-rx.png';

function YoungWomanUploadPrescription(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey = urlParam.accountKey;

  const [isMActive, setIsMActive] = useState(false);

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

  const uploadCertificateChange = async (event) => {
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    if(event.target.files[0]){

      var fileName        = event.target.files[0].name;
      var fileExtension   = fileName.split('.').pop();

      fileUpload['inputPrescription'].upload   = true;
      fileUpload['inputPrescription'].fileName = event.target.files[0].name;
      setFileUpload({...fileUpload, ...fileUpload});

      const uploadedFileBase64 = await convertFileToBase64(event.target.files[0]);
      
      let jsonData = {};

      jsonData['system_id']               = systemContext.systemDetails.system_id;
      jsonData["device_type"]             = DEVICE_TYPE;
      jsonData["device_token"]            = DEVICE_TOKEN;
      jsonData["user_lat"]                = localStorage.getItem('latitude');
      jsonData["user_long"]               = localStorage.getItem('longitude');
      jsonData["volunteer_account_key"]   = decryptedLoginDetails.account_key;
      jsonData["user_account_key"]        = editAccountKey;
      jsonData["user_account_type"]       = 3;
      jsonData["initial_summary"]         = "sadasd";
      jsonData["file"]                    = uploadedFileBase64;
      jsonData["file_seq"]                = "elem";
      jsonData["file_extension"]          = fileExtension;

      console.log(jsonData);

      const response = await fetch(`${API_URL}/uploadWomanSurveyPrescription`, {
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
      }

    }
    
  };

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
            <h5 className='mx-2 mb-0'>Upload Prescriptions </h5>
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
      <div className="app-body young-womens upload-prescription upload-certifiate">
        <div className='row'>
          <div className='col-12'>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription" onChange={(event) => uploadCertificateChange(event)}/>
              <label>Upload Prescription</label>
            </div>
          </div>
          <div className='col-12 mt-4'>
            <button type="button" class="btn btn-primary primary-bg-color border-0">
              Use Camera
            </button>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default YoungWomanUploadPrescription;