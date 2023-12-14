import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ChangePassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function ChangePassword() {
  return(
    <>
      <AppTop></AppTop>
      <div className='app-body'>
        <h5 className="title">Change Password</h5>
        <p>You can change your existing password here. Same pasword you have to use to login from telemedicine mobile app.</p>
        <form className="edit-user-profile-password-form" name="edit_user_profile_password_form" id="edit_user_profile_password_form">
          <div className="form-group">
            <label>Current Password <span>*</span>:</label>
            <input type="password" className="form-control" name="edit_user_profile_password_current" id="edit_user_profile_password_current" value="" />
          </div>
          <div className="form-group">
            <label>New Password  <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type="password" className="form-control" name="edit_user_profile_password_new" id="edit_user_profile_password_new" value="" />
            
          </div>
          <div className="form-group">
            <label>Confirm Password   <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type="password" className="form-control" name="edit_user_profile_password_confirm" id="edit_user_profile_password_confirm" value="" />
            
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="button" id="" name="" className="btn btn-primary bg-danger border-0 mx-2">Update Password</button>
            <button type="button" class="btn btn-primary bg-danger border-0 mx-2">Cancel</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default ChangePassword;