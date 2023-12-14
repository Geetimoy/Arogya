import './SignUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEye } from '@fortawesome/free-solid-svg-icons';

import {Link} from "react-router-dom";

function SignUp(){
  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Sign Up</span>
        </div>
        <div className='login-box signup'>
          <h5 className='title'>Getting Started</h5>
          <p>Create an account to continue your all activities</p>
          <form>
            <div className='form-group'>
              <input type="text" id="name" name="name" className='form-control' value="Name" />
            </div>
            <div className='form-group'>
              <input type="email" id="email" name="email" className='form-control' value="Email" />
            </div>
            <div className='form-group'>
              <input type="text" id="password" name="password" className='form-control' value="Password" />
              <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
            </div>
            <div className='form-group'>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="smart_menu" className="checkbox style-0 custom-control-input" />
                  <label className="custom-control-label" htmlFor="smart_menu">
                    <span>I agree to <Link to = "/termscondition">Terms and Condition</Link></span>
                  </label>
              </div>
            </div>
            <div className='btn btn-danger mb-3 mt-3 w-100'><Link to ="/signup" className='m-auto text-light text-decoration-none d-block'>SIGN UP</Link></div>
          </form>
          <div className='back-to-login'>
            Already have an account? <Link to="/login"> Log In</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;