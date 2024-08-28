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

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

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
                                              "order_by_value": "desc"
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

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      listSchedule("");
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

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

            {scheduleList.map((schedule, index) => (

              <div className="button-box pos-relative mb-3" key={schedule.doctor_avail_schedule_id}>
                {/* <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span> */}
                <div className={`three-dot my-element2 ${openMenuId === schedule.doctor_avail_schedule_id ? 'active' : ''}`} onClick={() => handleMenuClick(schedule.doctor_avail_schedule_id)}><FontAwesomeIcon icon={faEllipsisV} /></div>
                {openMenuId === schedule.doctor_avail_schedule_id && <div className='drop-menu'>
                    <ul>
                      <li><Link to={"#"}>Cancel Schedule</Link></li>
                      <li><Link to={"#"}>Close Booking</Link></li>
                      <li><Link to={"#"}>Edit Schedule</Link></li>
                    </ul>
                  </div>
                }
                <p><span className="d-block">Doctor Name:</span> Dr. D Sinha</p>
                <p><span className="d-block">Specialization:</span> Heart</p>
                <p><span className="d-block">Schedule Type :</span> Single</p>
                <p><span className="d-block">Appointment Date:</span> Tuesday 6th August, 2024</p>
                <p><span className="d-block">Appointment Time:</span> 04:00 PM - 07:00PM</p>
                <p><span className="d-block">Place:</span> New Life - Bablatala</p>
                <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
                <div className="mb-3 mt-3 text-center d-flex justify-content-between">
                  <a href='./bookings' className="btn primary-bg-color text-light">Bookings</a>
                  <a href='#' className="btn primary-bg-color text-light">Book Now</a>
                </div>
              </div>

            ))}

            {scheduleList.length === 0 && <div className='text-center'>No Records Found</div>}


            <div className="button-box pos-relative mb-3">
              {/* <span className="float-end"> <FontAwesomeIcon icon={faEllipsisV} /> </span> */}
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"#"}>Cancel Schedule</Link></li>
                  <li><Link to={"#"}>Close Booking</Link></li>
                  <li><Link to={"#"}>Edit Schedule</Link></li>
                </ul>
              </div>
              <p><span className="d-block">Doctor Name:</span> Dr. D Sinha</p>
              <p><span className="d-block">Specialization:</span> Heart</p>
              <p><span className="d-block">Schedule Type :</span> Single</p>
              <p><span className="d-block">Appointment Date:</span> Tuesday 6th August, 2024</p>
              <p><span className="d-block">Appointment Time:</span> 04:00 PM - 07:00PM</p>
              <p><span className="d-block">Place:</span> New Life - Bablatala</p>
              <p><span className="d-block">Consultation Mode:</span> Offline (Clinic)</p>
              <div className="mb-3 mt-3 text-center d-flex justify-content-between">
                <a href='./bookings' className="btn primary-bg-color text-light">Bookings</a>
                <a href='#' className="btn primary-bg-color text-light">Book Now</a>
              </div>
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
              <div className="mb-3 mt-3 text-center d-flex justify-content-between">
                {/* <button type="submit" className="btn primary-bg-color text-light">Book Now</button> */}
                <a href='./bookings' className="btn primary-bg-color text-light">Bookings</a>
                <a href='#' className="btn primary-bg-color text-light">Book Now</a>
              </div>
            </div>
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

              <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_multiple" name="schedule" value="multiple" className="custom-control-input" checked={selectedOption === 'multiple'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_multiple">Multiple Dates <small>(Fixed Time)</small></label>
              </div>

              <div className="custom-control custom-radio mt-2">
                <input type="radio" id="schedule_multiple_t" name="schedule" value="multipletime" className="custom-control-input" checked={selectedOption === 'multipletime'}
                onChange={handleRadioChange} />
                <label className="custom-control-label no-style" htmlFor="schedule_multiple_t">Multiple Dates <small>(Multiple Time)</small></label>
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="primary" className='btn primary-bg-color text-light border-0' onClick={redirectToCreateSchedule}>Proceed</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Close</Button>  
          </Modal.Footer>  
        </Modal>
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