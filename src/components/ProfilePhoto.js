import Appfooter from './AppFooter';
import AppTop from './AppTop';

import './ProfilePhoto.css'
 
 function ProfilePhoto(){

  return(
    <>
      <AppTop></AppTop>
        <div className='app-body'>
          <h5 className='title'>Update Profile Photo</h5>
          <p>You can change your existing photo here. Same photo will reflect thorughout the Arogya - Telemedicine Application.</p>
          <form class="edit-user-profile-photo-form" name="edit_user_profile_photo_form" id="edit_user_profile_photo_form">
            <div className='row'>
              <div className='col-12'>
                <div className='mt-3 my-3'><strong>Crop Image goes here...</strong></div>
                <p>This profile picture will be used for all futher references.
                  Upload your personal image by clicking upload button and customize it by dragging the left photo.
                </p> 
                <label for="file-upload" className='custom-file-upload'>
                  Upload / Replace
                </label>
                
                <input id="file-upload" type="file"></input>
                
                <div className='btns-group d-flex justify-content-center'>
                  <button type="button" id="edit_user_photo_form_submit" name="edit_user_photo_form_submit" className="btn btn-primary bg-danger border-0 mx-2">Update Photo</button>
                  <button type="button" class="btn btn-primary bg-danger border-0 mx-2">Cancel</button>
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