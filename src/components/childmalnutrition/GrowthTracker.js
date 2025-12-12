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
import MetricChart from '../../util/MetricChart';
import {Modal, Button} from 'react-bootstrap'; 


function GrowthTracker() {

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const [urlParam, setUrlParam] = useState(useParams());

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [latestGrowthData, setLatestGrowthData] = useState(null);

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


  const [modalHealthChartShow, setModalHealthChartShow] = useState(false);
  const modalHealthChartClose  = () => setModalHealthChartShow(false);  
  const [labels, setLabels] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
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

      setLabels(response.months);
      setMetrics(response.metrics);
    };

    fetchMetricData();
  }, []);

  const showChart = () => {
    setModalHealthChartShow(true);
  }

  return (
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/doctor-appointments" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
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
         <div className='align-items-center d-flex justify-content-between'>
            <p className='mb-0'><small>Updated on { (latestGrowthData) ? Object.keys(latestGrowthData)[0] : '' }</small></p>
            <Link to={`/childmalnutrition/child-view-periodic-data/`} className='btn btn-sm btn-primary primary-bg-color border-0'>Add Growth Details</Link>
          </div>
          <table className='border-0 table mt-3'>
            <thead>
              <tr>
                <th>Meas.</th> 
                <th>Childs Info.</th>
                <th>WHO Range</th>
              </tr>
            </thead>
            <tbody>

              {
                latestGrowthData && <>
                  
                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].weight && <tr>
                      <td>Weight</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].weight }</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].weight_range } Kg <Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/weight`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  } 

                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].height && <tr>
                      <td>Height</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height }</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].height_range } Cm <Link to={'/childmalnutrition/past-meas-height'} className='primary-color'>(History)</Link></td> 
                    </tr>
                  }

                  {
                      latestGrowthData[Object.keys(latestGrowthData)[0]].bmi && <tr>
                        <td>BMI</td>
                        <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi }</td>
                        <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].bmi_range } <Link to={'/childmalnutrition/past-meas-height'} className='primary-color'>(History)</Link></td> 
                      </tr>
                  }
                  
                  {
                    latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm && <tr>
                      <td>Mid Arm</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm }</td>
                      <td>{ latestGrowthData[Object.keys(latestGrowthData)[0]].mid_arm_range } <Link to={`/childmalnutrition/growth-tracker/history/${editAccountKey}/${redirectedFrom}/mid_arm`} className='primary-color'>(History)</Link></td> 
                    </tr>
                  }
                  

                </>
              }

            </tbody>
          </table>
          <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0 w-100' onClick={() =>  showChart()}>View Growth Chart</Link>
      </div>

      <Modal show={modalHealthChartShow} onHide={modalHealthChartClose}>
        <Modal.Footer className='justify-content-center'> 
          <h5 className='modal-title'>Growth Chart</h5> 
          <Button variant="secondary" className='btn-delete btn-close' onClick={modalHealthChartClose}></Button>
        </Modal.Footer>  
        <Modal.Body>   
          <div className='health-chart'>
              <MetricChart labels={labels} metrics={metrics}/>
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