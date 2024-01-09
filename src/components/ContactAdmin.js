import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
import serviceplace from "../assets/images/serviceplace-logo.png";
import footerlogo from "../assets/images/rgvn-logo.png";

import './ContactAdmin.css'


import { Link } from "react-router-dom";

function ContactAdmin(){
  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Contact Administrator</span>
        </div>
        <div className='login-box contact-admin'>
          <img src={logotelehealth} className="m-auto mb-3" alt="logo" />
          <p>You know your USER ID & Password, but you can't login in. You think there is some problem your account, please call us or drop us an email with details. Note: Do not share your password. You let us knwo your device for example, are you using Mobile/Laptop/Desktop? Which browser you are using? Chorme/Explorer/Firefox etc.?  </p>
          <div className='email-phone'><p className='text-left'><FontAwesomeIcon icon={faEnvelope} /> <strong>Email ID:</strong> <Link to="mailto:serviceplace@gmail.com" className='primary-color'> serviceplace@gmail.com</Link></p></div>
          <p><FontAwesomeIcon icon={faPhone} /> <strong>Mobile:</strong> <Link to="tel:9986269411" className='primary-color'>9986269411</Link></p>
          <p className='mt-4'>Back me to <Link to="/login" className="primary-color">login</Link> page or <Link to="/signup" className="primary-color">register</Link> page</p>
          <p className='text-center'>&copy; 2024 rgvn.org. Powered by <Link to="https://www.serviceplace.org/" target="_blank" className="primary-color">ServicePlace.Org</Link></p>
            <div className="text-center login-logo w-100">
              <img src={footerlogo}
                style={{ height: "80px" }}
                className="mx-3"
                alt="" />
              <img src={serviceplace}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
            </div>
        </div>
      </div>
    </div>
  );
}

export default ContactAdmin;