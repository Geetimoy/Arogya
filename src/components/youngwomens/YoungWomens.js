import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import youngwomenprofile from '../../assets/images/profile-girl.png';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import Appfooter from '../AppFooter';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import './YoungWomens.css'

import {Modal, Button} from 'react-bootstrap'; 

function YoungWomens(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [womenList, setWomenList]   = useState([]);
  const [openMenuId, setOpenMenuId] = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const [isMActive, setIsMActive] = useState(false);
  const [closeProfileAccountKey, setCloseProfileAccountKey] = useState('');
  const [closeRemarks, setCloseRemarks] = useState('');
  

  const [showCloseProfileModal, setShowCloseProfileModal] = useState(false); 

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const modalCloseProfile  = () => setShowCloseProfileModal(false);  
  const modalShowProfile   = () => setShowCloseProfileModal(true);  
  
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const modalPrescriptionClose  = () => setShowPrescriptionModal(false);  
  const modalPrescriptionShow   = () => setShowPrescriptionModal(true);

  const [showTestReportModal, setShowTestReportModal] = useState(false);
  const modalTestReportClose  = () => setShowTestReportModal(false);  
  const modalTestReportShow   = () => setShowTestReportModal(true);

  const searchWomen = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listWomen(value);
    }, 1000)
  }

  const listWomen = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["volunteer_account_key"]     = decryptedLoginDetails.account_key;
    jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_type;
    // jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": searchKey,
                                              "limit": "10",
                                              "offset": "0",
                                              "order_by_field": "women_name",
                                              "order_by_value": "desc"
                                            }

    const response = await fetch(`${API_URL}/womanProfileList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      if(result.data.length > 0){

      }
      setWomenList(result.data);
    }
    else{
      setWomenList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listWomen("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const openCloseProfileModal = (accountKey) => {
    setCloseProfileAccountKey(accountKey);
    modalShowProfile();
  }

  const handleChangeRemarks = (e) => {
    const { name, value } = e.target;
    setCloseRemarks(value);
  }

  const closeProfile = async () => {
    
    var decryptedLoginDetails = CryptoJS.AES.decrypt(localStorage.getItem('cred'), ENCYPTION_KEY);
    var loginDetails          = JSON.parse(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
    
    let jsonData = {
      'system_id': systemContext.systemDetails.system_id,
      'device_type': DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat': localStorage.getItem('latitude'),
      'user_long': localStorage.getItem('longitude'),
      'woman_account_key': closeProfileAccountKey,
      'woman_account_type': 3,
      'introducer_account_key': loginDetails.account_key,
      'introducer_account_type': loginDetails.account_type,
      'remarks': closeRemarks
    };

    const response = await fetch(`${API_URL}/closeWomanAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    })

    let result = await response.json();

    if (result.success) { 
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      setOpenMenuId(0);
      setTimeout(()=>{
        modalCloseProfile();
        listWomen("");
      }, 1000);
    } 
    else {
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }


  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/services" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Young Women's </h5>
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
      <div className="app-body young-womens profile-listing">
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - {womenList.length}</span>

          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/youngwomens/create-young-women" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Young Women</Link>
          }
          
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' id="searchWomen" name="searchWomen" placeholder='Search Young Woman' onChange={searchWomen} />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className="listing-patient">
          <div className='row'>
            
            {womenList.map((women, index) => (
              <div className='col-6' key={women.account_id}>
                <div className='button-box'>
                  <div className={`three-dot my-element2 ${openMenuId === women.account_id ? 'active' : ''}`} onClick={() => handleMenuClick(women.account_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>

                  {openMenuId === women.account_id && <div className='drop-menu'>
                      <ul>
                        <li><Link to={`/youngwomens/young-woman-basicinfo/${women.account_key}`}>Edit Basic Information</Link></li>
                        <li><Link to={`/youngwomens/update-medical-history/${women.account_key}`}>Update Medical History</Link></li>
                        <li><Link to={`/youngwomens/update-periodic-data/${women.account_key}`}>Update Periodic Data</Link></li>
                        <li><Link to={`/youngwomens/update-awareness-survey/${women.account_key}`}>Update Awareness Survey</Link></li>
                        <li><Link onClick={() => { modalPrescriptionShow(women.account_key); }} to="#">Upload Prescriptions</Link></li>
                        {/* <li><Link to={`/youngwomens/testreports/${women.account_key}`}>Upload Test Reports</Link></li> */}
                        <li><Link onClick={() => { modalTestReportShow(women.account_key); }} to="#">Upload Test Reports</Link></li>
                        <li><Link to={`/youngwomens/young-woman-patient-booking/`}>Book Now</Link></li>
                        <li><Link to={"#"} onClick={()=>{ openCloseProfileModal(`${women.account_key}`) }}>Close Profile </Link></li>
                      </ul>
                    </div>
                  }
                  <Link to="#">
                    <img src={youngwomenprofile} alt='' />
                    <h6>{women.women_name}</h6>
                  </Link>
                </div>
              </div>
            ))}

            {womenList.length === 0 && <div className='col-12 text-center'>No Records Found</div>}

          </div>
        </div>
        
        <Modal show={showCloseProfileModal} onHide={modalCloseProfile}>
          <Modal.Body>  
            <p>Are you sure you want to close this profile?</p> 
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" onChange={handleChangeRemarks} value={closeRemarks}></textarea>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalCloseProfile}>Cancel</Button>  
            <Button variant="primary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={closeProfile}>Confirm to Close</Button>  
          </Modal.Footer>  
        </Modal>
        
        <Modal show={showPrescriptionModal} onHide={modalPrescriptionClose}>
          <Modal.Body>  
            <p>Upload Prescription</p> 
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_y" name="prescription_type" className="custom-control-input" checked value="initial" />
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Survey Form</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_n" name="prescription_type" className="custom-control-input" value="doctor" />
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">Doctor Prescription</label>
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>
            <Link to="/youngwomens/young-woman-prescriptions/:accountKey" variant="primary" className='btn bg-success text-light min-width-100 border-0'>Yes, Proceed</Link>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalPrescriptionClose}>Cancel</Button>  
              
          </Modal.Footer>  
        </Modal>

        <Modal show={showTestReportModal} onHide={modalTestReportClose}>
          <Modal.Body className='form-all'>  
            <p>Upload Test Report</p> 
            <form>
              <div className="form-group">
                <label><span className="d-block">Appointment </span></label>
                <select className="form-control" name="test_report_appoitment_id" id="test_report_appoitment_id" value="">
                  <option value="">Select</option>
                  <option value="">Select</option>
                </select>
              </div>
            </form>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>
            <Link to="/youngwomens/testreports" variant="primary" className='btn bg-success text-light min-width-100 border-0'>Confirm</Link>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalTestReportClose}>Cancel</Button>  
              
          </Modal.Footer>  
        </Modal>

      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default YoungWomens;