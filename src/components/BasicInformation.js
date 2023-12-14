import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './BasicInformation.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function BasicInformation(){
  return(
    <>
      <AppTop></AppTop>
        <div className="app-body basic-info">
          <h5 className="title">Update Basic Information</h5>
          <p>To update your profile information</p>
          <p style={{textAlign:'right'}}><span className="text-danger">*</span>marks are mandatory</p>
          <form className="" name="" id="">
            <div className="row">
              <div className="col-5">Volunteer ID:</div>
              <div className="col-7">UV2381C6A79B</div>
              <div className="col-5">User ID <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} />:</div>
              <div className="col-7">VOLUNTEERH</div>
            </div>
            <div className="form-group">
              <label>
                Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" name="" id="" value="Volunteer H" />
            </div>
            <div className="form-group">
              <label>
              Mobile Number <span className="text-danger">*</span>
              </label>
              <input type="text" class="form-control" name="" id="" value="9038888991" />
            </div>
            <div className="form-group">
              <label>
              WhatsApp :
              </label>
              <input type="text" class="form-control" name="" id="" value="9038888991" />
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default BasicInformation;