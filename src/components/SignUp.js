import './SignUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEye, faQuestionCircle, faKey } from '@fortawesome/free-solid-svg-icons';

import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
import serviceplace from "../assets/images/serviceplace-logo.png";
import footerlogo from "../assets/images/rgvn-logo.png";

import {Link} from "react-router-dom";

function SignUp(){
  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Sign Up</span>
        </div>
        <div className='login-box signup'>
          <img src={logotelehealth} className="m-auto mb-3" alt="logo" />
          <h5 className='title'>Getting Started</h5>
          <p>Create an account to continue your all activities</p>
          <form>
            <p className='text-end mandatory'><span className='text-danger'>*</span> marks are mandatory</p>
            <div className='form-group'>
              <label htmlFor="serviceArea"> Register As <span className='text-danger'> *</span></label>
              <select className="form-control" id="usertype" name="user_account_type">
                <option value="0">Select</option>
                <option value="3">Patient</option>
                <option value="4">Volunteer - MedTech</option>
                <option value="5">Doctor</option>
                <option value="6">Pharmacy</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="username"> Name <span className='text-danger'> *</span></label>
              <input type="text" id="name" name="name" className='form-control' value="Enter Name" />
            </div>
            <div className='form-group'>
              <label htmlFor="userid"> User ID <span className='text-danger'> *</span></label>
              <input type="text" id="userid" name="userid" className='form-control' value="Enter user id" />
            </div>
            <div className='form-group'>
              <label htmlFor="contact_number"> Contact Number/Mobile Number <span className='text-danger'> *</span></label>
              <input type="text" id="contact_number" name="contact_number" className='form-control' value="Enter contact or mobile number" />
            </div>
            <div className='form-group'>
              <label htmlFor="email"> Email ID <span className='text-danger'> *</span></label>
              <input type="email" id="email" name="email" className='form-control' value="Enter email id" />
            </div>
            <div className='form-group'>
              <label htmlFor="password"> Web Password/PIN <span className='text-danger'> *</span> <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
              <input type="password" id="password" name="password" className='form-control' value="Password" />
              <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
            </div>
            <div className='form-group'>
              <label htmlFor="serviceArea"> Area <span className='text-danger'> *</span></label>
              <select className="form-control" id="serviceArea" name="user_service_area">
                <option value="0">Select</option>
                <option value="1">Guwahati Zoo,Fancy bazar</option>
                <option value="2">Navagraha Temple, Guwahati</option>
                <option value="3">Umananda Temple, Guwahati</option>
                <option value="4">Morigaon</option>
              </select>
            </div>
            {/* <div className='form-group'>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="smart_menu" className="checkbox style-0 custom-control-input" />
                  <label className="custom-control-label" htmlFor="smart_menu">
                    <span>I agree to <Link to = "/termscondition" className='primary-color'>Terms and Condition</Link></span>
                  </label>
              </div>
            </div> */}
            <div className='btn primary-bg-color mb-3 mt-3 w-100'><Link to ="/signup" className='m-auto text-light text-decoration-none d-block'>Register</Link></div>
            <div>
              <p>By registering you read & agreed to the RGVN & ServicePlace <Link to ="/termscondition" className='primary-color'>Terms of Use</Link> & <Link to="/disclaimer" className='primary-color'>Disclaimer</Link></p>
            </div>
            <p className="text-center link-red mb-3">
              Don't have an account yet? 
              <Link to="/signup" className="primary-color mx-1">
                Sign Up
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Having Trouble? 
              <Link to="/contactadmin" className="primary-color mx-1">
                Contact Admin
              </Link>
            </p>
            <p className='text-center'>&copy; 2024 rgvn.org. Powered by <Link to="https://www.serviceplace.org/" target="_blank" className="primary-color">ServicePlace.Org</Link></p>
            <div className="text-center login-logo">
              <img
                src={footerlogo}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
              <img
                src={serviceplace}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
            </div>
          </form>
          {/* <div className='back-to-login'>
            Already have an account? <Link to="/login" className='primary-color'> Log In</Link>
          </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;