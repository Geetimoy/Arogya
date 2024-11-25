import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

import "./Bookings.css";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from './util/Constants';

import SystemContext from "../context/system/SystemContext";
import AlertContext from '../context/alert/AlertContext';

import {Modal, Button} from 'react-bootstrap'; 

function AppointmentScheduling(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isActive, setIsActive] = useState(false);

  const redirect = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [confirmedBookingCounter, setConfirmedBookingCounter]                 = useState(0);
  const [editScheduleId, setEditScheduleId]                                   = useState(0);
  const [cancellationReason, setCancellationReason]                           = useState('');
  const [cancellationReasonErrorMessage, setCancellationReasonErrorMessage]   = useState(false);
  const [closingReason, setClosingReason]                                     = useState('');
  const [closingReasonErrorMessage, setClosingReasonErrorMessage]             = useState(false);

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

  const [showModal2, setShowModal2] = useState(false); 
  const modalClose2  = () => setShowModal2(false);  
  const modalShow2   = (scheduleId, confirmedBooking) => {
    setEditScheduleId(scheduleId);
    setConfirmedBookingCounter(confirmedBooking);
    setShowModal2(true);
    setCancellationReason('');
  }

  const [showModal3, setShowModal3] = useState(false); 
  const modalClose3  = () => setShowModal3(false);  
  const modalShow3   = (scheduleId, confirmedBooking) => {
    setEditScheduleId(scheduleId);
    setConfirmedBookingCounter(confirmedBooking);
    setShowModal3(true);
    setClosingReasonErrorMessage('');
  }

  const [selectedOption, setSelectedOption] = useState('single');
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const redirectToCreateSchedule = () => {
    if(selectedOption === ''){
      
    }
    else{
      redirect(`/create-schedule/${selectedOption}`);
    }
  }

  const [scheduleList, setScheduleList]   = useState([]);
  const [openMenuId, setOpenMenuId]       = useState(0);

  const handleMenuClick = (accountId) => {
    setOpenMenuId(openMenuId === accountId ? 0 : accountId);
  };

  const listSchedule = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["search_param"]              = {
                                              "by_keywords": "",
                                              "limit": "4",
                                              "offset": "0",
                                              "order_by_field": "schedule_date_from",
                                              "order_by_value": "asc"
                                            }

    const response = await fetch(`${API_URL}/doctorSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.success){
      if(result.data.length > 0){

      }
      setScheduleList(result.data.data);
    }
    else{
      setScheduleList([]); 
    }

  }

  const cancelSchedule = async () => {

    if(cancellationReason === ''){
      setCancellationReasonErrorMessage(true);
      return false;
    }

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["schedule_id"]               = editScheduleId;
    jsonData["cancelled_reason"]          = cancellationReason;

    const response = await fetch(`${API_URL}/cancelDoctorSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      modalClose2();
      listSchedule("");
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  const closeBooking = async () => {

    if(closingReason === ''){
      setClosingReasonErrorMessage(true);
      return false;
    }

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};
    jsonData['system_id']                 = systemContext.systemDetails.system_id;
    jsonData["user_account_type"]         = decryptedLoginDetails.account_type;
    jsonData["user_account_key"]          = decryptedLoginDetails.account_key;
    jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
    jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]              = DEVICE_TOKEN;
    jsonData["user_lat"]                  = localStorage.getItem('latitude');
    jsonData["user_long"]                 = localStorage.getItem('longitude');
    jsonData["schedule_id"]               = editScheduleId;
    jsonData["closed_reason"]             = closingReason;

    const response = await fetch(`${API_URL}/closeDoctorSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();
    
    if(result.success){
      alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      modalClose3();
      listSchedule("");
    }
    else{
      alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
    }

  }

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listSchedule("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  const changeCancellationReason = (e) => {
    const { name, value } = e.target;
    setCancellationReason(value);
  }

  const changeClosingReason = (e) => {
    const { name, value } = e.target;
    setClosingReason(value);
  }

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
            <h5 className='mx-2 mb-0'>Appointment Schedules </h5>
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
          <Link className="btn btn-sm btn-primary primary-bg-color border-0" onClick={() => { modalShow(); }} to="#">Create/Update Schedule</Link>
        </div>
        <div className="row">
          <div className="col-12">

            {scheduleList.map((schedule) => {

              var scheduleTypeDescr = '';
              if(schedule.schedule_type === '1') {
                scheduleTypeDescr = 'single';
              }
              else if(schedule.schedule_type === '2') {
                scheduleTypeDescr = 'repeat';
              }
              else if(schedule.schedule_type === '3') {
                scheduleTypeDescr = 'multiple';
              }
              else if(schedule.schedule_type === '4') {
                scheduleTypeDescr = 'multipletime';
              }
              
              return <div className="button-box pos-relative mb-3" key={schedule.doctor_avail_schedule_id}>
                {/* <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span> */}
                <div className={`three-dot my-element2 ${openMenuId === schedule.doctor_avail_schedule_id ? 'active' : ''}`} onClick={() => handleMenuClick(schedule.doctor_avail_schedule_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>
                {openMenuId === schedule.doctor_avail_schedule_id && <div className='drop-menu'>
                    <ul>
                      <li><Link onClick={() => { modalShow2(schedule.doctor_avail_schedule_id, '2'); }} to="#">Cancel Schedule</Link></li>
                      <li><Link onClick={() => { modalShow3(schedule.doctor_avail_schedule_id, '2'); }} to="#">Close Booking</Link></li>
                      <li><Link to={`/create-schedule/${scheduleTypeDescr}/${schedule.doctor_avail_schedule_id}`}>Edit Schedule</Link></li>
                    </ul>
                  </div>
                }
                {/* <p><span className="d-block">Doctor Name:</span> Dr. {schedule.display_name}</p> */}
                {/* <p><span className="d-block">Specialization:</span> {(schedule.specializations) ? schedule.specializations : 'N/A'}</p> */}
                <p><span className="d-block">Schedule Status :</span> {schedule.schedule_status}</p>
                <p><span className="d-block">Schedule Type :</span> {schedule.schedule_type_descr}</p>
                <p>
                  <span className="d-block">Appointment Date & Time:</span>
                  {
                    schedule.schedule_dates && schedule.schedule_dates.map((dateTime, index) => {
                      return <label key={index}>{dateTime.date} @ {dateTime.time_from} - {dateTime.time_to}</label>
                    })
                  } 
                </p>
                <p><span className="d-block">Place:</span> {schedule.clinic_details}</p>
                <p><span className="d-block">Consultation Mode:</span> {schedule.consultation_mode_descr}</p>

                <p><span className="d-block">Total Appointment Allowed/Booked:</span> {schedule.total_appointments}/2</p>

                <div className="mb-3 mt-3 text-center d-flex justify-content-around">
                  <a href='./bookings' className="btn primary-bg-color text-light">Bookings</a>
                  {/* <a href='/patientprofiles' className="btn primary-bg-color text-light">Book Now</a> */}
                </div>
              </div>

            })}

            {scheduleList.length === 0 && <div className='text-center'>No Records Found</div>}

          </div>
        </div>
        <Modal show={showModal} onHide={modalClose}>
          <Modal.Header>  
            <h3>Schedule Type</h3>
          </Modal.Header>  
          <Modal.Body>  
            <div className='form-group'>
              {selectedOption === '' && <p class="text-danger">Please select an option</p>}
              <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_single" name="schedule" value="single" className="custom-control-input" checked={selectedOption === 'single'}
                onChange={handleRadioChange}/>
                <label className="custom-control-label no-style" htmlFor="schedule_single">Single Day</label>
              </div>
            
              <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_repeat" name="schedule" value="repeat" className="custom-control-input" checked={selectedOption === 'repeat'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_repeat">Repeat <small>(Fixed Time)</small></label>
              </div>

              {/* <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_multiple" name="schedule" value="multiple" className="custom-control-input" checked={selectedOption === 'multiple'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_multiple">Multiple Dates <small>(Fixed Time)</small></label>
              </div> */}

              {/* <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_multiple_t" name="schedule" value="multipletime" className="custom-control-input" checked={selectedOption === 'multipletime'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_multiple_t">Multiple Dates <small>(Multiple Time)</small></label>
              </div> */}
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="primary" className='btn primary-bg-color text-light border-0' onClick={redirectToCreateSchedule}>Proceed</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showModal2} onHide={modalClose2}>
          <Modal.Header>  
            <h3>Cancel Schedule</h3>
          </Modal.Header>  
          <Modal.Body>
            <p>Already {confirmedBookingCounter} bookings confirmed. Are you sure?</p>
            <label><span className="d-block">Reason:</span></label>
            <textarea className='form-control' value={cancellationReason} onChange={changeCancellationReason}></textarea>
            {cancellationReasonErrorMessage && <small className="text-danger">This field is required!</small>}
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={cancelSchedule}>Confirm</Button> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose2}>No</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showModal3} onHide={modalClose3}>
          <Modal.Header>  
            <h3>Close Booking</h3>
          </Modal.Header>  
          <Modal.Body>
            <p>Already {confirmedBookingCounter} bookings confirmed. Are you sure?</p>
            <label><span className="d-block">Reason:</span></label>
            <textarea className='form-control' value={closingReason} onChange={changeClosingReason}></textarea>
            {closingReasonErrorMessage && <small className="text-danger">This field is required!</small>}
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={closeBooking}>Confirm</Button> 
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose3}>No</Button>  
          </Modal.Footer>  
        </Modal>
        
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default AppointmentScheduling;