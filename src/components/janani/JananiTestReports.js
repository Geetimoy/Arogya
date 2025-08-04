import { useState, useContext, useEffect, useRef } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams, useNavigate } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import Appfooter from '../AppFooter';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import patientprescription from '../../assets/images/demo-test-report.jpg';

import {Modal, Button} from 'react-bootstrap'; 
import AppTopNotifications from '../AppTopNotifications';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function JananiTestReports(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam]       = useState(useParams());
  const [reportList, setReportList]   = useState([]);
  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const [showCamera, setShowCamera] = useState(false); // State to toggle camera popup
  const [useFrontCamera, setUseFrontCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [screenshot, setScreenshot] = useState({
    inputPrescription1 : ''
  });
  const [screenshotSeq, setScreenshotSeq] = useState(0);
  const [totalScreenshotCanBeCaptured, setTotalScreenshotCanBeCaptured] = useState(1);

  const editAccountKey    = urlParam.patientKey;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

  const [isMActive, setIsMActive] = useState(false);
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const listReports = async (searchKey) => {
    
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']               = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_key"]   = decryptedLoginDetails.account_key;
    jsonData["account_key"]             = editAccountKey;
    jsonData["account_type"]            = 3;
    jsonData["search_param"]            = {
                                            "by_keywords": searchKey,
                                            "limit": "0",
                                            "offset": "0",
                                            "order_by_field": "file_id",
                                            "order_by_value": "asc"
                                          }


    const response = await fetch(`${API_URL}/fetchTestReportForJanani`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      setReportList(result.data);
    }
    else{
      setReportList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listReports("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [deleteTestReportFileId, setDeleteTestReportFileId]           = useState('');
  const [deleteTestReportApptId, setDeleteTestReportApptId]           = useState('');
  const [showTestReportsDeleteModal, setShowTestReportsDeleteModal]   = useState(false); 
  const modalTestReportsDeleteClose  = () => {
    setShowTestReportsDeleteModal(false); 
  }
  const modalTestReportsDeleteShow   = (fileId, apptId) => {
    setDeleteTestReportFileId(fileId);
    setDeleteTestReportApptId(apptId);
    setShowTestReportsDeleteModal(true);
  }

  const deleteTestReport = async () => {
    
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["account_key"]           = editAccountKey;
    jsonData["appointment_key"]       = deleteTestReportApptId;
    jsonData["volunteer_account_key"] = decryptedLoginDetails.account_key;;
    jsonData["file_id"]               = deleteTestReportFileId;
    jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]          = DEVICE_TOKEN;
    jsonData["user_lat"]              = localStorage.getItem('latitude');
    jsonData["user_long"]             = localStorage.getItem('longitude');

    const response = await fetch(`${API_URL}/deleteTestReportForJanani`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      listReports("");
      setShowTestReportsDeleteModal(false);
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const searchReport = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listReports(value);
    }, 1000)
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
    
  const [formData, setFormData] = useState({
    report_name: {required: true, value:"", errorClass:"", errorMessage:""},
    report_date: {required: true, value:"", errorClass:"", errorMessage:""},
    report_clinic: {required: true, value:"", errorClass:"", errorMessage:""},
    report_approved_doctor: {required: true, value:"", errorClass:"", errorMessage:""},
    report_summary: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
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

  const resetForm = () => {
    const fieldName = Object.keys(formData);
    fieldName.forEach((element) => {
      formData[element].value         = "";
      formData[element].errorClass    = "";
      formData[element].errorMessage  = "";
    })
    setFormData({...formData, ...formData});
  }

  const openCameraPopup = () => {
    setShowCamera(true);
    startCamera(useFrontCamera);
  };

  const closeCameraPopup = () => {
    setScreenshot({
      inputPrescription1 : ''
    });
    setScreenshotSeq(0);
    setIsImageCaptured(false);
    setShowCamera(false);
    stopCamera();
  };

  const startCamera = (useFrontCameraStatus) => {
    const constraints = {
        video: {
            facingMode: useFrontCameraStatus ? "user" : "environment", // Use "user" for front camera and "environment" for rear camera
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
    let useFrontCameraStatus = !useFrontCamera;
    setUseFrontCamera(useFrontCameraStatus); // Toggle between front and rear camera
    stopCamera();
    startCamera(useFrontCameraStatus);
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

  const saveCancelCapturedImage = async (action) => {
    
    if(action == 'add_more'){
      setIsImageCaptured(false);
      startCamera(useFrontCamera);
    }
    else if(action == 'save'){
      let errorCounter = validateForm();

      if(errorCounter === 0){

        var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

        var filledCountObject = Object.values(screenshot).filter(value => value !== '');
    
        let jsonData = {};
  
        var reportDate = '';
        if(formData['report_date'].value != ''){
          reportDate = new Date(formData['report_date'].value);
  
          const year  = reportDate.getFullYear();
          const month = String(reportDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day   = String(reportDate.getDate()).padStart(2, '0');
  
          reportDate  = `${year}-${month}-${day}`;
        }

        let fileUploadArray = [];
        Object.entries(filledCountObject).map(async ([key, value], index) => {
          var uploadedFileBase64Array = value.split(';base64,');
          fileUploadArray.push(uploadedFileBase64Array[1])
        });
  
        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["user_account_key"]          = editAccountKey;
        jsonData["user_account_type"]         = 3;
        jsonData["appointment_key"]           = appointmentId;
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["initial_summary"]           = formData['report_summary'].value;
        jsonData["report_name"]               = formData['report_name'].value;
        jsonData["file"]                      = fileUploadArray[0];
        jsonData["report_date"]               = reportDate;
        jsonData["report_done_from"]          = formData['report_clinic'].value;
        jsonData["report_done_dr_name"]       = formData['report_approved_doctor'].value;
        jsonData["file_extension"]            = 'jpg';
        jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
        jsonData["device_token"]              = DEVICE_TOKEN;
        jsonData["user_lat"]                  = localStorage.getItem('latitude');
        jsonData["user_long"]                 = localStorage.getItem('longitude');
  
        const response = await fetch(`${API_URL}/uploadTestReportForJanani`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
        
        let result = await response.json();
  
        if(result.success){
          alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
          setIsImageCaptured(false);
          setScreenshot({
            inputPrescription1 : ''
          });
          closeCameraPopup();
          resetForm();
          listReports("");
        }
        else{
          alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        }

      }
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
      startCamera(useFrontCamera);
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
            <h5 className='mx-2 mb-0'>Test Reports</h5>
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
      <div className="app-body test-reports">
        <p>
            {(userBasicDetails.display_name) && <span className="text-muted d-flex"><span>{userBasicDetails.display_name}</span>, {userBasicDetails.gender}, {userBasicDetails.age}yrs</span>}
        </p>
        
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - {reportList.length}</span>
          <div className='d-flex justify-content-end'><button className='btn btn-sm btn-primary primary-bg-color border-0' onClick={openCameraPopup} >Use Camera</button>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0 ms-2' to={`/janani/janani-upload-test-reports/${editAccountKey}/${appointmentId}`}>Upload</Link></div>
          
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Test Reports' onChange={searchReport}/>
            <span class="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          
          {reportList.map((report, index) => (
            <div className='col-6' key={report.file_id}>
              <div className='button-box'>
                <div className='prescription'>
                  <div className="btn-download"><Link target="_blank" to={`${report.file_path}`}><FontAwesomeIcon icon={faDownload}/></Link></div>
                  <div className="btn-delete" onClick={()=>modalTestReportsDeleteShow(report.file_id, report.appointment_key)}><FontAwesomeIcon icon={faTrash} /></div>
                  <img src={patientprescription} alt='' className='w-100' />
                  <p className='pb-2'><strong><small>{report.report_name}</small></strong></p>
                </div>
              </div>
            </div>
          ))}

        </div>

        <Modal show={showTestReportsDeleteModal} onHide={modalTestReportsDeleteClose}>
          <Modal.Header>
            <h4>Delete Test Report</h4>
          </Modal.Header> 
          <Modal.Body className='form-all'>  
            <p>Are you sure to delete this report? Deletion is permanent.</p> 
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0' onClick={deleteTestReport}>Yes, Delete It</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalTestReportsDeleteClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>
        <Modal show={showCamera} onHide={closeCameraPopup} className="camera-popup-modal a4">
          <Modal.Header closeButton>
            <Modal.Title><small className='fa-2xs red-text'>You can capture max. {totalScreenshotCanBeCaptured} screenshots at once</small></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="camera-popup-content">
              {!isImageCaptured &&
                <>
                  <div className={`video-wrapper-a4 ${(useFrontCamera) ? 'flip' : ''}`}>
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
          <Modal.Footer style={{paddingLeft:'0px',paddingRight:'0px'}} className='form-all'>
            {!isImageCaptured && 
              <>
                <Button className='primary-bg-color border-0' variant="secondary" onClick={toggleCamera}>
                  Switch Camera
                </Button>
                <Button className='primary-bg-color border-0' variant="primary" onClick={captureImage}>
                  Capture
                </Button>
                <Button className='primary-bg-color border-0' variant="secondary" onClick={closeCameraPopup}>
                  Close
                </Button>
              </>
            }
            
            {isImageCaptured && 
              <>
                {
                  <form className="mt-3 select-box" name="test_report_form" id="test_report_form">
                    <div className='row'>
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
                    </div>
                  </form>
                }
                
                <Button className='primary-bg-color border-0' variant="primary" onClick={ () => saveCancelCapturedImage('save')}>
                  Save
                </Button>
                <Button className='primary-bg-color border-0' variant="secondary" onClick={ () => saveCancelCapturedImage('cancel')}>
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

export default JananiTestReports;