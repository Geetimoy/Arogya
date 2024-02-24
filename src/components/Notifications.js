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
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Modal, Button} from 'react-bootstrap';  


//import logo from '../logo.png';

function Notifications(){
  
  const systemContext = useContext(SystemContext);
  const [notificationList, setNotificationList] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);  

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

    console.log(result);

    /*var jsonValue = '{"success":true,"status":200,"msg":"My notifications data fetched","data":{"row":[{"thp_system_id":"0","sender_email_id":"sp-tech@serviceplace.org.in","sender_account_id":"1","sender_account_key":"THP@Ad321","receiver_email_id":"sab9195@gmail.com","receiver_mobile_no":"Sab","receiver_account_id":"101","receiver_account_key":"0up23298f7211","receiver_account_type":"3","email_template_key":"OTP_REGISTRATION_VERIFY","is_email_sent":"1","is_sms_sent":"1","custom_field":"test","custom_field_value":"test","notification_id":"14","device_type":"ANDROID","device_type_descr":"Android","device_token":"1232456","push_title":"OTP for Registration Verify at {{NGO_MAIL_SUBJECT_NAME}}","push_text":null,"push_img_url":null,"push_icon_url":"https:\/\/rgvn.serviceplace.org.in\/telehealth-uat\/public\/assets\/images\/default-push-icon-url.png","push_redirect_url":null,"sent_date":"2023-10-25 12:04:41+00","sent_date_descr":"2023-10-25 12:04","sent_status":"1","read_status":"1","read_date":null,"read_date_descr":null,"last_update":"2023-10-25 12:04"}],"numRows":1}}';

    let result = JSON.parse(jsonValue);*/
    
    console.log(result);
    if(result.success){
      setNotificationList(result.data.row);
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      fetchNotifications(systemContext.systemDetails.system_id);
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const readNotification = (notificationId) => {
    modalShow();
  }

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
            <div>
              <span className='otp green'><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
              Services
            </div>
          </div>
        </div>
        <div className='notify-otp'>
          {notificationList && notificationList.map((notification, index) => (
            <div className={`rounded jumbotron p-3 mt-3 mb-3 ${(notification.read_status === '1') ? 'read' : 'unread'}`} key={notification.notification_id} onClick={() => readNotification(notification.notification_id)}>
              <div className='d-flex'> 
                <div className='thumb me-3'>
                  <img src={notification.push_icon_url}  alt={notification.push_title} />
                </div>
                <div>
                  <p className='mb-2 notification-title'>
                    {notification.push_title}
                  </p>
                  {notification.push_text}
                </div>
                <div className='notification-time'>
                  {notification.last_update}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={modalClose}>  
          <Modal.Header closeButton>  
            <Modal.Title>Title for Modal</Modal.Title>  
          </Modal.Header>  
          <Modal.Body>  
            <p>Body Content.</p>  
          </Modal.Body>  
          <Modal.Footer>  
            <Button variant="secondary" onClick={modalClose}>Close</Button>  
            <Button variant="primary">Mark as Read</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}

export default Notifications;