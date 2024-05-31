import { useState, useContext } from "react";

import Category from './Category';

import Appfooter from '../AppFooter';
import './UpdatePeriodicData.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faLongArrowAltLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";

import { Link } from "react-router-dom";

function UpdatePeriodicData(){
  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const [inputList, setInputList] = useState([]);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const onAddBtnClick = event => {
    setInputList(inputList.concat(<Category key={inputList.length} />));
  };


return(
  <>
    <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/youngwomens" className=''>
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
      <p><small>Update Young Women Periodic Data</small></p>
      <form className="mt-3" name="" id="">
        <div className='mb-3 mt-3 text-end'>
          <button type="button" className='btn primary-bg-color text-light' onClick={onAddBtnClick}>Add More Category</button>
        </div>
        {/* <div className="category">
          <div className="form-group">
            <label><span className="d-block">Select Category </span></label>
            <select className="form-control">
              <option value="1">Body weight in kgs</option>
              <option value="2">Body height in cm</option>
              <option value="3">Temperature</option>
              <option value="4">Oxygen Level</option>
              <option value="5">Heart Rate</option>
              <option value="5">Do you have Blood Pressure?</option>
              <option value="5">Are you Diabetic?</option>
              <option value="5">Do you have Cholesterol problem?</option>
              <option value="5">Do you have Thyroid?</option>
              <option value="5">Iron/Folic Acid Tablets</option>
              <option value="5">Calcium Tablets</option>
              <option value="5">Sanitary Pads</option>
              <option value="5">Protein Supplement</option>
              <option value="5">Repeat De-Warming</option>
              <option value="5">Repeat Hemoglobin Test</option>
              <option value="5">Repeat Medicine</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control pt-0"  name="" id="" placeholder="" value="" />
          </div>
          <div className="form-group">
            <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
            <textarea name="" id="" rows="3"  className="form-control" placeholder="Describe / Explain Problems"></textarea>
          </div>
        </div> */}
        
        <Category></Category>
        {inputList}
        <div className="form-group">
          <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
          <textarea name="" id="" rows="3"  className="form-control" placeholder="Describe / Explain Problems"></textarea>
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
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                  <p className="primary-color"><strong>Date -  18/05/24</strong></p>
                  <p>Body Wt in kgs - 56</p>
                  <p>Blood Pressure - 145/85</p>
                  <p>Cholesterol Problem- Yes</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="jumbotron rounded p-2">
                <div className="periodic-data position-relative">
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                  <p className="primary-color"><strong>Date -  19/05/24</strong></p>
                  <p>Body Height in cm - 42</p>
                  <p>Oxygen Level - 95</p>
                  <p>Diabetic- Yes</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="jumbotron rounded p-2">
                <div className="periodic-data position-relative">
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                  <p className="primary-color"><strong>Date -  20/05/24</strong></p>
                  <p>Body Height in cm - 42</p>
                  <p>Oxygen Level - 95</p>
                  <p>Diabetic- Yes</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="jumbotron rounded p-2">
                <div className="periodic-data position-relative">
                  <div className="btn-delete"><FontAwesomeIcon icon={faTrash} /></div>
                  <p className="primary-color"><strong>Date -  21/05/24</strong></p>
                  <p>Body Height in cm - 42</p>
                  <p>Oxygen Level - 95</p>
                  <p>Diabetic- Yes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  <Appfooter></Appfooter>
  </>
)

}


export default UpdatePeriodicData;