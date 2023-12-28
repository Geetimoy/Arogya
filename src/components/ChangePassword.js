import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ChangePassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faQuestionCircle, faEye } from '@fortawesome/free-solid-svg-icons';

function ChangePassword() {
  return(
    <>
      <AppTop></AppTop>
      <div className='app-body login-box'>
        <h5 className="title">Change Password</h5>
        <p>You can change your existing password here. Same pasword you have to use to login from telemedicine mobile app.</p>
        <form className="edit-user-profile-password-form" name="" id="">
          <div className="form-group">
            <label>Current Password <span>*</span>:</label>
            <input type="password" className="form-control" name="" id="" placeholder="********" />
            <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
          </div>
          <div className="form-group">
            <label>New Password  <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type="password" className="form-control" name="" id="" placeholder="********" />
            <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
          </div>
          <div className="form-group">
            <label>Confirm Password   <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type="password" className="form-control" name="" id="" placeholder="********" />
            <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="button" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Update Password</button>
            <button type="button" class="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default ChangePassword;