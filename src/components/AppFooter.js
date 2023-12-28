import { Link } from "react-router-dom";
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';

import './AppFooter.css'
  
  function Appfooter(){
    return(
      <div className='app-footer'>
        <div className='action-items'>
          <div className='d-flex align-items-center justify-content-around'>
            <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Home </span></Link>
            <Link to="/services"><FontAwesomeIcon icon={faHandHoldingMedical} /> <span>Services </span></Link>
            <Link to="/account"><FontAwesomeIcon icon={faUser} /> <span>Account</span></Link>
          </div>
        </div>
      </div>
    );
  }

  export default Appfooter;