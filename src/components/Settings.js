import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";

import AlertContext from '../context/alert/AlertContext';
import SystemContext from "../context/system/SystemContext";

import './Settings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function Settings(){

  const alertContext  = useContext(AlertContext);
  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>General Settings </h5>
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
      <div className="app-body settings">
          <div className='brdr-btm d-flex justify-content-between align-items-center'>
            <h5 className='title mb-0'>Notifications</h5>
            <Link to="javascript:void(0);" className="btn btn-primary min-width-100 primary-bg-color border-0" >Save</Link>
          </div>
          <div className="mb-4">
            <div className="form-check form-switch px-0 mb-2">
              <input className="form-check-input float-end" type="checkbox" id="sms" name="darkmode" value="sms" />
              <label className="form-check-label" for="sms"><strong>SMS</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input className="form-check-input float-end" type="checkbox" id="email" name="darkmode" value="email" />
              <label className="form-check-label" for="email"><strong>Email</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input className="form-check-input float-end" type="checkbox" id="push" name="darkmode" value="push" />
              <label className="form-check-label" for="push"><strong>Push</strong></label>
            </div>
            <div className="form-check form-switch px-0 mb-2">
              <input className="form-check-input float-end" type="checkbox" id="call" name="darkmode" value="call" />
              <label className="form-check-label" for="call"><strong>Call</strong></label>
            </div>
          </div>

          <h5 className='title brdr-btm'>Another Category</h5>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default Settings;