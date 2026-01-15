import { useState, useContext } from 'react';
import Appfooter from "../AppFooter";

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import AppTopNotifications from '../AppTopNotifications';

function GrowthDetails() {

  const systemContext = useContext(SystemContext);
  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  }
  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
              <div className='app-top-box d-flex align-items-center justify-content-between'>
                <div className='app-top-left d-flex align-items-center'>
                  <div className='scroll-back'>
                    <Link to="/doctor-appointments" className=''>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} />
                    </Link>
                  </div>
                   <h5 className='mx-2 mb-0'>Growth Details </h5> 
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
      <div className='app-body create-patient-profiles create-child-malnutrition'>
        <div className='d-flex'>
          <p className='mb-0'><small>Add Growth Details</small></p>
        </div>
        <form>
          <div className='form-group'>
            <label>Measurement Date</label>
            <input type="date" className='form-control' />
          </div>
          <div className='form-group'>
            <label>Height (in cm)</label>
            <input type="text" className='form-control' placeholder='Enter Height in cm' />
          </div>
          <div className='form-group'>
            <label>Weight (in kg)</label>
            <input type="text" className='form-control' placeholder='Enter Weight in kg' />
          </div>
          <div className='form-group'>
            <label>Body Temperature (in Fahrenheit)</label>
            <input type="text" className='form-control' placeholder='Enter Body Temperature in °F' />
          </div>
          <div className='form-group'>
            <label>Blood Oxygen Level SpO2</label>
            <input type="text" className='form-control' placeholder='Enter Blood Oxygen Level in %' />
          </div>
          <div className='form-group'>
            <label>Heart Rate (per minute)</label>
            <input type="text" className='form-control' placeholder='Enter Heart Rate per Minute' />
          </div>
          <div className='form-group'>
            <label>Mid Arm length</label>
            <input type="text" className='form-control' placeholder='Enter Mid Arm length' />
          </div>
          <div className='form-group'>
            <label>Blood Pressure</label>
            <input type="text" className='form-control' placeholder='Enter Blood Pressure' />
          </div>
          <div className='form-group'>
            <label>Are you Diabetic?  </label>
            <input type="text" className='form-control' placeholder='Enter Sugar Level' />
          </div>
          <div className='form-group mt-4 d-flex justify-content-center align-items-center'>
            <button type="submit" className='btn primary-bg-color text-light min-width-100 mx-2'>Save Details</button>
            <button type="submit" className='btn primary-bg-color text-light min-width-100 mx-2'>Cancel</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default GrowthDetails;