import Appfooter from "./AppFooter";
import AppTop from "./AppTop";

import './ContactUs.css'
import { useState, useContext } from 'react';
import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";

import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from "react-router-dom";

function ContactUs(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const [values, setValues] = useState("Select ...");

  const [subject, setSubject] = useState("");

  const [description, setDescription] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [problem, setProblem] = useState([
    {
      label: "Select ...",
      value: "Select ..."
    },
    { label: "Can't book new appointment",
      value: "Can't book new appointment"
    },
    { label: "Can't cancel an appointment", 
    value: "Can't cancel an appointment" 
    },
    { label: "Can't download prescription", 
    value: "Can't download prescription" 
    }
  ]);

  // const handleSelectProblem = (e) =>{
  //   setProblem(e.target.value);
  //   // console.log(e.target.value);
  // } 


  const handleSubject =(e)=>{
    setSubject(e.target.value);
  }


  const handleDescription =(e)=>{
    setDescription(e.target.value);
  }

  const handleClick = () => {
    setIsActive(!isActive); // Toggle the state
  };


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('submit the form');
    let jsonData = {};
      jsonData['system_id']             = "telehealth.serviceplace.org.in";
      jsonData['device_type']           = DEVICE_TYPE;
      jsonData['device_token']          = DEVICE_TOKEN;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');

      jsonData['account_key']           = "0uu232206c628";
      jsonData['problem_type']          = 1;
      jsonData['subject']               = subject;
      jsonData['problem_description']   = values;
      jsonData['service_type']          = 2;
      jsonData['description']           = description;
      
      const response = await fetch(`${API_URL}/contactUs`, {
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
      <div className="app-body contact-us">
        <h5 className="title">Contact Us</h5>
        
        <p className="mb-0"><strong>Contact Person: </strong></p>
        <ul className="p-0">
          <li>Contact Number: {systemContext.systemDetails.thp_ngo_contact_number}</li>
          <li>Contact Email: {systemContext.systemDetails.thp_ngo_contact_email}</li>
        </ul>
        <Link to="" className="create-case primary-bg-color btn btn-primary border-0" onClick={handleClick}>Create New Case</Link>
        <div className="row">
          <div className="col-6">
            <div className="normal-box mb-0">
              <div className="d-flex justify-content-between">
                <h6>Case ID-122</h6>
                <span>Open</span>
              </div>
              <p>Various versions </p>
              <div className="d-flex justify-content-end"><Link to=""><small>Reply</small></Link></div>
            </div>
          </div>
          <div className="col-6">
            <div className="normal-box mb-0">
              <div className="d-flex justify-content-between">
                <h6>Case ID -123</h6>
                <span>Open</span>
              </div>
              <p>Various versions  </p>
              <div className="d-flex justify-content-end"><Link to="" ><small>Reply</small></Link></div>
            </div>
          </div>
          <div className="col-6">
            <div className="normal-box mb-0">
              <div className="d-flex justify-content-between">
                <h6>Case ID -124</h6>
                <span>Open</span>
              </div>
              <p>Various versions  </p>
              <div className="d-flex justify-content-end"><Link to=""><small>Reply</small></Link></div>
            </div>
          </div>
        </div>
        
        <form className={isActive ? 'contactus-form hide' : 'contactus-form mt-4'} onSubmit={handleSubmit}>
        <h5 className="title">Create New Case / Issue / Problem</h5>
          <div className="row">
            <div className="col-lg-12">
              <div className="normal-box mt-2"><span>Patient ID:</span>UP0033445576</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="problem">Problem Type: <span className="text-danger">*</span></label>
            {/* <select id="" name="" className="form-control" defaultValue={problem} onChange={handleSelectProblem}>
              <option value="">Select</option>
              <option value="1">Can't book new appointment</option>
              <option value="2">Can't cancel an appointment</option>
              <option value="3">Can't download prescription</option>
            </select> */}
            <select className="form-control" value={values} onChange={(e) => setValues(e.currentTarget.value)}>
              {problem.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject: <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="" id="" onChange={handleSubject}></input>
          </div>
          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problem: <span className="text-danger">*</span></label>
            <textarea name="" id="" rows="3"  className="form-control" placeholder="Describe your Issue/Problem" onChange={handleDescription}></textarea>
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="submit" id="" name="" className="btn btn-primary primary-bg-color border-0 mx-2">Submit</button>
            <Link to="/dashboard"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></Link>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ContactUs;