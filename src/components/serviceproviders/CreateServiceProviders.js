import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faKey, faEyeSlash, faEye, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


import SystemContext from "../../context/system/SystemContext";

import AppTopNotifications from '../AppTopNotifications';

function CreateServiceProviders(){

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
              <Link to="/service-providers" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Service Provider </h5>
          </div>
          <div className='app-top-right d-flex'> 
            <AppTopNotifications />
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
      <div className='app-body'>
        <div className='service-providers signup login-box p-0 mt-0'>
          <p>Create a Service Provider account </p>
          <form className='select-box'>
            <div className="form-group">
                <label htmlFor="userType"> Service Area <span className='text-danger'> *</span></label>
                <select className="form-control" id="userType" name="userType">
                  <option value="">Select</option>
                  <option value="3">Prefered Hospital</option>
                  <option value="31">Clinic Nursing Home</option>
                  <option value="32">Pathology</option>
                  <option value="33">Pharmacy</option>
                  <option value="4">Nurse Care</option>
                  <option value="5">In Home Care</option>
                  {/* <option value="6">Pharmacy</option> */}
                </select>
                {/* <small className="error-mesg">{formData["userType"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userName"> Name <span className='text-danger'> *</span></label>
                <input type="text" id="userName" name="userName" className='form-control' placeholder='Enter Name' />
                {/* <small className="error-mesg">{formData["userName"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userId"> User ID <span className='text-danger'> *</span></label>
                <input type="text" id="userId" name="userId" className='form-control' placeholder='Enter user id' />
                {/* <small className="error-mesg">{formData["userId"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userContactNumber"> Contact Number/Mobile Number <span className='text-danger'> *</span></label>
                <input type="text" id="userContactNumber" name="userContactNumber" className='form-control' placeholder='Enter contact or mobile number'/>
                {/* <small className="error-mesg">{formData["userContactNumber"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userEmail"> Email ID <span className='text-danger'> *</span></label>
                <input type="text" id="userEmail" name="userEmail" className='form-control' placeholder='Enter email id' />
                {/* <small className="error-mesg">{formData["userEmail"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userPassword"> Password <span className='text-danger'> *</span></label>
                <input type="password" id="userPassword" name="userPassword" className='form-control' placeholder='Enter Password' />
                <div className='icon-font'><FontAwesomeIcon  /></div>
                {/* <small className="error-mesg">{formData["userPassword"].errorMessage}</small> */}
              </div>
               <div className='mb-3 mt-3'>
                <button type="submit" className='btn primary-bg-color text-light w-100 border-0'>Register</button>
              </div>
          </form>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default CreateServiceProviders;