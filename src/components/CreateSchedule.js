import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

import './CreateSchedule.css'

function CraeteSchedule(){

  const systemContext = useContext(SystemContext);

  const [isActive, setIsActive] = useState(false);

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
        <p><small>Add Your Schedule</small></p>
        <div className="row mb-4">
          <div className='col-12'>
            <form>
              <div className='form-group'>
                <label for="schedule" class="no-style">Schedule Type :</label>
                <div className="">
                  
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
              </div>
                
              {selectedOption === 'single' && (
                <div className='form-group'>
                  <label for="date_range" class="no-style">Date Range : <small>(If only one date leave next field empty)</small></label>
                  <div className='row'>
                    <div className='col-6'>
                      <label className='pos'>From :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                    <div className='col-6'>
                      <label className='pos'>To :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                  </div>
                </div>
              )}

              {selectedOption === 'repeat' && (
                <div className="content pos-relative">
                  <div className='form-group'>
                  <label for="date_range" class="no-style">Date Range : </label>
                  <div class="position-absolute add-more">
                    <button type="button" class="btn primary-bg-color text-light">Add More Day</button>
                  </div>
                  <div className='row'>
                    <div className='col-12 mb-3'>
                      <label className='pos'>Day :</label>
                      <select className="form-control pos" value="" name="" id="">
                        <option value="1">Sunday</option>
                        <option value="2">Monday</option>
                        <option value="1">Tuesday</option>
                        <option value="1">Wednesday</option>
                        <option value="1">Thursday</option>
                        <option value="1">Friday</option>
                        <option value="1">Saturday</option>
                      </select>
                    </div>
                    <div className='col-6'>
                      <label className='pos'>Start Date :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                    <div className='col-6'>
                      <label className='pos'>End Date :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/08/24" />
                    </div>
                  </div>
                </div>
                </div>
              )}

              {selectedOption === 'multiple' && (
                <div className="content">
                  <div className='form-group'>
                  <label for="date_range" class="no-style">Date Range : </label>
                  <div className='row'>
                    <div className='col-6'>
                      <label className='pos'>From :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                    <div className='col-6'>
                      <label className='pos'>To :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                  </div>
                </div>
                </div>
              )}

              {selectedOption === 'multipletime' && (
                <div className="content pos-relative">
                  <div className='form-group'>
                  <label for="date_range" class="no-style">Date Range : </label>
                  <div class="position-absolute add-more">
                    <button type="button" class="btn primary-bg-color text-light">Add More Date</button>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <label className='pos'>Date :</label>
                      <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="23/01/24" />
                    </div>
                  </div>
                </div>
                </div>
              )}

              <div className='form-group'>
                <label for="date_range" class="no-style">Time Range :</label>
                <div className='row'>
                  <div className='col-6'>
                    <label className='pos'>From :</label>
                    <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="7:00PM" />
                  </div>
                  <div className='col-6'>
                    <label className='pos'>To :</label>
                    <input type="text" class="form-control pos" name="" id="" placeholder="" maxlength="" value="10:00PM" />
                  </div>
                </div>
              </div>


              <div className='form-group'>
                <label for="schedule" class="no-style">Consultation Mode :</label>
                <div className="">
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="offline" name="offline" value="ofline" className="custom-control-input" checked />
                      <label className="custom-control-label no-style" htmlFor="offline">Offline <small>(Clinic)</small>
                      </label>
                    </div>
                  
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="online" name="online" value="Online" className="custom-control-input" />
                      <label className="custom-control-label no-style" htmlFor="online">Online </label>
                    </div>
                  
                    <div className="custom-control custom-radio mt-2">
                      <input type="radio" id="emergency" name="emergency" value="emergency" className="custom-control-input" />
                      <label className="custom-control-label no-style" htmlFor="emergency">Call on Emergency</label>
                    </div>
                </div>
              </div>
              <div className="form-group">
                <label>Clinic Name, Location, Timing & Contact Number:</label>
                <textarea name="" rows="3" class="form-control" placeholder="Clinic Name, Location, Timing & Contact Number">Test</textarea>
              </div>
              <div className="form-group">
                <label>Total Appointments : </label>
                <input type="text" class="form-control" name="appointments" id="appointments" placeholder="" value="10" />
              </div>
              <div className="form-group">
                <label for="booking_confirm" class="no-style">Is Strict Full? : <small className=''>(If yes, no extra patients on those days)</small></label>
                <div class="d-flex">
                  <div class="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="booking_confirm_y" name="is_booking_confirm" class="custom-control-input" value="t" />
                    <label class="custom-control-label no-style" for="booking_confirm_y">Yes</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" id="booking_confirm_n" name="is_booking_confirm" class="custom-control-input" value="f" />
                    <label class="custom-control-label no-style" for="booking_confirm_n">No</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Extra Appointment (%) : <small>(Buffer percentage. e.g. 10%)</small></label>
                <input type="text" class="form-control" name="extra_appointments" id="extra_appointments" placeholder="" value="1" />
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


export default CraeteSchedule;