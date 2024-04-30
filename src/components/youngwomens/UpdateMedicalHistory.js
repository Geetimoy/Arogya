import { useState, useContext } from 'react';

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import SystemContext from "../../context/system/SystemContext";

import Appfooter from '../AppFooter';



function UpadteMedicalHistory(){

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
            <h5 className='mx-2 mb-0'>Update Medical History </h5>
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
        <p><small>Update Young Women Medical History</small></p>
        <p><strong>Do you have these problems?</strong></p>
        <form className="mt-3" name="" id="">
          <div className="form-group">
            <label><span className="d-block">Eye  </span></label>
            <select className="form-control">
              <option value="1">Dimness of Vision</option>
              <option value="2">Eye Pain</option>
              <option value="3">Eye Redness</option>
              <option value="4">Watery Eyes</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Ears  </span></label>
            <select className="form-control">
              <option value="1">Hearing Loss</option>
              <option value="2">Water or pus from the ear</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Nose  </span></label>
            <select className="form-control">
              <option value="1">Stuffy Nose</option>
              <option value="2">Runny or watery nose</option>
              <option value="3">Bleeding from the nose</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Mouth  </span></label>
            <select className="form-control">
              <option value="1">Difficulty in Swallowing</option>
              <option value="2">Carries Tooth (cavity etc.)</option>
              <option value="3">Sores on gums</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Digestive system  </span></label>
            <select className="form-control">
              <option value="1">Loss of Appetite</option>
              <option value="2">Nausia/vomiting</option>
              <option value="3">Diarrhea</option>
              <option value="4">Constipation</option>
              <option value="5">Abdominal (stomach) pain</option>
              <option value="6">Blood with stool.</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">General  </span></label>
            <select className="form-control">
              <option value="1">Cough - dry/productive?</option>
              <option value="2">Shortness of breath</option>
              <option value="3">Sound while breathing(whezzing)</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Urinary Problems  </span></label>
            <select className="form-control">
              <option value="1">Frequent Urination</option>
              <option value="2">Burning during urination</option>
            </select>
          </div>
          <div className="form-group">
            <label><span className="d-block">Periods  </span></label>
            <select className="form-control">
              <option value="1">Irregular Periods</option>
              <option value="2">Age of Menarchy(menstruation)</option>
            </select>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Update</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default UpadteMedicalHistory;