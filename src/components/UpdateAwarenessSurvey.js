import { useState, useContext } from 'react';

import Appfooter from "./AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../context/system/SystemContext";

import SliderRating from './SliderRating';

import './UpdateAwarenessSurvey.css'

function UpdateAwarenessSurvey(){
  const systemContext = useContext(SystemContext);
  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const handleRatingChange = (value) => {
    console.log('Rating changed:', value);
    // You can handle the rating change here
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
            <h5 className='mx-2 mb-0'>Update Awareness Survey </h5>
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
      <div className='app-body form-all update-awareness-survey'>
        <p><strong>Health Awareness Survey</strong></p>
        <p>How knowledgeable do you feel about the following areas of young women's health</p>
        <form>
          <div className='form-group'>
            <label>1. Menstruation Cycle - why and how it happens? </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>2. Menstruation Hygiene - methods available including, pads, cups, etc. </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>3. General cleanliness and regular washing </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>4. Iron and blood loss due to menstruation,  Anemia and treatments </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>5. Nutrition choices for young women's health </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>6. Pregnancy prevention </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>7. Resources available from ASHA workers, community </label>
            <SliderRating onChange={handleRatingChange} />
          </div>
          <div className='form-group'>
            <label>8. Any other areas you would like further education and support (write)</label>
            <textarea id="" rows="3"  className="form-control" placeholder="" name='comments'></textarea>
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Submit</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default UpdateAwarenessSurvey;