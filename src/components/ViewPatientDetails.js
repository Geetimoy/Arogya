import React, { useState } from 'react';

import Appfooter from "./AppFooter";
import ServicesAppTop from "./ServicesAppTop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './CreatePatientProfile.css'

import { Link } from "react-router-dom";

function ViewPatientDetails(){

  const [isDisabled, setIsDisabled] = useState(true);

  const handleButtonClick = () => {
    // Toggle the state when the button is clicked
    setIsDisabled(!isDisabled);
  };


  return(
    <>
    <ServicesAppTop></ServicesAppTop>
    <div className="app-body view-patient-profiles form-all">
    <h5 className="title">View Patient Details</h5>
    <h6 className="title">Basic Information <span className="float-end"><Link to="#" className={isDisabled ? 'disabled' : ''} onClick={handleButtonClick}><FontAwesomeIcon icon={faEdit} /></Link></span></h6>
    <form name="" id="" className={isDisabled ? 'disabled' : ''}>
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="name">User ID <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="User ID" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control">
              <option value="1" selected="">BPL</option>
              <option value="2">APL</option>
            </select>
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control">
              <option value="1" selected="">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control">
              <option value="1" selected="">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="" id="" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">WhatsApp No </label>
            <input type="tel" className="form-control" name="" id="" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="" id="" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="" id="" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="" id="" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" placeholder="Village/Town/City" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Pincode </label>
            <input type="text" className="form-control" name="" id="" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Servie Area :</span></label>
            <select className="form-control">
              <option value="1" selected="">Ukhra</option>
              <option value="2">B2B</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Special Notes </label>
            <input type="text" className="form-control" name="" id="" placeholder="Special Notes" />
          </div>
          <div className='mb-3 mt-3'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Submit</button>
          </div>
        </form>
    </div>
    <Appfooter></Appfooter>
    </>
  );
}

export default ViewPatientDetails;