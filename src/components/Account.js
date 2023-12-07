
import Appfooter from './AppFooter';
import AppTop from './AppTop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faImage, faLock, faCertificate } from '@fortawesome/free-solid-svg-icons';

import './Account.css'

import { Link } from "react-router-dom";

function Account(){
  return(
    <>
    <AppTop></AppTop>
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-6'>
          <div className='button-box'>
            <Link to="/basicinfo"><FontAwesomeIcon icon={faInfoCircle} />
            <h6>Update Basic Information</h6></Link>
          </div>
        </div>
        <div className='col-6'>
          <div className='button-box'>
            <Link to="/profilephoto">
              <FontAwesomeIcon icon={faImage} />
              <h6>Update Profile Photo</h6>
            </Link>
          </div>
        </div>
        <div className='col-6'>
          <div className='button-box'>
            <Link to="/changepassword">
              <FontAwesomeIcon icon={faLock} />
              <h6>Change Password</h6>
            </Link>
          </div>
        </div>
        <div className='col-6'>
          <div className='button-box'>
            <Link to="/uploadcerificate">
              <FontAwesomeIcon icon={faCertificate} />
              <h6>Upload Certificates</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default Account;