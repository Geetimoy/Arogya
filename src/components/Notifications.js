import Appfooter from './AppFooter';
import AppTop from './AppTop';
import './Notifications.css';

//import Tab from 'react-bootstrap/Tab';
//import Tabs from 'react-bootstrap/Tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import SystemContext from "../context/system/SystemContext";


//import logo from '../logo.png';

function Notifications(){

  const systemContext = useContext(SystemContext);
  const [notificationList, setNotificationList] = useState({});

  const fetchNotifications = async(systemId) => {
    
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    console.log(systemId)
    let jsonData = {
      'system_id': systemId,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'user_account_key': loginDetails.account_key,
      'user_account_type': loginDetails.account_type
    };

    const response = await fetch(`${API_URL}/myNotifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    });

    let result = await response.json();
    if(result.success){
      setNotificationList(result.data);
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      fetchNotifications(systemContext.systemDetails.system_id);
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id, notificationList]);

  return(
    
    <>
      <AppTop></AppTop>
      <div className='app-body notifications'>
        <h5 className='title'>Notifications</h5>
        {/* <Tabs defaultActiveKey="otp" id="fill-tab" className="mb-3" fill>
          <Tab eventKey="otp" title="OTP">
            <div className='rounded jumbotron p-3 mt-3 mb-3'>
              <p className='mb-2'><strong>OTP for Registration verify at teleHealth- SEEVA UKHRA</strong></p>
              Dear user, 8982 is the OTP for your mobile number verification. 
            </div>
            <div className='rounded jumbotron p-3 mt-3 mb-3'>
              <p className='mb-2'><strong>OTP for Registration verify at teleHealth- SEEVA UKHRA</strong></p>
              Dear user, 8982 is the OTP for your mobile number verification. 
            </div>
            <div className='d-flex justify-content-end'>Yesterday</div>
            <div className='rounded jumbotron p-3 mt-3 mb-3'>
              <p className='mb-2'><strong>OTP for Registration verify at teleHealth- SEEVA UKHRA</strong></p>
              Dear user, 8982 is the OTP for your mobile number verification. 
            </div>
          </Tab>
          <Tab eventKey="appointments" title="Appointments">
            Tab content for Appointments
          </Tab>
          <Tab eventKey="others" title="Others">
            Tab content for Others
          </Tab>
        </Tabs> */}
        <div className='rounded jumbotron p-3 text-center'>
          <div className='notification-category d-flex justify-content-between'>
            <div>
              <span className='otp green'>***</span>
              OTP
            </div>
            <div>
              <span className='otp red'><FontAwesomeIcon icon={faUserMd} /></span>
              Appointments
            </div>
            <div>
              <span className='otp black'><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
              Others
            </div>
            {/* <div>
              <span className='otp green'><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
              Services
            </div> */}
          </div>
        </div>
        <div className='notify-otp'>
          <div className='rounded jumbotron p-3 mt-3 mb-3'>
            <div className='d-flex'> 
              <div className='thumb me-3'>
                <img src='/assets/images/profileplaceholder.jpg'  alt="" />
              </div>
              <div>
                <p className='mb-2'><strong>OTP for Registration verify at teleHealth- SEEVA UKHRA</strong></p>
                Dear user, 8982 is the OTP for your mobile number verification.
              </div>
              <div className='notification-time'>
                  12:00PM
              </div>
            </div>
          </div>
          <div className='rounded jumbotron p-3 mt-3 mb-3'>
          <div className='d-flex'> 
              <div className='thumb me-3'>
                <img src='/assets/images/profileplaceholder.jpg'  alt="" />
              </div>
              <div>
                <p className='mb-2'><strong>Reminder: </strong></p>
                You have an upcoming appointment with Dr. Debashis Mukherjee on 12th Feb 2024 at 11.00AM. 
                To cancel or change your appointment date, reply to this message with ‘Reschedule’ or ‘Cancel’ correspondingly, or contact us at 9475932030.
              </div>
              <div className='notification-time'>
                  02:00PM
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end'>Yesterday</div>
          <div className='rounded jumbotron p-3 mt-3 mb-3'>
          <div className='d-flex'> 
              <div className='thumb me-3'>
                <img src='/assets/images/profileplaceholder.jpg'  alt="" />
              </div>
              <div>
                <p className='mb-2'><strong>OTP for Registration verify at teleHealth- SEEVA UKHRA</strong></p>
                Dear user, 8982 is the OTP for your mobile number verification.
              </div>
              <div className='notification-time'>
                  09:00AM
              </div>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}

export default Notifications;