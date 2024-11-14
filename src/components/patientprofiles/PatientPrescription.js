import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams, useNavigate } from "react-router-dom";
import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import docIcon from '../../assets/images/doc-icon.jpg';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function PatientPrescription(){
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const [prescriptionList, setPrescriptionList]   = useState([]);

  const editAccountKey    = urlParam.accountKey;
  const prescriptionType  = urlParam.prescriptionType;
  const appointmentId     = (urlParam.appointmentId) ? urlParam.appointmentId : '';

  if(prescriptionType === 'initial'){
    var uploadUrl = `/patientprofiles/patient-upload-prescription/${editAccountKey}/${prescriptionType}`;
    var fetchUrl  = `fetchInitialAppointmentDocumentForPatient`;
  }
  else if(prescriptionType === 'doctor'){
    var uploadUrl = `/patientprofiles/patient-upload-prescription/${editAccountKey}/${prescriptionType}/${appointmentId}`;
    var fetchUrl  = ``;
  }
  

  const [isMActive, setIsMActive] = useState(false);

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

  const deletePrescription = async (fileId) => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']       = systemContext.systemDetails.system_id;
    jsonData["account_key"]     = editAccountKey;
    jsonData["account_type"]    = 3;
    jsonData["file_id"]         = fileId;

    /*const response = await fetch(`${API_URL}/deleteWomanSurveyPrescription`, {
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
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }*/

  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Upload Prescriptions </h5>
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
          <span>Total - 1</span>
          <Link className='btn btn-sm btn-primary primary-bg-color border-0' to={uploadUrl}>Upload</Link>
        </div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Prescription'/>
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>


            {prescriptionList.map((patient, index) => (
              <div className='col-6' key={patient.file_id}>
                <div className='button-box'>
                  <div className='prescription'>
                    <div className="btn-download"><Link target="_blank" to={`${patient.file_path}`}><FontAwesomeIcon icon={faDownload}/></Link></div>
                    <div className="btn-delete"><FontAwesomeIcon icon={faTrash} onClick={() => deletePrescription(patient.file_id)}/></div>
                    <img src={docIcon} alt='' className='w-100' />
                    <p className='mb-1'><strong>{patient.file_name}</strong></p>
                  </div>
                </div>
              </div>
            ))}
        

        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default PatientPrescription;