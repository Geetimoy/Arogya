// import { Link, useNavigate } from "react-router-dom";
// import { useState } from 'react';
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

import './LogIn.css';

import logo from "../logo.png";
import serviceplace from "../assets/images/serviceplace-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLongArrowAltLeft,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { API_URL } from "./util/Constants";

function LogIn() {
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

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error(`Error getting location: ${error.message}`);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    };

    getLocation();

    // eslint-disable-next-line
  }, []);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let errorCounter = validateFrom();

    if (errorCounter > 0) {
      return false;
    } else {
      let jsonData = {};

      jsonData["user_lat"] = location["latitude"];
      jsonData["user_long"] = location["longitude"];
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
        redirect("/dashboard");
      } else {
        alert("Login Failed!");
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
          <img src={logo} className="mb-3" alt="logo" />
          <h2>Welcome Back!</h2>
          <p>Login to your Account</p>
          <form onSubmit={handleLoginSubmit}>
            <div className={`form-group ${errorClass.username}`}>
              <label htmlFor="username">User id/ Email</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                onChange={handleChange}
              />
              <small className="error-mesg">{errorMessage.username}</small>
            </div>
            <div className={`form-group ${errorClass.username}`}>
              <label htmlFor="userpassword">Password</label>
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
              {" "}
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>
            <div className="text-center mb-4">
              <button type="submit" className="btn btn-danger w-100">
                Login
              </button>
            </div>
            <p className="text-center link-red mb-3">
              {" "}
              Having Trouble? <Link to="/">Contact Admin</Link>
            </p>
            <p className="text-center link-red mb-3">
              {" "}
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </p>
            <div className="text-center login-logo">
              <img src={serviceplace} style={{ height: "50px" }} alt="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default LogIn;