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
//import 'bootstrap/dist/css/bootstrap.min.css';  
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
        <div className='notify-otp'>
          {notificationList && notificationList.map((notification, index) => (
            <div className={`rounded jumbotron p-3 mt-3 mb-3 ${(notification.read_status === '1') ? 'read' : 'unread'}`} key={notification.notification_id} onClick={() => readNotification(notification.notification_id)}>
              <div className='d-flex'> 
                <div className='thumb me-3'>
                  <img src={notification.push_icon_url}  alt={notification.push_title} />
                </div>
                <div className='notification-content'>
                  <p className='mb-2 notification-title'>
                    {notification.push_title}
                  </p>
                  {notification.push_text}
                </div>
                <div className='notification-time'>
                  {notification.last_update}
                  <p>Yesterday</p>
                </div>
              </div>
            </div>
          ))}
          {notificationList.length == 0 && <div className={`rounded jumbotron p-3 mt-3 mb-3`}>
              <p className='mb-0 notification-title'>
                You don't have any notification.
              </p>
            </div>}
        </div>
        <Modal show={showModal} onHide={modalClose}>  
          
          <Modal.Body>  
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>  
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
            <Button variant="primary" className='btn primary-bg-color text-light border-0'>Mark as Read</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}

export default Notifications;