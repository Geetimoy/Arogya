import Appfooter from './AppFooter';
import AppTop from './AppTop';
import './Person.css'
 
import profilephoto from '../assets/images/profile.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faImage, faLock, faCertificate, faAngleRight, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

function Person(){

  return(
    <>
    <AppTop></AppTop>
      <div className='app-body person'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='rounded jumbotron p-4 text-center'>
              <img src={profilephoto} className='thumb' alt=''/>
              <h5 className='title mb-0'>John Doe</h5>
            </div>
            <ul>
              <li><FontAwesomeIcon icon={faInfoCircle} /> <Link to ="/basicinfo">Update Basic Information</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faImage} /> <Link to ="/profilephoto">Update Profile Photo</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>              
              <li><FontAwesomeIcon icon={faCertificate} /> <Link to ="/uploadcerificate">Upload Certificate</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faBell} /> <Link to ="/notifications">Notifications</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
              <li><FontAwesomeIcon icon={faLock} /> <Link to ="/changepassword">Change Password</Link> <FontAwesomeIcon icon={faAngleRight} className='ms-auto' /></li>
            </ul>
          </div>
        </div>
      </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default Person;