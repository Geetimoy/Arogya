import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams, useNavigate } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import youngwomenprescription from '../../assets/images/sample-rx.png';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import docIcon from '../../assets/images/doc-icon.jpg';

import {Modal, Button} from 'react-bootstrap'; 

function JananiPrescriptions(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const [prescriptionList, setPrescriptionList]   = useState([]);

  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

  if(prescriptionType === 'initial'){
    var uploadUrl = `/janani/janani-upload-prescription/${editAccountKey}/${prescriptionType}`;
    var fetchUrl  = `fetchInitialAppointmentDocumentForJanani`;
  }
  else if(prescriptionType === 'doctor'){
    var uploadUrl = `/janani/janani-upload-prescription/${editAccountKey}/${prescriptionType}/${appointmentId}`;
    var fetchUrl  = `fetchInitialAppointmentDocumentForJanani`;
  }

  const [isMActive, setIsMActive] = useState(false);

  const redirect = useNavigate();

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const searchPrescription = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listPrescription(value);
    }, 1000)
  }

  const listPrescription = async (searchKey) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']       = systemContext.systemDetails.system_id;
    jsonData["volunteer_key"]   = decryptedLoginDetails.account_key;
    jsonData["account_key"]     = editAccountKey;
    jsonData["account_type"]    = 3;
    jsonData["file_type"]       = prescriptionType;
    jsonData["search_param"]    = {
                                    "by_keywords": searchKey,
                                    "limit": "0",
                                    "offset": "0",
                                    "order_by_field": "",
                                    "order_by_value": "desc"
                                  }

    const response = await fetch(`${API_URL}/${fetchUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      if(result.data.length > 0){

      }
      setPrescriptionList(result.data);
    }
    else{
      setPrescriptionList([]); 
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listPrescription("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [deletePrescriptionFileId, setDeletePrescriptionFileId]         = useState('');
  const [showPrescriptionDeleteModal, setShowPrescriptionDeleteModal]   = useState(false); 
  const modalPrescriptionDeleteClose  = () => {
    setShowPrescriptionDeleteModal(false); 
  }
  const modalPrescriptionDeleteShow   = (fileId) => {
    setDeletePrescriptionFileId(fileId);
    setShowPrescriptionDeleteModal(true);
  }

  const deletePrescription = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']             = systemContext.systemDetails.system_id;
    jsonData["account_key"]           = editAccountKey;
    jsonData["account_type"]          = 3;
    jsonData["file_id"]               = deletePrescriptionFileId;
    jsonData["file_type"]             = prescriptionType;
    jsonData["volunteer_account_key"] = decryptedLoginDetails.account_key;
    jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]          = DEVICE_TOKEN;
    jsonData["user_lat"]              = localStorage.getItem('latitude');
    jsonData["user_long"]             = localStorage.getItem('longitude');

    const response = await fetch(`${API_URL}/deleteInitialAppointmentDocumentForJanani`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    console.log(result);
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      listPrescription("");
      setShowPrescriptionDeleteModal(false);
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/janani" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Upload Prescriptions</h5>
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
      <div className="app-body young-womens upload-prescription">
        <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total- {prescriptionList.length}</span>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0' to={uploadUrl}>Upload</Link>
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Prescription' onChange={searchPrescription}/>
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          {prescriptionList.map((janani, index) => (
            <div className='col-6' key={janani.file_id}>
              <div className='button-box'>
                <div className='prescription'>
                  <div className="btn-download"><Link target="_blank" to={`${janani.file_path}`}><FontAwesomeIcon icon={faDownload}/></Link></div>
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} onClick={() => modalPrescriptionDeleteShow(janani.file_id)}/></div>
                  <img src={docIcon} alt='' className='w-100' />
                  <p className='mb-1'><strong>{janani.file_name}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showPrescriptionDeleteModal} onHide={modalPrescriptionDeleteClose}>
          <Modal.Header>
            <h4>Delete Prescription</h4>
          </Modal.Header> 
          <Modal.Body className='form-all'>  
            <p>Are you sure to delete this prescription? Deletion is permanent.</p> 
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={deletePrescription}>Confirm</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalPrescriptionDeleteClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>    
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default JananiPrescriptions;