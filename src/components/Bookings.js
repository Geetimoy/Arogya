import { useState, useContext, useEffect } from 'react';

import Appfooter from "./AppFooter";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import "./Bookings.css";

import SystemContext from "../context/system/SystemContext";
import {Modal, Button} from 'react-bootstrap'; 

function Bookings(){

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [bookingStatus, setBookingStatus] = useState('');

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => {
    setBookingStatus('');
    setShowModal(false);  
  }
  const modalShow   = (status) => {
    setBookingStatus(status);
    setShowModal(true);
  }

  useEffect(() => {

  }, [bookingStatus])

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/appointment-scheduling" className=''>
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
        {/* <div className="add-booking mb-3"><a class="btn btn-sm btn-primary primary-bg-color border-0" href="selectpatient">Add New Booking</a></div> */}
        {/* <div><p><small>Booking List</small></p></div> */}
        <div className="row">
          <div className="col-12">
            <div className="button-box pos-relative mb-3">
              {/* <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span> */}
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
              <p><span className="d-block">Patient Name:</span> Anuska D</p>
              <p><span className="d-block">Volunteer Name:</span> Dipendu Banerjee</p>
              <p><span className="d-block">Specialization:</span> Heart</p>
              <p><span className="d-block">Appointment Date:</span> Tuesday 6th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <span className="d-block">Booking Status:</span>
              <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="doctor_confirm" name="doctor_confirmation" className="custom-control-input" value="" />
                <label className="custom-control-label no-style" htmlFor="doctor_confirm" onClick={() => { modalShow('confirm'); }} to="#">Confirm</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="doctor_cancel" name="doctor_confirmation" className="custom-control-input" value="" />
                <label className="custom-control-label no-style" htmlFor="doctor_cancel" onClick={() => { modalShow('cancel'); }} to="#">Cancel</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="doctor_reject" name="doctor_confirmation" className="custom-control-input" value="" />
                <label className="custom-control-label no-style" htmlFor="doctor_reject" onClick={() => { modalShow('reject'); }} to="#">Reject</label>
              </div>
            </div>
            </div>
            <div className="button-box mb-3">
              <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span>
              <p><span className="d-block">Appointment ID:</span> APP24462D573</p>
              <p><span className="d-block">Patient Name:</span> Dhirendra Kumar</p>
              <p><span className="d-block">Volunteer Name:</span> Atanu Basu</p>
              <p><span className="d-block">Specialization:</span> Medicine</p>
              <p><span className="d-block">Appointment Date:</span> Monday 12th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:38 PM</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p>
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={modalClose}>
          <Modal.Header>  
            <h3>Booking Status - {bookingStatus.toUpperCase()}</h3>
          </Modal.Header>  
          <Modal.Body>  
            <div className='form-group'>
              {/* {selectedOption === '' && <p class="text-danger">Please select an option</p>} */}
              {/* <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_single" name="schedule" value="single" className="custom-control-input" checked={selectedOption === 'single'}
                onChange={handleRadioChange}/>
                <label className="custom-control-label no-style" htmlFor="schedule_single">Single Day</label>
              </div> */}
              {(bookingStatus === 'confirm') && <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="doctor_confirm" name="doctor_confirmation" className="custom-control-input" value="" />
                <label className="custom-control-label no-style" htmlFor="doctor_confirm">Confirm</label>
              </div>}
              {(bookingStatus === 'cancel' || bookingStatus === 'reject') && <div>
                <textarea name="doctor_cancel" id="doctor_cancel" rows="3"  className="form-control" placeholder="Reason"></textarea>
              </div>}

              {/* <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_repeat" name="schedule" value="repeat" className="custom-control-input" checked={selectedOption === 'repeat'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_repeat">Repeat <small>(Fixed Time)</small></label>
              </div> */}

              {/* <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_multiple" name="schedule" value="multiple" className="custom-control-input" checked={selectedOption === 'multiple'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_multiple">Multiple Dates <small>(Fixed Time)</small></label>
              </div> */}

              
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            {/* <Button variant="primary" className='btn primary-bg-color text-light border-0' onClick={redirectToCreateSchedule}>Proceed</Button>   */}
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Bookings;