import { useState, useContext } from 'react';

import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import Dropdown from 'react-dropdown-select';

import './YoungWomanBasicInformation.css'


function YoungWomanBasicInformation(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    userType: {required: true, value:"", errorClass:"", errorMessage:""},
    userName: {required: true, value:"", errorClass:"", errorMessage:""},
    userId: {required: true, value:"", errorClass:"", errorMessage:""},
    userContactNumber: {required: true, value:"", errorClass:"", errorMessage:""},
    userEmail: {required: true, value:"", errorClass:"", errorMessage:""},
    userPassword: {required: true, value:"", errorClass:"", errorMessage:""},
    userServiceArea: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const options = [
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ];

  // Define the selectedOptions state and the corresponding setter function
  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleChange1 = (values) => {
    //console.log(values);
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/youngwomens" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Update Young Women Basic Info </h5>
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
      <div className='app-body form-all basicinfo-young-woman'>
        <p><small>To update your profile information</small></p>
        <form class="mt-3" name="young_women_form" id="young_women_form">
          <div class="form-group">
            <label for="woman_name">Full Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_name" id="woman_name" placeholder="Full Name" value="" />
          </div>
          <div class="form-group">
            <label for="woman_father_name">Name of Parent/Guardian<span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_father_name" id="woman_father_name" placeholder="Name of Parent/Guardian" value="" />
          </div>
          <div class="form-group">
            <label for="premature_birth" class="no-style">Premature Birth? <span class="text-danger">*</span></label>
            <div class="d-flex">
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_y" name="is_premature_birth" class="custom-control-input" value="t" /><label class="custom-control-label no-style" for="premature_birth_y">Yes</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_n" name="is_premature_birth" class="custom-control-input" value="f" /><label class="custom-control-label no-style" for="premature_birth_n">No</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="woman_father_occupation">Occupation of Guardian <span class="text-danger">*</span></label><input type="text" class="form-control" name="woman_father_occupation" id="woman_father_occupation" placeholder="Occupation of Guardian" value="" />
          </div>
          <div class="form-group">
            <label><span class="d-block">Gender  </span></label>
            <select class="form-control" name="gender" id="gender">
              <option value="1">Female</option>
            </select>
          </div>
          <div class="form-group ">
            <label for="woman_contact_number">Phone No <span class="text-danger">*</span></label>
            <input type="tel" class="form-control" name="woman_contact_number" id="woman_contact_number" placeholder="Phone No" value="" />
          </div>
          <div class="form-group ">
            <label for="whatsapp">WhatsApp No </label>
            <input type="tel" class="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_email_id">Email </label>
            <input type="text" class="form-control" name="woman_email_id" id="woman_email_id" placeholder="Email" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_address">Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_address" id="woman_address" placeholder="Address" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_address_2">Address 2 </label>
            <input type="text" class="form-control" name="woman_address_2" id="woman_address_2" placeholder="Address 2" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_landmark">Landmark <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_landmark" id="woman_landmark" placeholder="Landmark" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_city">Village/Town/City <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_city" id="woman_city" placeholder="Village/Town/City" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_state">State <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_state" id="woman_state" placeholder="State" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_postal_code">Pincode <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_postal_code" id="woman_postal_code" placeholder="Pincode" value="" />
          </div>

          <div className="form-group">
            <label>Service Area <span className='text-danger'> *</span></label>
            
            <Dropdown className='form-control select-multi' multi options={options} values={selectedOptions} onChange={handleChange1} />
          </div>
          

          <div class="form-group ">
            <label for="woman_education">Education <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_education" id="woman_education" placeholder="Education" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_school_name">School Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_school_name" id="woman_school_name" placeholder="School Name" value="" />
          </div>

          <div class="form-group ">
            <label for="woman_school_class">Class <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_school_class" id="woman_school_class" placeholder="Class" value="" />
          </div>
          <div class="form-group ">
            <label for="woman_school_section">Section <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="woman_school_section" id="woman_school_section" placeholder="Section" value="" />
          </div>
          <div class="form-group ">
            <label for="house_type">House<span class="text-danger">*</span></label>
            <select class="form-control" name="house_type" id="house_type">
              <option value="1">Mud House</option>
              <option value="2">Paved House</option>
            </select>
          </div>
          <div class="form-group ">
            <label for="drinking_water_type">Drinking Water<span class="text-danger">*</span></label>
            <select class="form-control" name="drinking_water_type" id="drinking_water_type">
              <option value="1">Tap</option>
              <option value="2">Well</option>
              <option value="3">Pond</option>
            </select>
          </div>
          <div class="form-group ">
            <label for="toilet_type">Toilet<span class="text-danger">*</span></label>
            <select class="form-control" name="toilet_type" id="toilet_type">
              <option value="1">Open-field</option>
              <option value="2">Country-latrine</option>
              <option value="3">Flush-toilet</option>
            </select>
          </div>
          <div class="form-group ">
            <label for="special_note">Special Notes </label>
            <input type="text" class="form-control" name="special_note" id="special_note" placeholder="Special Notes" value="" />
          </div>
          <div class="mb-3 mt-3 text-center">
            <button type="submit" class="btn primary-bg-color text-light">Update</button></div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}

export default YoungWomanBasicInformation;