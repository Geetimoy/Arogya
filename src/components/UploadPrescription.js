import { useState, useContext } from 'react';
import Appfooter from "./AppFooter";

import SystemContext from "../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import docIcon from '../assets/images/doc-icon.jpg';
import {Modal, Button} from 'react-bootstrap'; 


import general from '../assets/images/therapis.png';
import date from '../assets/images/calendar.png';

import CryptoJS from "crypto-js";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import AppTopNotifications from './AppTopNotifications';

function UploadPrescription(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);


  const [showSearchModal, setShowSearchModal] = useState(false); 
  const modalSearchClose  = () => setShowSearchModal(false);  
  const modalSearchShow   = () => setShowSearchModal(true);

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  return(
    <>
    <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to={'/services'} className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            {
              (decryptedLoginDetails.account_type !== '5') && <h5 className='mx-2 mb-0'>Upload Prescriptions </h5>
            }
            {
              (decryptedLoginDetails.account_type == '5') && <h5 className='mx-2 mb-0'>Prescription List & Upload </h5>
            }
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
    <div className="app-body upload-prescription">
      <div className='add-patient align-items-center d-flex justify-content-between'>
        {/* <span>Total - 2</span> */}
        <Link onClick={() => { modalSearchShow(); }} to="#">
            <div className='d-flex advaced-search btn btn-sm btn-primary primary-bg-color border-0'>
              
              <span className="search-ultra-plus"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                <path d="M325.606 304.394 223.328 202.117c16.707-21.256 26.683-48.041 26.683-77.111C250.011 56.077 193.934 0 125.005 0 56.077 0 0 56.077 0 125.006 0 193.933 56.077 250.01 125.005 250.01c29.07 0 55.855-9.975 77.11-26.681l102.278 102.277c2.929 2.93 6.768 4.394 10.607 4.394s7.678-1.464 10.606-4.394c5.859-5.857 5.859-15.355 0-21.212zM30 125.006C30 72.619 72.619 30 125.005 30c52.387 0 95.006 42.619 95.006 95.005 0 52.386-42.619 95.004-95.006 95.004C72.619 220.01 30 177.391 30 125.006z"></path>

              </svg> </span>
              <span>Advanced Search</span>
            </div>
        </Link>
        <Link className='btn btn-sm btn-primary primary-bg-color border-0' onClick={()=> modalShow()} to={'#'}>Upload</Link>
      </div>
      <div className='search-patient mt-3 mb-3'>
        <div className='input-group'>
          <input type="text" className='form-control' placeholder='Search Prescription' />
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
        </div>
      </div>
     
      <div className='row'>
        <div className='col-6'>
          <div className='button-box'>
              <div className='prescription'>
                <div className="btn-download">
                  <Link target="_blank" to={'#'}><FontAwesomeIcon icon={faDownload}/></Link>
                </div>
                <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                <img src={docIcon} alt='' className='w-100' />
                <p className='mb-1'><strong>doc file</strong></p>
              </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='button-box'>
              <div className='prescription'>
                <div className="btn-download">
                  <Link target="_blank" to={'#'}><FontAwesomeIcon icon={faDownload}/></Link>
                </div>
                <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                <img src={docIcon} alt='' className='w-100' />
                <p className='mb-1'><strong>doc file</strong></p>
              </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={modalClose}>
          <Modal.Body>  
            <p>Upload Prescription</p> 
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_y" name="prescription_type" className="custom-control-input" value="initial" />
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Initial Prescription</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="edit_user_medical_certificates_n" name="prescription_type" className="custom-control-input" value="doctor" />
                <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">Doctor Prescription</label>
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
          <Button variant="primary" className='btn bg-success text-light min-width-100 border-0'>Yes to Proceed</Button> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Cancel</Button>  
              
          </Modal.Footer>  
      </Modal>

      <Modal show={showSearchModal} onHide={modalSearchClose}>
          <Modal.Header className='justify-content-between'>  
            <h3 className='mb-0'>Advanced Search</h3>
            <Link to={"#"}>Clear</Link>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-0'><strong>Search by </strong></p> 
            <div className='patient-category mt-3'>
              <div className='box'>
                <img src={general} />
                <p className='mb-0'>Doctor</p> 
              </div>
              <div className='box'>
                <img src={date} />
                <p className='mb-0'>Date</p> 
              </div>
              
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100'>Search</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalSearchClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>

    </div>
    <Appfooter></Appfooter>
    </>
  );
}


export default UploadPrescription;