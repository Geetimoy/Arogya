import { useState, useContext } from 'react';
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import Select from 'react-select';


function PatientViewBasicInformation(){

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
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'> View Patient Basic Info </h5>
            
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
      <div className='app-body create-patient-profiles'>
        <p><small>To view profile information</small></p>
        <form className="mt-3" name="patient_form" id="patient_form">
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_name" id="patient_name" placeholder="Full Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Father's Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_father_name" id="patient_father_name" placeholder="Father's Name"/>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="patient_is_bpl" id="patient_is_bpl"> 
              <option value="t">BPL</option>
              <option value="f">APL</option>
            </select>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control" name="patient_gender" id="patient_gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_age" id="patient_age" placeholder="Age" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_education" id="patient_education" placeholder="Education" />
          </div>


          <div className="form-group">
            <label className="no-style"><span className="d-block">Is patient's personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="is_personal_mobile_number" id="is_personal_mobile_number">
              <option value="t">Yes</option>
              <option value="f">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_phone_no" id="patient_phone_no" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">WhatsApp No </label>
            <input type="text" className="form-control" name="patient_whatsapp_no" id="patient_whatsapp_no" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="patient_email" id="patient_email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_address" id="patient_address" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="patient_address_2" id="patient_address_2" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="patient_landmark" id="patient_landmark" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_city" id="patient_city" placeholder="Village/Town/City" />
          </div>
          <div className="form-group">
            <label htmlFor="name">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_state" id="patient_state" placeholder="State" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_pincode" id="patient_pincode" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label>Service Area <span className='text-danger'> *</span></label>
            {/* <Select className='form-control select-multi' isMulti /> */}
            <select className="form-control" name="is_personal_mobile_number" id="is_personal_mobile_number">
              <option value="t">Yes</option>
              <option value="f">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Special Notes </label>
            <input type="text" className="form-control" name="patient_special_notes" id="patient_special_notes" placeholder="Special Notes" />
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default PatientViewBasicInformation;