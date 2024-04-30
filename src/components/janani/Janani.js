import { useState, useContext } from 'react';

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import youngwomenprofile from '../../assets/images/profile-girl.png';

import SystemContext from "../../context/system/SystemContext";

function Janani(){

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };


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
            <h5 className='mx-2 mb-0'>Janani</h5>
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
      <div className="app-body janani profile-listing">
        <div className='add-patient'><Link to="/create-janani" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Janani</Link></div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search Janani' />
            <span class="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='button-box'>
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"patient-basicinfo"}>Edit Basic Information</Link></li>
                  <li><Link to={"/basic-medical-history"}>Edit Basic Medical History</Link></li>
                  <li><Link to={"/upload-prescription"}>Upload Prescription</Link></li>
                  <li><Link to={"/testreports"}>Upload Test Reports</Link></li>
                  <li><Link to={"#"}>Close Janani</Link></li>
                </ul>
              </div>
              <Link to="#">
                <img src={youngwomenprofile} alt='' />
                <h6>Janani 1</h6>
              </Link>
            </div>
          </div>
          <div className='col-6'>
            <div className='button-box'>
              <div className='three-dot'><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"#"}>Close Patient</Link></li>
                </ul>
              </div>
              <Link to="#">
                <img src={youngwomenprofile} alt='' />
                <h6>Janani 2</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default Janani;