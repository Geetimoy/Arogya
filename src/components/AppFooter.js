import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';

import './AppFooter.css'

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import {Modal, Button} from 'react-bootstrap'; 
import SystemContext from "../context/system/SystemContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
  
function Appfooter(){

  const [consentStatus, setConsentStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);
  const redirect    = useNavigate(); 
  const location    = useLocation();

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);

  if(decryptedLoginDetails.account_type === '4' || decryptedLoginDetails.account_type === '5'){
    var accountType = decryptedLoginDetails.account_type;
  }
  else{
    var accountType = 3;
  }

  const getUserConsent = async () => {
  
    let jsonData = {};

    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["account_type"]              = accountType;
    jsonData["account_key"]               = decryptedLoginDetails.account_key;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/myConsentsStatus`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });
    let result = await response1.json();

    if(result.success){
      var myConsentData = result.data.results;
      setConsentStatus(myConsentData.consent_status.toString());
      if(myConsentData.consent_status.toString() === '0' || myConsentData.consent_status.toString() === '2'){
        modalShow();
      }
    }
    else{
      modalClose();
      setConsentStatus('0'); 
    }
  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      if(location.pathname !== '/my-consent'){
        getUserConsent();
      }
    }

    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);


  return(
    <div className='app-footer'>
      <div className='action-items'>
        <div className='d-flex align-items-center justify-content-around'>
          <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Home </span></Link>
          <Link to="/services"><FontAwesomeIcon icon={faHandHoldingMedical} /> <span>Services </span></Link>
          <Link to="/account"><FontAwesomeIcon icon={faUser} /> <span>Account</span></Link>
        </div>
      </div>
      <Modal show={showModal} onHide={modalClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>My Consent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body text goes here.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={()=>redirect('/my-consent')}>
            Yes Proceeds
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Appfooter;