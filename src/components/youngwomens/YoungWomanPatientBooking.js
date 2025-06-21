import Appfooter from "../AppFooter";
import { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import {Modal, Button} from 'react-bootstrap'; 

import general from '../../assets/images/therapis.png';
import childmalnutrition from '../../assets/images/child-malnutrition.png';
import women from '../../assets/images/prenatal-care.png';
import dentalcare from '../../assets/images/floss.png';
import skinhair from '../../assets/images/skin-care.png';
import more from '../../assets/images/stethoscope.png';
import AppTopNotifications from "../AppTopNotifications";

function YoungWomanPatientBooking(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/youngwomens" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Doctor Schedules</h5>
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
      <div className="app-body bookings appointment-scheduling">
        <div className="d-flex justify-content-between mb-3">
          <Link onClick={() => { modalShow(); }} to="#">
            <div className='d-flex advaced-search btn btn-sm btn-primary primary-bg-color border-0'>
              
              <span className="search-ultra-plus"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                <path d="M325.606 304.394 223.328 202.117c16.707-21.256 26.683-48.041 26.683-77.111C250.011 56.077 193.934 0 125.005 0 56.077 0 0 56.077 0 125.006 0 193.933 56.077 250.01 125.005 250.01c29.07 0 55.855-9.975 77.11-26.681l102.278 102.277c2.929 2.93 6.768 4.394 10.607 4.394s7.678-1.464 10.606-4.394c5.859-5.857 5.859-15.355 0-21.212zM30 125.006C30 72.619 72.619 30 125.005 30c52.387 0 95.006 42.619 95.006 95.005 0 52.386-42.619 95.004-95.006 95.004C72.619 220.01 30 177.391 30 125.006z"></path>

              </svg> </span>
              <span>Advanced Search</span>
            </div>
          </Link>
          <span id="filters-search-options-toggle" className="btn p-0">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <path d="M2.5 20c-0.276 0-0.5-0.224-0.5-0.5v-8c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v8c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M2.5 6c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v5c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M3.5 10h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM1.5 8c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> <path d="M9.5 20c-0.276 0-0.5-0.224-0.5-0.5v-4c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v4c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M9.5 10c-0.276 0-0.5-0.224-0.5-0.5v-9c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v9c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M10.5 14h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM8.5 12c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> <path d="M16.5 20c-0.276 0-0.5-0.224-0.5-0.5v-10c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v10c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M16.5 4c-0.276 0-0.5-0.224-0.5-0.5v-3c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v3c0 0.276-0.224 0.5-0.5 0.5z" fill="#333"></path> <path d="M17.5 8h-2c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5h2c0.827 0 1.5 0.673 1.5 1.5s-0.673 1.5-1.5 1.5zM15.5 6c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2z" fill="#333"></path> </svg>
          </span>
          
        </div>
      <div className="row">
          <div className="col-12">
              
              <div className="button-box mb-3"> 

                  <p><span className="d-block">Doctor Name:</span> Dr. Manish Prasad</p>
                  <p><span className="d-block">Specialization: </span> Heart</p>

                  <p>
                    <span className="d-block">Date of Visit & Appointment Time:</span> 
                    <label>Friday 27th December, 2024 @ 01:15 PM - 03:00 PM</label>
                  </p>

                  <p><span className="d-block">Place:</span> 
                  Salt Lake City - Offline (Clinic)</p>
                  {/* <p><span className="d-block">Consultation Mode:</span> {schedule.consultation_mode_descr}</p> */}
                  {/* <p><span className="d-block">Booking Status:</span> Doctor Confirmation Pending</p> */}

                  <div className="mb-3 mt-3 text-center">
                    <button className="btn primary-bg-color text-light">Book For Patient</button>
                  </div>
                </div>

             

             

          </div>
        </div>

        <Modal show={showModal} onHide={modalClose}>
          <Modal.Header className="justify-content-between">  
            <h3 className='mb-0'>Advanced Search</h3>
            <Link to={"#"}>Clear</Link>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-0'><strong>Find a Doctor</strong></p> 
            <div className='patient-category mt-3'>
              <div className='box'>
                <img src={general} />
                <p className='mb-0'>Gneral Physician</p> 
              </div>
              <div className='box'>
                <img src={women} />
                <p className='mb-0'>Women's Health</p> 
              </div>
              <div className='box'>
                <img src={dentalcare} />
                <p className='mb-0'>Dental Care</p> 
              </div>
              <div className='box'>
                <img src={childmalnutrition} />
                <p className='mb-0'>Child Specialist</p> 
              </div>
              <div className='box'>
                <img src={skinhair} />
                <p className='mb-0'>Skin & Hair</p> 
              </div>
              <div className='box'>
                <img src={more} />
                <p className='mb-0'>Cardiology</p> 
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100'>Search</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        {/* <Modal show={showBookingConfirmationModal} onHide={modalBookingConfirmationClose}>
          <Modal.Header className="justify-content-between">  
            <h3 className='mb-0'>Confirmation</h3>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-2'>You are now one step behind to book an appointment.</p> 
            <p className='mb-2'>Please check the details and click confirm button to book an appointment.</p> 
            <p>
              <strong>Patient Name: </strong>{patientDetails.patient_name}<br/>
              <strong>Doctor Name: </strong>Dr. {confirmDoctorName}<br/>
              <strong>Specialization: </strong>{confirmSpecializations}<br/>
              <strong>Appointment Date & Time: </strong>{confirmScheduleDateTime}<br/>
              <strong>Place: </strong>{confirmScheduleLocation}
            </p>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100 bg-success' onClick={() => confirmBooking(confirmScheduleId, confirmDoctorAccountKey.toLowerCase(), patientDetails.account_key.toLowerCase(), selectedScheduleDate, selectedScheduleTimeFrom, selectedScheduleTimeTo)}>Confirm</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalBookingConfirmationClose}>Cancel</Button>  
          </Modal.Footer>  
        </Modal> */}

        {/* <Modal show={showSuccessModal} onHide={modalSuccessClose}>
          <Modal.Header className="justify-content-between">  
            <h3 className='mb-0'>Information</h3>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-2' dangerouslySetInnerHTML={{ __html: bookingConfirmationMessage }}/>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalSuccessClose}>Close</Button>  
          </Modal.Footer>  
        </Modal> */}

      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default YoungWomanPatientBooking;