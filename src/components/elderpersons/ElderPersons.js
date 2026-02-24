import { useState, useContext, useEffect } from 'react';

import Appfooter from "../AppFooter";
import Rating from "./Ratingsave";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import elderpersons from '../../assets/images/profile.png';

import  './ElderPersons.css';

import CryptoJS from "crypto-js";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import {Modal, Button} from 'react-bootstrap'; 
import AppTopNotifications from '../AppTopNotifications';
import MetricChart from '../../util/elder/MetricChart';
import HeightGrowthChart from '../../util/elder/HeightGrowthChart';
import WeightGrowthChart from '../../util/elder/WeightGrowthChart';
import BMIGrowthChart from '../../util/elder/BMIGrowthChart';
//import MidArmGrowthChart from '../../util/elder/MidArmGrowthChart';

function ElderPersons(){

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

  const [isMActive, setIsMActive] = useState(false);
  const [closeProfileAccountKey, setCloseProfileAccountKey] = useState('');
  const [closeRemarks, setCloseRemarks] = useState('');
  

  const [showCloseProfileModal, setShowCloseProfileModal] = useState(false); 

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [modalHealthChartShow, setModalHealthChartShow] = useState(false);
  const modalHealthChartClose  = () => setModalHealthChartShow(false); 

  const modalCloseProfile  = () => setShowCloseProfileModal(false);  
  const modalShowProfile   = () => setShowCloseProfileModal(true); 

  const [isActive, setIsActive]     = useState(0);

  const [elderList, setElderList]   = useState([]);
  const [openMenuId, setOpenMenuId]   = useState(0);


  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };
  // const handleMenuClick = () => {
  //   // Toggle the state when the button is clicked
  //   setIsActive(!isActive);
  // };

  const searchElder = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listElder(value);
    }, 1000)
  }

  const listElder = async (searchKey) => {
  
      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  
      let jsonData = {};
  
      if(decryptedLoginDetails.account_type === '5'){
        jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
        jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
        var apiUrl                            = 'elderProfileListFromDoctorLogin';
      }
      else{
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
        var apiUrl                            = 'elderProfileList';
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
        setElderList(result.data);
      }
      else{
        setElderList([]); 
      }
  
    }

    useEffect(() => {
      if(systemContext.systemDetails.system_id){
        listElder("");
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
  
      const response = await fetch(`${API_URL}/closeElderAccount`, {
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
          listElder("");
        }, 1000);
      } 
      else {
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
  
    }

  const [accountKeyForElderPrescription, setAccountKeyForElderPrescription] = useState('');

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); 
  const modalPrescriptionClose  = () => {
    setAccountKeyForElderPrescription('');
    setShowPrescriptionModal(false);  
  }
  const modalPrescriptionShow   = (elderAccountKey) => {
    setAccountKeyForElderPrescription(elderAccountKey);
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
      window.location.href = `/elderpersons/elder-prescription/${accountKeyForElderPrescription}/${prescriptionType}`;
    }
    else{

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      if(decryptedLoginDetails.account_type === '5'){

        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
        jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
        jsonData["patient_key"]       				= accountKeyForElderPrescription;
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
        
        const response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData)
        })
    
        let result = await response.json();
        if(result.success){
          if(result.data && result.data.appointments.length > 0){
            setAppointmentListForDoctorPresc(result.data.appointments);
          }
          else{
            setAppointmentListForDoctorPresc([]);
          }
    
          setShowPrescriptionModalP2(true);
        }
        else{
          alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        }

      }
      else{

        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
        jsonData["patient_key"]       				= accountKeyForElderPrescription;
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
        if(result.success){
          if(result.data && result.data.appointments.length > 0){
            setAppointmentListForDoctorPresc(result.data.appointments);
          }
          else{
            setAppointmentListForDoctorPresc([]);
          }
    
          setShowPrescriptionModalP2(true);
        }
        else{
          alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        }

      }

      
    }
  }
  const redirectToUploadDoctorPrescription = () => {
    window.location.href = `/elderpersons/elder-prescription/${accountKeyForElderPrescription}/${prescriptionType}/${selectedDoctorAppointment}`;
  }

  const [testReportAppointmentId, setTestReportAppointmentId]     = useState('');
  const [testReportElderKey, setTestReportElderKey]               = useState('');
  const [testReportAppointmentList, setTestReportAppointmentList] = useState([]);
  const [showTestReportModal, setShowTestReportsModal] = useState(false);
  const modalTestReportsClose  = () => {
    setShowTestReportsModal(false); 
    setTestReportElderKey(''); 
  }
  
  
  const modalTestReportsShow   = async (elderAccountKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      if(decryptedLoginDetails.account_type === '5'){

        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
        jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
        jsonData["patient_key"]       				= elderAccountKey;
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
        
        var response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
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

      }
      else{

        jsonData['system_id']                 = systemContext.systemDetails.system_id;
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
        jsonData["patient_key"]       				= elderAccountKey;
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
        
        var response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
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

      }


    setShowTestReportsModal(true);
    setTestReportElderKey(elderAccountKey);
  }


  const selectTestReportAppointment = (event) => {
    setTestReportAppointmentId(event.target.value);
  }

  const confirmTestReportAppointment = () => {
    if(testReportAppointmentId){
      window.location.href = `/elderpersons/elder-test-reports/${testReportElderKey}/${testReportAppointmentId}`;
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: `Please select an appointment!`});
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

  const genderMap = {
  1: "Male",
  2: "Female",
};


 const [chartElderName, setChartElderName] = useState("");
  const [chartElderKey, setChartElderKey] = useState("");
  //const [childChart, setChildChart] = useState([]);
  const [weightChart, setWeightChart] = useState([]);

/*const showChart = async(elder_account_key, elder_name) => {
    

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

     let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_key"]               = elder_account_key;
      jsonData["account_type"]              = 31;

      jsonData["call_for"]       				    = "all";
      jsonData["user_login_id"]       		  = decryptedLoginDetails.login_id;
      

      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');


      const response = await fetch(`${API_URL}/getElderChartHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })


       let result = await response.json();
        if(result.success){
          setChartElderName(elder_name);
          setChartElderKey(elder_account_key);
          setWeightChart(result.data);
          setModalHealthChartShow(true);
        }
        else{
          alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
        }
  }*/
  
  const [defaultGrowthParam, setDefaultGrowthParam] = useState('all');
  const [labels, setLabels] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [individualMetricData, setIndividualMetricData] = useState([]);

  const [ userAccountKey, setUserAccountKey ]   = useState("");
  const [ userAge, setUserAge ]                 = useState("");
  const [ userGender, setUserGender ]           = useState("");
  const [ userDisplayName, setUserDisplayName ] = useState("");

  const fetchMetricData = async (userAccountKey, age, gender) => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 34;
    jsonData["account_key"]               = userAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = age;
    jsonData["gender"]                    = gender;
    jsonData["growth_param"]              = "all";


    var response = await fetch(`${API_URL}/getElderChartHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      setLabels(result.months);
      setMetrics(result.metrics);
    }
    else{
      setLabels([]);
      setMetrics([]);
    }
    
  };

  const fetchIndividualMetricData = async (param, userAccountKey, age, gender) => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 34;
    jsonData["account_key"]               = userAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = age;
    jsonData["gender"]                    = gender;
    jsonData["growth_param"]              = param;

    var response = await fetch(`${API_URL}/getElderChartHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      setIndividualMetricData(result.data);
    }
    else{
      setIndividualMetricData([]);
    }
    
  }

  const changeGrowthTrackerParam = (param, userAccountKey, age, gender) => {
    setDefaultGrowthParam(param);
    if(param === 'all'){
      fetchMetricData(userAccountKey, age, gender);
    }
    else{
      fetchIndividualMetricData(param, userAccountKey, age, gender);
    }
  }

  const showChart = (elderName, userAccountKey, age, gender) => {
    setUserAccountKey(userAccountKey);
    setUserAge(age);
    setUserGender(gender);
    setModalHealthChartShow(true);
    changeGrowthTrackerParam('all', userAccountKey, age, gender);
    setUserDisplayName(elderName);
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
            <h5 className='mx-2 mb-0'>Elder Persons </h5>
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
      <div className="app-body patient-profiles profile-listing elder-persons">
        <div className='add-patient align-items-center d-flex justify-content-between'>
        <span>Total - {elderList.length}</span>
          
          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/elderpersons/create-elder-person" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Elder Person</Link>
          }
          {
            (decryptedLoginDetails.account_type == '5') && <Link to="/elderpersons/create-elder-person-doctor" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Elder Person </Link>
          }
        </div>
        
        <div className='search-elder-persons mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Elder Persons' id="ElderPersons" name="searchElderPersons" onChange={searchElder} />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

        {elderList.map((elder, index) => (
            <div className='col-6 mb-3' key={elder.account_id}>
              <div className='button-box'>
                <div className='charts'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"/></svg>
                                <Link onClick={() => { showChart(elder.elder_name, elder.account_key, elder.elder_age, elder.elder_gender) }} to="#" className='primary-color'>  Charts</Link>
                                </div>
                <div className={`my-element2 three-dot ${openMenuId === elder.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(elder.account_id)}>
                  <FontAwesomeIcon icon={faEllipsisV} /></div>

                  {openMenuId === elder.account_id && <div className='drop-menu'>
                      <ul>
                        <li>
                          
                          {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/elderpersons/elder-basic-info/${elder.account_key}`}>Edit Basic Information</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') && <Link to={`/elderpersons/elder-view-basic-info/${elder.account_key}`}>View/Edit Basic Information</Link>
                        }

                        </li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<li><Link to={`/elderpersons/elder-profile-photo/${elder.account_key}`}>Upload Profile Photo</Link></li>
                        }
                        <li>
                          {
                            (decryptedLoginDetails.account_type == '5') &&<Link to={`/elderpersons/growth-tracker/${elder.account_key}/from-listing`}>Health Data</Link>
                          }
                        </li>
                        <li>
                          
                          {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/elderpersons/elder-medical-history/${elder.account_key}`}>Update Medical History</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/elderpersons/elder-view-medical-history/${elder.account_key}`}>View/Edit Medical History</Link>
                        }
                        </li>
                        
                        <li>
                          
                          {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/elderpersons/elder-periodic-data/${elder.account_key}`}>Update Periodic Data</Link>
                          
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/elderpersons/elder-view-periodic-data/${elder.account_key}`}>View/Edit Periodic Data</Link>
                        }
                        </li>
                        {/* <li><Link to={"/elderpersons/patient-prescription"}>Upload Prescription</Link></li> */}
                        
                          
                          {
                          (decryptedLoginDetails.account_type !== '5') && <li><Link to={`/elderpersons/elder-awareness-survey/${elder.account_key}`}>Update Awareness Survey</Link>
                          </li>
                        }
                        {/* {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/elderpersons/elder-view-awareness-survey/${elder.account_key}`}>View/Edit Awareness Survey</Link>
                        } */}
                        
                        {
                          (decryptedLoginDetails.account_type == '5') &&
                        <li><Link to={`/elderpersons/elder-booked-appointment/${elder.account_key}`}>Booked Appointment</Link></li>
                        }
                        {
                          (decryptedLoginDetails.account_type !== '5') &&
                        <li><Link to={`/elderpersons/elder-booking/${elder.account_key}`}>Book New Doctor Appointment</Link></li>
                        }
                        <li><Link onClick={() => { modalPrescriptionShow(elder.account_key); }} to="#">Upload Prescription</Link></li>
                        <li><Link onClick={() => { modalTestReportsShow(elder.account_key); }} to="#">Upload Test Reports</Link></li>
                        {/* <li><Link to="#">Book Now</Link></li> */}
                        {
                      (decryptedLoginDetails.account_type !== '5') &&
                        <li><Link to={`#`} onClick={()=>{ openCloseProfileModal(`${elder.account_key}`) }}>Close Profile </Link></li>
                      }
                        {loginAccountType === '5' && <li><Link onClick={() => { modalShow2(); }} to="#">Write/View Review </Link></li>}
                      </ul>
                    </div>
                  }
                <Link to="#">
                  {
                    (elder.shared_image && elder.shared_image !== "") ? <img src={elder.shared_image+`?`+Math.random()} alt='' /> : <img src={elderpersons} alt='' />
                  }
                  <h6>{elder.elder_name}</h6>
                  <p>{genderMap[Number(elder.elder_gender)] || "N/A"}
, ({elder.elder_age} yrs)</p>  
                  
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

        <Modal show={showTestReportModal} onHide={modalTestReportsClose}>
          <Modal.Body className='form-all'>  
            <p>Upload Test Report</p> 
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
            {/* <Link to="/elderpersons/elder-test-reports/:accountKey" variant="primary" className='btn bg-success text-light min-width-100 border-0'>Confirm</Link>  */}
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

        <Modal show={modalHealthChartShow} onHide={modalHealthChartClose} className='growth-chart'>
          <Modal.Footer className='justify-content-center'> 
            <h6 className='modal-title'><strong>Name: { userDisplayName }</strong></h6> 
            <div className='d-flex align-items-center'>
              
              <h6 className='modal-title min-width-120'>Growth Chart</h6> 
              <select className='form-select' value={defaultGrowthParam} onChange={ (e) => changeGrowthTrackerParam(e.target.value, userAccountKey, userAge, userGender) } >
                <option value="all">All</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
                <option value="bmi">BMI</option>
              </select>
            </div>
            <Button variant="secondary" className='btn-delete btn-close' onClick={modalHealthChartClose}></Button>
          </Modal.Footer>  
          <Modal.Body>   
            <div className='health-chart'>
              {
                defaultGrowthParam === 'all' && <MetricChart labels={labels} metrics={metrics} />
              }  
              {
                defaultGrowthParam === 'height' && <HeightGrowthChart data={individualMetricData} />
              }  
              {
                defaultGrowthParam === 'weight' && <WeightGrowthChart data={individualMetricData} />
              }
              {
                defaultGrowthParam === 'bmi' && <BMIGrowthChart data={individualMetricData} />
              }
              {
                //defaultGrowthParam === 'mid_arm' && <MidArmGrowthChart data={individualMetricData} />
              }
  
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
          </Modal.Footer>  
        </Modal>

        

      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default ElderPersons;