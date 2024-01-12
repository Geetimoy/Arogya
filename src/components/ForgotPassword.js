import './ForgotPassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
//import serviceplace from "../assets/images/serviceplace-logo.png";
//import footerlogo from "../assets/images/rgvn-logo.png";

import { Link } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import { useContext } from 'react';

function ForgotPassword(){

  const systemContext = useContext(SystemContext);

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Change Password</span>
        </div>
        <div className='login-box change-password'>
          <img src={systemContext.systemDetails.thp_app_logo_url} className="mb-3" alt={systemContext.systemDetails.thp_system_name} />
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
            <p className='text-center'>&copy; 2024 {systemContext.systemDetails.thp_domain_name}. Powered by <Link to={systemContext.systemDetails.thp_main_ngo_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_system_name}</Link></p>

            <div className="text-center login-logo">
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;