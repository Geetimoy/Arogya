import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import  './ElderPersons.css';
import Select from 'react-select';

function CreateElderPerson(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);
  
  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const serviceAreaOption = [
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ];

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/elder-persons" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Elder Person Profile</h5>
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
      <div className='app-body form-all create-elder-person'>
        <p><small>Add Elder Person Informations</small></p>
        <form className="mt-3 select-box" name="elder_person_form" id="elder_person_form">
          <div className="form-group">
            <label htmlFor="elder_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_name" id="elder_name" placeholder="Full Name" value="" />
          </div>
          <div className="form-group">
            <label htmlFor="woman_father_name">Name of Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control"  name="elder_guardian_name" id="elder_guardian_name" value="" placeholder="Name of Guardian" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_occupation">Occupation <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_occupation" id="elder_occupation" placeholder="Occupation" />
          </div>
          <div className="form-group">
            <label><span className="d-block">Gender  </span></label>
            <select className="form-control" value="" name="gender" id="gender">
              <option value="0">Select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="elder_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_age" id="elder_age" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="elder_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" value="" name="elder_contact_number" id="elder_contact_number" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_email_id">Email </label>
            <input type="text" className="form-control" value="" name="elder_email_id" id="elder_email_id" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_address" id="elder_address" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_address_2">Address 2 </label>
            <input type="text" className="form-control" value="" name="elder_address_2" id="elder_address_2" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_landmark" id="elder_landmark" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_city" id="elder_city" placeholder="Village/Town/City" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_state" id="elder_state" placeholder="State" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_postal_code" id="elder_postal_code" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions}
         options={serviceAreaOption} />
          </div>
          <div className="form-group">
            <label htmlFor="elder_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_education" id="elder_education" placeholder="Education" />
          </div>
          <div className="form-group ">
            <label htmlFor="sub_volunteer_name">Sub Volunteer Name</label>
            <select className="form-control" name="sub_volunteer_name" id="sub_volunteer_name">
              <option value="1">Sub Volunteer1</option>
              <option value="2">Sub Volunteer2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" value="" name="special_note" id="special_note" placeholder="Special Notes" />
          </div>

          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Create Elder Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateElderPerson;