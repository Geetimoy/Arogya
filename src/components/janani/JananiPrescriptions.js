import { useState, useContext, useEffect, useRef } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams, useNavigate } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import youngwomenprescription from '../../assets/images/sample-rx.png';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import docIcon from '../../assets/images/doc-icon.jpg';

import {Modal, Button} from 'react-bootstrap'; 
import AppTopNotifications from '../AppTopNotifications';

function JananiPrescriptions(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const [prescriptionList, setPrescriptionList]   = useState([]);
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [showCamera, setShowCamera] = useState(false); // State to toggle camera popup
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  //const [screenshot, setScreenshot] = useState('');

  const [screenshot, setScreenshot] = useState({
    inputPrescription1 : '',
    inputPrescription2 : '',
    inputPrescription3 : '',
    inputPrescription4 : '',
    inputPrescription5 : ''
  });
  const [screenshotSeq, setScreenshotSeq] = useState(0);

  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

  if(prescriptionType === 'initial'){
    var uploadUrl = `/janani/janani-upload-prescription/${editAccountKey}/${prescriptionType}`;
    var fetchUrl  = `fetchInitialAppointmentDocumentForJanani`;
  }
  else if(prescriptionType === 'doctor'){
    var uploadUrl = `/janani/janani-upload-prescription/${editAccountKey}/${prescriptionType}/${appointmentId}`;
    var fetchUrl  = `fetchInitialAppointmentDocumentForJanani`;
  }

  const [isMActive, setIsMActive] = useState(false);

  const redirect = useNavigate();

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const searchPrescription = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listPrescription(value);
    }, 1000)
  }

  const listPrescription = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']       = systemContext.systemDetails.system_id;
    jsonData["volunteer_key"]   = decryptedLoginDetails.account_key;
    jsonData["account_key"]     = editAccountKey;
    jsonData["account_type"]    = 3;
    jsonData["file_type"]       = prescriptionType;
    jsonData["search_param"]    = {
                                    "by_keywords": searchKey,
                                    "limit": "0",
                                    "offset": "0",
                                    "order_by_field": "",
                                    "order_by_value": "desc"
                                  }

    const response = await fetch(`${API_URL}/${fetchUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      if(result.data.length > 0){

      }
      setPrescriptionList(result.data);
    }
    else{
      setPrescriptionList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listPrescription("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [deletePrescriptionFileId, setDeletePrescriptionFileId]         = useState('');
  const [showPrescriptionDeleteModal, setShowPrescriptionDeleteModal]   = useState(false); 
  const modalPrescriptionDeleteClose  = () => {
    setShowPrescriptionDeleteModal(false); 
  }
  const modalPrescriptionDeleteShow   = (fileId) => {
    setDeletePrescriptionFileId(fileId);
    setShowPrescriptionDeleteModal(true);
  }

  const deletePrescription = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["account_key"]           = editAccountKey;
    jsonData["account_type"]          = 3;
    jsonData["file_id"]               = deletePrescriptionFileId;
    jsonData["file_type"]             = prescriptionType;
    jsonData["volunteer_account_key"] = decryptedLoginDetails.account_key;
    jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]          = DEVICE_TOKEN;
    jsonData["user_lat"]              = localStorage.getItem('latitude');
    jsonData["user_long"]             = localStorage.getItem('longitude');

    const response = await fetch(`${API_URL}/deleteInitialAppointmentDocumentForJanani`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      listPrescription("");
      setShowPrescriptionDeleteModal(false);
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const getUserBasicDetails = async () => {
          
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};
    
    if(decryptedLoginDetails.account_type == 5){
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 33;
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
      jsonData["account_type"]              = 33;
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

  //CAMERA FUNCTIONALITY

  const openCameraPopup = () => {
    setShowCamera(true);
    startCamera();
  };

  const closeCameraPopup = () => {
    setScreenshot({
      inputPrescription1 : '',
      inputPrescription2 : '',
      inputPrescription3 : '',
      inputPrescription4 : '',
      inputPrescription5 : ''
    });
    setScreenshotSeq(0);
    setIsImageCaptured(false);
    setShowCamera(false);
    stopCamera();
  };

  const startCamera = () => {
    const constraints = {
        video: {
            facingMode: useFrontCamera ? "user" : "environment", // Use "user" for front camera and "environment" for rear camera
            width: { ideal: 595 },     // Set ideal and cap it with max
            height: { ideal: 842 },    // Set ideal and cap it with max
        },
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(function (error) {
                console.error("Error accessing camera: ", error);
            });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Stop all video tracks
    }
  };

  const toggleCamera = () => {
    setIsImageCaptured(false);
    setUseFrontCamera(!useFrontCamera); // Toggle between front and rear camera
    stopCamera();
    startCamera();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas to desired output size (A4 approx)
      canvas.width  = 595;
      canvas.height = 842;
      
      const ctx = canvas.getContext('2d');

      // Get actual video size
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate source cropping to center the A4 frame
      const targetAspect = canvas.width / canvas.height;
      const videoAspect = videoWidth / videoHeight;

      let sx, sy, sw, sh;

      if (videoAspect > targetAspect) {
        // Video is wider than target — crop horizontally
        sh = videoHeight;
        sw = sh * targetAspect;
        sx = (videoWidth - sw) / 2;
        sy = 0;
      } 
      else {
        // Video is taller than target — crop vertically
        sw = videoWidth;
        sh = sw / targetAspect;
        sx = 0;
        sy = (videoHeight - sh) / 2;
      }

      // Flip front camera image
      if (useFrontCamera) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      let imageData = canvas.toDataURL('image/jpeg', 0.9);
      let currentSeqNumber = screenshotSeq+1;
      setScreenshotSeq(currentSeqNumber);
      setScreenshot(prev => ({
        ...prev,
        [`inputPrescription${currentSeqNumber}`]: imageData
      }));
      setIsImageCaptured(true);
      stopCamera();
    }
  };

  const saveCancelCapturedImage = (action) => {
    if(action == 'add_more'){
      setIsImageCaptured(false);
      startCamera();
    }
    else if(action == 'save'){
      setIsImageCaptured(false);
      setScreenshot({
        inputPrescription1 : '',
        inputPrescription2 : '',
        inputPrescription3 : '',
        inputPrescription4 : '',
        inputPrescription5 : ''
      });
      closeCameraPopup();
    }
    else if(action == 'cancel'){
      let currentSeqNumber = screenshotSeq;
      setScreenshot(prev => ({
        ...prev,
        [`inputPrescription${currentSeqNumber}`]: ''
      }));
      let previousSeqNumber = screenshotSeq-1;
      setScreenshotSeq(previousSeqNumber);
      setIsImageCaptured(false);
      startCamera();
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
            <h5 className='mx-2 mb-0'>Upload Prescriptions</h5>
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
        <p className='patient-details'>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total- {prescriptionList.length}</span>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0' to={uploadUrl}>Upload</Link>
          <button className='btn btn-sm btn-primary primary-bg-color border-0' onClick={openCameraPopup} >Use Camera</button>
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Prescription' onChange={searchPrescription}/>
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          {prescriptionList.map((janani, index) => (
            <div className='col-6' key={janani.file_id}>
              <div className='button-box'>
                <div className='prescription'>
                  <div className="btn-download"><Link target="_blank" to={`${janani.file_path}`}><FontAwesomeIcon icon={faDownload}/></Link></div>
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} onClick={() => modalPrescriptionDeleteShow(janani.file_id)}/></div>
                  <img src={docIcon} alt='' className='w-100' />
                  <p className='mb-1'><strong>{janani.file_name}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showPrescriptionDeleteModal} onHide={modalPrescriptionDeleteClose}>
          <Modal.Header>
            <h4>Delete Prescription</h4>
          </Modal.Header> 
          <Modal.Body className='form-all'>  
            <p>Are you sure to delete this prescription? Deletion is permanent.</p> 
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={deletePrescription}>Confirm</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalPrescriptionDeleteClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>    
        <Modal show={showCamera} onHide={closeCameraPopup} className="camera-popup-modal a4">
          <Modal.Header closeButton>
            <Modal.Title><small className='fa-2xs red-text'>You can capture max. 5 screenshots at once</small></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="camera-popup-content">
              {!isImageCaptured &&
                <>
                  <div className="video-wrapper-a4">
                    <video ref={videoRef} width="100%" height="auto" autoPlay></video>
                  </div>
                  <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                </>
              }
              {isImageCaptured && 
                <div className="screenshot-a4">
                  <img src={screenshot[`inputPrescription${screenshotSeq}`]} />
                </div>
              }
            </div>
          </Modal.Body>
          <Modal.Footer style={{paddingLeft:'0px',paddingRight:'0px'}}>
            {!isImageCaptured && 
              <>
                <Button variant="secondary" onClick={toggleCamera}>
                  Switch Camera
                </Button>
                <Button variant="primary" onClick={captureImage}>
                  Capture
                </Button>
                <Button variant="secondary" onClick={closeCameraPopup}>
                  Close
                </Button>
              </>
            }
            
            {isImageCaptured && 
              <>
                <span className='screenshot-counter-badge'>{screenshotSeq}</span>
                <Button variant="primary" onClick={ () => saveCancelCapturedImage('add_more')}>
                  Add More +
                </Button>
                <Button variant="primary" onClick={ () => saveCancelCapturedImage('save')}>
                  Save
                </Button>
                <Button variant="secondary" onClick={ () => saveCancelCapturedImage('cancel')}>
                  Cancel
                </Button>
              </>
            }
          </Modal.Footer>
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default JananiPrescriptions;