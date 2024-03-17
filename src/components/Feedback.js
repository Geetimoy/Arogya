import React, { useState, useContext } from 'react';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";
import Rating from "./Rating"

//import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

import './Feedback.css'

import SystemContext from '../context/system/SystemContext';
import AlertContext from "../context/alert/AlertContext";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function Feedback(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    console.log(value)
  };

  // const handleButtonClick = (buttonId) => {
  //   setActiveButton(buttonId);
  //   console.log(buttonId)
  // };

  const [activeStar, setActiveStar] = useState(null);

   // State to manage form data
  //  const [formData, setFormData] = useState({
  //   patientid: '',
  //   howeasy: '',
  // });

 

  const [rating, setRating] = useState(0);

  const handleStarClick = (data) => {
    setRating(data); // Toggle the state
    console.log(data);
  };

  // Function to handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const [comments, setComments] = useState("");

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


  return(
    <>
      <AppTop></AppTop>
        <div className="app-body feedback">
          <h5 className="title">Feedback</h5>
         
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
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
                  <button type="button" class="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button>
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