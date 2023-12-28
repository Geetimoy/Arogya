import './ForgotPassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEye } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function ForgotPassword(){

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Change Password</span>
        </div>
        <div className='login-box change-password'>
          <h5 className='title'>Update Your Password</h5>
          <p>Enter the new Password</p>
          <form>
            <div className='form-group'>
              <label htmlFor='new_password'>New Password</label>
              <input type="password" name="" id="new_password" className='form-control' placeholder="MyPass#13" />
              <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
              
            </div>
            <div className='form-group'>
              <label htmlFor='confirm_password'>Confirm Password</label>
              <input type="password" name="" id="confirm_password" className='form-control' placeholder="MyPass#13" />
              <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
              
            </div>
            <div className='btn primary-bg-color mb-3 mt-3 w-100'><Link to ="/login" className='m-auto text-light text-decoration-none d-block'>CHANGE PASSWORD</Link></div>
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