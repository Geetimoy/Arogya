import Appfooter from './AppFooter';
import AppTop from './AppTop';

import './ProfilePhoto.css'

import profile from '../assets/images/profile.jpg';
 
 function ProfilePhoto(){

  return(
    <>
      <AppTop></AppTop>
        <div className='app-body profile-photo'>
          <h5 className='title'>Update Profile Photos</h5>
          <p>You can change your existing photo here. Same photo will reflect thorughout the Arogya - Telemedicine Application.</p>
          <form class="edit-user-profile-photo-form" name="edit_user_profile_photo_form" id="edit_user_profile_photo_form">
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <div className='row'>
                    
                    <div className='col-12'>
                      <div className='current-image'>
                        <img src={profile} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <div className='btns-group d-flex justify-content-center'>
                  <button type="button" id="edit_user_photo_form_submit" name="edit_user_photo_form_submit" className="btn btn-primary primary-bg-color border-0 mx-2">Update Photo</button>
                  <button type="button" class="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );

 }

 export default ProfilePhoto;