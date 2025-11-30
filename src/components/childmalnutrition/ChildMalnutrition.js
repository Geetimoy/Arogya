import { useState, useContext, useEffect, useRef } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";
import Rating from "./Ratingsave";
import WeightLineChart from "../WeightLineChart";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import childprofile from '../../assets/images/profile-child.png';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN, PAGINATION_LIMIT } from "../util/Constants";

import {Modal, Button} from 'react-bootstrap'; 
import AppTopNotifications from '../AppTopNotifications';



function ChildMalnutrion(){

  const searchRef = useRef(null);

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [reviewModalDetails, setReviewModalDetails] = useState({
    'child_account_key':'',
    'child_name':''
  });

  const [showReviewModal, setShowReviewModal]       = useState(false); 
  const modalReviewClose  = () => setShowReviewModal(false);  
  const modalReviewShow   = async (child_account_key, child_name) => {
    reviewModalDetails['child_account_key'] = child_account_key;
    reviewModalDetails['child_name']        = child_name;
    setReviewModalDetails({...reviewModalDetails, ...reviewModalDetails});
    setShowReviewModal(true);
  }

  const [rating, setRating] = useState(0);

  const handleStarClick = (data) => {
    setRating(data); // Toggle the state
    console.log(data);
  };

  const loginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  const loginAccountType  = loginDetails.account_type;

  const [childList, setChildList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(0);

  

  const handleMenuClick = async (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);


    // var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    //  let jsonData = {};
    //   jsonData['system_id']                 = systemContext.systemDetails.system_id;
    //   jsonData["account_key"]               = decryptedLoginDetails.account_key;
    //   jsonData["account_type"]              = decryptedLoginDetails.account_type;

    //   jsonData["call_for"]       				    = decryptedLoginDetails.weight;
    //   jsonData["user_login_id"]       		  = decryptedLoginDetails.login_id;
      

    //   jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    //   jsonData["device_token"]              = DEVICE_TOKEN;
    //   jsonData["user_lat"]                  = localStorage.getItem('latitude');
    //   jsonData["user_long"]                 = localStorage.getItem('longitude');
      
      

    //  const response = await fetch(`${API_URL}/getWeightHistory`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(jsonData)
    //   })


    //    let result = await response.json();
    //     if(result.success && result.data && result.data.appointments.length > 0){
    //       setOpenMenuId(openMenuId === accountId ? 0 : accountId);
    //     }
    //     else{
    //       alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    //     }
  };

  const [isActive, setIsActive] = useState(false);
  const [closeProfileAccountKey, setCloseProfileAccountKey] = useState('');
  const [closeRemarks, setCloseRemarks] = useState('');

  const [showCloseProfileModal, setShowCloseProfileModal] = useState(false);
  const [modalHealthChartShow, setModalHealthChartShow] = useState(false);
  

  const modalHealthChartClose  = () => setModalHealthChartShow(false);  
  // const modalHealthChartShow   = () => setModalHealthChartShow(true);

  const modalCloseProfile  = () => setShowCloseProfileModal(false);  
  const modalShowProfile   = () => setShowCloseProfileModal(true); 

  const [accountKeyForPatientPrescription, setAccountKeyForPatientPrescription] = useState('');

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const modalPrescriptionClose  = () => {
    setAccountKeyForPatientPrescription('');
    setShowPrescriptionModal(false);  
  }
  const modalPrescriptionShow   = (childAccountKey) => {
    setAccountKeyForPatientPrescription(childAccountKey);
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
      window.location.href = `/childmalnutrition/child-prescription/${accountKeyForPatientPrescription}/${prescriptionType}`;
    }
    else{

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]      					= accountKeyForPatientPrescription;
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
      if(result.success && result.data && result.data.appointments.length > 0){
        setAppointmentListForDoctorPresc(result.data.appointments);
        setShowPrescriptionModalP2(true);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: `No appointment found!`});
        setAppointmentListForDoctorPresc([]);
      }
    }
  }
  const redirectToUploadDoctorPrescription = () => {
    window.location.href = `/childmalnutrition/child-prescription/${accountKeyForPatientPrescription}/${prescriptionType}/${selectedDoctorAppointment}`;
  }

  const [testReportAppointmentId, setTestReportAppointmentId]     = useState('');
  const [testReportChildKey, setTestReportChildKey]           = useState('');
  const [testReportAppointmentList, setTestReportAppointmentList] = useState([]);
  const [showTestReportsModal, setShowTestReportsModal]           = useState(false); 
  const modalTestReportsClose  = () => {
    setShowTestReportsModal(false); 
    setTestReportChildKey(''); 
  }
  const modalTestReportsShow   = async (childAccountKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      jsonData["patient_key"]       				= childAccountKey;
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
      if(result.success && result.data && result.data.appointments.length > 0){
        setTestReportAppointmentList(result.data.appointments);
        setShowTestReportsModal(true);
        setTestReportChildKey(childAccountKey);
      }
      else{
        setTestReportAppointmentList([]);
        alertContext.setAlertMessage({show:true, type: "error", message: `No appointment found!`});
      }
  }
  const selectTestReportAppointment = (event) => {
    setTestReportAppointmentId(event.target.value);
  }
  const confirmTestReportAppointment = () => {
    if(testReportAppointmentId){
      window.location.href = `/childmalnutrition/child-test-reports/${testReportChildKey}/${testReportAppointmentId}`;
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: `Please select an appointment!`});
    }
  }


  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const searchChild = (e) => {
    setChildList([]); // Reset child list when searching
    setLoadMore(false); // Reset load more state
    setTotalCount(0); // Reset total count
    setTimeout(()=>{
      listChild(searchRef.current.value, 0); // Call listChild with search key
    }, 500)
  }

  const listChild = async (searchKey, customOffset) => {
    console.log(offset);
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    if(decryptedLoginDetails.account_type === '5'){
      jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
      var apiUrl                            = 'childProfileListFromDoctorLogin';
    }
    else{
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      var apiUrl                            = 'childProfileList';
    }

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": PAGINATION_LIMIT,
                                              "offset": customOffset,
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
        setChildList((prevList) => [...prevList, ...result.data]); // Append new data to existing list
        setOffset(customOffset + PAGINATION_LIMIT); // Update offset for next load
        setTotalCount(result.total_count); // Update total count
        if(childList.length + result.data.length >= result.total_count){
          setLoadMore(false); // Disable load more if all data is loaded
        }
        else{
          setLoadMore(true); // Enable load more if more data is available
        }
      }
      else{
        setChildList([]); // Reset list if no data found
        setLoadMore(false);
        setTotalCount(0);
      }
    }
    else{
      setChildList([]); 
      setLoadMore(false);
      setTotalCount(0);
    }

  }
  
  useEffect(() => {

  }, [offset]);

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listChild("", 0);
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
      'child_account_key': closeProfileAccountKey,
      'child_account_type': 3,
      'introducer_account_key': loginDetails.account_key,
      'introducer_account_type': loginDetails.account_type,
      'remarks': closeRemarks
    };

    const response = await fetch(`${API_URL}/closeChildAccount`, {
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
        listChild("", 0);
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

  const loadMoreChild = () => {
    listChild(searchRef.current.value, offset); // Load more data
  }
 
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [chartChildName, setChartChildName] = useState("");
  const [chartChildKey, setChartChildKey] = useState("");
  //const [childChart, setChildChart] = useState([]);
  const [weightChart, setWeightChart] = useState([]);
  const showChart = async(child_account_key, child_name) => {
    

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

     let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_key"]               = child_account_key;
      jsonData["account_type"]              = 31;

      jsonData["call_for"]       				    = "all";
      jsonData["user_login_id"]       		  = decryptedLoginDetails.login_id;
      

      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');


      const response = await fetch(`${API_URL}/getChildChartHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })


       let result = await response.json();
        if(result.success){
          setChartChildName(child_name);
          setChartChildKey(child_account_key);
          setWeightChart(result.data);
          setModalHealthChartShow(true);
        }
        else{
          alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        }
  }

  const redirectToPeriodicDataPage = (child_account_key) => {
    if(decryptedLoginDetails.account_type === '5'){
      window.location.href = `/childmalnutrition/child-view-periodic-data/${child_account_key}`;
    }
    else{
      window.location.href = `/childmalnutrition/child-periodic-data/${child_account_key}`;
    }
  }

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
            <h5 className='mx-2 mb-0'>Child Health </h5>
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
      <div className="app-body young-womens profile-listing">
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - {totalCount}</span>
          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/create-child-malnutrition" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Child Health</Link>
          }
          {
            (decryptedLoginDetails.account_type == '5') && <Link to="/create-child-malnutrition-doctor" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Child Health</Link>
          }
          {/* <div className='health-chart'><Link onClick={() => { setModalHealthChartShow(true) }} to="#" className='primary-color'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 64h-25.98C438.44 92.28 448 125.01 448 160c0 105.87-86.13 192-192 192S64 265.87 64 160c0-34.99 9.56-67.72 25.98-96H64C28.71 64 0 92.71 0 128v320c0 35.29 28.71 64 64 64h384c35.29 0 64-28.71 64-64V128c0-35.29-28.71-64-64-64zM256 320c88.37 0 160-71.63 160-160S344.37 0 256 0 96 71.63 96 160s71.63 160 160 160zm-.3-151.94l33.58-78.36c3.5-8.17 12.94-11.92 21.03-8.41 8.12 3.48 11.88 12.89 8.41 21l-33.67 78.55C291.73 188 296 197.45 296 208c0 22.09-17.91 40-40 40s-40-17.91-40-40c0-21.98 17.76-39.77 39.7-39.94z"/></svg> Health Chart </Link></div> */}
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Child' ref={searchRef}/>
            <span className="input-group-text" onClick={searchChild}><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

          {childList.map((child, index) => (
            <div className='col-6 mb-4' key={child.account_id}>
              <div className='button-box'>
                <div className='charts'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"/></svg>
                <Link onClick={() => { showChart(child.account_key, child.child_name) }} to="#" className='primary-color'>  Charts</Link>
                </div>

                <div className={`three-dot my-element2 ${openMenuId === child.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(child.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                {openMenuId === child.account_id && <div className='drop-menu'>
                    <ul>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/childmalnutrition/child-basic-info/${child.account_key}`}>Edit Basic Information</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') && <Link to={`/childmalnutrition/child-view-basic-info/${child.account_key}`}>View/Edit Basic Information</Link>
                        }
                      </li>
                      {
                        (decryptedLoginDetails.account_type !== '5') &&<li><Link to={`/childmalnutrition/child-profile-photo/${child.account_key}`}>Upload Profile Photo</Link></li>
                      }
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/childmalnutrition/child-medical-history/${child.account_key}`}>Update Medical History</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/childmalnutrition/child-view-medical-history/${child.account_key}`}>View/Edit Medical History</Link>
                        }
                      </li>
                      <li>
                        
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/childmalnutrition/child-periodic-data/${child.account_key}`}>Update Periodic Data</Link>
                          
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/childmalnutrition/child-view-periodic-data/${child.account_key}`}>View/Edit Periodic Data</Link>
                        }
                      </li>
                      {/* <li><Link to={`/childmalnutrition/child-prescription/${child.account_key}`}>Upload Survey Report/Prescription</Link></li> */}
                      {/* <li><Link onClick={() => { modalPrescriptionShow(child.account_key); }} to="#">Upload Survey Report/Prescription</Link></li> */}
                      {/* <li><Link to={`/childmalnutrition/child-test-reports/${child.account_key}`}>Upload Test Reports</Link></li> */}
                      {
                          (decryptedLoginDetails.account_type == '5') &&
                      <li><Link to={`/childmalnutrition/child-booked-appointment/${child.account_key}`}>Booked Appointment</Link></li>
                      }
                      {
                          (decryptedLoginDetails.account_type !== '5') &&
                      <li><Link to={`/childmalnutrition/child-booking/${child.account_key}`}>Book New Doctor Appointment</Link></li>
                      }
                      
                      {/* <li><Link to={`/childmalnutrition/child-patient-booking/`}>Book Now</Link></li> */}
                      {/* <li><Link to={`/childmalnutrition/child-basic-info/${child.account_key}`}>Edit Basic Information</Link></li>
                      <li><Link to={`/childmalnutrition/child-medical-history/${child.account_key}`}>Edit Basic Medical History</Link></li> */}
                      {/* <li><Link to={`/childmalnutrition/child-prescription/${child.account_key}`}>Upload Prescription</Link></li> */}
                      <li><Link onClick={() => { modalPrescriptionShow(child.account_key); }} to="#">Upload Prescription</Link></li>
                      <li><Link onClick={() => { modalTestReportsShow(child.account_key); }} to="#">Upload Test Reports</Link></li>
                      {/* <li><Link to={`/childmalnutrition/child-awareness-survey/`}>Update Awareness Survey</Link></li> */}
                      {
                      (decryptedLoginDetails.account_type !== '5') &&
                      <li><Link to={"#"} onClick={()=>{ openCloseProfileModal(`${child.account_key}`) }}>Close Profile</Link></li>}
                      {/* {loginAccountType === '5' && <li><Link onClick={() => { modalReviewShow(child.account_key, child.child_name); }} to="#">Write/View Review </Link></li>} */}
                    </ul>
                  </div>
                }
                <Link to="#">
                  {
                    (child.shared_image && child.shared_image !== "") ? <img src={child.shared_image+`?`+Math.random()} alt='' /> : <img src={childprofile} alt='' />
                  }
                  <h6>{child.child_name}</h6>
                </Link>
              </div>
            </div>
          ))}

          {childList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}

          {loadMore && <div className='col-12 text-center'>
            <Link to="#" className='btn btn-primary primary-bg-color border-0' onClick={loadMoreChild}>Load More</Link> 
          </div>}

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

        <Modal show={showReviewModal} onHide={modalReviewClose}>
          <Modal.Header>  
            <h3>Write Review</h3>
          </Modal.Header>  
          <Modal.Body className='feedback-form'>
            <h5>Servicewise Experience</h5>
            <h6 className='mb-1'>Review & Rating for Patient :</h6>
            <p className='mb-0'>Name : {reviewModalDetails.child_name}</p>
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
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalReviewClose}>Cancel</Button>  
          </Modal.Footer>  
          
        </Modal>

        <Modal show={modalHealthChartShow} onHide={modalHealthChartClose}>
          <Modal.Body>  
            <p className='text-center'>Child: {chartChildName}</p> 
            <Button variant="secondary" className='btn-delete btn-close' onClick={modalHealthChartClose}></Button>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal"></button> */}
            <div className='health-chart'>
              <WeightLineChart weightChart={weightChart} />
              {/* <table className='table table-bordered'>
                
                <tbody>
                  <tr>
                    <td><strong>Weight (in Kg)</strong></td>
                    <td>12</td>
                    <td>13</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td><strong>Date</strong></td>
                    <td>28/05/25</td>
                    <td>05/06/25</td>
                    <td>29/10/2025</td>
                  </tr>
                </tbody>
              </table> */}
            </div>
            <p className='mt-5 d-text'>This chart is for reference only. Please consult a healthcare professional for accurate assessment and advice.</p>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={() => redirectToPeriodicDataPage(chartChildKey) } >Periodic Data</Button>  
            {/* <Link to={`/childmalnutrition/child-view-periodic-data/${child.account_key}`}>Periodic Data</Link> */}
          </Modal.Footer>  
        </Modal>

      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default ChildMalnutrion;