import { useState, useContext } from 'react';

import './PatientProfiles.css'

import Appfooter from '../AppFooter';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import patientprofile from '../../assets/images/profile.png';

import SystemContext from "../../context/system/SystemContext";

import {Modal, Button} from 'react-bootstrap'; 

import general from '../../assets/images/therapis.png';
import childmalnutrition from '../../assets/images/child-malnutrition.png';
import women from '../../assets/images/prenatal-care.png';
import dentalcare from '../../assets/images/floss.png';
import skinhair from '../../assets/images/skin-care.png';
import more from '../../assets/images/stethoscope.png';

function Patientprofiles(){

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [showModal, setShowModal] = useState(false); 
  const modalClose  = () => setShowModal(false);  
  const modalShow   = () => setShowModal(true);

  const [showSearchModal, setShowSearchModal] = useState(false); 
  const modalCloseSearch  = () => setShowSearchModal(false);  
  const modalShowSearch   = () => setShowSearchModal(true);

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
            <h5 className='mx-2 mb-0'>Patient Profiles </h5>
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
      <div className="app-body patient-profiles profile-listing">
        <div className='add-patient'><Link to="/patientprofiles/createpatientprofile" className='btn btn-sm btn-primary primary-bg-color border-0'>Add Patient</Link></div>
        <div className="d-flex justify-content-between mb-3 mt-3">
        <Link onClick={() => { modalShowSearch(); }} to="#">
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
        <div className='search-patient mt-3 mb-3'>
          <div className='input-group'>
            <input type="text" className='form-control' placeholder='Search a patient' />
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='button-box'>
              <div className={`three-dot my-element2 ${isActive ? 'active' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"/patient-basicinfo"}>Edit Basic Information</Link></li>
                  <li><Link to={"/patientprofiles/patient-medical-history"}>Update Medical History</Link></li>
                  <li><Link to={"/patientprofiles/patient-prescription"}>Upload Prescription</Link></li>
                  <li><Link to={"/patientprofiles/patient-test-reports"}>Upload Test Reports</Link></li>
                  <li><Link to={"/patientprofiles/patient-booking"}>Book Now</Link></li>
                  <li><Link onClick={() => { modalShow(); }} to="#">Close Patient</Link></li>
                </ul>
              </div>
              <Link to="#">
                <img src={patientprofile} alt='' />
                <h6>Patient 1</h6>
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
              <Link to="/viewpatientdetails">
                <img src={patientprofile} alt='' />
                <h6>Patient 2</h6>
              </Link>
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={modalClose}>
          <Modal.Body>  
            <p>Are you sure you want to close this profile?</p> 
            <textarea rows="3" name="remarks" id="remarks" className="form-control" placeholder="Describe / Explain Problems" ></textarea>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalClose}>Cancel</Button>  
            <Button variant="primary" className='btn primary-bg-color text-light min-width-100 border-0'>Confirm to Close</Button>  
          </Modal.Footer>  
        </Modal>

        <Modal show={showSearchModal} onHide={modalCloseSearch}>
          <Modal.Header>  
            <h3 className='mb-0'>Advanced Search</h3>
          </Modal.Header>  
          <Modal.Body> 
            <p className='mb-0'><strong>Find a Doctor as a</strong></p> 
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
                <p className='mb-0'>more</p> 
              </div>
            </div>
          </Modal.Body>  
          <Modal.Footer className='justify-content-center'> 
            <Button variant="primary" className='btn primary-bg-color text-light border-0 min-width-100'>Search</Button>  
            <Button variant="secondary" className='btn primary-bg-color text-light min-width-100 border-0' onClick={modalCloseSearch}>Close</Button>  
          </Modal.Footer>  
        </Modal>
      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default Patientprofiles;