
import './Verification.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

function Verification(){

  return(
    <>
      <div className='container'>
        <div className='login-container'>
          <div className='mt-3'> 
            <Link to="/"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
            <span className='m-2'>Verification</span>
          </div>
          <div className='login-box verification'>
            <h5 className='title'>Verify Code</h5>
            <p>Kindly Enter the 4 digit verification code</p>
            <form>
                <div className='d-flex justify-content-around'>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
                <div className='btn primary-bg-color mb-5 mt-5 w-100'><Link to ="/login" className='m-auto text-light text-decoration-none d-block'>VERIFY</Link></div>
            </form>
          </div>
        </div>
      </div>
      

    </>
  );

}

export default Verification;