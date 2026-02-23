import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { Link, useParams } from "react-router-dom";


import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import AppTopNotifications from '../AppTopNotifications';

function YoungWomanGrowthTracker() {
  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

    const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

    const [urlParam, setUrlParam] = useState(useParams());

  const redirectedFrom    = urlParam.redirectedFrom;

  return (
    <>
    <div className='app-top inner-app-top services-app-top'>
            <div className='app-top-box d-flex align-items-center justify-content-between'>
              <div className='app-top-left d-flex align-items-center'>
                <div className='scroll-back'>
                  {
                    (redirectedFrom === 'from-listing') && <Link to="/youngwomens" className=''>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} />
                    </Link>
                  }
                  {
                    (redirectedFrom === 'from-bookings') && <Link to="/doctor-appointments" className=''>
                      <FontAwesomeIcon icon={faLongArrowAltLeft} />
                    </Link>
                  }
                </div>
                 <h5 className='mx-2 mb-0'>Health Data </h5> 
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
    <div className="app-body young-womens profile-listing">
      <h4><strong>Woman 5</strong></h4>
      <div className='align-items-center d-flex justify-content-between'>
        <p className='mb-0'><small>Updated on </small></p>
            <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0'>Add Health Details</Link>
      </div>
      <table className='border-0 table mt-3'>
        <thead>
              <tr>
                <th>Meas.</th> 
                <th>Youngwomen Info.</th>
                <th>WHO Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weight</td>
                <td>12</td>
                <td><span> Kg</span> </td> 
              </tr>
              <tr>
                <td>Height</td>
                <td>112</td>
                <td><span> cm</span> </td> 
              </tr>
              <tr>
                <td>BMI</td>
                <td>13.89</td>
                <td><span> </span> </td> 
              </tr>
            </tbody>
      </table>
      <Link to='#' className='btn btn-sm btn-primary primary-bg-color border-0 w-100'>View Health Chart</Link>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}


export default YoungWomanGrowthTracker;