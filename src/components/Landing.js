import './Landing.css';

// import logo from '../logo.png';
//import logotelehealth from '../assets/images/rgvn-telehealth-logo.png';
//import born2help from '../assets/images/born2help-logo.png';
//import serviceplace from '../assets/images/serviceplace-logo.png';
//import footerlogo from '../assets/images/rgvn-logo.png';

import { Link } from "react-router-dom";
import SystemContext from '../context/system/SystemContext';
import { useContext } from 'react';

function Landing() {
  const systemContext = useContext(SystemContext);

  let redirectUrl = '/ngolist';
  if(systemContext.systemDetails.system_id != 'telehealth.serviceplace.org.in'){
    redirectUrl = '/login';
  }

  return(
    <div className='splash-container'>
      <div className='container'>
        <header className="App-header">
          <img src={systemContext.systemDetails.thp_app_logo_url} className="mb-3" alt="logo" />
          <h2>Welcome to {systemContext.systemDetails.thp_system_name}</h2>
          <div className='btn primary-bg-color mb-5 mt-5 w-100 border-0'>
            <Link to ={redirectUrl} className='m-auto text-light text-decoration-none d-block'>Get Started</Link>
          </div>
        </header>
      
        <div className='footerLogo text-center'>
          {/* {systemContext.systemDetails.system_id !== "telehealth.serviceplace.org.in" && <img src={systemContext.systemDetails.thp_ngo_logo_url} className='mx-3' alt=''/>}
          <img src={systemContext.systemDetails.thp_sp_global_logo_url} className='mx-3' alt=''/> */}

          {systemContext.systemDetails.system_id !== "telehealth.serviceplace.org.in" && 
          <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>}
          <Link to={systemContext.systemDetails.thp_sp_global_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

