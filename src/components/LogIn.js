// import { Link, useNavigate } from "react-router-dom";
// import { useState } from 'react';
import React, { useContext, useState } from "react";
import CryptoJS from "crypto-js";

import "./LogIn.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLongArrowAltLeft,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import SystemContext from "../context/system/SystemContext";

function LogIn(props) {

  const alertContext = useContext(AlertContext);
  const loginContext = useContext(LoginContext);
  const systemContext = useContext(SystemContext);

  const convertToMD5 = (str) => {
    const md5Hash = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
    return md5Hash;
  };

  /*const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return "Android".toUpperCase();
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "iOS".toUpperCase();
    } else {
      return "Desktop".toUpperCase();
    }
  };*/

  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    userpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    userpassword: "",
  });

  const [errorClass, setErrorClass] = useState({
    username: "",
    userpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFrom = () => {
    const fieldName = Object.keys(formData);

    let errorJson = {};
    let classJson = {};
    let errorCounter = 0;

    fieldName.forEach((element) => {
      if (formData[element].trim() === "") {
        errorJson[element] = "This field is required!";
        classJson[element] = "form-error";
        errorCounter++;
      } else {
        errorJson[element] = "";
        classJson[element] = "";
      }
    });

    setErrorMessage({ ...errorJson });
    setErrorClass({ ...classJson });

    return errorCounter;
  };

  const handleLoginSubmit = async (e) => { //console.log(systemContext.systemDetails);
    e.preventDefault();
    let errorCounter = validateFrom();

    if (errorCounter > 0) {
      return false;
    } else {
      let jsonData = {};

      jsonData["user_lat"]      = localStorage.getItem('latitude');
      jsonData["user_long"]     = localStorage.getItem('longitude');
      jsonData["device_token"]  = DEVICE_TOKEN;
      jsonData["device_type"]   = DEVICE_TYPE; //getDeviceType();
      jsonData["login_id"]      = formData["username"];
      jsonData["password"]      = convertToMD5(formData["userpassword"]);
      jsonData['system_id']     = systemContext.systemDetails.system_id;
      

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();
     
      if (result.success) {
        var loginDetails = result.data.results;
        alertContext.setAlertMessage({show:true, type: "success", message: "Login successful"});
        setTimeout(() => {
          var encryptedLoginDetails = CryptoJS.AES.encrypt(JSON.stringify(loginDetails), ENCYPTION_KEY);
          //var decryptedLoginDetails = CryptoJS.AES.decrypt(encryptedLoginDetails, ENCYPTION_KEY);
          //console.log(decryptedLoginDetails.toString(CryptoJS.enc.Utf8));
          localStorage.setItem('cred', encryptedLoginDetails);
          loginContext.updateLoginState(true);
          redirect('/dashboard');
        }, 3000);
      } else {
        alertContext.setAlertMessage({show:true, type: "error", message: "Login failed!"});
      }
    }
  };

  const [passwordType, setPasswordType] = useState(true);
  const changePasswordType = () => {
    setPasswordType(!passwordType);
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="mt-3">
          <Link to="/">
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </Link>
          <span className="m-2">Log In</span>
        </div>
        <div className="login-box">
          <img src={systemContext.systemDetails.thp_app_logo_url} className="mb-3" alt={systemContext.systemDetails.thp_system_name} />
          <h2>Welcome Back!</h2>
          <p>Login to your Account</p>
          <form onSubmit={handleLoginSubmit}>
            <div className={`form-group ${errorClass.username}`}>
              <label htmlFor="username"> User ID </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                onChange={handleChange}
              />
              <small className="error-mesg"> {errorMessage.username} </small>
            </div>
            <div className={`form-group ${errorClass.username}`}>
              <label htmlFor="userpassword"> Password </label>
              <input
                type={passwordType ? `password` : `text`}
                id="userpassword"
                name="userpassword"
                className="form-control"
                onChange={handleChange}
              />
              <div className="icon-font" onClick={changePasswordType}>
                <FontAwesomeIcon icon={passwordType ? faEyeSlash : faEye} />
              </div>
              <small className="error-mesg">{errorMessage.userpassword}</small>
            </div>
            <p className="text-center link-red">
              {/* <Link to="/forgotpassword"  style={{color:`${props.colorname}`}}>
                Forgot Password?
              </Link> */}
              <Link to="/forgotpassword"  className="primary-color">
                Forgot Password?
              </Link>
            </p>
            <div className="text-center mb-4">
              {/* <button type="submit" className="btn text-light w-100" style={{backgroundColor:`${props.bgcolor}`}}>
                Login
              </button> */}
              <button type="submit" className="btn text-light w-100 primary-bg-color">
                Login
              </button>
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
            <p className='text-center'>&copy; {(new Date().getFullYear())} {systemContext.systemDetails.thp_domain_name}. Powered by <Link to={systemContext.systemDetails.thp_main_ngo_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_system_name}</Link></p>
            <div className="text-center login-logo">
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default LogIn;