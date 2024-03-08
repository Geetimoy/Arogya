import React, { useState } from 'react';

import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

import './Feedback.css'

function Feedback(){

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [activeStar, setActiveStar] = useState(null);

  const handleClick = () => {
    setActiveStar(!activeStar); // Toggle the state
  };


  return(
    <>
      <AppTop></AppTop>
        <div className="app-body feedback">
          <h5 className="title">Feedback</h5>
         
          <form className="feedback-form">
            <div className="row">
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
              </div>
              <div className="col-lg-12">
                <div className="normal-box mt-2"><span className="mb-2">How easy was the app to use:</span>
                  <div className="use-app">
                    <button type="button" className={`btn btn-outline-info ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)} >Very Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>Very Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>Easy</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 4 ? 'active' : ''}`} onClick={() => handleButtonClick(4)}>Not Easy or Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 5 ? 'active' : ''}`} onClick={() => handleButtonClick(5)}>Difficult</button>
                    <button type="button" className={`btn btn-outline-info ${activeButton === 6 ? 'active' : ''}`} onClick={() => handleButtonClick(6)}>Very Difficult</button>
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
                  <label htmlFor="name">Would you like to share any other comments: </label>
                  <textarea name="" id="" rows="3"  className="form-control" placeholder="Thanks so much for your help!"></textarea>
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