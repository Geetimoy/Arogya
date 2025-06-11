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
import AlertContext from '../context/alert/AlertContext';
//import 'bootstrap/dist/css/bootstrap.min.css';  
import {Modal, Button} from 'react-bootstrap';  


//import logo from '../logo.png';

function Notifications(){
  
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [notificationList, setNotificationList] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editNotficationId, setEditNotificationId] = useState(0);
  const [notificationDetails, setNotificationDetails] = useState({});

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

  const readNotification = async (notificationId) => {
    setEditNotificationId(notificationId);
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    
    let jsonData = {
      'system_id': systemContext.systemDetails.system_id,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'user_account_key': loginDetails.account_key,
      'user_account_type': loginDetails.account_type,
      'notification_id': notificationId
    };

    const response = await fetch(`${API_URL}/myEachNotifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    })

    let result = await response.json();

    setNotificationDetails(result.data.row[0]);

    modalShow();
  }

  const markAsRead = async (notification_id) => {

    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    
    let jsonData = {
      'system_id': systemContext.systemDetails.system_id,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'user_account_key': loginDetails.account_key,
      'user_account_type': loginDetails.account_type,
      'notification_id': notification_id
    };

    const response = await fetch(`${API_URL}/myNotificationsRead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    })

    let result = await response.json();

    if (result.success) { 
      alertContext.setAlertMessage({show:true, type: "success", message: "Marked as read successfully"});
      setTimeout(()=>{
        modalClose();
      }, 1000);
    } 
    else {
      alertContext.setAlertMessage({show:true, type: "error", message: "Status update failed!"});
    }

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
                  <img src={notification.push_icon_url}  alt={notification.push_title} className='w-100 rounded-circle' />
                </div>
                <div className='notification-content'>
                  <p className='mb-3 notification-title'>
                    {notification.push_title}
                  </p>
                  {/*notification.push_text*/}
                </div>
              </div>
              <div className='notification-time'>
                  {notification.last_update}
                  <p className='mb-0'>{notification.days_ago}</p>
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
            <p>{notificationDetails.push_text}</p>  
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
            <Button variant="primary" className='btn primary-bg-color text-light border-0' onClick={() => markAsRead(notificationDetails.notification_id)}>Mark as Read</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}

export default Notifications;