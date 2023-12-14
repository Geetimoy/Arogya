// import { Link, useNavigate } from "react-router-dom";
// import { useState } from 'react';
import './LogIn.css';

import logo from '../logo.png';
import serviceplace from '../assets/images/serviceplace-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import { API_URL } from './util/Constants';


function LogIn() {

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/appCoreSettings`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    console.log(response);
  }

  return(
    <div className="container">
        <div className="login-container">
          <div className='mt-3'> 
            <Link to="/"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
            <span className='m-2'>Log In</span>
          </div>
          <div className='login-box'>
            <img src={logo} className="mb-3" alt="logo" />
            <h2>Welcome Back!</h2>  
            <p>Login to your Account</p>
            <form onSubmit={handleLoginSubmit}>
              <div className='form-group'>
                <label htmlFor="user_id">
                  User id/ Email
                </label>
                <input type="text" id="user_id" name="userid" className='form-control' />
              </div>
              <div className='form-group'>
                <label htmlFor="pasword">
                 Password
                </label>
                <input type="password" id="pasword" name="pasword" className='form-control' />
                <div className='icon-font'><FontAwesomeIcon icon={faEye} /></div>
              </div>
              <p className='text-center link-red'> <Link to="/forgotpassword">Forgot Password?</Link></p>
              <div className='text-center mb-4'>
                <Link to ="/dashboard"><button type='submit' className='btn btn-danger w-100'>Login</button></Link>
                {/* <button type='submit' className='btn btn-danger w-100'>Login</button> */}
              </div>
              <p className='text-center link-red mb-3'> Having Trouble? <Link to="/">Contact Admin</Link></p>
              <p className='text-center link-red mb-3'> Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
              <div className='text-center login-logo'>
                <img src={serviceplace} style={{height:'50px'}} alt='' />
              </div>
            </form>
          </div>
        </div>
    </div>
  );
    
}


export default LogIn;