import { useState, useContext } from 'react';

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
            <input type="text" className="form-control" name="" id="" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="name">User ID <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="User ID" />
          </div>
          <div className="form-group">
            <label htmlFor="childn_father_name">Name of Father <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="childn_father_name" id="childn_father_name" placeholder="Name of Father" />
          </div>
          <div className="form-group">
            <label htmlFor="child_mother_name">Name of Mother <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="childn_mother_name" id="childn_mother_name" placeholder="Name of Mother" />
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
            <label htmlFor="child_father_occupation">Occupation of Guardian <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_father_occupation" id="child_father_occupation" placeholder="Occupation of Guardian" />
          </div>

          <div className="form-group">
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control">
              <option value="1" selected="">BPL</option>
              <option value="2">APL</option>
            </select>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control">
              <option value="1" selected="">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control">
              <option value="1" selected="">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="" id="" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">WhatsApp No </label>
            <input type="tel" className="form-control" name="" id="" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="" id="" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="" id="" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="" id="" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Village/Town/City" />
          </div>

          <div className="form-group">
            <label htmlFor="child_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="child_state" id="child_state" placeholder="State" />
          </div>

          <div className="form-group">
            <label htmlFor="name">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label><span className="d-block">Servie Area <span className="text-danger">*</span> </span> </label>
            <select className="form-control">
              <option value="1" selected="">Ukhra</option>
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
            <input type="text" className="form-control" name="" id="" placeholder="Special Notes" />
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