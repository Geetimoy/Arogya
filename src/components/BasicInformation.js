import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";

import './BasicInformation.css'

import Dropdown from 'react-dropdown-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

function BasicInformation(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <>
        <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Update Basic Information </h5>
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
        <div className="app-body basic-info">
          <p>To update your profile information</p>
          <p style={{textAlign:'right'}} className="mb-0"><span className="text-danger">*</span>marks are mandatory</p>

            <div className="row">
              <div className="col-6">
                <div className="normal-box">
                  <span>Volunteer ID :</span>
                  UV2381C6A79B
                </div>
              </div>
              <div className="col-6">
                <div className="normal-box">
                  <span>User ID <small className="text-danger">*</small>  <FontAwesomeIcon icon={faQuestionCircle} /> : </span> VOLUNTEERH
                </div>
              </div>
              
            </div>

          <form className="" name="" id="">
            <div className="form-group">
              <label htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="" id="" placeholder="Volunteer H" />
            </div>
            <div className="form-group">
              <label> Mobile Number <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" name="" id="" placeholder="9038888991" />
            </div>
            <div className="form-group">
              <label>WhatsApp :</label>
              <input type="text" className="form-control" name="" id="" placeholder="9038888991" />
            </div>
            <div className="form-group">
              <label>Email ID <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="" id="" placeholder="tuki.saberi@gmail.com" />
            </div>
            <div className="form-group">
              <label className="pos-relative no-style">Gender  <span className="text-danger">*</span> </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_m" name="edit_user_gender" class="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_m">Male</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_f" name="edit_user_gender" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_f">Female</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_o" name="edit_user_gender" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_o">Others</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Date of Birth (DOB)  <span className="text-danger">*</span> </label>
              <input type="text" class="form-control" name="" id="" placeholder="04/01/2023" />
            </div>
            <div className="form-group">
              <label>How You Commute  <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" class="form-control" name="" id="" placeholder="bike" />
            </div>
            <div className="form-group">
              <label>Medical Experiences   <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            <div className="form-group">
              <label className="no-style">Do you Medical Certificates?    <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> : </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_y" name="edit_user_medical_certificates" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_n" name="edit_user_medical_certificates" className="custom-control-input" value="f" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">No</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Address 1   <span className="text-danger">*</span> : </label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            <div className="form-group">
              <label>Address 2 :</label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            <div className="form-group">
              <label>Nearest Landmark :</label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            <div className="form-group">
              <label>Village / Town / City <span className="text-danger">*</span> :</label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            <div className="form-group">
              <label>Postal Code / Pincode <span className="text-danger">*</span> :</label>
              <input type="text" class="form-control" name="" id="" placeholder="K" />
            </div>
            
            <div className="form-group">
              <label className="no-style"><span className="d-block">Service Area :</span><small>(Multiple can pick)</small></label>
              <select className="form-control" multiple>
                <option value="1" selected="">Guwahati Zoo,Fancy bazar</option>
                <option value="2">Navagraha Temple, Guwahati</option>
                <option value="3">Umananda Temple, Guwahati</option>
                <option value="4">Morigaon</option>
              </select>
            </div>
            <div className="form-group">
              <label>Special Notes :</label>
              <input type="text" class="form-control" name="" id="" placeholder="Special Notes" />
            </div>

            <div className='btns-group d-flex justify-content-center'>
              <button type="button" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Update My Profile</button>
              
              <Link to="/account"><button type="button" class="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></Link>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default BasicInformation;