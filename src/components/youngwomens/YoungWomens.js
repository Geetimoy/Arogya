import { useState, useContext, useEffect, useRef } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from '../AppFooter';
import Rating from "./Ratingsave";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import youngwomenprofile from '../../assets/images/profile-girl.png';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';


import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN, PAGINATION_LIMIT } from "../util/Constants";

import './YoungWomens.css'

import {Modal, Button} from 'react-bootstrap'; 

import AppTopNotifications from '../AppTopNotifications';

import MetricChart from '../../util/youngwomen/MetricChart';
import HeightGrowthChart from '../../util/youngwomen/HeightGrowthChart';
import WeightGrowthChart from '../../util/youngwomen/WeightGrowthChart';
import BMIGrowthChart from '../../util/youngwomen/BMIGrowthChart';

function YoungWomens(){

  const searchRef = useRef(null);

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [reviewModalDetails, setReviewModalDetails] = useState({
      'womenAccountKey':'',
      'womenName':''
    });

  const [showModal2, setShowModal2] = useState(false); 
  const modalClose2  = () => setShowModal2(false);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating]   = useState('0'); 
  const [reviewWomenKey, setReviewWomenKey] = useState(''); 
  const [reviewWomenName, setReviewWomenName] = useState('');
  const modalShow2   = async (womenAccountKey, womenName) => {
    setReviewWomenKey(womenAccountKey);
    setReviewWomenName(womenName);

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_key"]               = womenAccountKey;
    jsonData["user_type"]                 = 3;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response = await fetch(`${API_URL}/generalReviewList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    })

    let result = await response.json();

    if(result.success && result.data && result.data.length > 0){
      // setReviewComment(result.data[0].review_comments);
      // setReviewRating(result.data[0].review_rating);
      setReviewComment(result.data[0].review_comments || '');
      setReviewRating(Number(result.data[0].review_rating || 0));

      setComments(result.data[0].review_comments || '');
      setRating(Number(result.data[0].review_rating || 0));
    }
    else{
      setReviewComment('');
      setReviewRating(0);
      setComments('');
      setRating(0);
    }

    setShowModal2(true);

  }

  const [rating, setRating] = useState(0);

  const handleStarClick = (data) => {
    setRating(data); // Toggle the state
    console.log(data);
  };

  const loginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  const loginAccountType  = loginDetails.account_type;

  const [womenList, setWomenList]   = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(0);

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
  
  const [accountKeyForWomenPrescription, setAccountKeyForWomenPrescription] = useState('');


  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false); 
  const modalPrescriptionClose  = () => {
    setAccountKeyForWomenPrescription('');
    setShowPrescriptionModal(false);  
  }
  const modalPrescriptionShow   = (womenAccountKey) => {
    setAccountKeyForWomenPrescription(womenAccountKey);
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
    window.location.href = `/youngwomens/young-woman-prescriptions/${accountKeyForWomenPrescription}/${prescriptionType}`;
  }
  else{

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    if(decryptedLoginDetails.account_type === '5'){
      jsonData["doctor_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]    = decryptedLoginDetails.account_type;
    }
    else{
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    }
    jsonData["patient_key"]       				= accountKeyForWomenPrescription;
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
    
    if(decryptedLoginDetails.account_type === '5'){
      var response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })
    }
    else{
      var response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData)
      })
    }

    let result = await response.json();
    if(result.data && result.data.appointments && result.data.appointments.length > 0){
      setAppointmentListForDoctorPresc(result.data.appointments);
      setShowPrescriptionModalP2(true);
    }
    else{
      //setAppointmentListForDoctorPresc([]);
      alertContext.setAlertMessage({show:true, type: "error", message: `No appointments found!`});
    }

    
  }
  }
  const redirectToUploadDoctorPrescription = () => {
    window.location.href = `/youngwomens/young-woman-prescriptions/${accountKeyForWomenPrescription}/${prescriptionType}/${selectedDoctorAppointment}`;
  }

  const [testReportAppointmentId, setTestReportAppointmentId]     = useState('');
  const [testReportWomanKey, setTestReportWomanKey]               = useState('');
  const [testReportAppointmentList, setTestReportAppointmentList] = useState([]);
  const [showTestReportsModal, setShowTestReportsModal]           = useState(false); 
  const modalTestReportsClose  = () => {
    setShowTestReportsModal(false); 
    setTestReportWomanKey(''); 
  }
  const modalTestReportsShow   = async (womanAccountKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      if(decryptedLoginDetails.account_type === '5'){
        jsonData["doctor_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["doctor_account_type"]    = decryptedLoginDetails.account_type;
      }
      else{
        jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
        jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      }
      jsonData["patient_key"]       				= womanAccountKey;
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
      
      if(decryptedLoginDetails.account_type === '5'){
        var response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData)
        })
      }
      else{
        var response = await fetch(`${API_URL}/volunteerListMyBookedAppointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData)
        })
      }
  
      let result = await response.json();
      if(result.data && result.data.appointments && result.data.appointments.length > 0){
        setTestReportAppointmentList(result.data.appointments);
        setShowTestReportsModal(true);
        setTestReportWomanKey(womanAccountKey);
      }
      else{
        //setTestReportAppointmentList([]);
        alertContext.setAlertMessage({show:true, type: "error", message: `No appointments found!`});
      }

    
  }
  const selectTestReportAppointment = (event) => {
    setTestReportAppointmentId(event.target.value);
  }
  const confirmTestReportAppointment = () => {
    if(testReportAppointmentId){
      window.location.href = `/youngwomens/young-woman-test-reports/${testReportWomanKey}/${testReportAppointmentId}`;
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: `Please select an appointment!`});
    }
  }

  const searchWomen = (e) => {
    const { name, value } = e.target;
    setWomenList([]); // Clear current list
    setLoadMore(false); // Reset load more state
    setTotalCount(0); // Reset total count
    setTimeout(()=>{
      listWomen(searchRef.current.value, 0);
    }, 1000)
  }


  const listWomen = async (searchKey, customOffset) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    if(decryptedLoginDetails.account_type === '5'){
      jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
      var apiUrl                            = 'womanProfileListFromDoctorLogin';
    }
    else{
      jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
      jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
      var apiUrl                            = 'womanProfileList';
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
        setWomenList((prevList) => [...prevList, ...result.data]); // Append new data to existing list
        setOffset(customOffset + PAGINATION_LIMIT); // Update offset for next load
        setTotalCount(result.total_count); // Update total count
        if(womenList.length + result.data.length >= result.total_count){
          setLoadMore(false); // Disable load more if all data is loaded
        }
        else{
          setLoadMore(true); // Enable load more if more data is available
        }
      }
      else{
        setWomenList([]);
        setLoadMore(false);
        setTotalCount(0);
      }
    }
    else{
      setWomenList([]); 
      setLoadMore(false);
      setTotalCount(0);
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listWomen("", 0);
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
      'woman_account_key': closeProfileAccountKey,
      'woman_account_type': 3,
      'introducer_account_key': loginDetails.account_key,
      'introducer_account_type': loginDetails.account_type,
      'remarks': closeRemarks
    };

    const response = await fetch(`${API_URL}/closeWomanAccount`, {
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
        listWomen("", 0);
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

  // const handleSaveRating = () => {
  //   localStorage.setItem('userRating', rating);
  //   setSavedRating(rating); // Update the saved rating state
  // };
  const handleSaveRating = async () => {
    
      if (rating === null || rating === undefined || rating === 0) {
        alertContext.setAlertMessage({ show: true, type: "error", message: "Please give rating!" });
        return;
      }
    
      if (!comments || comments.trim() === "") {
        alertContext.setAlertMessage({ show: true, type: "error", message: "Please enter comments!" });
        return;
      }
    
      try {
    
        const decryptedLoginDetails = JSON.parse(
          CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY)
            .toString(CryptoJS.enc.Utf8)
        );
    
        let jsonData = {
          'system_id': systemContext.systemDetails.system_id,
    
          // POSTER (logged in user)
          'poster_acc_type': decryptedLoginDetails.account_type,
          'poster_acc_key': decryptedLoginDetails.account_key,
    
          // RECEIVER (women)
          'receiver_acc_type': "3", // Women type (confirm once)
          'receiver_acc_key': reviewWomenKey,
    
          'device_type': DEVICE_TYPE,
          'device_token': DEVICE_TOKEN,
        
    
          'user_lat': localStorage.getItem('latitude'),
          'user_long': localStorage.getItem('longitude'),
    
          'rating': String(rating), // API expects string
          'comments': comments
        };
    
        console.log("Review Payload:", jsonData); // debug
    
        const response = await fetch(`${API_URL}/generalPostReview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
    
        let result = await response.json();
    
        if (result.success) {
          alertContext.setAlertMessage({
            show: true,
            type: "success",
            message: result.msg || "Review submitted successfully!"
          });
    
          // reset
          setRating(0);
          setComments("");
          modalClose2();
    
        } else {
          alertContext.setAlertMessage({
            show: true,
            type: "error",
            message: result.msg
          });
        }
    
      } catch (error) {
        console.error(error);
    
        alertContext.setAlertMessage({
          show: true,
          type: "error",
          message: "Something went wrong!"
        });
      }
  };
  

  const loadMoreWomen = () => {
    listWomen(searchRef.current.value, offset); // Load more data
  }
  
  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [modalHealthChartShow, setModalHealthChartShow] = useState(false);
  const modalHealthChartClose  = () => setModalHealthChartShow(false); 

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
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = userAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = age;
    jsonData["gender"]                    = gender;
    jsonData["growth_param"]              = "all";


    var response = await fetch(`${API_URL}/getWomenChartHistory`, {
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
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = userAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = age;
    jsonData["gender"]                    = gender;
    jsonData["growth_param"]              = param;

    var response = await fetch(`${API_URL}/getWomenChartHistory`, {
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

  const showChart = (womanName, userAccountKey, age, gender) => {
    setUserAccountKey(userAccountKey);
    setUserAge(age);
    setUserGender(gender);
    setModalHealthChartShow(true);
    changeGrowthTrackerParam('all', userAccountKey, age, gender);
    setUserDisplayName(womanName);
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
            <h5 className='mx-2 mb-0'>Young Women's </h5>
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
          <span>Total - {womenList.length}</span>

          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/youngwomens/create-young-women" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Young Women</Link>
          }

          {
            (decryptedLoginDetails.account_type == '5') && <Link to="/youngwomens/create-young-women" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Young Women </Link>
          }
          
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' id="searchWomen" name="searchWomen" placeholder='Search Young Woman' ref={searchRef} />
            <span className="input-group-text" onClick={searchWomen}><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className="listing-patient">
          <div className='row'>
            
            {womenList.map((women, index) => (
              <div className='col-6' key={women.account_id}>
                <div className='button-box'>
                  <div className='charts'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"/></svg>
                    <Link onClick={() => { showChart(women.women_name, women.account_key, women.women_age, women.women_gender) }} to="#" className='primary-color'>  Charts</Link>
                  </div>
                  <div className={`three-dot my-element2 ${openMenuId === women.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(women.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                  {openMenuId === women.account_id && <div className='drop-menu'>
                      <ul>
                        <li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/youngwomens/young-woman-basicinfo/${women.account_key}`}>Edit Basic Information</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') && <Link to={`/youngwomens/young-woman-view-basicinfo/${women.account_key}`}>View/Edit Basic Information</Link>
                        }
                        </li>
                         <li>
                          {
                            <Link to={`/youngwomens/growth-tracker/${women.account_key}/from-listing`}>Health Data</Link>
                          }
                        </li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<li><Link to={`/youngwomens/young-woman-profile-photo/${women.account_key}`}>Upload Profile Photo</Link></li>
                        }
                        <li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/youngwomens/update-medical-history/${women.account_key}`}>Update Medical History</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/youngwomens/young-woman-view-medical-history/${women.account_key}`}>View/Edit Medical History</Link>
                        }
                        </li>
                        <li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/youngwomens/update-periodic-data/${women.account_key}`}>Update Periodic Data</Link>
                          
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/youngwomens/young-woman-view-periodic-data/${women.account_key}`}>View/Edit Periodic Data</Link>
                        }
                        </li>
                        <li>
                        {
                          (decryptedLoginDetails.account_type !== '5') &&<Link to={`/youngwomens/update-awareness-survey/${women.account_key}`}>Update Awareness Survey</Link>
                        }
                        {
                          (decryptedLoginDetails.account_type == '5') &&<Link to={`/youngwomens/update-awareness-survey/${women.account_key}`}>View/Edit Awareness Survey</Link>
                        }
                        </li>
                        {
                          (decryptedLoginDetails.account_type == '5') &&
                        <li><Link to={`/youngwomens/youngwomen-booked-appointment/${women.account_key}`}>Booked Appointment</Link></li>
                        }
                        {
                          (decryptedLoginDetails.account_type !== '5') &&
                        <li><Link to={`/youngwomens/youngwomen-booking/${women.account_key}`}>Book New Doctor Appointment</Link></li>
                        }
                        <li><Link onClick={() => { modalPrescriptionShow(women.account_key); }} to="#">Upload Prescription</Link></li>
                        {/* <li><Link to={`/youngwomens/testreports/${women.account_key}`}>Upload Test Reports</Link></li> */}
                        <li><Link onClick={() => { modalTestReportsShow(women.account_key); }} to="#">Upload Test Reports</Link></li>
                        {/* <li><Link to={`/youngwomens/young-woman-patient-booking/`}>Book Now</Link></li> */}
                        {
                      (decryptedLoginDetails.account_type !== '5') &&
                        <li><Link to={"#"} onClick={()=>{ openCloseProfileModal(`${women.account_key}`) }}>Close Profile </Link></li>
                        }
                        {/* {loginAccountType === '5' && <li><Link onClick={() => { modalShow2(); }} to="#">Write/View Review </Link></li>} */}
                        <li><Link onClick={() => { modalShow2(women.account_key, women.women_name); }} to="#">Write/View Review </Link></li>
                      </ul>
                    </div>
                  }
                  <Link to="#">
                    {
                      (women.shared_image && women.shared_image !== "") ? <img src={women.shared_image+`?`+Math.random()} alt='' /> : <img src={youngwomenprofile} alt='' />
                    }
                    <h6>{women.women_name}</h6>
                  </Link>
                </div>
              </div>
            ))}

            {womenList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}

            {loadMore && <div className='col-12 text-center'>
              <Link to="#" className='btn btn-primary primary-bg-color border-0' onClick={loadMoreWomen}>Load More</Link> 
            </div>}

          </div>
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
            <p className='mb-0'>Name : {reviewModalDetails.women_name}</p>
            <div className="rating-star mb-3">
              {/* <span className="">Not at all likely</span> */}
              <span>
                <div className="rating-symbol">
                  <Rating sendDataToParent={handleStarClick} ratingValue={rating}></Rating>
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


export default YoungWomens;