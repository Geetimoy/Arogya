import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ContactUs.css'
import { useContext } from 'react';
import SystemContext from "../context/system/SystemContext";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContactUs(){

  const systemContext = useContext(SystemContext);

  return(
    <>
      <AppTop></AppTop>
      <div className="app-body contact-us">
        <h5 className="title">Contact Us</h5>
        
        <p className="mb-0"><strong>Contact Person: </strong></p>
        <ul className="p-0">
          <li>Contact Number: {systemContext.systemDetails.thp_ngo_contact_number}</li>
          <li>Contact Email: {systemContext.systemDetails.thp_ngo_contact_email}</li>
        </ul>
        <h5 className="title">Create New Case / Issue / Problem</h5>
        <form className="contactus-form">
          <div className="row">
            <div className="col-lg-12">
              <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="problem">Problem Type: </label>
            <select id="" name="" className="form-control">
              <option value="">Select</option>
              <option value="1">Can't book new appoinment</option>
              <option value="2">Can't cancel an appoinment</option>
              <option value="3">Can't download prescription</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject: </label>
            <input type="text" className="form-control" name="" id=""></input>
          </div>
          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problem: </label>
            <textarea name="" id="" rows="3"  className="form-control" placeholder="Describe your Issue/Problem"></textarea>
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="button" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Submit</button>
            <button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ContactUs;