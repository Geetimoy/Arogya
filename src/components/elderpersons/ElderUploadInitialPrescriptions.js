import { useState, useContext } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import Appfooter from "../AppFooter";

import './ElderUploadPrescription.css'

import youngwomenprescription from '../../assets/images/sample-rx.png';

function ElderUploadInitialPrescriptions(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());

  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

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

  const [fileUpload, setFileUpload] = useState({
    inputPrescription1 : {'upload': true, 'fileName': ''},
    inputPrescription2 : {'upload': false, 'fileName': ''},
    inputPrescription3 : {'upload': false, 'fileName': ''},
    inputPrescription4 : {'upload': false, 'fileName': ''},
    inputPrescription5 : {'upload': false, 'fileName': ''}
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

      fileUpload[`inputPrescription${seq}`].upload   = true;
      fileUpload[`inputPrescription${seq}`].fileName = event.target.files[0].name;

      let nextSeq = seq+1;
      if(fileUpload[`inputPrescription${nextSeq}`]){
        fileUpload[`inputPrescription${nextSeq}`].upload   = true;
        fileUpload[`inputPrescription${nextSeq}`].fileName = '';
      }

      setFileUpload({...fileUpload, ...fileUpload});

      const uploadedFileBase64 = await convertFileToBase64(event.target.files[0]);

      var uploadedFileBase64Array = uploadedFileBase64.split(';base64,');
      
      let jsonData = {};

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

      const response = await fetch(`${API_URL}/uploadInitialDocumentForElder`, {
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
              <Link to={`/elderpersons/elder-prescription/${editAccountKey}/${prescriptionType}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Upload Initial Prescriptions </h5>
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
          <div className={`col-12`}>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription1" onChange={(event) => uploadCertificateChange(event, 1)}/>
              <label>{(fileUpload['inputPrescription1'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription1'].fileName}</label>
            </div>
          </div>
          <div className={`col-12 ${fileUpload['inputPrescription2'].upload === true ? '' : 'disabled'}`} style={{'marginTop':'10px'}}>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription2" onChange={(event) => uploadCertificateChange(event, 2)}/>
              <label>{(fileUpload['inputPrescription2'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription2'].fileName}</label>
            </div>
          </div>
          <div className={`col-12 ${fileUpload['inputPrescription3'].upload === true ? '' : 'disabled'}`} style={{'marginTop':'10px'}}>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription3" onChange={(event) => uploadCertificateChange(event, 3)}/>
              <label>{(fileUpload['inputPrescription3'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription3'].fileName}</label>
            </div>
          </div>
          <div className={`col-12 ${fileUpload['inputPrescription4'].upload === true ? '' : 'disabled'}`} style={{'marginTop':'10px'}}>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription4" onChange={(event) => uploadCertificateChange(event, 4)}/>
              <label>{(fileUpload['inputPrescription4'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription4'].fileName}</label>
            </div>
          </div>
          <div className={`col-12 ${fileUpload['inputPrescription5'].upload === true ? '' : 'disabled'}`} style={{'marginTop':'10px'}}>
            <div className={`form-group brdr-btm parent`}>
              <input type="file" name="inputPrescription" id="inputPrescription5" onChange={(event) => uploadCertificateChange(event, 5)}/>
              <label>{(fileUpload['inputPrescription5'].fileName === '') ? 'Upload Prescription' : fileUpload['inputPrescription5'].fileName}</label>
            </div>
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
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default ElderUploadInitialPrescriptions;