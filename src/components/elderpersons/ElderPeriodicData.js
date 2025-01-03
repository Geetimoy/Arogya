import { useState, useContext, useEffect } from 'react';

import Appfooter from "../AppFooter";

import Category from "./Category";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ElderPeriodicData(){

  const systemContext = useContext(SystemContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [isActive, setIsActive]     = useState(0);

  const handleMenuClick = () => {
    // Toggle the state when the button is clicked
    setIsActive(!isActive);
  };

  const [inputValues, setInputValues] = useState({
    select1: {category:"", value:""},
    select2: {category:"", value:""},
    select3: {category:"", value:""},
    select4: {category:"", value:""},
    select5: {category:"", value:""},
    select6: {category:"", value:""},
    select7: {category:"", value:""},
    select8: {category:"", value:""},
    select9: {category:"", value:""},
    select10: {category:"", value:""},
    select11: {category:"", value:""},
    select12: {category:"", value:""},
    select13: {category:"", value:""},
    select14: {category:"", value:""},
    select15: {category:"", value:""},
    select16: {category:"", value:""}
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, [inputValues]);

  const selectCategory = (e) => {
    const { name, value } = e.target;
    inputValues[name].category = value;
    console.log(inputValues);
  }
  const changeCategoryValue = (e) => {
    const { name, value } = e.target;
    inputValues[name].value = value;
    console.log(inputValues);
  }

  const redirect = useNavigate();

  const [inputList, setInputList] = useState([<Category key={1} name="select1" changefunc={selectCategory} changecatval={changeCategoryValue}/>]);


  return(
    <>
    <div className='app-top inner-app-top services-app-top'>
      <div className='app-top-box d-flex align-items-center justify-content-between'>
        <div className='app-top-left d-flex align-items-center'>
          <div className='scroll-back'>
            <Link to="/services" className=''>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
          </div>
          <h5 className='mx-2 mb-0'>Update Periodic Data </h5>
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
      <p><small>Update Elder Periodic Data</small></p>
      <form className="mt-3" name="periodicDataForm" id="periodicDataForm">
        <div className='mb-3 mt-3 text-end'>
          <button type="button" className='btn btn-sm primary-bg-color text-light'>Add More Category</button>
        </div>
        <div className={`form-group`}>
          <label htmlFor="period_missed">Date <span className="text-danger">*</span></label>
          <DatePicker dateFormat="dd-MM-yyyy" selected={""} className='form-control' maxDate={new Date()}/>
        </div>
        {inputList}
        <div className="form-group">
          <label htmlFor="describe">Describe / Explain Problems: <span className="text-danger">*</span></label>
          <textarea name="remarks" id="remarks" rows="3" className="form-control" placeholder="Describe / Explain Problems"></textarea>
        </div>
        <div className='mb-3 mt-3 text-center'>
          <button type="submit" className='btn primary-bg-color text-light min-width-100'>Update</button>
        </div>
      </form>

      <div className="saved-periodic-data">
        <div className="row mt-4">
            <div className="col-6" key={""}>
              <div className="jumbotron rounded p-2">
                <div className="periodic-data position-relative">
                  {/* <div className="btn-delete" onClick={()=>{ deletePeriodicData(child.data_processed_on) }}><FontAwesomeIcon icon={faTrash} /></div> */}
                  <p className="primary-color"><strong>Date -  30/12/2024</strong></p>
                  <p> Body Height in Inches - 42</p>
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


export default ElderPeriodicData;