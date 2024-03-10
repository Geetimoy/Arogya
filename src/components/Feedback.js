import React, { useState, useContext } from 'react';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

import './Feedback.css'

import SystemContext from '../context/system/SystemContext';
import AlertContext from "../context/alert/AlertContext";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

function Feedback(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [activeStar, setActiveStar] = useState(null);

  const handleClick = () => {
    setActiveStar(!activeStar); // Toggle the state
  };

   // State to manage form data
   const [formData, setFormData] = useState({
    patientid: '',
    howeasy: '',
    serviceexperience: '',
    share: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can perform actions like API calls, state updates, etc. here
    let jsonData = {};
      
      jsonData['system_id']             = "telehealth.serviceplace.org.in";
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      jsonData['account_key']           = "0uu232206c628";
      jsonData['feedback_easy_or_difficult'] = "xyz";
      jsonData['feedback_rating']       = "abcd";
      jsonData['feedback_description']  = "hbndskjndkjndskndsjnds";
      
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
                    <button type="button" className={`btn btn-outline-info ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)} name='veryeasy' value={formData.veryeasy}
          onChange={handleInputChange}>Very Easy</button>
                    {/* <button type="button" className={`btn btn-outline-info ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>Very Easy</button> */}
                    <button type="button" className={`btn btn-outline-info ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)} name='easy' value={formData.easy}
          onChange={handleInputChange}>Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 4 ? 'active' : ''}`} onClick={() => handleButtonClick(4)} name='noteasy' value={formData.noteasy}>Not Easy or Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 5 ? 'active' : ''}`} onClick={() => handleButtonClick(5)} name='difficult' value={formData.difficult}>Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 6 ? 'active' : ''}`} onClick={() => handleButtonClick(6)} name='verydifficult' value={formData.verydifficult}>Very Difficult</button>
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
                        <MdOutlineStar size={21} className={`star ${activeStar ? 'active' : ''}`} onClick={handleClick} />
                        <MdOutlineStar size={21} className={`star ${activeStar ? 'active' : ''}`} onClick={handleClick} />
                        <MdOutlineStar size={21} className='star' />
                        <MdOutlineStarBorder size={21} className='star' />
                        <MdOutlineStarBorder size={21} className='star' />
                      </div>
                    </span>
                    <span className="">Extremely likely</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="comments">Would you like to share any other comments: </label>
                  <textarea id="" rows="3"  className="form-control" placeholder="Thanks so much for your help!" name='comments' value={formData.comments}></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <div className='btns-group d-flex justify-content-center'>
                  <button type="button" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Submit</button>
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