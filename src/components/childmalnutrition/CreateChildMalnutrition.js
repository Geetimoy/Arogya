import { useState, useContext } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import './ChildMalnutrition.css';

function CreateChildMalnutrition(){
  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    child_full_name: {required: true, value:"", errorClass:"", errorMessage:""},
    child_user_id: {required: true, value:"", errorClass:"", errorMessage:""},
    child_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    child_mother_name: {required: true, value:"1", errorClass:"", errorMessage:""},
    is_premature_birth: {required: true, value:"", errorClass:"", errorMessage:""},
    child_guardian_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    child_bpl_apl: {required: true, value:"", errorClass:"", errorMessage:""},
    child_gender: {required: true, value:"", errorClass:"", errorMessage:""},
    child_age: {required: false, value:"", errorClass:"", errorMessage:""},
    is_your_personal_mobile_number: {required: true, value:"", errorClass:"", errorMessage:""},
    child_phone_no: {required: true, value:"", errorClass:"", errorMessage:""},
    child_whatsapp_no: {required: false, value:"", errorClass:"", errorMessage:""},
    child_email: {required: true, value:"", errorClass:"", errorMessage:""},
    child_address: {required: true, value:"", errorClass:"", errorMessage:""},
    child_address_2: {required: true, value:"", errorClass:"", errorMessage:""},
    child_landmark: {required: true, value:"", errorClass:"", errorMessage:""},
    child_city: {required: true, value:"", errorClass:"", errorMessage:""},
    child_state: {required: true, value:"", errorClass:"", errorMessage:""},
    child_pincode: {required: true, value:"", errorClass:"", errorMessage:""},
    child_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    child_school_name: {required: true, value:"", errorClass:"", errorMessage:""},
    child_school_class: {required: true, value:"1", errorClass:"", errorMessage:""},
    child_school_section: {required: true, value:"1", errorClass:"", errorMessage:""},
    house_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    drinking_water_type: {required: false, value:"", errorClass:"", errorMessage:""},
    sub_volunteer_name: {required: false, value:"", errorClass:"", errorMessage:""},
    special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
  });

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/child-malnutrition" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Child Malnutrition </h5>
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
      <div className='app-body create-patient-profiles create-child-malnutrition'>
       
        <p><small>Add Child Malnutrition Information</small></p>
        <form className="mt-3" name="" id="">
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_full_name" id="child_full_name" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="name">User ID <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_user_id" id="child_user_id" placeholder="User ID" />
          </div>
          <div className="form-group">
            <label htmlFor="child_father_name">Name of Father <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name=" " id="child_father_name" placeholder="Name of Father" />
          </div>
          <div className="form-group">
            <label htmlFor="child_mother_name">Name of Mother <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_mother_name" id="child_mother_name" placeholder="Name of Mother" />
          </div>

          <div className="form-group">
            <label htmlFor="premature_birth" className='no-style'>Premature Birth? <span className="text-danger">*</span></label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_y" name="is_premature_birth" value="t" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="premature_birth_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_n" name="is_premature_birth" value="f" className="custom-control-input" />
                <label className="custom-control-label no-style" htmlFor="premature_birth_n">No</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="child_guardian_occupation">Occupation of Guardian <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_guardian_occupation" id="child_guardian_occupation" placeholder="Occupation of Guardian" />
          </div>

          <div className="form-group">
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control" id="child_bpl_apl" name="child_bpl_apl">
              <option value="1">BPL</option>
              <option value="2">APL</option>
            </select>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control" id="child_gender" name="child_gender">
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_age" id="child_age" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control" id="is_your_personal_mobile_number" name="is_your_personal_mobile_number">
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="child_phone_no" id="child_phone_no" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">WhatsApp No </label>
            <input type="tel" className="form-control" name="child_whatsapp_no" id="child_whatsapp_no" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="child_email" id="child_email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_address" id="child_address" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="child_address_2" id="child_address_2" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="child_landmark" id="child_landmark" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_city" id="child_city" placeholder="Village/Town/City" />
          </div>

          <div className="form-group">
            <label htmlFor="child_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_state" id="child_state" placeholder="State" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_pincode" id="child_pincode" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label><span className="d-block">Servie Area <span className="text-danger">*</span> </span> </label>
            <select className="form-control" id="child_service_area" name="child_service_area">
              <option value="1">Ukhra</option>
              <option value="2">B2B</option>
            </select>
          </div>

          <div className="sp-notes form-group">
            <label htmlFor="child_school_name">School Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_school_name" id="child_school_name" placeholder="School Name" />
          </div>
          <div className="sp-notes form-group">
            <label htmlFor="child_school_class">Class <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_school_class" id="child_school_class" placeholder="Class" />
          </div>
          <div className="form-group">
            <label htmlFor="child_school_section">Section <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_school_section" id="child_school_section" placeholder="Section" />
          </div>

          <div className="form-group">
            <label htmlFor="house_type">House<span className="text-danger">*</span></label>
            <select className="form-control" name="house_type" id="house_type">
              <option value="1">Mud House</option>
              <option value="2">Paved House</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="drinking_water_type">Drinking Water<span className="text-danger">*</span></label>
            <select className="form-control" name="drinking_water_type" id="drinking_water_type">
              <option value="1">Tap</option>
              <option value="2">Well</option>
              <option value="3">Pond</option>
            </select>
          </div>

          <div class="form-group ">
            <label for="sub_volunteer_name">Sub Volunteer Name</label>
            <select class="form-control" name="sub_volunteer_name" id="sub_volunteer_name">
              <option value="1">Sub Volunteer1</option>
              <option value="2">Sub Volunteer2</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Special Notes </label>
            <input type="text" className="form-control" name="special_notes" id="special_notes" placeholder="Special Notes" />
          </div>
          <div className='mb-3 mt-3'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Create Profile</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateChildMalnutrition;