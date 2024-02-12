import { useState } from 'react';

import './PatientProfiles.css'

import Appfooter from './AppFooter';
import ServicesAppTop from './ServicesAppTop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import patientprofile from '../assets/images/profile.png';

function Patientprofiles(){

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  return(
    <>
      <ServicesAppTop></ServicesAppTop>
      <div className="app-body patient-profiles">
        <h5 className="title">Patient Profiles</h5>
        <div className='add-patient'><Link to="/createpatientprofile" className='btn btn-sm btn-primary'>Add Patient</Link></div>
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search a patient' />
            <span class="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='button-box'>
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"#"}>Close Patient</Link></li>
                </ul>
              </div>
              <Link to="#">
                <img src={patientprofile} alt='' />
                <h6>Test Janani</h6>
              </Link>
            </div>
          </div>
          <div className='col-6'>
            <div className='button-box'>
              <div className='three-dot'><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"#"}>Close Patient</Link></li>
                </ul>
              </div>
              <Link to="#">
                <img src={patientprofile} alt='' />
                <h6>Test Janani 2</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default Patientprofiles;