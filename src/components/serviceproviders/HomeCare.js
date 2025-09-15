import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import './ServiceProviders.css'
import AppTopNotifications from '../AppTopNotifications';
import SystemContext from "../../context/system/SystemContext";

function HomeCare() {

  const systemContext = useContext(SystemContext);
  
     const [isMActive, setIsMActive] = useState(false);
  
     const handle2Click = () => {
      setIsMActive(!isMActive); // Toggle the state
    };

  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className='scroll-back'>
            <Link to="/service-providers" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>Home Care</h5>
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
    <div className="app-body service-provider">
      <div className='search-patient mt-3 mb-3'>
        <div className='input-group'>
          <input type="text" className='form-control' placeholder='Search Home Care' id="searchHomeCare" name="searchHomeCare"  />
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mb-3'>
          <div className='button-box-providers'>
           <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> SafeHaven Home Care</li>
              <li><span className='fw-bold'>Location :</span> Chakla, West Bengal</li>
              <li><span className='fw-bold'>Contact :</span> 9876543210</li>
              <li><span className='fw-bold'>Services :</span> Because every home deserves gentle care.
Professional Aaya services with a personal touch</li>
            </ul>
          </div>
        </div>
        <div className='col-12 mb-3'>
          <div className='button-box-providers'>
            <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> SafeHaven Home Care</li>
              <li><span className='fw-bold'>Location :</span> Chakla, West Bengal</li>
              <li><span className='fw-bold'>Contact :</span> 9876543210</li>
              <li><span className='fw-bold'>Services :</span> Because every home deserves gentle care.
Professional Aaya services with a personal touch</li>
            </ul>
          </div>
        </div>
        <div className='col-12 mb-3'>
          <div className='button-box-providers'>
            <ul className='p-0 m-0'>
              <li><span className='fw-bold min-width'>Name :</span> SafeHaven Home Care</li>
              <li><span className='fw-bold'>Location :</span> Chakla, West Bengal</li>
              <li><span className='fw-bold'>Contact :</span> 9876543210</li>
              <li><span className='fw-bold'>Services :</span> Because every home deserves gentle care.
Professional Aaya services with a personal touch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}
export default HomeCare;