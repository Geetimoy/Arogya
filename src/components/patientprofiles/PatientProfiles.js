import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import './PatientProfiles.css'

import Appfooter from '../AppFooter';
import Rating from "./Ratingsave";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

import patientprofile from '../../assets/images/profile.png';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import {Modal, Button} from 'react-bootstrap'; 

import general from '../../assets/images/therapis.png';
import childmalnutrition from '../../assets/images/child-malnutrition.png';
import women from '../../assets/images/prenatal-care.png';
import dentalcare from '../../assets/images/floss.png';
import skinhair from '../../assets/images/skin-care.png';
import more from '../../assets/images/stethoscope.png';

function Patientprofiles(){

  const [isActive, setIsActive] = useState(false);
  const redirect = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [showModal2, setShowModal2] = useState(false); 
  const modalClose2  = () => setShowModal2(false);  
  const modalShow2   = () => setShowModal2(true);

  const [rating, setRating] = useState(0);

  const handleStarClick = (data) => {
    setRating(data); // Toggle the state
    console.log(data);
  };

  const loginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  const loginAccountType  = loginDetails.account_type;

  const [patientList, setPatientList]   = useState([]);
  const [openMenuId, setOpenMenuId]     = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const [isMActive, setIsMActive] = useState(false);
  const [closeProfileAccountKey, setCloseProfileAccountKey] = useState('');
  const [closeRemarks, setCloseRemarks] = useState('');

  const [showCloseProfileModal, setShowCloseProfileModal] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const modalCloseProfile  = () => setShowCloseProfileModal(false);  
  const modalShowProfile   = () => setShowCloseProfileModal(true);  

  const searchPatient = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listPatient(value);
    }, 1000)
  }

  const listPatient = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    if(decryptedLoginDetails.account_type === '5'){
      jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
      var apiUrl                            = 'patientProfileListFromDoctorLogin';
    }
    else{
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      var apiUrl                            = 'patientProfileList';
    }

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": "10",
                                              "offset": "0",
                                              "order_by_field": "account_id",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      if(result.data.length > 0){

      }
      setPatientList(result.data);
    }
    else{
      setPatientList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listPatient("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const openCloseProfileModal = (accountKey) => {
    setCloseProfileAccountKey(accountKey);
    modalShowProfile();
  }

  const handleChangeRemarks = (e) => {
    const { name, value } = e.target;
    setCloseRemarks(value);
  }


  const closeProfile = async () => {
    
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    
    let jsonData = {
      'system_id': systemContext.systemDetails.system_id,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'patient_account_key': closeProfileAccountKey,
      'patient_account_type': 3,
      'introducer_account_key': loginDetails.account_key,
      'introducer_account_type': loginDetails.account_type,
      'remarks': closeRemarks
    };

    const response = await fetch(`${API_URL}/closePatientAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    })

    let result = await response.json();

    if (result.success) { 
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      setOpenMenuId(0);
      setTimeout(()=>{
        modalCloseProfile();
        listPatient("");
      }, 1000);
    } 
    else {
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const [accountKeyForPatientPrescription, setAccountKeyForPatientPrescription] = useState('');

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

  const [showSearchModal, setShowSearchModal] = useState(false); 
  const modalCloseSearch  = () => setShowSearchModal(false);  
  const modalShowSearch   = () => setShowSearchModal(true);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); 
  const modalPrescriptionClose  = () => {
    setAccountKeyForPatientPrescription('');
    setShowPrescriptionModal(false);  
  }
  const modalPrescriptionShow   = (patientAccountKey) => {
    setAccountKeyForPatientPrescription(patientAccountKey);
    setShowPrescriptionModal(true);
  }

  const [prescriptionType, setPrescriptionType] = useState('initial');
  const choosePrescriptionType = (e) => setPrescriptionType(e.target.value);

  const [selectedDoctorAppointment, setSelectedDoctorAppointment] = useState('');
  const chooseDoctorAppointment = (e) => setSelectedDoctorAppointment(e.target.value);

  const [appointmentListForDoctorPresc, setAppointmentListForDoctorPresc] = useState([]);
  const [showPrescriptionModalP2, setShowPrescriptionModalP2] = useState(false); 
  const modalPrescriptionCloseP2  = () => setShowPrescriptionModalP2(false);  
  const modalPrescriptionShowP2   = async () => { console.log(prescriptionType);
    if(prescriptionType === 'initial'){ 
      window.location.href = `/patientprofiles/patient-prescription/${accountKeyForPatientPrescription}/${prescriptionType}`;
    }
    else{

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]       				= accountKeyForPatientPrescription;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      jsonData["search_param"]              = {
                                                "by_keywords": "",
																								"limit": "",
																								"offset": "0",
																								"order_by_field": "appointment_id",
																								"order_by_value": "desc"
                                              }
      
      const response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })
  
      let result = await response.json();
      if(result.data && result.data.appointments.length > 0){
        setAppointmentListForDoctorPresc(result.data.appointments);
      }
      else{
        setAppointmentListForDoctorPresc([]);
      }

      setShowPrescriptionModalP2(true);
    }
  }
  const redirectToUploadDoctorPrescription = () => {
    window.location.href = `/patientprofiles/patient-prescription/${accountKeyForPatientPrescription}/${prescriptionType}/${selectedDoctorAppointment}`;
  }

  const [testReportAppointmentId, setTestReportAppointmentId]     = useState('');
  const [testReportPatientKey, setTestReportPatientKey]           = useState('');
  const [testReportAppointmentList, setTestReportAppointmentList] = useState([]);
  const [showTestReportsModal, setShowTestReportsModal]           = useState(false); 
  const modalTestReportsClose  = () => {
    setShowTestReportsModal(false); 
    setTestReportPatientKey(''); 
  }
  const modalTestReportsShow   = async (patientAccountKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]       				= patientAccountKey;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      jsonData["search_param"]              = {
                                                "by_keywords": "",
																								"limit": "",
																								"offset": "0",
																								"order_by_field": "appointment_id",
																								"order_by_value": "desc"
                                              }
      
      const response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })
  
      let result = await response.json();
      if(result.data && result.data.appointments.length > 0){
        setTestReportAppointmentList(result.data.appointments);
      }
      else{
        setTestReportAppointmentList([]);
      }

    setShowTestReportsModal(true);
    setTestReportPatientKey(patientAccountKey);
  }
  const selectTestReportAppointment = (event) => {
    setTestReportAppointmentId(event.target.value);
  }
  const confirmTestReportAppointment = () => {
    if(testReportAppointmentId){
      window.location.href = `/patientprofiles/patient-test-reports/${testReportPatientKey}/${testReportAppointmentId}`;
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: `Please select an appointment!`});
    }
  }

  const [doctorPrescriptionAppointmentId, setDoctorPrescriptionAppointmentId] = useState(1);
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));


  const [comments, setComments] = useState("");

  const commentsChangeHandler = (event) =>{
    setComments(event.target.value);
    console.log(comments);
  }

  const [savedRating, setSavedRating] = useState(0); // Track the saved rating separately

  // Load the saved rating from localStorage when the component mounts
    useEffect(() => {
      const savedValue = localStorage.getItem('userRating');
      if (savedValue) {
        const parsedValue = parseFloat(savedValue);
        setRating(parsedValue);
        setSavedRating(parsedValue); // Also set the saved rating
      }
    }, []);

  const handleSaveRating = () => {
    localStorage.setItem('userRating', rating);
    setSavedRating(rating); // Update the saved rating state
  };

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/services" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Patient Profiles </h5>
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
      <div className="app-body patient-profiles profile-listing">
        <div className='add-patient align-items-center d-flex justify-content-between'>
        <span>Total - {patientList.length}</span>
          <Link to="/patientprofiles/createpatientprofile" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Patient</Link></div>
        {/* <div className="d-flex justify-content-between mb-3 mt-3">
        <Link onClick={() => { modalShowSearch(); }} to="#">
          <div className='d-flex advaced-search btn btn-sm btn-primary primary-bg-color border-0'>
            
            <span className="search-ultra-plus"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
              <path d="M325.606 304.394 223.328 202.117c16.707-21.256 26.683-48.041 26.683-77.111C250.011 56.077 193.934 0 125.005 0 56.077 0 0 56.077 0 125.006 0 193.933 56.077 250.01 125.005 250.01c29.07 0 55.855-9.975 77.11-26.681l102.278 102.277c2.929 2.93 6.768 4.394 10.607 4.394s7.678-1.464 10.606-4.394c5.859-5.857 5.859-15.355 0-21.212zM30 125.006C30 72.619 72.619 30 125.005 30c52.387 0 95.006 42.619 95.006 95.005 0 52.386-42.619 95.004-95.006 95.004C72.619 220.01 30 177.391 30 125.006z"></path>

            </svg> </span>
            <span>Advanced Search</span>
          </div>
        </Link>
          <span id="filters-search-options-toggle" className="btn p-0">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <path d="M2.5 20c-0.276 0-0.5-0.224-0.5-0.5v-8c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v8c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M2.5 6c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v5c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M3.5 10h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM1.5 8c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> <path d="M9.5 20c-0.276 0-0.5-0.224-0.5-0.5v-4c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v4c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M9.5 10c-0.276 0-0.5-0.224-0.5-0.5v-9c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v9c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M10.5 14h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM8.5 12c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> <path d="M16.5 20c-0.276 0-0.5-0.224-0.5-0.5v-10c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v10c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M16.5 4c-0.276 0-0.5-0.224-0.5-0.5v-3c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v3c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M17.5 8h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM15.5 6c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> </svg>
          </span>
        </div> */}
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Patient' id="searchPatient" name="searchPatient" onChange={searchPatient} />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          {patientList.map((patient, index) => (
            <div className='col-6 mb-3' key={patient.account_id}>
              <div className='button-box'>
                <div className={`three-dot my-element2 ${openMenuId === patient.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(patient.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                {openMenuId === patient.account_id && <div className='drop-menu'>
                    <ul>
                      <li>
                        {/* <Link to={`/patientprofiles/patient-basicinfo/${patient.account_key}`}>Edit Basic Information</Link> */}
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/patientprofiles/patient-basicinfo/${patient.account_key}`}>Edit Basic Information</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') && <Link to={`/patientprofiles/patient-basicinfo/${patient.account_key}`}>View Basic Information</Link>
                        }
                      </li>
                      <li>
                        {/* <Link to={`/patientprofiles/patient-medical-history/${patient.account_key}`}>Update Medical History</Link> */}
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/patientprofiles/patient-medical-history/${patient.account_key}`}>Update Medical History</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/patientprofiles/patient-medical-history/${patient.account_key}`}>View Medical History</Link>
                        }
                      </li>
                      <li>
                        {/* <Link to={`/patientprofiles/patient-periodic-data/${patient.account_key}`}>Update Periodic Data</Link> */}
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/patientprofiles/patient-periodic-data/${patient.account_key}`}>Update Periodic Data</Link>
                          
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/patientprofiles/patient-periodic-data/${patient.account_key}`}>View Periodic Data</Link>
                        }
                      </li>
                      <li><Link to={`/patientprofiles/patient-booked/${patient.account_key}`}>Booked Appointment</Link></li>
                      <li><Link to={`/patientprofiles/patient-booking/${patient.account_key}`}>Book New Doctor Appointment</Link></li>
                      {/* <li><Link to={"/patientprofiles/patient-prescription"}>Upload Prescription</Link></li> */}
                      <li><Link onClick={() => { modalPrescriptionShow(patient.account_key); }} to="#">Upload Prescription</Link></li>
                      {/* <li><Link to={`/patientprofiles/patient-test-reports/${patient.account_key}`}>Upload Test Reports</Link></li> */}
                      <li><Link to={"#"} onClick={()=> modalTestReportsShow(`${patient.account_key}`)}>Upload Test Reports</Link></li>
                     
                      <li><Link to={"#"} onClick={()=>{ openCloseProfileModal(`${patient.account_key}`) }}>Close Profile </Link></li>
                      {loginAccountType === '5' && <li><Link onClick={() => { modalShow2(); }} to="#">Write/View Review </Link></li>}
                    </ul>
                  </div>
                }
                <Link to="#">
                  <img src={patientprofile} alt='' />
                  <h6>{patient.patient_name}</h6>
                </Link>
              </div>
            </div>
          ))}

        </div>

        <Modal show={showCloseProfileModal} onHide={modalCloseProfile}>
          <Modal.Body>  
            <p>Are you sure you want to close this profile?</p> 
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" onChange={handleChangeRemarks} value={closeRemarks}></textarea>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalCloseProfile}>Cancel</Button>  
            <Button variant="primary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={closeProfile}>Confirm to Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showSearchModal} onHide={modalCloseSearch}>
          <Modal.Header>  
            <h3 className='mb-0'>Advanced Search</h3>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-0'><strong>Find a Doctor as a</strong></p> 
            <div className='patient-category mt-3'>
              <div className='box'>
                <img src={general} />
                <p className='mb-0'>Gneral Physician</p> 
              </div>
              <div className='box'>
                <img src={women} />
                <p className='mb-0'>Women's Health</p> 
              </div>
              <div className='box'>
                <img src={dentalcare} />
                <p className='mb-0'>Dental Care</p> 
              </div>
              <div className='box'>
                <img src={childmalnutrition} />
                <p className='mb-0'>Child Specialist</p> 
              </div>
              <div className='box'>
                <img src={skinhair} />
                <p className='mb-0'>Skin & Hair</p> 
              </div>
              <div className='box'>
                <img src={more} />
                <p className='mb-0'>more</p> 
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100'>Search</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalCloseSearch}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showPrescriptionModal} onHide={modalPrescriptionClose}>
          <Modal.Body>  
            <p>Upload Prescription</p> 
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_y" name="prescription_type" className="custom-control-input" value="initial" onChange={choosePrescriptionType} checked={prescriptionType === 'initial' ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Initial Prescription</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_n" name="prescription_type" className="custom-control-input" value="doctor" onChange={choosePrescriptionType} checked={prescriptionType === 'doctor' ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">Doctor Prescription</label>
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>
            <Link onClick={() => { modalPrescriptionShowP2(); }} to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0'>Yes, Proceed</Link>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalPrescriptionClose}>Cancel</Button>  
              
          </Modal.Footer>  
        </Modal>
        
        {/* Doctor Prescription */}
        <Modal show={showPrescriptionModalP2} onHide={modalPrescriptionCloseP2}>
          <Modal.Body className='form-all'>  
            <p>Upload Doctor Prescription</p> 
            <form>
              <div className="form-group">
                <label><span className="d-block">Appointment </span></label>
                <select className="form-control" name="doctor_prescription_appoitment_id" id="doctor_prescription_appoitment_id" onChange={chooseDoctorAppointment}>
                  <option value="">Select</option>
                  {appointmentListForDoctorPresc.map((appointment, index) => (
                    <option key={appointment.appointment_key} value={appointment.appointment_key}>Dr. {`${appointment.doctor_display_name} - ${appointment.appointment_date} @ ${appointment.appointment_time}`}</option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0' onClick={redirectToUploadDoctorPrescription}>Proceed</Link>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalPrescriptionCloseP2}>Cancel</Button>  
             
          </Modal.Footer>  
        </Modal>

        <Modal show={showTestReportsModal} onHide={modalTestReportsClose}>
          <Modal.Body className='form-all'>  
            <p>Upload Test Reports</p> 
            <form>
              <div className="form-group">
                <label><span className="d-block">Appointment </span></label>
                <select className="form-control" name="test_report_appoitment_id" id="test_report_appoitment_id" value={testReportAppointmentId} onChange={selectTestReportAppointment}>
                  <option value="">Select</option>
                   {testReportAppointmentList.map((appointment, index) => (
                    <option key={appointment.appointment_key} value={appointment.appointment_key}>Dr. {`${appointment.doctor_display_name} - ${appointment.appointment_date} @ ${appointment.appointment_time}`}</option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0' onClick={confirmTestReportAppointment}>Confirm</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalTestReportsClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showModal2} onHide={modalClose2}>
          <Modal.Header>  
            <h3>Write Review</h3>
          </Modal.Header>  
          <Modal.Body className='feedback-form'>
            <h5>Servicewise Experience</h5>
            <h6 className='mb-1'>Review & Rating for Patient :</h6>
            <p className='mb-0'>Name : N Mondal</p>
            <div className="rating-star mb-3">
              {/* <span className="">Not at all likely</span> */}
              <span>
                <div className="rating-symbol">
                  <Rating sendDataToParent={handleStarClick}></Rating>
                </div>
              </span>
              {/* <span className="">Extremely likely</span> */}
            </div>
            <div className="form-group">
                  <label htmlFor="comments">Would you like to share any other comments: </label>
                  <textarea id="" rows="3"  className="form-control" placeholder="Thanks so much for your help!" name='comments' value={comments} onChange={commentsChangeHandler}></textarea>
                </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button onClick={handleSaveRating} variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' >Submit</Button> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose2}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>

      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default Patientprofiles;