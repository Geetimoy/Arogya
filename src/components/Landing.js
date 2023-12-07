import './Landing.css';

import logo from '../logo.png';
import rgvnlogo from '../assets/images/rgvn-logo.png';
import serviceplace from '../assets/images/serviceplace-logo.png';

function Landing() {
  return(
    <div className='container'>
      <header className="App-header">
        <img src={logo} className="" alt="logo" />
        <h2>Welcome to Arogya</h2>
      </header>
      <div className='footerLogo d-flex justify-content-between'>
        <img src={rgvnlogo} className='' alt=''/>
        <img src={serviceplace} className='' alt=''/>
      </div>
    </div>
  );
}

export default Landing;

