import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

import patientprescription from '../../assets/images/demo-test-report.jpg';

import {Modal, Button} from 'react-bootstrap'; 

function ElderTestReports(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam]       = useState(useParams());
  const [reportList, setReportList]   = useState([]);

  const editPatientKey    = urlParam.patientKey;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

  const [isMActive, setIsMActive] = useState(false);
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const listReports = async (searchKey) => {
      
      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  
      let jsonData = {};
      jsonData['system_id']               = systemContext.systemDetails.system_id;
      jsonData["volunteer_account_key"]   = decryptedLoginDetails.account_key;
      jsonData["account_key"]             = editPatientKey;
      jsonData["account_type"]            = 3;
      jsonData["search_param"]            = {
                                              "by_keywords": searchKey,
                                              "limit": "0",
                                              "offset": "0",
                                              "order_by_field": "file_id",
                                              "order_by_value": "asc"
                                            }
  
  
      const response = await fetch(`${API_URL}/fetchTestReportForElder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
  
      let result = await response.json();
      console.log(result);
      if(result.success){
        setReportList(result.data);
      }
      else{
        setReportList([]); 
      }
  
  }
  
  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listReports("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const [deleteTestReportFileId, setDeleteTestReportFileId]           = useState('');
    const [deleteTestReportApptId, setDeleteTestReportApptId]           = useState('');
    const [showTestReportsDeleteModal, setShowTestReportsDeleteModal]   = useState(false); 
    const modalTestReportsDeleteClose  = () => {
      setShowTestReportsDeleteModal(false); 
    }
    const modalTestReportsDeleteShow   = (fileId, apptId) => {
      setDeleteTestReportFileId(fileId);
      setDeleteTestReportApptId(apptId);
      setShowTestReportsDeleteModal(true);
    }
  
    const deleteTestReport = async () => {
      
      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
  
      let jsonData = {};
      jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData["account_key"]           = editPatientKey;
      jsonData["appointment_key"]       = deleteTestReportApptId;
      jsonData["volunteer_account_key"] = decryptedLoginDetails.account_key;;
      jsonData["file_id"]               = deleteTestReportFileId;
      jsonData["device_type"]           = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]          = DEVICE_TOKEN;
      jsonData["user_lat"]              = localStorage.getItem('latitude');
      jsonData["user_long"]             = localStorage.getItem('longitude');
  
      const response = await fetch(`${API_URL}/deleteTestReportForElder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
  
      let result = await response.json();
      
      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        listReports("");
        setShowTestReportsDeleteModal(false);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
  
    }

  const searchReport = (e) => {
    const { name, value } = e.target;
    setTimeout(()=>{
      listReports(value);
    }, 1000)
  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/elder-persons" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Test Reports</h5>
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
      <div className="app-body test-reports">
      <div className='add-patient align-items-center d-flex justify-content-between'>
          <span>Total - {reportList.length}</span>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0' to={`/elderpersons/elder-upload-test-reports/${editPatientKey}/${appointmentId}`}>Upload</Link>
        </div>

        <div className='search-prescription mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Test Reports' onChange={searchReport}/>
            <span class="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

        {reportList.map((report, index) => (
          <div className='col-6' key={report.file_id}>
            <div className='button-box'>
              <div className='prescription'>
                <div className="btn-download"><Link target="_blank" to={`${report.file_path}`}><FontAwesomeIcon icon={faDownload}/></Link></div>
                <div className="btn-delete" onClick={()=>modalTestReportsDeleteShow(report.file_id, report.appointment_key)}><FontAwesomeIcon icon={faTrash} /></div>
                <img src={patientprescription} alt='' className='w-100' />
                <p className='pb-2'><strong><small>{report.report_name}</small></strong></p>
              </div>
            </div>
          </div>
          ))}
        </div>

        <Modal show={showTestReportsDeleteModal} onHide={modalTestReportsDeleteClose}>
          <Modal.Header>
            <h4>Delete Test Report</h4>
          </Modal.Header> 
          <Modal.Body className='form-all'>  
            <p>Are you sure to delete this report? Deletion is permanent.</p> 
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Link to="#" variant="primary" className='btn bg-success text-light min-width-100 border-0' onClick={deleteTestReport}>Yes, Delete It</Link> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalTestReportsDeleteClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal>
        
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default ElderTestReports;