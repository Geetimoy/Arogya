import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import "./Bookings.css";

import SystemContext from "../context/system/SystemContext";

function AppointmentScheduling(){

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
            <h5 className='mx-2 mb-0'>Appointment Schedule </h5>
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
        <div className="add-booking mb-3">
          <a class="btn btn-sm btn-primary primary-bg-color border-0" href="create-schedule">Add/Update your Schedule</a>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="button-box pos-relative mb-3">
              <p><span className="d-block">Doctor Name:</span> Dr. D Sinha</p>
              <p><span className="d-block">Specialization:</span> Heart</p>
              <p><span className="d-block">Schedule Type :</span> Single</p>
              <p><span className="d-block">Appointment Date:</span> Tuesday 6th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:00 PM - 07:00PM</p>
              <p><span className="d-block">Place:</span> New Life - Bablatala</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <div class="mb-3 mt-3 text-center"><button type="submit" class="btn primary-bg-color text-light">Book Now</button></div>
            </div>
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Doctor Name:</span> Dr.NP Kar</p>
              <p><span className="d-block">Specialization:</span> Medicine</p>
              <p><span className="d-block">Schedule Type :</span> Single</p>
              <p><span className="d-block">Appointment Date:</span> Monday 12th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 07:00 PM - 10:00PM</p>
              <p><span className="d-block">Place:</span> Apex - Joramandir</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <div class="mb-3 mt-3 text-center"><button type="submit" class="btn primary-bg-color text-light">Book Now</button></div>
            </div>
          </div>
        </div>
        
        {/* <div className="row">
          <div className="col-12">
            <div className="button-box pos-relative mb-3">
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                <li><Link to={"/upload-prescription"}>Upload Prescription</Link></li>
                  <li><Link to={"/testreports"}>Upload Test Reports</Link></li>
                  <li><Link to={"#"}>Cancel Booking</Link></li>
                  <li><Link to={"#"}>Close Booking</Link></li>
                  <li><Link to={"/view-review"}>View Review</Link></li>
                  <li><Link to={"/write-review"}>Write Review</Link></li>
                </ul>
              </div>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Schedule Type :</span> Single</p>
              <p><span className="d-block">Appointment Date:</span> Tuesday 6th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:00 PM - 07:00PM</p>
              <p><span className="d-block">Place:</span> New Life - Bablatala</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Doctor Name:</span> Doctor2</p>
              <p><span className="d-block">Specialization:</span> Test</p>
              <p><span className="d-block">Schedule Type :</span> Single</p>
              <p><span className="d-block">Appointment Date:</span> Monday 12th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 07:00 PM - 10:00PM</p>
              <p><span className="d-block">Place:</span> Apex - Joramandir</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
          </div>
        </div> */}
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default AppointmentScheduling;