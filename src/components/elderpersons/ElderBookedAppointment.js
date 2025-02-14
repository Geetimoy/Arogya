import { useState, useContext, useEffect } from 'react';

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

function ElderBookedAppointment(){

  const systemContext = useContext(SystemContext);

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
            <h5 className='mx-2 mb-0'>Elder Booked Appointment </h5>
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
      <div className="app-body bookings">
        <div className="row">
          <div className="col-12">
            <div className='button-box mb-3 position-relative'>
              <div class="scheduleactive position-absolute"><div class="not-active">N-A</div></div>
              <p><span class="d-block">Doctor Name:</span> Dr. Manish Prasad</p>
              <p><span class="d-block">Appointment ID:</span> app2544fc770</p>
              <p><span class="d-block">Patient Name:</span> Test</p>
              <p><span class="d-block">Date of Visit &amp; Appointment Time:</span><label>Monday 10th March, 2025 @ 12:00 AM</label></p>
              <p><span class="d-block">Place:</span> Mangaldeep, Dashdrone - Call on Emergency</p>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default ElderBookedAppointment;