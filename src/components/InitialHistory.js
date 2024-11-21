import { useState, useContext, useEffect } from 'react';

import Appfooter from "./AppFooter";

import { MAX_CERTICATE_UPLOAD } from './util/Constants';

import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import './InitialHistory.css'


function InitialHistroy(){

  const pageTitle = "Patient Initial History";
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

  const [fileUpload, setFileUpload] = useState({
    certificate_1 : {'upload': true, 'fileName': ''},
    certificate_2 : {'upload': true, 'fileName': ''},
    certificate_3 : {'upload': true, 'fileName': ''},
    certificate_4 : {'upload': true, 'fileName': ''},
    certificate_5 : {'upload': true, 'fileName': ''}
  });

  var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
  var userDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
  var userFolder           = '';
  if(userDetails.account_type == 1){
    userFolder = 'admins';
  }
  else if(userDetails.account_type == 2){
    userFolder = 'sub-admins';
  }
  else if(userDetails.account_type == 3){
    userFolder = 'patients';
  }
  else if(userDetails.account_type == 4){
    userFolder = 'volunteers';
  }
  else if(userDetails.account_type == 5){
    userFolder = 'doctors';
  }
  else if(userDetails.account_type == 6){
    userFolder = 'pharmacys';
  }
  else if(userDetails.account_type == 7){
    userFolder = 'test-centers';
  }

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const getUploadedCertificates = async () => {

    if(systemContext.systemDetails.system_id){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      jsonData['system_id']         = systemContext.systemDetails.system_id;
      jsonData["account_key"]       = decryptedLoginDetails.account_key;
      jsonData["account_type"]      = decryptedLoginDetails.account_type;
      jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
      jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]      = DEVICE_TOKEN;
      jsonData["user_lat"]          = localStorage.getItem('latitude');
      jsonData["user_long"]         = localStorage.getItem('longitude');
      
      const response1 = await fetch(`${API_URL}/getUploadedCertificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result1 = await response1.json();
      
      if(result1.success){
        var uploadedCertificate = result1.data;
        var uploadedSequence    = [];
        if(uploadedCertificate.length > 0){
          uploadedCertificate.forEach((file, index)=>{
            var fileName = file.replace(/\.[^/.]+$/, "");
            var sequence = fileName.replace(decryptedLoginDetails.account_key+'_', '');
            uploadedSequence.push(sequence);
          })

          for(var x=1; x<=5; x++)
          {
            var fileSequence = 'certificate_'+x;
            if(uploadedSequence.includes(fileSequence))
            {
              var currentFileName = '';
              uploadedCertificate.forEach((item)=>{
                if(item.indexOf(fileSequence) !== -1){
                  currentFileName = item;
                }
              })

              fileUpload['certificate_'+x].upload   = true;
              fileUpload['certificate_'+x].fileName = currentFileName;
              setFileUpload({...fileUpload, ...fileUpload});
            }
            else
            {
              fileUpload['certificate_'+x].upload   = true;
              fileUpload['certificate_'+x].fileName = '';
              setFileUpload({...fileUpload, ...fileUpload});
            }
          }
        }
        else
        {
          for(var i = 1; i<=5; i++)
          {
            fileUpload['certificate_'+i].upload   = true;
            fileUpload['certificate_'+i].fileName = '';
            setFileUpload({...fileUpload, ...fileUpload});
          }
        }
      }

    }
    
  }

  useEffect(() => {

    getUploadedCertificates();
    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])


  const uploadCertificateChange = async (event, elem, index) => {
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));

    if(event.target.files[0]){

      var fileName        = event.target.files[0].name;
      var fileExtension   = fileName.split('.').pop();

      fileUpload[elem].upload   = true;
      fileUpload[elem].fileName = event.target.files[0].name;
      setFileUpload({...fileUpload, ...fileUpload});

      const uploadedFileBase64 = await convertFileToBase64(event.target.files[0]);
      
      let jsonData = {};

      jsonData['system_id']         = systemContext.systemDetails.system_id;
      jsonData["device_type"]       = DEVICE_TYPE;
      jsonData["device_token"]      = DEVICE_TOKEN;
      jsonData["user_lat"]          = localStorage.getItem('latitude');
      jsonData["user_long"]         = localStorage.getItem('longitude');
      jsonData["user_account_key"]  = loginDetails.account_key;
      jsonData["user_account_type"] = loginDetails.account_type;
      jsonData["file"]              = uploadedFileBase64;
      jsonData["file_seq"]          = elem;
      jsonData["file_extension"]    = fileExtension;

      const response = await fetch(`${API_URL}/uploadCertificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      let result = await response.json();

      if(result.success){
        getUploadedCertificates();
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    }
    
  };

  const deleteCertificate = async (fileName) => { 

    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["device_type"]       = DEVICE_TYPE;
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    jsonData["account_key"]       = loginDetails.account_key;
    jsonData["account_type"]      = loginDetails.account_type;
    jsonData["file_name"]         = fileName;

    const response = await fetch(`${API_URL}/deleteCertificate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      getUploadedCertificates();
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  return(
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>{pageTitle} </h5>
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
      <div className="app-body upload-certifiate initial-history">
        <div className='d-flex justify-content-between align-items-center'><h5></h5><span>Max 5 files, 500 KB each</span></div>
        <div className="upload-certificate-list">
          <div className="rounded jumbotron p-3 mt-3 mb-3">
            <form encType="multipart/form-data" className='choose-file form-all'>
              {[...Array(MAX_CERTICATE_UPLOAD)].map((e, i) => 
                <div key={i+1} className={`form-group brdr-btm parent`}>
                  <input type="file" name={`certificate_${i+1}`} id={`certificate_${i+1}`} onChange={(event) => uploadCertificateChange(event, 'certificate_'+(i+1), i+1)}/>
                  <label>{(fileUpload['certificate_'+(i+1)].fileName === '') ? 'Prescription '+(i+1) : fileUpload['certificate_'+(i+1)].fileName}</label>
                  {(fileUpload['certificate_'+(i+1)].fileName !== '') && <span className="close float-end"><Link to={`${API_URL}/user-data/${userFolder}/${userDetails.account_key}/shared/${fileUpload['certificate_'+(i+1)].fileName}`} target="_blank" download><FontAwesomeIcon icon={faDownload}/></Link><FontAwesomeIcon style={{marginLeft: '10px'}} icon={faTrash} onClick={() => deleteCertificate(fileUpload['certificate_'+(i+1)].fileName)}/></span>}
                </div>
              )}
              <div className="form-group not-ellipse">
                <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
                <textarea name="" id="" rows="3"  className="form-control" placeholder="Describe / Explain Problems"></textarea>
              </div>
            </form>
            {/* <div className="form-group">
            <button type="button" id="" name="" class="btn btn-primary primary-bg-color border-0 mx-2">Update Photo<input type="file" name="cover" accept="img/*" style={{ display: "none" }} /></button>
            </div> */}
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default InitialHistroy;