import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import AppTopNotifications from '../AppTopNotifications';


function GrowthTracker() {

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);
  

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return (
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/doctor-appointments" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
             <h5 className='mx-2 mb-0'>Growth Tracker </h5> 
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
         <div className='align-items-center d-flex justify-content-between'>
            <p className='mb-0'><small>Updated on 7th Dec. 2025</small></p>
            <Link to={`/childmalnutrition/child-view-periodic-data/`} className='btn btn-sm btn-primary primary-bg-color border-0'>Add Growth Details</Link>
          </div>
          <table className='border-0 table mt-3'>
            <thead>
              <tr>
                <th>Meas.</th> 
                <th>Childs Info.</th>
                <th>WHO Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weight</td>
                <td>14.8</td>
                <td>13.1 - 21.3 Kg <Link to={'/childmalnutrition/past-meas-weight'} className='primary-color'>(History)</Link></td> 
              </tr> 
              <tr>
                <td>Height</td>
                <td>76</td>
                <td>80-90 Cm <Link to={'/childmalnutrition/past-meas-height'} className='primary-color'>(History)</Link></td> 
              </tr>
            </tbody>
          </table>
          <Link to='' className='btn btn-sm btn-primary primary-bg-color border-0 w-100'>View Growth Chart</Link>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default GrowthTracker;