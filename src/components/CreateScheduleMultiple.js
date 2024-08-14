import { useState, useContext, useEffect } from 'react';

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link, useParams } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

import './CreateSchedule.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateScheduleMultiple(){

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

  const [urlParam, setUrlParam] = useState(useParams());
  const scheduleType = urlParam.scheduleType;

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [selectedOption, setSelectedOption] = useState('');
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [singleFromDate, setSingleFromDate]     = useState('');
  const [singleToDate, setSingleToDate]         = useState('');

  const [repeatFromDate, setRepeatFromDate]     = useState('');
  const [repeatToDate, setRepeatToDate]         = useState('');

  const [multipleFromDate, setMultipleFromDate] = useState('');
  const [multipleToDate, setMultipleToDate]     = useState('');

  const [multipletimeDate, setMultipletimeDate] = useState('');

  const generateTimeIntervals = () => {
    const times = [];
    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Start at midnight

    for (let i = 0; i < 96; i++) {
        let hours = startTime.getHours();
        let minutes = startTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        const timeString = `${hours}:${minutes} ${ampm}`;
        times.push(timeString);
        startTime.setMinutes(startTime.getMinutes() + 15); // Increment by 15 minutes
    }

    return times;
  }

  const [timePickerDropDown, setTimePickerDropDown] = useState(generateTimeIntervals);

  useEffect(()=>{

  }, [timePickerDropDown]);


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
            <h5 className='mx-2 mb-0'>Create Schedule </h5>
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
      <div className="app-body create-schedule">
        <p><small>Add Your Schedule - Multiple Dates <small>(Fixed Time)</small></small></p>
        <div className="row mb-4">
          <div className='col-12'>
            <form>
              
              <div className="content">
                <div className='form-group'>
                  <label htmlFor="date_range" className="no-style">Date Range : </label>
                  <div className='row'>
                    <div className='col-12 mb-2'>
                      <label className='pos'>From :</label>
                      <DatePicker dateFormat="yyyy-MM-dd" selected={multipleFromDate} onChange={(date) => setMultipleFromDate(date)} className='form-control pos' placeholderText="YYYY-MM-DD"/>
                    </div>
                    <div className='col-12'>
                      <label className='pos'>To :</label>
                      <DatePicker dateFormat="yyyy-MM-dd" selected={multipleToDate} onChange={(date) => setMultipleToDate(date)} className='form-control pos' placeholderText="YYYY-MM-DD"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor="date_range" className="no-style">Time Range :</label>
                <div className='row'>
                  <div className='col-6'>
                    <label className='pos'>From :</label>
                    <select className="form-control pos">
                      <option>Select</option>
                      {timePickerDropDown.map((item)=>{ 
                        return <option value={item}>{item}</option>
                      })}
                    </select>
                  </div>
                  <div className='col-6'>
                    <label className='pos'>To :</label>
                    <select className="form-control pos">
                      <option>Select</option>
                      {timePickerDropDown.map((item)=>{ 
                        return <option value={item}>{item}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>


              <div className='form-group'>
                <label htmlFor="schedule" className="no-style">Consultation Mode :</label>
                <div className="">
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="offline" name="consultation_mode" value="offline" className="custom-control-input" checked />
                      <label className="custom-control-label no-style" htmlFor="offline">Offline <small>(Clinic)</small>
                      </label>
                    </div>
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="online" name="consultation_mode" value="online" className="custom-control-input" />
                      <label className="custom-control-label no-style" htmlFor="online">Online </label>
                    </div>
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="emergency" name="consultation_mode" value="emergency" className="custom-control-input" />
                      <label className="custom-control-label no-style" htmlFor="emergency">Call on Emergency</label>
                    </div>
                </div>
              </div>
              <div className="form-group">
                <label>Clinic Name, Location, Timing & Contact Number:</label>
                <textarea name="" rows="3" className="form-control" placeholder="Clinic Name, Location, Timing & Contact Number" value="">Test</textarea>
              </div>
              <div className="form-group">
                <label>Total Appointments : </label>
                <input type="text" className="form-control" name="appointments" id="appointments" placeholder="" value="10" />
              </div>
              <div className="form-group">
                <label htmlFor="booking_confirm" className="no-style">Is Strict Full? : <small className=''>(If yes, no extra patients on those days)</small></label>
                <div className="d-flex">
                  <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="booking_confirm_y" name="is_booking_confirm" className="custom-control-input" value="t" />
                    <label className="custom-control-label no-style" htmlFor="booking_confirm_y">Yes</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="booking_confirm_n" name="is_booking_confirm" className="custom-control-input" value="f" />
                    <label className="custom-control-label no-style" htmlFor="booking_confirm_n">No</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Extra Appointment (%) : <small>(Buffer percentage. e.g. 10%)</small></label>
                <input type="text" className="form-control" name="extra_appointments" id="extra_appointments" placeholder="" value="1" />
              </div>
              <div className="btns-group d-flex justify-content-center">
                <button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2">Add my Schedule</button>
                <a href="/appointment-scheduling"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default CreateScheduleMultiple;