import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";

import { Link } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import { useContext } from 'react';

function Disclaimer(){

  const systemContext = useContext(SystemContext);

  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Disclaimer</span>
        </div>
        <div className='login-box disclaimer'>
          <img src={logotelehealth} className="mb-3" alt="logo" />
          <p><strong>Community-based TeleHealth Information Release</strong></p>
          <ul className='px-1'>
            <li className='d-flex mb-2'>
              <input tabindex="-1" id="disclaimer_check1" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check1" className="form-check-label mx-2">I have read and agree to all of the points listed below.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-2" id="disclaimer_check2" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check2" className="form-check-label mx-2">I agree to the information release to concerned persons for my patient information for the purpose of treatment, project reporting, future product research and planning.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-3" id="disclaimer_check3" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check3" className="form-check-label mx-2">I agree that information about my prescriptions, tests and diagnosis may be shared for pharmacies, test centers and medical personnel outside of TeleHealth program for the purpose of treatment, product research and future product planning.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-4" id="disclaimer_check4" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check4" className="form-check-label mx-2">In community based tele-medicine, we take patient privileged information seriously, and emphasize in our internal training. By the very nature of community based medicine,  neighbors and local agencies may be enlisted to help out with  service delivery, and I accept this usage model.</label>
            </li>
            <li className='d-flex mb-2'>
              <input tabindex="-5" id="disclaimer_check5" className="form-check-input" type="checkbox" />
              <label for="disclaimer_check5" className="form-check-label mx-2">I agree to urgent medical transportation if needed, using whatever means available, even if an ambulance is not available for timely medical action.</label>
            </li>
          </ul>
          <div className='mb-3 mt-3 w-100'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Yes I agree</button>
          </div>
          <p className="text-center link-red mb-3">
              Already have an account ?
              <Link to="/login" className="primary-color mx-1">
                Login
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Don't have an account yet?
              <Link to="/signup" className="primary-color mx-1">
                Sign Up
              </Link>
            </p>
            <p className='text-center'>&copy; 2024 rgvn.org. Powered by <Link to="https://www.serviceplace.org/" target="_blank" className="primary-color">ServicePlace.Org</Link></p>
            <div className="text-center login-logo">
            <Link to="https://www.serviceplace.org/" target='_blank'><img
                src={systemContext.systemDetails.thp_ngo_logo_url}
                style={{ height: "80px" }} className="mx-3" alt="" /></Link>
              <Link to="https://www.serviceplace.org/" target='_blank'><img
                src={systemContext.systemDetails.thp_sp_global_logo_url}
                style={{ height: "80px" }} className="mx-3" alt="" /></Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;