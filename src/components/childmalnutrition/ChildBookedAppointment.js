import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";
import Rating from "../Ratingsave"

import { Link, useParams } from "react-router-dom";

import SystemContext from '../../context/system/SystemContext';
import AlertContext from "../../context/alert/AlertContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from '../util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import {Modal, Button} from 'react-bootstrap'; 
import ChildRecentAppointment from './ChildRecentAppointment';
import ChildPreviousAppointment from './ChildPreviousAppointment';

function ChildBookedAppointment(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam]       = useState(useParams());

  const editPatientKey    = urlParam.patientKey;

  const [isMActive, setIsMActive] = useState(false);
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [appointmentList, setAppointmentList]   = useState([]);
  const [approvedCounter, setApprovedCounter]   = useState(0);
  const [pendingCounter, setPendingCounter]     = useState(0);
  const [rejectedCounter, setRejectedCounter]   = useState(0);

  const [filterPendingAppointmentChecked, setFilterPendingAppointmentChecked] = useState(false);

  useEffect(() => {
    if(filterPendingAppointmentChecked){
      listAppointment("");
    }
    else{
      if(systemContext.systemDetails.system_id){
        listAppointment("");
      }
    }
    // eslint-disable-next-line
  }, [filterPendingAppointmentChecked]);

  const listAppointment = async (searchKey) => {
  
    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    // jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    // jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;

    jsonData["doctor_account_key"]        = decryptedLoginDetails.account_key;
    jsonData["doctor_account_type"]       = 5;
    
    jsonData["patient_key"]               = editPatientKey;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    if(filterPendingAppointmentChecked)
    {
      jsonData['status_flag']             = 0;
    }
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "appointment_id",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/doctorListMyBookedAppointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      setAppointmentList(result.data.appointments);
      setApprovedCounter(result.data.counts.approved_count);
      setPendingCounter(result.data.counts.pending_count);
      setRejectedCounter(result.data.counts.rejected_count);
    }
    else{
      setAppointmentList([]); 
      setApprovedCounter(0);
      setPendingCounter(0);
      setRejectedCounter(0);
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listAppointment("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [activeTab, setActiveTab] = useState('tab2');

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/child-malnutrition" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Child Booked Appointment </h5>
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
      <div className="app-body bookings">

                  <div className='tab-container'>
                    <div className="d-flex justify-content-center">
                      <button onClick={() => setActiveTab('tab1')} className={`large ${ activeTab === 'tab1' ? 'active' : ''
                        }`} > Previous Appointment </button>
                      <button onClick={() => setActiveTab('tab2')} className={`large ${ activeTab === 'tab2' ? 'active' : ''
                        }`} > Recent Appointment </button>
                    </div>
                    <div className="tab-content">
                      {activeTab === 'tab1' && <ChildPreviousAppointment />}
                      {activeTab === 'tab2' && <ChildRecentAppointment />}
                    </div>
                  </div>

       
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default ChildBookedAppointment;