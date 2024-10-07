import { useContext, useState } from "react";
import Appfooter from "../AppFooter";

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

function ChildPeriodicData(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/child-malnutrition" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Update Periodic Data</h5>
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
      <div className='app-body form-all upadte-periodic-data'>
        <p><small>Update Child Periodic Data</small></p>
        <form className="mt-3" name="periodicDataForm" id="periodicDataForm">
          <div className='mb-3 mt-3 text-end'>
            <button type="button" className='btn btn-sm primary-bg-color text-light'>Add More Category</button>
          </div>
          <div className="category">
            <div className="text-end mb-2"></div>
            <div className="form-group">
              <label><span className="d-block">Select Category </span></label>
              <select name="select1" className="form-control">
                <option value="0">Select</option>
                <option value="1">Body weight in kgs</option>
                <option value="2">Body height in cm</option>
                <option value="3">Temperature</option>
                <option value="4">Oxygen Level</option>
                <option value="5">Heart Rate</option>
                <option value="6">Do you have Blood Pressure?</option>
                <option value="7">Are you Diabetic?</option>
                <option value="8">Do you have Cholesterol problem?</option>
                <option value="9">Do you have Thyroid?</option>
                <option value="10">Iron/Folic Acid Tablets</option>
                <option value="11">Calcium Tablets</option>
                <option value="12">Sanitary Pads</option>
                <option value="13">Protein Supplement</option>
                <option value="14">Repeat De-Warming</option>
                <option value="15">Repeat Hemoglobin Test</option>
                <option value="16">Repeat Medicine</option>
              </select>
            </div>
            <div className="form-group"><input type="text" className="form-control pt-0" name="select1" placeholder="" /></div>
          </div>
          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea name="remarks" id="remarks" rows="3"  className="form-control" placeholder="Describe / Explain Problems"></textarea>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div>
        </form>

        <div className="saved-periodic-data">
          <div className="row mt-4">
            
              <div className="col-6">
                <div className="jumbotron rounded p-2">
                  <div className="periodic-data position-relative">
                    {/* <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div> */}
                    <p className="primary-color"><strong>Date -  20-10-2024</strong></p>
                    <p>Body Weight in Kgs - 76</p>
                  </div>
                </div>
              </div>
           

          </div>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default ChildPeriodicData;