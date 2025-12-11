import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";
import CryptoJS from "crypto-js";

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import AppTopNotifications from '../AppTopNotifications';

function PastMeasurmentsHeight() {

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);
    
  const [urlParam, setUrlParam] = useState(useParams());

  const [latestGrowthData, setLatestGrowthData] = useState(null);
  const [childInfo, setChildInfo] = useState(null);

  const editAccountKey    = urlParam.accountKey;
  const redirectedFrom    = urlParam.redirectedFrom;
  const measuremenType    = urlParam.measuremenType;

  var measurementLabel = '';
  if(measuremenType === 'weight'){
    measurementLabel = 'Weight';
  }
  else if(measuremenType === 'height'){
    measurementLabel = 'Height';
  }
  else if(measuremenType === 'bmi'){
    measurementLabel = 'BMI';
  }
  else if(measuremenType === 'mid_arm'){
    measurementLabel = 'Mid Arm';
  }
  
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

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
      console.log(result.data);
      setLatestGrowthData(result.data);
      setChildInfo(result.child_info);
    }
    else{
      setLatestGrowthData([]); 
      setChildInfo([]);
    }

  }

  useEffect(() => {
    
    if(systemContext.systemDetails.system_id){
      fetchGrowthData();
    }

  }, [systemContext.systemDetails.system_id]);

  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={`/childmalnutrition/growth-tracker/${editAccountKey}/${redirectedFrom}`} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
             <h5 className='mx-2 mb-0'>Past Measurments {measurementLabel} </h5> 
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
      {
        (measuremenType === 'weight' && latestGrowthData) && <table className='border-0 table mt-3'>
          <thead>
            <tr>
              <th>Date.</th> 
              <th>Age</th>
              <th>Weight</th>
              <th>WHO Range</th>
            </tr>
          </thead>
          <tbody>
            {
              latestGrowthData.map( (measurement, index) => (
                <tr key={`weight${index}`}>
                  <td>{Object.keys(measurement)[0]}</td>
                  <td>{childInfo.age} Months</td>
                  <td>{measurement[Object.keys(measurement)[0]].weight} Kg </td> 
                  <td>{measurement[Object.keys(measurement)[0]].weight_range} Kg </td> 
                </tr>
              ))
            }
          </tbody>
        </table>
      }

      {
        (measuremenType === 'height' && latestGrowthData) && <table className='border-0 table mt-3'>
          <thead>
            <tr>
              <th>Date.</th> 
              <th>Age</th>
              <th>Height</th>
              <th>WHO Range</th>
            </tr>
          </thead>
          <tbody>
            {
              latestGrowthData.map( (measurement, index) => (
                <tr key={`weight${index}`}>
                  <td>{Object.keys(measurement)[0]}</td>
                  <td>{childInfo.age} Months</td>
                  <td>{measurement[Object.keys(measurement)[0]].height} Cm </td> 
                  <td>{measurement[Object.keys(measurement)[0]].height_range} Cm </td> 
                </tr>
              ))
            }
          </tbody>
        </table>
      }

      {
        (measuremenType === 'bmi' && latestGrowthData) && <table className='border-0 table mt-3'>
          <thead>
            <tr>
              <th>Date.</th> 
              <th>Age</th>
              <th>BMI</th>
              <th>WHO Range</th>
            </tr>
          </thead>
          <tbody>
            {
              latestGrowthData.map( (measurement, index) => (
                <tr key={`bmi${index}`}>
                  <td>{Object.keys(measurement)[0]}</td>
                  <td>{childInfo.age} Months</td>
                  <td>{measurement[Object.keys(measurement)[0]].bmi} </td> 
                  <td>{measurement[Object.keys(measurement)[0]].bmi_range} </td> 
                </tr>
              ))
            }
          </tbody>
        </table>
      }

      {
        (measuremenType === 'mid_arm' && latestGrowthData) && <table className='border-0 table mt-3'>
          <thead>
            <tr>
              <th>Date.</th> 
              <th>Age</th>
              <th>Mid Arm</th>
              <th>WHO Range</th>
            </tr>
          </thead>
          <tbody>
            {
              latestGrowthData.map( (measurement, index) => (
                <tr key={`mid_arm${index}`}>
                  <td>{Object.keys(measurement)[0]}</td>
                  <td>{childInfo.age} Years</td>
                  <td>{measurement[Object.keys(measurement)[0]].mid_arm} </td> 
                  <td>{measurement[Object.keys(measurement)[0]].mid_arm_range} </td> 
                </tr>
              ))
            }
          </tbody>
        </table>
      }
      
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default PastMeasurmentsHeight;