import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './Settings.css';

function Settings(){
  return(
    <>
      <AppTop></AppTop>
      <div className="app-body settings">
          <h5 className='title brdr-btm'>Notifications</h5>
          <div className="mb-4">
            <div class="form-check form-switch px-0 mb-2">
              <input class="form-check-input float-end" type="checkbox" id="sms" name="darkmode" value="yes" />
              <label class="form-check-label" for="sms"><strong>SMS</strong></label>
            </div>
            <div class="form-check form-switch px-0 mb-2">
              <input class="form-check-input float-end" type="checkbox" id="email" name="darkmode" value="yes" />
              <label class="form-check-label" for="email"><strong>Email</strong></label>
            </div>
            <div class="form-check form-switch px-0 mb-2">
              <input class="form-check-input float-end" type="checkbox" id="push" name="darkmode" value="yes" />
              <label class="form-check-label" for="push"><strong>Push</strong></label>
            </div>
            <div class="form-check form-switch px-0 mb-2">
              <input class="form-check-input float-end" type="checkbox" id="call" name="darkmode" value="yes" />
              <label class="form-check-label" for="call"><strong>Call</strong></label>
            </div>
          </div>

          <h5 className='title brdr-btm'>Another Category</h5>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default Settings;