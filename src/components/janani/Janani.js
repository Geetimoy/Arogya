import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";
import Rating from "./Ratingsave";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import youngwomenprofile from '../../assets/images/profile-girl.png';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import {Modal, Button} from 'react-bootstrap'; 

function Janani(){

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

  const [isActive, setIsActive] = useState(false);
  const [closeProfileAccountKey, setCloseProfileAccountKey] = useState('');
  const [closeRemarks, setCloseRemarks] = useState('');

  const [accountKeyForJnaniPrescription, setAccountKeyForJnaniPrescription] = useState('');

  const [showCloseProfileModal, setShowCloseProfileModal] = useState(false); 

  const modalCloseProfile  = () => setShowCloseProfileModal(false);  
  const modalShowProfile   = () => setShowCloseProfileModal(true);  

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); 
  const modalPrescriptionClose  = () => {
    setAccountKeyForJnaniPrescription('');
    setShowPrescriptionModal(false);  
  }
  const modalPrescriptionShow   = (jnaniAccountKey) => {
    setAccountKeyForJnaniPrescription(jnaniAccountKey);
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
      window.location.href = `/janani/janani-prescription/${accountKeyForJnaniPrescription}/${prescriptionType}`;
    }
    else{

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]       				= accountKeyForJnaniPrescription;
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
    window.location.href = `/jnani/jnani-prescription/${accountKeyForJnaniPrescription}/${prescriptionType}/${selectedDoctorAppointment}`;
  }

  const [testReportAppointmentId, setTestReportAppointmentId]     = useState('');
  const [testReportJananiKey, setTestReportJananiKey]               = useState('');
  const [testReportAppointmentList, setTestReportAppointmentList] = useState([]);
  const [showTestReportsModal, setShowTestReportsModal]           = useState(false); 
  const modalTestReportsClose  = () => {
    setShowTestReportsModal(false); 
    setTestReportJananiKey(''); 
  }
  const modalTestReportsShow   = async (jananiAccountKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]       				= jananiAccountKey;
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
    setTestReportJananiKey(jananiAccountKey);
  }
  const selectTestReportAppointment = (event) => {
    setTestReportAppointmentId(event.target.value);
  }
  const confirmTestReportAppointment = () => {
    if(testReportAppointmentId){
      window.location.href = `/janani/janani-test-reports/${testReportJananiKey}/${testReportAppointmentId}`;
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: `Please select an appointment!`});
    }
  }

  const [jananiList, setJananiList]   = useState([]);
  const [openMenuId, setOpenMenuId]   = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const searchJanani = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listJanani(value);
    }, 1000)
  }

  const listJanani = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    if(decryptedLoginDetails.account_type === '5'){
      jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
      var apiUrl                            = 'jananiProfileListFromDoctorLogin';
    }
    else{
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      var apiUrl                            = 'jananiProfileList';
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
      setJananiList(result.data);
    }
    else{
      setJananiList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listJanani("");
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
      'janani_account_key': closeProfileAccountKey,
      'janani_account_type': 3,
      'introducer_account_key': loginDetails.account_key,
      'introducer_account_type': loginDetails.account_type,
      'remarks': closeRemarks
    };

    const response = await fetch(`${API_URL}/closeJananiAccount`, {
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
        listJanani("");
      }, 1000);
    } 
    else {
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

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

  
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

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
            <h5 className='mx-2 mb-0'>Janani</h5>
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
      <div className="app-body janani profile-listing services">
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - {jananiList.length}</span>
          
          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/janani/create-janani" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Janani</Link>
          }
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Janani' onChange={searchJanani}/>
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

          {jananiList.map((janani, index) => (
            <div className='col-6' key={janani.account_id}>
              <div className='button-box'>
                <div className={`three-dot my-element2 ${openMenuId === janani.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(janani.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                {openMenuId === janani.account_id && <div className='drop-menu'>
                    <ul>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/janani/janani-basic-information/${janani.account_key}`}>Edit Basic Information</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') && <Link to={`/janani/janani-view-basic-information/${janani.account_key}`}>View Basic Information</Link>
                        }
                      </li>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/janani/janani-medical-history/${janani.account_key}`}>Update Medical History</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/janani/janani-view-medical-history/${janani.account_key}`}>View Medical History</Link>
                        }
                      </li>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/janani/janani-periodic-data/${janani.account_key}`}>Update Periodic Data</Link>
                          
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/janani/janani-view-periodic-data/${janani.account_key}`}>View Periodic Data</Link>
                        }
                      </li>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/janani/janani-awareness-survey/${janani.account_key}`}>Update Awareness Survey</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/janani/janani-awareness-survey/${janani.account_key}`}>View Awareness Survey</Link>
                        }
                      </li>
                      {/* <li><Link to={`/janani/janani-prescriptions/${janani.account_key}`}>Upload Prescriptions</Link></li> */}
                      {
                          (decryptedLoginDetails.account_type !== '5') &&
                      <li><Link to={`/janani/janani-booked-appointment/${janani.account_key}`}>Booked Appointment</Link></li>
                      }
                      {
                          (decryptedLoginDetails.account_type !== '5') &&
                      <li><Link to={`/janani/janani-booking/${janani.account_key}`}>Book New Doctor Appointment</Link></li>
                      }
                      <li><Link onClick={() => { modalPrescriptionShow(janani.account_key); }} to="#">Upload Prescription</Link></li>
                      <li><Link onClick={() => { modalTestReportsShow(janani.account_key); }} to="#">Upload Test Reports</Link></li>
                      {/* <li><Link to={`/janani/janani-patient-booking/`}>Book Now</Link></li> */}
                      <li><Link to={`#`} onClick={()=>{ openCloseProfileModal(`${janani.account_key}`) }}>Close Profile </Link></li>
                      {loginAccountType === '5' && <li><Link onClick={() => { modalShow2(); }} to="#">Write/View Review </Link></li>}
                    </ul>
                  </div>
                }
                <Link to="#">
                  <img src={youngwomenprofile} alt='' />
                  <h6>{janani.janani_name}</h6>
                </Link>
              </div>
            </div>
          ))}

          {jananiList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}
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

        <Modal show={showPrescriptionModal} onHide={modalPrescriptionClose}>
          <Modal.Body>  
            <p>Upload Prescription</p> 
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_y" name="prescription_type" className="custom-control-input" value="initial" onChange={choosePrescriptionType} checked={prescriptionType === 'initial' ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Survey Form</label>
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
  )
}

export default Janani;