import { useState } from 'react';

import logo from '../logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisV, faUser, faBars, faLongArrowAltLeft, faUsers, faFemale, faChild, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function AppTop(){

  const [isActive, setIsActive] = useState(false);

  const [isMActive, setIsMActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <div className='app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className={`my-element ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className='left-scroll-menu'>
            <div className='d-flex'>
              <div className='scroll-back' onClick={handleClick}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </div>
              <h5 className='mb-0 mx-3'>Hello Volunteer!</h5>
            </div>
            <ul>
              <li className='mm-active'><FontAwesomeIcon icon={faUser} /> <Link to={"./myprofile"}>My Profile</Link></li>
              <li><FontAwesomeIcon icon={faUsers} /> <Link to={"./patientprofile"}>Patient Profiles</Link></li>
              <li><FontAwesomeIcon icon={faFemale} /> <Link to={"./janani"}>Janani</Link></li>
              <li><FontAwesomeIcon icon={faChild} /> <Link to={"./childmalnutrition"}>Child Malnutrition</Link></li>
              <li><FontAwesomeIcon icon={faCalendarAlt} /> <Link to={"./apointments"}>Appointments</Link></li>
            </ul>
          </div>
          <img src={logo} alt='' style={{height:'40px'}} className='mx-2' />
          <h5 className='mx-2 mb-0'>Arogya </h5>
        </div>
        <div className='app-top-right d-flex'> 
          <div className='position-relative'>
            <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
            <span className='top-header-notification'>3</span>
          </div> 
          <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
          <div className='drop-menu'>
              <ul>
                <li><Link to={"customer-support"}>Customer Support</Link></li>
                <li><Link to={"contactus"}>Contact Us</Link></li>
                <li><Link to={"offers"}>Offers</Link></li>
                <li><Link to={"logout"}>Logout</Link></li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AppTop;