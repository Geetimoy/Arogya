import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from "./AppFooter";

import './BasicInformation.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";

import SystemContext from "../context/system/SystemContext";

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function BasicInformation(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive]           = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);
  const [startDate, setDate]                = useState(new Date());

  const [formData, setFormData] = useState({
    basicInfoName: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMobileNo: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoWhatsapp: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoEmail: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoGender: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoDob: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoCommute: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMedicalExperience: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoMedicalCertificate: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoAddress1: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoAddress2: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoLandmark: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoTown: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoPostalCode: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoServiceArea: {required: true, value:"", errorClass:"", errorMessage:""},
    basicInfoSpecialNotes: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const selectDateHandler = (d) => {
    setDate(d)
  }

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
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

    let userDetails = result1.data;console.log(userDetails);

    setAccountDetails(userDetails);

  }

  useEffect(() => {

    if(systemContext.systemDetails.system_id){
      getUserDetails();
    }

    // eslint-disable-next-line
    
  }, [systemContext.systemDetails.system_id])

  return(
    <>
        <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Update Basic Information </h5>
            </div>
            <div className='app-top-right d-flex'> 
              <div className='position-relative'>
                <Link to="/notifications">
                <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
                <span className='top-header-notification primary-bg-color'>3</span>
                </Link>
              </div> 
              <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                <ul>
                  <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                  {
                    (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                  }
                  <li><Link to={"/contactus"}>Contact Us</Link></li>
                  <li><Link to={"/feedback"}>Feedback</Link></li>
                  <li><Link to={"/help"}>Help</Link></li>
                  <li><Link to={"/logout"}>Logout</Link></li> 
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="app-body basic-info">
          <p>To update your profile information</p>
          <p style={{textAlign:'right'}} className="mb-0"><span className="text-danger">*</span>marks are mandatory</p>

          <div className="row">
            <div className="col-6">
              <div className="normal-box">
                <span>Volunteer ID :</span>
                {(accountDetails.account_key) ? accountDetails.account_key.toUpperCase() : ''}
              </div>
            </div>
            <div className="col-6">
              <div className="normal-box">
                <span>User ID <small className="text-danger">*</small>  <FontAwesomeIcon icon={faQuestionCircle} /> : </span> {(accountDetails.user_login_id) ? accountDetails.user_login_id.toUpperCase() : ''}
              </div>
            </div>
            
          </div>

          <form className="basic-information" name="basic_information" id="basic_information">
            <div className="form-group">
              <label htmlFor="name">Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="basicInfoName" id="basicInfoName" placeholder="Volunteer H" />
            </div>
            <div className="form-group">
              <label> Mobile Number <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" name="basicInfoMobileNo" id="basicInfoMobileNo" placeholder="9038888991" />
            </div>
            <div className="form-group">
              <label>WhatsApp :</label>
              <input type="text" className="form-control" name="basicInfoWhatsapp" id="basicInfoWhatsapp" placeholder="9038888991" />
            </div>
            <div className="form-group">
              <label>Email ID <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoEmail" id="basicInfoEmail" placeholder="abcd@xyz.com" />
            </div>
            <div className="form-group">
              <label className="pos-relative no-style">Gender  <span className="text-danger">*</span> </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_m" name="basicInfoGender" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_m">Male</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_f" name="basicInfoGender" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_f">Female</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_gender_o" name="basicInfoGender" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_gender_o">Others</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label style={{zIndex:1}}>Date of Birth (DOB)  <span className="text-danger">*</span> </label>
              <DatePicker className="form-control" dateFormat="yyyy-MM-dd" selected={startDate} onChange={selectDateHandler}/>
            </div>
            <div className="form-group">
              <label>How You Commute  <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoCommute" id="basicInfoCommute" placeholder="Bike" />
            </div>
            <div className="form-group">
              <label>Medical Experiences   <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> </label>
              <input type="text" className="form-control" name="basicInfoMedicalExperience" id="basicInfoMedicalExperience" placeholder="" />
            </div>
            <div className="form-group">
              <label className="no-style">Do you have Medical Certificates?    <span className="text-danger">*</span> <FontAwesomeIcon icon={faQuestionCircle} /> : </label>
              <div className="d-flex">
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_y" name="basicInfoMedicalCertificate" className="custom-control-input" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_y">Yes</label>
              </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                  <input type="radio" id="edit_user_medical_certificates_n" name="basicInfoMedicalCertificate" className="custom-control-input" value="f" />
                  <label className="custom-control-label no-style" htmlFor="edit_user_medical_certificates_n">No</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Address 1   <span className="text-danger">*</span> : </label>
              <input type="text" className="form-control" name="basicInfoAddress1" id="basicInfoAddress1" placeholder="" />
            </div>
            <div className="form-group">
              <label>Address 2 :</label>
              <input type="text" className="form-control" name="basicInfoAddress2" id="basicInfoAddress2" placeholder="" />
            </div>
            <div className="form-group">
              <label>Nearest Landmark :</label>
              <input type="text" className="form-control" name="basicInfoLandmark" id="basicInfoLandmark" placeholder="" />
            </div>
            <div className="form-group">
              <label>Village / Town / City <span className="text-danger">*</span> :</label>
              <input type="text" className="form-control" name="basicInfoTown" id="basicInfoTown" placeholder="" />
            </div>
            <div className="form-group">
              <label>Postal Code / Pincode <span className="text-danger">*</span> :</label>
              <input type="text" className="form-control" name="basicInfoPostalCode" id="basicInfoPostalCode" placeholder="" />
            </div>
            
            <div className="form-group">
              <label className="no-style"><span className="d-block">Service Area :</span><small>(Multiple can pick)</small></label>
              <select className="form-control" multiple name="basicInfoServiceArea">
                <option value="1">Guwahati Zoo,Fancy bazar</option>
                <option value="2">Navagraha Temple, Guwahati</option>
                <option value="3">Umananda Temple, Guwahati</option>
                <option value="4">Morigaon</option>
              </select>
            </div>
            <div className="form-group">
              <label>Special Notes :</label>
              <input type="text" className="form-control" name="basicInfoSpecialNotes" id="basicInfoSpecialNotes" placeholder="Special Notes" />
            </div>

            <div className='btns-group d-flex justify-content-center'>
              <button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Update My Profile</button>
              <Link to="/account"><button type="button" className="btn btn-primary primary-bg-color border-0 mx-2">Cancel</button></Link>
            </div>
          </form>
        </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default BasicInformation;