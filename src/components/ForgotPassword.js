import './ForgotPassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
import serviceplace from "../assets/images/serviceplace-logo.png";
import footerlogo from "../assets/images/rgvn-logo.png";

import { Link } from "react-router-dom";

function ForgotPassword(){

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Change Password</span>
        </div>
        <div className='login-box change-password'>
          <img src={logotelehealth} className="mb-3" alt="logo" />
          <h5 className='title'>Reset Password</h5>
          <p>Enter your User ID and an OTP will be sent to your registered Email ID & Mobile Number </p>
          <form>
            <div className='form-group'>
              <label htmlFor='user_id'>User ID</label>
              <input type="text" name="" id="user_id" className='form-control' placeholder="Enter user id" />
            </div>
            <div className='btn primary-bg-color mb-3 mt-3 w-100'><Link to ="/login" className='m-auto text-light text-decoration-none d-block'>Submit</Link></div>
            <p className='mb-4'>I remember my password! Back me to <Link to="/login" className="primary-color">login</Link> page </p>
            <p className="text-center link-red mb-3">
              Don't have an account yet? 
              <Link to="/signup" className="primary-color mx-1">
                Sign Up
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Having Trouble? 
              <Link to="/contactadmin" className="primary-color mx-1">
                Contact Admin
              </Link>
            </p>
            <p className='text-center'>&copy; 2024 rgvn.org. Powered by <Link to="https://www.serviceplace.org/" target="_blank" className="primary-color">ServicePlace.Org</Link></p>

            <div className="text-center login-logo">
              <img
                src={footerlogo}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
              <img
                src={serviceplace}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
            </div>
          </form>
          <div className='back-to-login'>
              <Link to="/login" className='primary-color'>BACK TO LOGIN</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;