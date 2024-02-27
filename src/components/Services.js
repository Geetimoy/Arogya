import Appfooter from './AppFooter';
import AppTop from './AppTop';

import './Services.css'

import { Link } from "react-router-dom";

import patientprofile from '../assets/images/icon-patient-profile.png';
import janani from '../assets/images/icon-janani.png';
import appointmentscheduling from '../assets/images/icon-appointment-scheduling.png';
import requestsupply from '../assets/images/icon-request-supply.png';
import rxpharmacy from '../assets/images/icon-rx-pharmacy.png';
import uploadrx from '../assets/images/icon-upload-rx.png';
import uploadsupply from '../assets/images/icon-upload-supply.png';
import youngwoman from '../assets/images/woman.png';
import malnutrition from '../assets/images/malnutrition.png';
import testreport from '../assets/images/icon-upload-test-report.png';

function Services(){


  return(
    <>
      <AppTop></AppTop>
        <div className='app-body services'>
          <div className='row'>
            {/* <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><FontAwesomeIcon icon={faCalendarCheck} className='primary-color' />
                <h6>View/Accept Appointments</h6></Link>
              </div>
            </div> */}
            {/* <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><FontAwesomeIcon icon={faCalendarAlt} className='primary-color' />
                <h6>Set Schedule</h6></Link>
              </div>
            </div> */}
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/patientprofiles">
                <img src={patientprofile} alt='' />
                <h6>Patient Profiles</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={malnutrition} alt='' />
                <h6>Child Malnutrition</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={youngwoman} alt='' />
                <h6>Young Womens (11yrs to 18yrs)</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments">
                <img src={janani} alt='' />
                <h6>Janani</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/bookings"><img src={appointmentscheduling} alt='' />
                <h6>Appointment Scheduling</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={uploadrx} alt='' />
                <h6>Upload Rx</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/testreports"><img src={testreport} alt='' />
                <h6>Upload Test Report</h6></Link>
              </div>
            </div>
           
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={rxpharmacy} alt='' />
                <h6>Rx :: Pharmacy</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={requestsupply} alt='' />
                <h6>Request Supply</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box'>
                <Link to="/viewappointments"><img src={uploadsupply} alt='' />
                <h6>Upload Supply Dispensing</h6></Link>
              </div>
            </div>
            
           
          </div>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default Services;