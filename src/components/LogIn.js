// import { Link, useNavigate } from "react-router-dom";
// import { useState } from 'react';
import React, { useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

import "./LogIn.css";

// import logo from '../logo.png';
import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
import serviceplace from "../assets/images/serviceplace-logo.png";
import footerlogo from "../assets/images/rgvn-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLongArrowAltLeft,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { API_URL, ENCYPTION_KEY } from "./util/Constants";

import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import SystemContext from "../context/system/SystemContext";

function LogIn() {

  const alertContext = useContext(AlertContext);
  const loginContext = useContext(LoginContext);
  const systemContext = useContext(SystemContext);

  const convertToMD5 = (str) => {
    const md5Hash = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
    return md5Hash;
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return "Android".toUpperCase();
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "iOS".toUpperCase();
    } else {
      return "Desktop".toUpperCase();
    }
  };

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

  const handleLoginSubmit = async (e) => { console.log(systemContext.systemDetails);
    e.preventDefault();
    let errorCounter = validateFrom();

    if (errorCounter > 0) {
      return false;
    } else {
      let jsonData = {};

      jsonData["user_lat"] = localStorage.getItem('latitude');
      jsonData["user_long"] = localStorage.getItem('longitude');
      jsonData["device_token"] =
        "fpDnSllATPC2-RQURuALJy:APA91bHjjUGG7g88GHiu2qz1Gm9PCjCbEQvOTFpU74Ffcwt9JPSi-03eLb-LqWmKhJG2TZgZGaUuolEU7G_IBVKoo2OLf5Ge_KwsMpJ0_g0lFYnR5TjgoCTTokp9s-IpaoX1AUMI-hMu";
      jsonData["device_type"] = "ANDROID"; //getDeviceType();
      jsonData["login_id"] = formData["username"];
      jsonData["password"] = convertToMD5(formData["userpassword"]);
      jsonData["system_id"] = "telehealth.serviceplace.org.in";
      

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
          <img src={logotelehealth} className="mb-3" alt="logo" />
          <h2>Welcome Back!</h2>
          <p>Login to your Account</p>
          <form onSubmit={handleLoginSubmit}>
            <div className={`form-group ${errorClass.username}`}>
              <label htmlFor="username"> User id / Email </label>
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
              <Link to="/forgotpassword" className="primary-color">
                Forgot Password?
              </Link>
            </p>
            <div className="text-center mb-4">
              <button type="submit" className="btn primary-bg-color text-light w-100">
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
        </div>
      </div>
    </div>
  );
}


export default LogIn;