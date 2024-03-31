import React, { useState, useEffect, useContext } from 'react';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";
import Rating from "./Rating"

import CryptoJS from "crypto-js";

//import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

import './Feedback.css'

import SystemContext from '../context/system/SystemContext';
import AlertContext from "../context/alert/AlertContext";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import { Link } from "react-router-dom";

function Feedback(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    console.log(value)
  };

  const [activeStar, setActiveStar] = useState(null);

  const [rating, setRating] = useState(0);

  const handleStarClick = (data) => {
    setRating(data); // Toggle the state
    console.log(data);
  };

  const [comments, setComments] = useState("");

  const [accountTypeLabel, setAccountTypeLabel] = useState("User ID");
  const [accountId, setAccountId]               = useState("XXXXXXXXXXX");

  const commentsChangeHandler = (event) =>{
    setComments(event.target.value);
    console.log(comments);
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('submit the form');
    let jsonData = {};
      jsonData['system_id']             = "telehealth.serviceplace.org.in";
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      jsonData['account_key']           = "0uu232206c628";
      jsonData['feedback_easy_or_difficult'] = activeButton;
      jsonData['feedback_rating']       = rating;
      jsonData['feedback_description']  = comments;
      
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      let result = await response.json();


      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    //console.log('Form submitted with data:', formData);
  };

  const getUserDetails = async () => {

    var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

    let jsonData = {};

    jsonData['system_id']         = systemContext.systemDetails.system_id;
    jsonData["account_key"]       = decryptedLoginDetails.account_key;
    jsonData["account_type"]      = decryptedLoginDetails.account_type;
    jsonData["user_login_id"]     = decryptedLoginDetails.login_id;
    jsonData["device_type"]       = DEVICE_TYPE; //getDeviceType();
    jsonData["device_token"]      = DEVICE_TOKEN;
    jsonData["user_lat"]          = localStorage.getItem('latitude');
    jsonData["user_long"]         = localStorage.getItem('longitude');
    
    const response1 = await fetch(`${API_URL}/getUserProfileDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    let result1 = await response1.json();

    let userDetails = result1.data;

    if(userDetails.account_type === 1) { setAccountTypeLabel("Admin ID");}
    else if(userDetails.account_type === 2) { setAccountTypeLabel("Sub-Admin ID");}
    else if(userDetails.account_type === 3) { setAccountTypeLabel("Patient ID");}
    else if(userDetails.account_type === 4) { setAccountTypeLabel("Volunteer ID");}
    else if(userDetails.account_type === 5) { setAccountTypeLabel("Doctor ID");}
    else if(userDetails.account_type === 6) { setAccountTypeLabel("Pharmacy ID");}
    else if(userDetails.account_type === 7) { setAccountTypeLabel("Center ID");}

    setAccountId(userDetails.account_key.toUpperCase());

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])


  return(
    <>
      <AppTop></AppTop>
        <div className="app-body feedback">
          <h5 className="title">Feedback</h5>
         
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span>{accountTypeLabel}:</span>{accountId}</div>
              </div>
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span className="mb-2">How easy was the app to use:</span>
                  <div className="use-app">
                    <button type="button" className={`btn btn-outline-info ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)} name='veryeasy' value={"Very ease"}>Very Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)} name='easy' value={"Easy"}>Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)} name='noteasy' value={"Not easy"}>Not Easy or Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 4 ? 'active' : ''}`} onClick={() => handleButtonClick(4)} name='difficult' value={"Difficult"}>Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 5 ? 'active' : ''}`} onClick={() => handleButtonClick(5)} name='verydifficult' value={"Very difficult"}>Very Difficult</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="normal-box mt-2">
                  <span className="mb-2">Service Experience:</span>
                  <div className="rating-star">
                    <span className="">Not at all likely</span>
                    <span>
                      <div className="rating-symbol mx-2">
                        <Rating sendDataToParent={handleStarClick}></Rating>
                      </div>
                    </span>
                    <span className="">Extremely likely</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="comments">Would you like to share any other comments: </label>
                  <textarea id="" rows="3"  className="form-control" placeholder="Thanks so much for your help!" name='comments' value={comments} onChange={commentsChangeHandler}></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <div className='btns-group d-flex justify-content-center'>
                  <button type="submit" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Submit</button>
                  <Link to="/dashboard"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default Feedback;