import { useState } from 'react';

import Appfooter from './AppFooter';
import AppTop from './AppTop';
import CryptoJS from "crypto-js";

import './Services.css'

import { Link } from "react-router-dom";
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from './util/Constants';
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
import elder from '../assets/images/grandparents.png'

function Services(){

  var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

  const [accountType, setAccountType] = useState(3);
  const restrictedAccountTypes = [3, 31, 32, 33];
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
            {
                  (decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'><Link to="/appointment-scheduling"><img src={appointmentscheduling} alt='' /><h6>Appointment Scheduling</h6></Link></div></div>
            }
            {
                  (decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'><Link to="/doctor-appointments"><img src={testreport} alt='' /><h6>My Bookings</h6></Link></div></div>
                }


            {
                  (decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'><Link to="/upload-prescription"><img src={uploadrx} alt='' />
                <h6>View/Upload Rx</h6></Link></div></div>
                }

            {
                  (decryptedLoginDetails.account_type == 5) &&  <div className='col-6'>
                <div className='button-box'><Link to="/upload-prescription"><img src={uploadrx} alt='' />
                <h6>View/Upload Reports</h6></Link></div></div>
                }
            

            {
              (decryptedLoginDetails.account_type == 4 || decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'>
                  <Link to="/patientprofiles">
                  <img src={patientprofile} alt='' />
                  <h6>Patient Profiles</h6></Link>
                </div>
              </div>
            }
            {
              (decryptedLoginDetails.account_type == 4 || decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'>
                  <Link to="/child-malnutrition"><img src={malnutrition} alt='' />
                  <h6>Child Malnutrition</h6></Link>
                </div>
              </div>
            }
            {
              (decryptedLoginDetails.account_type == 4 || decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'>
                  <Link to="/youngwomens"><img src={youngwoman} alt='' />
                  <h6>Young Women's (11yrs to 18yrs)</h6></Link>
                </div>
              </div>
            }
            {
              (decryptedLoginDetails.account_type == 4 || decryptedLoginDetails.account_type == 5) && <div className='col-6'>
                <div className='button-box'>
                  <Link to="/janani">
                  <img src={janani} alt='' />
                  <h6>Janani</h6></Link>
                </div>
              </div>
            }

<div className='col-6'>
              <div className='button-box'>
                <Link to="/elder-persons"><img src={elder} alt='' />
                <h6>Elder Persons (Age&gt;60yrs)</h6></Link>
              </div>
            </div>
            

                {
                  (decryptedLoginDetails.account_type == 4 || decryptedLoginDetails.account_type == 3 || decryptedLoginDetails.account_type == 31 || decryptedLoginDetails.account_type == 32 || decryptedLoginDetails.account_type == 33) && <div className='col-6'>
              <div className='button-box'><Link to="/appointment-scheduling-volunteer"><img src={appointmentscheduling} alt='' /><h6>Doctor Schedules</h6></Link></div>
              </div>
                }
            
                {
                  (decryptedLoginDetails.account_type == 3 || decryptedLoginDetails.account_type == 31 || decryptedLoginDetails.account_type == 32 || decryptedLoginDetails.account_type == 33) && 
                  <div className='col-6'>
              <div className='button-box'>
                <Link to="/doctor-appointments"><img src={testreport} alt='' /><h6>My Doctor Appointments</h6></Link>
                </div></div>
                }
                {
                  (decryptedLoginDetails.account_type == 4) && <div className='col-6'>
              <div className='button-box'><Link to="/doctor-appointments-volunteer"><img src={testreport} alt='' /><h6>Patient & Doctor Appointments</h6></Link></div></div>
                }
            
                
                {
                  (decryptedLoginDetails.account_type == 3 || decryptedLoginDetails.account_type == 31 || decryptedLoginDetails.account_type == 32 || decryptedLoginDetails.account_type == 33 || decryptedLoginDetails.account_type == 4) && <div className='col-6'>
              <div className='button-box'><Link to="/upload-prescription"><img src={uploadrx} alt='' />
                <h6>Upload Rx</h6></Link></div>
                </div>
                }

                
                {
                  (decryptedLoginDetails.account_type == 3 || decryptedLoginDetails.account_type == 31 || decryptedLoginDetails.account_type == 32 || decryptedLoginDetails.account_type == 33 || decryptedLoginDetails.account_type == 4) && <div className='col-6'>
              <div className='button-box'><Link to="/upload-test-report"><img src={testreport} alt='' />
                <h6>Upload Test Reports</h6></Link></div>
                </div>
                }
                
            {/* <div className='col-6'>
              <div className='button-box'>
                <Link to="/elder-persons"><img src={elder} alt='' />
                <h6>Elder Persons (Age&gt;60yrs)</h6></Link>
              </div>
            </div> */}
            <div className='col-6'>
              <div className='button-box disable'>
                <Link to="/viewappointments"><img src={rxpharmacy} alt='' />
                <h6>Rx :: Pharmacy</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box disable'>
                <Link to="/viewappointments"><img src={requestsupply} alt='' />
                <h6>Request Supply</h6></Link>
              </div>
            </div>
            <div className='col-6'>
              <div className='button-box disable'>
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