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
import MetricChart from '../../util/youngwomen/MetricChart';
import {Modal, Button} from 'react-bootstrap'; 

import HeightGrowthChart from '../../util/youngwomen/HeightGrowthChart';
import WeightGrowthChart from '../../util/youngwomen/WeightGrowthChart';
import BMIGrowthChart from '../../util/youngwomen/BMIGrowthChart';
//import MidArmGrowthChart from '../../util/youngwomen/MidArmGrowthChart';

import '../../components/childmalnutrition/CreateChildMalnutrition.css';
import { use } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function YoungWomanGrowthTracker() {
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
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');

    var response = await fetch(`${API_URL}/getWomenHistorySummary`, {
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

  


  const getUserBasicDetails = async () => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
    let jsonData = {};

    if(decryptedLoginDetails.account_type == 5){
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["account_type"]              = 32;
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
      jsonData["account_type"]              = 32;
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

  const fetchMetricData = async () => {
    // API response structure YOU can customize
   
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = userBasicDetails.age;
    jsonData["gender"]                    = (userBasicDetails.gender === 'male') ? 1 : 2;
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

  const fetchIndividualMetricData = async (param) => {

    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = 32;
    jsonData["account_key"]               = editAccountKey;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["age"]                       = userBasicDetails.age;
    jsonData["gender"]                    = (userBasicDetails.gender === 'male') ? 1 : 2;
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

  const [remarks, setRemarks] = useState(''); 

  const handleRemarks = (e) => {
    const { name, value } = e.target;
    setRemarks(value);
  }

  const [formData, setFormData] = useState({
      women_weight: { category: 1, value: "" },
      women_height: { category: 2, value: "" },
      women_temperature: { category: 4, value: "" },
      women_heart_rate: { category: 6, value: "" },
      women_mid_arm: { category: 8, value: "" },
      women_blood_pressure: { category: 9, value: "" },
      women_spo2: { category: 10, value: "" },
      women_diabetic: { category: 11, value: "" },
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
        jsonData["women_account_key"]         = editAccountKey;
        jsonData["data_processed_on"]         = dataProcessedOn;
        jsonData["remarks"]                   = remarks;
        jsonData["women_cat_value"]           = formData;
  
  
        const response = await fetch(`${API_URL}/womenPeriodicHealthDataAddFromDoctorLogin`, {
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
                (redirectedFrom === 'from-listing') && <Link to="/youngwomens" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              }
              {
                (redirectedFrom === 'from-bookings') && <Link to="/doctor-appointments" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              }
            </div>
             <h5 className='mx-2 mb-0'>Health Data </h5> 
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
        {/* <h4><strong>Coming Soon</strong></h4> */}
         <h4><strong>{ userBasicDetails.display_name }</strong></h4>
         <div className='align-items-center d-flex justify-content-between'>
            <p className='mb-0'><small>Updated on { (latestGrowthData) ? Object.keys(latestGrowthData)[0] : '' }</small></p>
            <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0' onClick={() =>  showGrowthDetails()}>Add Health Details</Link>
          </div>
          <table className='border-0 table mt-3'>
            <thead>
              <tr>
                <th>Meas.</th> 
                <th>Young Woman Info.</th>
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
                      <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].weight_range } Kg</span> <Link to={`/youngwomens/growth-tracker/history/${editAccountKey}/${redirectedFrom}/weight`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  } 

                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].height && <tr>
                      <td>Height</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height }</td>
                      <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height_range } Cm </span><Link to={`/youngwomens/growth-tracker/history/${editAccountKey}/${redirectedFrom}/height`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  }

                  {
                      latestGrowthData[Object.keys(latestGrowthData)[0]].bmi && <tr>
                        <td>BMI</td>
                        <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi }</td>
                        <td><span>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi_range } </span><Link to={`/youngwomens/growth-tracker/history/${editAccountKey}/${redirectedFrom}/bmi`} className='primary-color'>(History)</Link></td> 
                      </tr>
                  }
                  
                  {
                    // latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm && <tr>
                    //   <td>Mid Arm</td>
                    //   <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm }</td>
                    //   <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm_range } <Link to={`/youngwomens/growth-tracker/history/${editAccountKey}/${redirectedFrom}/mid_arm`} className='primary-color'>(History)</Link></td> 
                    // </tr>
                  }
                  
                </>:<></>
              }

            </tbody>
          </table>
          <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0 w-100' onClick={() =>  showChart()}>View Health Chart</Link>
      </div>

      <Modal show={modalHealthChartShow} onHide={modalHealthChartClose} className='growth-chart'>
        <Modal.Footer className='justify-content-center'> 
          <h6 className='modal-title'><strong>Name: { userBasicDetails.display_name }</strong></h6> 
          <div className='d-flex align-items-center'>
            
            <h6 className='modal-title min-width-120'>Health Chart</h6> 
            <select className='form-select' value={defaultGrowthParam} onChange={ (e) => changeGrowthTrackerParam(e.target.value) } >
              <option value="all">All</option>
              <option value="height">Height</option>
              <option value="weight">Weight</option>
              <option value="bmi">BMI</option>
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
              // defaultGrowthParam === 'mid_arm' && <MidArmGrowthChart data={individualMetricData} />
            }

          </div>
        </Modal.Body>  
        <Modal.Footer className='justify-content-center'>  
        </Modal.Footer>  
      </Modal>

      <Modal show={modalGrowthDetailsShow} onHide={modalGrowthDetailsClose} className='growth-details'>
        <Modal.Header className='justify-content-center'> 
          <div className='d-flex'>
            <h3 className='mb-0'>Add Health Details</h3>
          </div>
          <Button variant="secondary" className='btn-delete btn-close' onClick={modalGrowthDetailsClose}></Button>
        </Modal.Header>  
        <Modal.Body> 
          <div className='custom-scrollbar'>
          <form className='' name="growthDetailsForm" id="growthDetailsForm" onSubmit={handleFormSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor='measurement_date'>Measurement Date</label>
            {/* <input type="date" className='form-control' name="measurement_date" id="measurement_date" /> */}
            <DatePicker dateFormat="dd-MM-yyyy" selected={dataProcessedDate} onChange={(date) => onChangeDataProcessedDate(date)} className='form-control' maxDate={new Date()}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_height'>Height (in cm)</label>
            <input type="text" className='form-control' name="women_height" id="women_height" placeholder='Enter Height in cm' onChange={handleChange} value={formData["women_height"] ? formData["women_height"].value : ''}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_weight'>Weight (in kg)</label>
            <input type="text" className='form-control' name="women_weight" id="women_weight" placeholder='Enter Weight in kg' onChange={handleChange} value={formData["women_weight"] ? formData["women_weight"].value : ''}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_temperature'>Body Temperature (in Fahrenheit)</label>
            <input type="text" className='form-control' name="women_temperature" id="women_temperature" placeholder='Enter Body Temperature in °F' onChange={handleChange} value={formData["women_temperature"] ? formData["women_temperature"].value : ''}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_spo2'>Blood Oxygen Level SpO2</label>
            <input type="text" className='form-control' name="women_spo2" id="women_spo2" placeholder='Enter Blood Oxygen Level in %' onChange={handleChange} value={formData["women_spo2"] ? formData["women_spo2"].value : ''}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_heart_rate'>Heart Rate (per minute)</label>
            <input type="text" className='form-control' name="women_heart_rate" id="women_heart_rate" placeholder='Enter Heart Rate per Minute' onChange={handleChange} value={formData["women_heart_rate"] ? formData["women_heart_rate"].value : ''}/>
          </div>
          {/* <div className='form-group mb-3'>
            <label htmlFor='child_mid_arm'>Mid Arm length</label>
            <input type="text" className='form-control' name="child_mid_arm" id="child_mid_arm" placeholder='Enter Mid Arm length' />
          </div> */}
          <div className='form-group mb-3'>
            <label htmlFor='women_blood_pressure'>Blood Pressure</label>
            <input type="text" className='form-control' name="women_blood_pressure" id="women_blood_pressure" placeholder='Enter Blood Pressure' onChange={handleChange} value={formData["women_blood_pressure"] ? formData["women_blood_pressure"].value : ''}/>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='women_diabetic'>Are you Diabetic?  </label>
            <input type="text" className='form-control' name="women_diabetic" id="women_diabetic" placeholder='Enter Sugar Level' onChange={handleChange} value={formData["women_diabetic"] ? formData["women_diabetic"].value : ''}/>
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


export default YoungWomanGrowthTracker;