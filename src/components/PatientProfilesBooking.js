import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link, useParams } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';
import Appfooter from './AppFooter';

import './PatientProfileBooking.css';

import {Modal, Button} from 'react-bootstrap'; 

import youngwoman from '../assets/images/woman.png';
import malnutrition from '../assets/images/malnutrition.png';
import janani from '../assets/images/icon-janani.png';
import patientprofile from '../assets/images/icon-patient-profile.png';

function Patientprofiles(){

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [urlParam, setUrlParam] = useState(useParams());

  const doctorAccountKey  = urlParam.doctorAccountKey;
  const scheduleId        = urlParam.scheduleId;

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const loginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  const loginAccountType  = loginDetails.account_type;

  const [patientList, setPatientList]   = useState([]);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [patientDetailsModalData, setPatientDetailsModalData] = useState({
    patientAccountKey: "",
    patientName: "",
    patientAddress: "",
    patientContactNo: "",
    patientGender: "",
    patientAge: "",
    doctorName: "",
    doctorSpecialization: "",
    doctorLocation: "",
    scheduleDateFrom: "",
    scheduleFromTime: "",
    scheduleToTime: ""
  });

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = async (patient_name, patient_address, patient_contact_no, patient_age, patient_gender, patient_account_key, patient_account_type) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["user_account_key"]  = doctorAccountKey;
    jsonData["user_account_type"] = 5;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    jsonData["schedule_id"]       = scheduleId;

    const response1 = await fetch(`${API_URL}/singleDoctorSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let scheduleDetails = result1.data.data[0];

    patientDetailsModalData['patientAccountKey']    = patient_account_key;
    patientDetailsModalData['patientAccountType']   = patient_account_type;
    patientDetailsModalData['patientName']          = patient_name;
    patientDetailsModalData['patientAddress']       = patient_address;
    patientDetailsModalData['patientContactNo']     = patient_contact_no;
    patientDetailsModalData['patientAge']           = patient_age;
    patientDetailsModalData['patientGender']        = patient_gender;
    patientDetailsModalData['doctorName']           = scheduleDetails.display_name;
    patientDetailsModalData['doctorSpecialization'] = scheduleDetails.specializations;
    patientDetailsModalData['doctorLocation']       = scheduleDetails.clinic_details;
    patientDetailsModalData['scheduleDateFrom']     = scheduleDetails['schedule_dates'][0].schedule_date_from;;
    patientDetailsModalData['scheduleFromTime']     = scheduleDetails['schedule_dates'][0].time_from;
    patientDetailsModalData['scheduleToTime']       = scheduleDetails['schedule_dates'][0].time_to;

    setPatientDetailsModalData({...patientDetailsModalData, ...patientDetailsModalData});

    setShowModal(true);
  }

  const [showModal2, setShowModal2] = useState(false); 
  const modalClose2  = () => setShowModal2(false);  
  const modalShow2   = () => setShowModal2(true);

  const listPatient = async (searchKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": "",
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/userListForSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      if(result.data.data.length > 0){

      }
      setPatientList(result.data.data);
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

  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const modalSuccessClose   = () => setShowSuccessModal(false);  
  const modalSuccessOpen    = () => setShowSuccessModal(true); 
  const [bookingConfirmationMessage, setBookingConfirmationMessage] = useState('');  

  const confirmBooking = async (scheduleId, doctorAccountKey, patientAccountkey, patientAccountType, selectedScheduleDate, selectedScheduleTimeFrom, selectedScheduleTimeTo) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']                   = systemContext.systemDetails.system_id;
    jsonData["device_type"]                 = DEVICE_TYPE;
    jsonData["device_token"]                = DEVICE_TOKEN;
    jsonData["user_lat"]                    = localStorage.getItem('latitude');
    jsonData["user_long"]                   = localStorage.getItem('longitude');
    jsonData["volunteer_account_key"]       = decryptedLoginDetails.account_key;
    jsonData["volunteer_account_type"]      = decryptedLoginDetails.account_type;
    jsonData["patient_account_key"]         = patientAccountkey;
    jsonData["patient_account_type"]        = patientAccountType;
    jsonData["doctor_avail_schedule_id"]    = scheduleId;
    jsonData["appointment_book_date"]       = selectedScheduleDate;
    jsonData["appointment_book_time_from"]  = selectedScheduleTimeFrom;
    jsonData["appointment_book_time_to"]    = selectedScheduleTimeTo;

    const response = await fetch(`${API_URL}/bookDoctorAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      modalClose();
      setBookingConfirmationMessage(result.msg);
      modalSuccessOpen();
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/appointment-scheduling-volunteer" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Select Patient </h5>
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
      <div className="app-body patient-profiles profile-listing booking-patient patientprofiles-booking">
        {/* <div className='add-patient'><Link to="/patientprofiles/createpatientprofile" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Patient</Link></div> */}
        <div className="d-flex justify-content-between mb-3 mt-3">
          <Link onClick={() => { modalShow2(); }} to="#">
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
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search a patient' />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

          {patientList.map((patient, index) => (
            <div className='col-6 mb-3' key={patient.account_key}>
              <div className='button-box'>
                  <div className='position-absolute type-patient primary-bg-color'>{String(patient.patient_type).charAt(0).toUpperCase() + String(patient.patient_type).slice(1)}</div>
                  <img src={patientprofile} alt='' />
                  <h6>{patient.display_name}</h6>
                  <h6>{patient.gender} / {patient.age} yrs</h6>
                  <p className='disease'><small>Problem - Skin</small></p>
                  <div className="mb-3 mt-3 text-center">
                    <Link onClick={() => { modalShow(patient.display_name, patient.patient_addr_1, patient.contact_no, patient.age, patient.gender, patient.account_key, '3'); }} to="#" className="btn btn-box-custom primary-bg-color text-light">Select</Link>
                  </div>
              </div>
            </div>
          ))}

        </div>
        <Modal show={showModal} onHide={modalClose}>
          <Modal.Header>  
            <h3>Patient Details</h3>
          </Modal.Header>  
          <Modal.Body>  
            <div className='form-group'>
              <p className='mb-0'><strong>Patient Name</strong> - {patientDetailsModalData['patientName']} (9876543213)</p>
              <p className='mb-0'><strong>Gender</strong> - {patientDetailsModalData['patientGender']}, 32</p>
              {/* <p className='mb-0'><strong>Age</strong> - 32</p> */}
              {/* <p className='mb-0'><strong>Phone</strong> - 9876543213</p> */}
              <p className='mb-0'><strong>Address</strong> - {patientDetailsModalData['patientAddress']}</p>
              {/* <p className='mb-0'><strong>City</strong> - Kolkata</p> */}
              {/* <p className='mb-0'><strong>Disease</strong> - Dental Problem</p> */}
              <p className='mb-0'><strong>Doctor Name </strong> -  {patientDetailsModalData['doctorName']}</p>
              <p className='mb-0'><strong>Specialization </strong> -  {patientDetailsModalData['doctorSpecialization']}</p>
              <p className='mb-0'><strong>Location </strong> -  {patientDetailsModalData['doctorLocation']}</p>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0' onClick={() => confirmBooking(scheduleId, doctorAccountKey.toLowerCase(), patientDetailsModalData['patientAccountKey'].toLowerCase(), patientDetailsModalData['patientAccountType'], patientDetailsModalData['scheduleDateFrom'], patientDetailsModalData['scheduleFromTime'], patientDetailsModalData['scheduleToTime'])}>Book Now</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showModal2} onHide={modalClose2}>
          <Modal.Header className='justify-content-between'>  
            <h3 className='mb-0'>Advanced Search</h3>
            <Link to={"#"}>Clear</Link>
          </Modal.Header>   
          <Modal.Body> 
            <p className='mb-0'><strong>Find a Patient </strong></p> 
            <div className='patient-category mt-3'>
              <div className='box'>
                <img src={malnutrition} />
                <p className='mb-0'>Child Malnutrition</p> 
              </div>
              <div className='box'>
                <img src={youngwoman} />
                <p className='mb-0'>Young Woman</p> 
              </div>
              <div className='box'>
                <img src={janani} />
                <p className='mb-0'>Janani</p> 
              </div>
              <div className='box'>
                <img src={patientprofile} />
                <p className='mb-0'>General Patient</p> 
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100'>Search</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose2}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showSuccessModal} onHide={modalSuccessClose}>
          <Modal.Header className="justify-content-between">  
            <h3 className='mb-0'>Information</h3>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-2' dangerouslySetInnerHTML={{ __html: bookingConfirmationMessage }}/>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalSuccessClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default Patientprofiles;