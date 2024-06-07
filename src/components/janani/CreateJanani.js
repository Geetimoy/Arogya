import { useState, useContext } from 'react';

import Appfooter from "../AppFooter";

import './Janani.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

function CreateJanani(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };


  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/janani" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Janani Profile</h5>
          </div>
          <div className='app-top-right d-flex'> 
            <div className='position-relative'>
              <Link to="/notifications">
              <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
              <span className='top-header-notification primary-bg-color'>3</span>
              </Link>
            </div> 
            <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
            <div className='drop-menu'>
                <ul>
                  <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                  {
                    (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                  }
                  <li><Link to={"/contactus"}>Contact Us</Link></li>
                  <li><Link to={"/feedback"}>Feedback</Link></li>
                  <li><Link to={"/help"}>Help</Link></li>
                  <li><Link to={"/logout"}>Logout</Link></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='app-body form-all create-janani'>
        <p><small>Add Janani Informations</small></p>
        <form className="mt-3" name="create_janani_form" id="create_janani_form">
          <div class="form-group ">
            <label for="janani_name">Full Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_name" id="janani_name" placeholder="Full Name" value=""/>
          </div>
          <div class="form-group ">
            <label for="janani_id">Login ID <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_id" id="janani_id" placeholder="Login Id" value=""/>
          </div>
          <div class="form-group ">
            <label class="no-style"><span class="d-block">BPL / APL ?  <span class="text-danger">*</span></span> </label>
            <div class="d-flex">
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="bpl" name="aplbpl" class="custom-control-input" value="" />
                <label class="custom-control-label no-style" for="bpl">Yes</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="apl" name="aplbpl" class="custom-control-input" value="" />
              <label class="custom-control-label no-style" for="apl">No</label>
              </div>
            </div>
          </div>
          <div class="form-group ">
            <label for="janani_age">Age <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_age" id="janani_age" placeholder="Age" value="" />
          </div>
          <div class="form-group ">
            <label class="no-style"><span class="d-block">Is your personal mobile number? <span class="text-danger">*</span></span> </label>
            <div class="d-flex">
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" class="custom-control-input" value="t" />
                <label class="custom-control-label no-style" for="personal_mobile_number_y">Yes</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" class="custom-control-input" value="f" />
                <label class="custom-control-label no-style" for="personal_mobile_number_n">No</label>
              </div>
            </div>
          </div>
          <div class="form-group ">
            <label for="janani_contact_number">Phone No <span class="text-danger">*</span></label>
            <input type="tel" class="form-control" name="janani_contact_number" id="janani_contact_number" placeholder="Phone No" value="" />
          </div>
          <div class="form-group ">
            <label for="whatsapp">WhatsApp No </label>
            <input type="tel" class="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" value="" />
          </div>
          <div class="form-group ">
            <label for="janani_email_id">Email </label>
            <input type="text" class="form-control" name="janani_email_id" id="janani_email_id" placeholder="Email" value="" />
          </div>
          <div class="form-group ">
            <label for="janani_address">Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_address" id="janani_address" placeholder="Address" value="" />
          </div>
          <div class="form-group ">
            <label for="janani_address_2">Address 2 </label>
            <input type="text" class="form-control" name="janani_address_2" id="janani_address_2" placeholder="Address 2" value="" />
          </div>
          <div class="form-group ">
            <label for="janani_landmark">Landmark <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_landmark" id="janani_landmark" placeholder="Landmark" value="" />
          </div>
          <div class="form-group ">
            <label for="janani_postal_code">Pincode <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="janani_postal_code" id="janani_postal_code" placeholder="Pincode" value="" />
          </div>
          <div class="form-group ">
            <label for="special_note">Special Notes </label>
            <input type="text" class="form-control" name="special_note" id="special_note" placeholder="Special Notes" value="" />
          </div>
          <div class="mb-3 mt-3 text-center">
            <button type="submit" class="btn primary-bg-color text-light">Create Janani Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateJanani;