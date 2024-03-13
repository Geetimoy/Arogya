import { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";
import Appfooter from './AppFooter';


function CraeteYoungWomen(){
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
              <Link to="/youngwomens" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Young Women Profile </h5>
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
      <div className='app-body form-all create-young-woman'>
       
        <p><small>Add Young Women Informations</small></p>
        <form className="mt-3" name="" id="">
          <div className="form-group">
            <label htmlFor="full_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="full_name" id="" placeholder="Full Name" />
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
              <option value="1">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="age" id="" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control">
              <option value="1" selected="">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" name="phone" id="" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input type="text" className="form-control" name="email" id="" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="address" id="" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="add2">Address 2 </label>
            <input type="text" className="form-control" name="add2" id="" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="landmark">Landmark </label>
            <input type="text" className="form-control" name="landmark" id="" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="place">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="place" id="" placeholder="Village/Town/City" />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode </label>
            <input type="text" className="form-control" name="pincode" id="" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Servie Area :</span></label>
            <select className="form-control">
              <option value="1" selected="">Ukhra</option>
              <option value="2">B2B</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" name="special_note" id="" placeholder="Special Notes" />
          </div>
          <div className="form-group">
            <label htmlFor="school_name">School Name </label>
            <input type="text" className="form-control" name="school_name" id="" placeholder="School Name" />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class </label>
            <input type="text" className="form-control" name="class" id="" placeholder="Class" />
          </div>
          <div className="form-group">
            <label htmlFor="class">Section </label>
            <input type="text" className="form-control" name="section" id="" placeholder="Section" />
          </div>
          <div className='form-group'>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="customCheckChild" name="child" />
              <label className="custom-control-label" for="customCheckChild">Is Child?</label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="customCheckYoungWomen" name="youngwomen" />
              <label className="custom-control-label" for="customCheckYoungWomen">Is Young Women?</label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="customCheckJanani" name="janani" />
              <label className="custom-control-label" for="customCheckJanani">Is Janani?</label>
            </div>

          </div>
          <div className='mb-3 mt-3'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Create Young Women Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default CraeteYoungWomen;