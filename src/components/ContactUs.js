import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ContactUs.css'

function ContactUs(){
  return(
    <>
      <AppTop></AppTop>
      <div className="app-body contact-us">
        <h5 className="title">Conatct Us</h5>
        <p className="mb-0"><strong>Read Me</strong></p>
        <p>To report any problem, please fill this form below. Our Support Team or Admin Team will look into the issue(s) as soon as possile.</p>
        <p className="mb-0"><strong>Contact Person: </strong></p>
        <ul className="p-0">
          <li>Contact Number: 9577793751</li>
          <li>Email: arindam.deka7@gmail.com</li>
        </ul>
        <h5 className="title">Create New Case / Issue / Problem</h5>
        <form className="contactus-form">
          <div className="row">
            <div className="col-lg-12">
              <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
            </div>
          </div>
          <div className="form-group">
            <label for="name">Problem Type: </label>
            <select id="" name="" className="form-control">
              <option value="">Select</option>
              <option value="1">Can't book new appoinment</option>
              <option value="2">Can't cancel an appoinment</option>
              <option value="3">Can't download prescription</option>
            </select>
          </div>
          <div className="form-group">
            <label for="name">Subject: </label>
            <input type="text" className="form-control" name="" id=""></input>
          </div>
          <div className="form-group">
            <label for="name">Describe / Explain Problem: </label>
            <textarea name="" id="" rows="3"  className="form-control"></textarea>
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="button" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Submit</button>
            <button type="button" class="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ContactUs;