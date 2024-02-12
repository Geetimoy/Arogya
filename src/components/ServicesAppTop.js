import { useState, useContext } from 'react';

import CryptoJS from "crypto-js";
import { ENCYPTION_KEY } from './util/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import './ServicesAppTop.css'

import SystemContext from "../context/system/SystemContext";

function ServicesAppTop(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <div className='app-top services-app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className='scroll-back'>
            <Link to="/services" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>{systemContext.systemDetails.thp_system_name} </h5>
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
  );
}

export default ServicesAppTop;