import Appfooter from './AppFooter';
import AppTop from './AppTop';
import './Notifications.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

function Notifications(){

  return(
    
    <>
      <AppTop></AppTop>
      <div className='app-body notifications'>
        <div className='rounded jumbotron p-4 text-center'>
          <div className='notification-category d-flex justify-content-between'>
            <div>
              <span className='otp green'>***</span>
              OTP
            </div>
            <div>
              <span className='otp red'><FontAwesomeIcon icon={faUserMd} /></span>
              Appointments
            </div>
            <div>
              <span className='otp black'><FontAwesomeIcon icon={faEnvelopeOpen} /></span>
              Others
            </div>
          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
    
  );
}

export default Notifications;