import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import "./Bookings.css";

import SystemContext from "../context/system/SystemContext";

function Bookings(){

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
            <h5 className='mx-2 mb-0'>Bookings </h5>
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
        <div className="add-booking mb-3"><a class="btn btn-sm btn-primary" href="selectpatient">Add New Booking</a></div>
        <div className="row">
          <div className="col-12">
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Appointment Date:</span> Friday 16th February, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Appointment Date:</span> Friday 16th February, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Bookings;