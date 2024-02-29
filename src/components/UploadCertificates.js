import { useState, useContext, useEffect } from 'react';

import Appfooter from "./AppFooter";

import { MAX_CERTICATE_UPLOAD } from './util/Constants';

import './UploadCertificates.css';

import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function UploadCertificates(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

  const [fileUpload, setFileUpload] = useState({
    certificate_1 : {'upload': false, 'fileName': ''},
    certificate_2 : {'upload': false, 'fileName': ''},
    certificate_3 : {'upload': false, 'fileName': ''},
    certificate_4 : {'upload': false, 'fileName': ''},
    certificate_5 : {'upload': false, 'fileName': ''}
  });

  useEffect(() => {
    setFileUpload({...fileUpload, 'certificate_1': {...fileUpload['certificate_1'], upload:true, fileName:''}});
  }, []);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const uploadCertificateChange = async (event, elem, index) => {
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));

    if(event.target.files[0]){

      fileUpload[elem].upload   = true;
      fileUpload[elem].fileName = event.target.files[0].name;
      setFileUpload({...fileUpload, ...fileUpload});

      const formData = new FormData();
      formData.append("system_id", systemContext.systemDetails.system_id);
      formData.append("device_type", DEVICE_TYPE);
      formData.append("device_token", DEVICE_TOKEN);
      formData.append("user_lat", localStorage.getItem('latitude'));
      formData.append("user_long", localStorage.getItem('longitude'));
      formData.append("user_account_key", loginDetails.account_key);
      formData.append("user_account_type", loginDetails.account_type);
      formData.append("file", event.target.files[0]);
      formData.append("file_seq", elem);

      // const response = await fetch(`${API_URL}/uploadCertificate`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: formData,
      // });

      var result = {
        'msg': 'File Uploaded Successfully',
        'success': true
      }

      if(result.success){
        const nextElem = 'certificate_'+(index+1);
        if(fileUpload[nextElem]){
          fileUpload[nextElem].upload   = true;
          fileUpload[nextElem].fileName = '';
          setFileUpload({...fileUpload, ...fileUpload});
        }
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    }
    
  };
  
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
              <h5 className='mx-2 mb-0'>Upload Certificates </h5>
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
      <div className="app-body upload-certifiate">
        <div className='d-flex justify-content-between align-items-center'><h5></h5><span>Max 5 files, 500 KB each</span></div>
        <div className="upload-certificate-list">
          <div className="rounded jumbotron p-3 mt-3 mb-3">
            <form encType="multipart/form-data">
              {[...Array(MAX_CERTICATE_UPLOAD)].map((e, i) => <div key={i+1} className={`form-group brdr-btm parent ${(fileUpload['certificate_'+(i+1)].upload === true) ? '' : 'upload-disabled'}`}>
                <input type="file" name={`certificate_${i+1}`} id={`certificate_${i+1}`} onChange={(event) => uploadCertificateChange(event, 'certificate_'+(i+1), i+1)}/>
                <label>{(fileUpload['certificate_'+(i+1)].fileName === '') ? 'Upload Certificate '+(i+1) : fileUpload['certificate_'+(i+1)].fileName}</label>
                <span className="close float-end">&#10006;</span>
              </div>)}
            </form>
            {/* <div className="form-group">
            <button type="button" id="" name="" class="btn btn-primary primary-bg-color border-0 mx-2">Update Photo<input type="file" name="cover" accept="img/*" style={{ display: "none" }} /></button>
            </div> */}
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default UploadCertificates;