import Appfooter from './AppFooter';
import AppTop from './AppTop';
import './Account.css'
 
import profilephoto from '../assets/images/profile.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faImage, faLock, faCertificate, faAngleRight, faBell, faCamera } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

function Account(){

  return(
    <>
    <AppTop></AppTop>
      <div className='app-body account'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='rounded jumbotron p-4 text-center'>
              <div className='profile-thumb-box'>
                <img src={profilephoto} className='thumb' alt=''/>
                <Link to ="/profilephoto"><FontAwesomeIcon icon={faCamera} color='primary-color' /></Link>
              </div>
              <h5 className='title mb-0'>John Doe</h5>
            </div>
            <ul>
              <li><FontAwesomeIcon icon={faInfoCircle} /> <Link to ="/basicinfo">Update Basic Information</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faImage} /> <Link to ="/profilephoto">Update Profile Photo</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>              
              <li><FontAwesomeIcon icon={faCertificate} /> <Link to ="/uploadcerificate">Upload Certificate</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faBell} /> <Link to ="/settings">Settings</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faLock} /> <Link to ="/changepassword">Change Password</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
            </ul>
          </div>
        </div>
      </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default Account;