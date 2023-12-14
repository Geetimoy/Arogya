import './Landing.css';

import logo from '../logo.png';
import born2help from '../assets/images/born2help-logo.png';
import serviceplace from '../assets/images/serviceplace-logo.png';

import { Link } from "react-router-dom";

function Landing() {
  return(
    <div className='splash-container'>
      <div className='container'>
        <header className="App-header">
          <img src={logo} className="" alt="logo" />
          <h2>Welcome to Arogya</h2>
          <div className='btn btn-danger mb-5 mt-5 w-100'><Link to ="/login" className='m-auto text-light text-decoration-none d-block'>Get Started</Link></div>
        </header>
      
        <div className='footerLogo d-flex justify-content-between'>
          <img src={born2help} className='' alt=''/>
          <img src={serviceplace} className='' alt=''/>
        </div>
      </div>
    </div>
  );
}

export default Landing;

