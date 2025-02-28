import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";

function PatientViewPeriodicData(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

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
            <h5 className='mx-2 mb-0'> View Patient Periodic Data </h5>
            
          </div>
          <div className='app-top-right d-flex'> 
            <div className='position-relative'>
              <Link to="/notifications">
              <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
              <span className='top-header-notification primary-bg-color'>3</span>
              </Link>
            </div> 
            <div className={`my-element2 ${isMActive ? 'active' : ''}`}><FontAwesomeIcon icon={faEllipsisV} /></div>
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
      <div className='app-body form-all upadte-periodic-data'>
        {/* <p><small>View Patient Periodic Data</small></p> */}
        <div className="saved-periodic-data">
          <div className="row mt-4">
            <div className="col-6">
                <div className="jumbotron rounded p-2">
                  <div className="periodic-data position-relative">
                    <p className="primary-color"><strong>Date -  04-12-2024</strong></p>
                    <p>Body Height in Inches - 123</p>
                    <p>Body Weight in Kgs - 67</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default PatientViewPeriodicData;