import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import elderpersons from '../../assets/images/profile.png';

import CryptoJS from "crypto-js";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function ElderPersons(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [isActive, setIsActive]     = useState(0);

  const handleMenuClick = () => {
    // Toggle the state when the button is clicked
    setIsActive(!isActive);
  };

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
            <h5 className='mx-2 mb-0'>Elder Persons </h5>
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
      <div className="app-body patient-profiles profile-listing elder-persons">
        <div className='add-patient align-items-center d-flex justify-content-between'>
        <span>Total - 1</span>
          
          {
            (decryptedLoginDetails.account_type !== '5') && <Link to="/elderpersons/create-elder-person" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Elder Person</Link>
          }
        </div>
        
        <div className='search-elder-persons mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Elder Persons' id="ElderPersons" name="searchElderPersons" />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>

          
            <div className='col-6 mb-3'>
              <div className='button-box'>
                <div className={`my-element2 three-dot ${isActive ? 'active' : ''}`} onClick={handleMenuClick}>
                  <FontAwesomeIcon icon={faEllipsisV} /></div>

                  <div className='drop-menu'>
                    <ul>
                      <li><Link to={"/elderpersons/elder-basic-info"}>Edit Basic Information</Link></li>
                      <li><Link to={"/elderpersons/elder-medical-history"}>Update Medical History</Link></li>
                      <li><Link to={"/elderpersons/elder-periodic-data"}>Update Periodic Data</Link></li>
                      {/* <li><Link to={"/patientprofiles/patient-prescription"}>Upload Prescription</Link></li> */}
                      <li><Link to={"/elderpersons/elder-awareness-survey"}>Update Awareness Survey</Link></li>
                      {/* <li><Link  to="#">Upload Prescription</Link></li> */}
                      {/* <li><Link to={`/patientprofiles/patient-test-reports/${patient.account_key}`}>Upload Test Reports</Link></li> */}
                      {/* <li><Link to={"#"}>Upload Test Reports</Link></li> */}
                      {/* <li><Link to="#">Book Now</Link></li> */}
                      <li><Link to={"#"}>Close Profile </Link></li>
                    </ul>
                  </div>
                
                <Link to="#">
                  <img src={elderpersons} alt='' />
                  <h6>S Saha</h6>
                </Link>
              </div>
            </div>

        </div>    

      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default ElderPersons;