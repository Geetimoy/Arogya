import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";
import CryptoJS from "crypto-js";

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import AppTopNotifications from '../AppTopNotifications';
import { keyframes } from '@mui/material';
import MetricChart from '../../util/child/MetricChart';
import {Modal, Button} from 'react-bootstrap'; 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import HeightGrowthChart from '../../util/child/HeightGrowthChart';
import WeightGrowthChart from '../../util/child/WeightGrowthChart';
import BMIGrowthChart from '../../util/child/BMIGrowthChart';
import MidArmGrowthChart from '../../util/child/MidArmGrowthChart';

import '../../components/childmalnutrition/CreateChildMalnutrition.css';
import { use } from 'react';


function GrowthTracker() {

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

  const [urlParam, setUrlParam] = useState(useParams());

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [latestGrowthData, setLatestGrowthData] = useState([]);

  const editAccountKey    = urlParam.accountKey;
  const redirectedFrom    = urlParam.redirectedFrom;

  const fetchGrowthData = async () => {
    
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 31;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');

    var response = await fetch(`${API_URL}/getChildHistorySummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      console.log(result.data[0]);
      setLatestGrowthData(result.data[0]);
    }
    else{
      setLatestGrowthData([]); 
    }

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      fetchGrowthData();
    }

  }, [systemContext.systemDetails.system_id]);

  const [userBasicDetails, setUserBasicDetails] = useState([]);
  const [modalHealthChartShow, setModalHealthChartShow] = useState(false);
  const modalHealthChartClose  = () => setModalHealthChartShow(false);  
  const [labels, setLabels] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [individualMetricData, setIndividualMetricData] = useState([]);


  // const [formData, setFormData] = useState([]);

  


  const getUserBasicDetails = async () => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    if(decryptedLoginDetails.account_type == 5){
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 31;
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
      jsonData["account_type"]              = 31;
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

  /*useEffect(() => {
    // Example: simulate API response
    const fetchMetricData = async () => {
      // API response structure YOU can customize
      const response = {
        months: [36, 40, 44, 48, 52, 56, 60],
        metrics: [
          {
            name: "Weight (kg)",
            data: [12.5, 13.2, 13.8, 14.8, 15.4, 16.0, 16.7],
            color: "#ff4b91",
          },
          {
            name: "Height (cm)",
            data: [95, 97, 99, 101, 103, 105, 107],
            color: "#4285f4",
          },
          {
            name: "BMI",
            data: [14.1, 14.5, 14.8, 15.0, 15.2, 15.5, 15.7],
            color: "#34a853",
          },
          {
            name: "Mid Arm",
            data: [14.1, 14.5, 14.8, 15.0, 15.2, 15.5, 15.7],
            color: "#a83834ff",
          },
        ],
      };

      let jsonData = {};

      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 31;
      jsonData["account_key"]               = editAccountKey;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      jsonData["age"]                       = 5;
      jsonData["gender"]                    = 1;
      jsonData["growth_param"]              = "all";


      var response = await fetch(`${API_URL}/getChildChartHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
      });

      let result = await response.json();


      setLabels(response.months);
      setMetrics(response.metrics);
    };

    fetchMetricData();
  }, []);*/

  const fetchMetricData = async () => {
    // API response structure YOU can customize
    /*const response = {
      months: [36, 40, 44, 48, 52, 56, 60],
      metrics: [
        {
          name: "Weight (kg)",
          data: [12.5, 13.2, 13.8, 14.8, 15.4, 16.0, 16.7],
          color: "#ff4b91",
        },
        {
          name: "Height (cm)",
          data: [95, 97, 99, 101, 103, 105, 107],
          color: "#4285f4",
        },
        {
          name: "BMI",
          data: [14.1, 14.5, 14.8, 15.0, 15.2, 15.5, 15.7],
          color: "#34a853",
        },
        {
          name: "Mid Arm",
          data: [14.1, 14.5, 14.8, 15.0, 15.2, 15.5, 15.7],
          color: "#a83834ff",
        },
      ],
    };*/

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 31;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = userBasicDetails.age;
    jsonData["gender"]                    = (userBasicDetails.gender === 'male') ? 1 : 2;
    jsonData["growth_param"]              = "all";


    var response = await fetch(`${API_URL}/getChildChartHistory`, {
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

  const fetchIndividualMetricData = async (param) => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 31;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = userBasicDetails.age;
    jsonData["gender"]                    = (userBasicDetails.gender === 'male') ? 1 : 2;
    jsonData["growth_param"]              = param;

    var response = await fetch(`${API_URL}/getChildChartHistory`, {
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

  const [defaultGrowthParam, setDefaultGrowthParam] = useState('all');

  const changeGrowthTrackerParam = (param) => {
    setDefaultGrowthParam(param);
    if(param === 'all'){
      fetchMetricData();
    }
    else{
      fetchIndividualMetricData(param);
    }
  }

  const showChart = () => {
    setModalHealthChartShow(true);
    changeGrowthTrackerParam('all');
  }

  const [modalGrowthDetailsShow, setModalGrowthDetailsShow] = useState(false);
  const modalGrowthDetailsClose  = () => setModalGrowthDetailsShow(false);

  const showGrowthDetails = () => {
    setModalGrowthDetailsShow(true);
  }

  
  /*const heightGrowthData = [
    {
      month: 36,
      who: { min: 11.8, max: 17.8 },
      child: { height: 15 }
    },
    {
      month: 40,
      who: { min: 12.1, max: 18.5 },
      child: { height: 16 }
    },
    {
      month: 44,
      who: { min: 12.6, max: 19.2 },
      child: { height: 17 }
    },
    {
      month: 48,
      who: { min: 13.0, max: 20.0 },
      child: { height: 18 }
    },
    {
      month: 52,
      who: { min: 13.4, max: 20.8 },
      child: { height: null }
    },
    {
      month: 56,
      who: { min: 13.9, max: 22.0 },
      child: { height: null }
    },
    {
      month: 60,
      who: { min: 14.5, max: 24.0 },
      child: { height: null }
    }
  ];
  const weightGrowthData = [
    {
      month: 36,
      who: { min: 11.8, max: 17.8 },
      child: { weight: 15 }
    },
    {
      month: 40,
      who: { min: 12.1, max: 18.5 },
      child: { weight: 16 }
    },
    {
      month: 44,
      who: { min: 12.6, max: 19.2 },
      child: { weight: 17 }
    },
    {
      month: 48,
      who: { min: 13.0, max: 20.0 },
      child: { weight: 18 }
    },
    {
      month: 52,
      who: { min: 13.4, max: 20.8 },
      child: { weight: null }
    },
    {
      month: 56,
      who: { min: 13.9, max: 22.0 },
      child: { weight: null }
    },
    {
      month: 60,
      who: { min: 14.5, max: 24.0 },
      child: { weight: null }
    }
  ];
  const bmiGrowthData = [
    {
      month: 36,
      who: { min: 11.8, max: 17.8 },
      child: { bmi: 15 }
    },
    {
      month: 40,
      who: { min: 12.1, max: 18.5 },
      child: { bmi: 16 }
    },
    {
      month: 44,
      who: { min: 12.6, max: 19.2 },
      child: { bmi: 17 }
    },
    {
      month: 48,
      who: { min: 13.0, max: 20.0 },
      child: { bmi: 18 }
    },
    {
      month: 52,
      who: { min: 13.4, max: 20.8 },
      child: { bmi: null }
    },
    {
      month: 56,
      who: { min: 13.9, max: 22.0 },
      child: { bmi: null }
    },
    {
      month: 60,
      who: { min: 14.5, max: 24.0 },
      child: { bmi: null }
    }
  ];
  const midArmGrowthData = [
    {
      month: 36,
      who: { min: 11.8, max: 17.8 },
      child: { mid_arm: 15 }
    },
    {
      month: 40,
      who: { min: 12.1, max: 18.5 },
      child: { mid_arm: 16 }
    },
    {
      month: 44,
      who: { min: 12.6, max: 19.2 },
      child: { mid_arm: 17 }
    },
    {
      month: 48,
      who: { min: 13.0, max: 20.0 },
      child: { mid_arm: 18 }
    },
    {
      month: 52,
      who: { min: 13.4, max: 20.8 },
      child: { mid_arm: null }
    },
    {
      month: 56,
      who: { min: 13.9, max: 22.0 },
      child: { mid_arm: null }
    },
    {
      month: 60,
      who: { min: 14.5, max: 24.0 },
      child: { mid_arm: null }
    }
  ];*/

  const [remarks, setRemarks] = useState(''); 

  const handleRemarks = (e) => {
    const { name, value } = e.target;
    setRemarks(value);
  }

  const [formData, setFormData] = useState({
      child_weight: { category: 1, value: "" },
      child_height: { category: 2, value: "" },
      child_temperature: { category: 4, value: "" },
      child_heart_rate: { category: 6, value: "" },
      child_mid_arm: { category: 8, value: "" },
      child_blood_pressure: { category: 9, value: "" },
      child_spo2: { category: 10, value: "" },
      child_diabetic: { category: 11, value: "" },
    });

  const handleFormSubmit = async (e) => {
      e.preventDefault(); 

      let strday   = String(dataProcessedDate.getDate()).padStart(2, '0');  // Add leading zero if needed
      let strmonth = String(dataProcessedDate.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
      let stryear  = dataProcessedDate.getFullYear();
      
      let dataProcessedOn = `${strday}-${strmonth}-${stryear}`;
      
      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
      jsonData["doctor_account_type"]       = decryptedLoginDetails.account_type;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');
      jsonData["data_added_by"]             = decryptedLoginDetails.account_key;
      jsonData["data_added_by_type"]        = decryptedLoginDetails.account_type;
      jsonData["child_account_key"]         = editAccountKey;
      jsonData["data_processed_on"]         = dataProcessedOn;
      jsonData["remarks"]                   = remarks;
      jsonData["child_cat_value"]           = formData;


      const response = await fetch(`${API_URL}/childPeriodicHealthDataAddFromDoctorLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
  
  }
      
  const handleChange = (e) => {
    const { name, value } = e.target;
   
      if(value.trim() !== ""){
        setFormData({...formData, [name]: {...formData[name], category:formData[name].category, value:value}});
      }
      else{
        setFormData({...formData, [name]: {...formData[name], category:formData[name].category, value:value}});
      }
  }

  const [dataProcessedDate, setDataProcessedDate] = useState(new Date());
    const onChangeDataProcessedDate = (date) => {
      setDataProcessedDate(date);
  }

  return (
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              {
                (redirectedFrom === 'from-listing') && <Link to="/child-malnutrition" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              }
              {
                (redirectedFrom === 'from-bookings') && <Link to="/doctor-appointments" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              }
            </div>
             <h5 className='mx-2 mb-0'>Growth Tracker </h5> 
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
      <div className='app-body create-patient-profiles create-child-malnutrition'>
         <h5>{ userBasicDetails.display_name }</h5>
         <div className='align-items-center d-flex justify-content-between'>
            <p className='mb-0'><small>Updated on { (latestGrowthData) ? Object.keys(latestGrowthData)[0] : '' }</small></p>
            <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0' onClick={() =>  showGrowthDetails()}>Add Growth Details</Link>
          </div>
          <table className='border-0 table mt-3'>
            <thead>
              <tr>
                <th className='min-width-80'>Meas.</th> 
                <th className='min-width-100'>Childs Info.</th>
                <th>WHO Range</th>
              </tr>
            </thead>
            <tbody>

              {
                (latestGrowthData && Object.keys(latestGrowthData).length) ? <>
                  
                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].weight && <tr>
                      <td>Weight</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].weight }</td>
                      <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].weight_range } Kg</span> <Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/weight`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  } 

                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].height && <tr>
                      <td>Height</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height }</td>
                      <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height_range } Cm </span><Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/height`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  }

                  {
                      latestGrowthData[Object.keys(latestGrowthData)[0]].bmi && <tr>
                        <td>BMI</td>
                        <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi }</td>
                        <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi_range } </span><Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/bmi`} className='primary-color'>(History)</Link></td> 
                      </tr>
                  }
                  
                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm && <tr>
                      <td>Mid Arm</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm }</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm_range } <Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/mid_arm`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  }
                  
                </>:<></>
              }

            </tbody>
          </table>
          <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0 w-100' onClick={() =>  showChart()}>View Growth Chart</Link>
      </div>

      <Modal show={modalHealthChartShow} onHide={modalHealthChartClose} className='growth-chart'>
        <Modal.Footer className='justify-content-center'> 
          <h6 className='modal-title'><strong>Name: { userBasicDetails.display_name }</strong></h6> 
          <div className='d-flex align-items-center'>
            
            <h6 className='modal-title min-width-120'>Growth Chart</h6> 
            <select className='form-select' value={defaultGrowthParam} onChange={ (e) => changeGrowthTrackerParam(e.target.value) } >
              <option value="all">All</option>
              <option value="height">Height</option>
              <option value="weight">Weight</option>
              <option value="bmi">BMI</option>
              <option value="mid_arm">Mid Arm</option>
            </select>
          </div>
          <Button variant="secondary" className='btn-delete btn-close' onClick={modalHealthChartClose}></Button>
        </Modal.Footer>  
        <Modal.Body>   
          {/* <select className='form-select mb-3' value={defaultGrowthParam} onChange={ (e) => changeGrowthTrackerParam(e.target.value) } >
            <option value="all">All</option>
            <option value="height">Height</option>
            <option value="weight">Weight</option>
            <option value="bmi">BMI</option>
            <option value="mid_arm">Mid Arm</option>
          </select> */}
          <div className='health-chart'>
            {/* <MetricChart labels={labels} metrics={metrics}/> */}

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
              defaultGrowthParam === 'mid_arm' && <MidArmGrowthChart data={individualMetricData} />
            }

          </div>
        </Modal.Body>  
        <Modal.Footer className='justify-content-center'>  
        </Modal.Footer>  
      </Modal>

      <Modal show={modalGrowthDetailsShow} onHide={modalGrowthDetailsClose} className='growth-details'>
        <Modal.Header className='justify-content-center'> 
          <div className='d-flex'>
            <h3 className='mb-0'>Add Growth Details</h3>
          </div>
          <Button variant="secondary" className='btn-delete btn-close' onClick={modalGrowthDetailsClose}></Button>
        </Modal.Header>  
        <Modal.Body> 
          <div className='custom-scrollbar'>
          <form className="" name="periodicDataForm" id="periodicDataForm" onSubmit={handleFormSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor='measurement_date'>Measurement Date</label>
            {/* <input type="date" className='form-control' name="measurement_date" id="measurement_date" /> */}
            <DatePicker dateFormat="dd-MM-yyyy" selected={dataProcessedDate} onChange={(date) => onChangeDataProcessedDate(date)} className='form-control' maxDate={new Date()}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_height'>Height (in cm)</label>
            <input type="text" className='form-control' name="child_height" id="child_height" placeholder='Enter Height in cm' onChange={handleChange} value={formData["child_height"].value ? formData["child_height"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_weight'>Weight (in kg)</label>
            <input type="text" className='form-control' name="child_weight" id="child_weight" placeholder='Enter Weight in kg' onChange={handleChange} value={formData["child_weight"].value ? formData["child_weight"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_temperature'>Body Temperature (in Fahrenheit)</label>
            <input type="text" className='form-control' name="child_temperature" id="child_temperature" placeholder='Enter Body Temperature in °F' onChange={handleChange} value={formData["child_temperature"].value ? formData["child_temperature"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_spo2'>Blood Oxygen Level SpO2</label>
            <input type="text" className='form-control' name="child_spo2" id="child_spo2" placeholder='Enter Blood Oxygen Level in %' onChange={handleChange} value={formData["child_spo2"].value ? formData["child_spo2"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_heart_rate'>Heart Rate (per minute)</label>
            <input type="text" className='form-control' name="child_heart_rate" id="child_heart_rate" placeholder='Enter Heart Rate per Minute' onChange={handleChange} value={formData["child_heart_rate"].value ? formData["child_heart_rate"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_mid_arm'>Mid Arm length</label>
            <input type="text" className='form-control' name="child_mid_arm" id="child_mid_arm" placeholder='Enter Mid Arm length' onChange={handleChange} value={formData["child_mid_arm"].value ? formData["child_mid_arm"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_blood_pressure'>Blood Pressure</label>
            <input type="text" className='form-control' name="child_blood_pressure" id="child_blood_pressure" placeholder='Enter Blood Pressure' onChange={handleChange} value={formData["child_blood_pressure"].value ? formData["child_blood_pressure"].value : ''} />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='child_diabetic'>Are you Diabetic?  </label>
            <input type="text" className='form-control' name="child_diabetic" id="child_diabetic" placeholder='Enter Sugar Level' onChange={handleChange} value={formData["child_diabetic"].value ? formData["child_diabetic"].value : ''}  />
          </div>
          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea name="remarks" id="remarks" rows="3" onChange={handleRemarks} className="form-control" placeholder="Describe / Explain Problems"></textarea>
          </div>
          <div className='form-group mt-4 d-flex justify-content-center align-items-center'>
            <button type="submit" className='btn primary-bg-color text-light min-width-100 mx-2'>Save Details</button>
            <button type="submit" className='btn primary-bg-color text-light min-width-100 mx-2'>Cancel</button>
          </div>
        </form>
        </div>  
        </Modal.Body>  
        <Modal.Footer className='justify-content-center'>  
        </Modal.Footer>  
      </Modal>

      <Appfooter></Appfooter>
    </>
  );
}

export default GrowthTracker;