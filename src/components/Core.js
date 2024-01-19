import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Landing from './Landing';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import Account from './Account';
import ProfilePhoto from './ProfilePhoto';
import ChangePassword from './ChangePassword';
import BasicInformation from './BasicInformation';
import Verification from './Verification';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import Services from './Services';
import Notifications from './Notifications';
import ContactUs from './ContactUs';
import TermsCondition from './TermsCondition';
import Disclaimer from './Disclaimer';
import AboutServicePlace from './AboutServicePlace';
import AboutBorn2Help from './AboutBorn2Help';
import Feedback from './Feedback';
import Help from './Help';
import Logout from './Logout';
import ContactAdmin from './ContactAdmin';
import LoginContext from '../context/login/LoginContext';
import AlertContext from '../context/alert/AlertContext';
import SystemContext from '../context/system/SystemContext';
import Alert from './util/Alert';
import { API_URL } from './util/Constants';

export default function Core() {

  //const domainName = window.location.hostname;
  // const domainName = 'telehealth.serviceplace.org.in';
  // const domainName = 'b2h.serviceplace.org.in';
  // const domainName = 'rgvn.serviceplace.org.in';
  const domainName = 'telehealth.serviceplace.org.in';
  const [systemId, setSystemId] = useState(null);

  const loginContext  = useContext(LoginContext);
  const alertContext  = useContext(AlertContext);
  const systemContext = useContext(SystemContext);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser.");
        return;
      }

      if ("geolocation" in navigator) { 
        navigator.geolocation.getCurrentPosition(
          (position) => { 
            const { latitude, longitude } = position.coords;
            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);
          },
          (error) => {
            console.error(`Error getting location: ${error.message}`);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    };

    getLocation();

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(domainName === "b2h.serviceplace.org.in"){
      setSystemId("b2h.serviceplace.org.in");
    }
    else if(domainName === "rgvn.serviceplace.org.in"){
      setSystemId("rgvn.serviceplace.org.in");
    }
    else if(domainName === "ukhra.serviceplace.org.in"){
      setSystemId("ukhra.serviceplace.org.in");
    }
    else{
      setSystemId("telehealth.serviceplace.org.in");
    }
  

    if(systemId){
      fetchSystemDetails(systemId);
    } 

    // eslint-disable-next-line
  }, [systemId]);

  const fetchSystemDetails = async(systemId) => {
    let jsonData = {'system_id': systemId};
    const response = await fetch(`${API_URL}/appCoreSettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData)
    });

    let result = await response.json();
    let systemDetailsArray = result['data'].results;
    systemDetailsArray['system_id'] = systemId;
    document.title = systemDetailsArray['thp_system_name'];
    systemContext.updateSystemDetails(systemDetailsArray);
  }

  const [domain, setDomain] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2aa142'); // Default color

  // Function to get the current domain
  const getCurrentDomain = () => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);
  };

  // Function to set the primary color based on the domain
  const setPrimaryColorByDomain = () => {
    switch (domain) {
      case 'telehealth.serviceplace.org.in':
        setPrimaryColor('#2aa142');
        break;
      case 'ukhra.serviceplace.org.in':
        setPrimaryColor('#f79645');
        break;
      case 'rgvn.serviceplace.org.in':
        setPrimaryColor('#2aa142');
        break;
      case 'b2h.serviceplace.org.in':
        setPrimaryColor('#c00000');
        break;
      default:
        setPrimaryColor('#2aa142'); // Default color: black
        break;
    }
  };

  // Effect to get the current domain and set the primary color
  useEffect(() => {
    getCurrentDomain();
    setPrimaryColorByDomain();
    // eslint-disable-next-line
  }, [domain]);
  
  console.log(systemContext.systemDetails);

  const isLoggedIn = loginContext.loginState.is_logged_in;

  return (
    <BrowserRouter>
      <div className='container-fluids'>
        {alertContext.alertMessage.show && <Alert type={alertContext.alertMessage.type} message={alertContext.alertMessage.message}/>}
        {
          (isLoggedIn === true) && <Routes>
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/Account" exact element={<Account />} />
            <Route path="/ProfilePhoto" exact element={<ProfilePhoto />} />
            <Route path="/ChangePassword" exact element={<ChangePassword />} />
            <Route path="/BasicInfo" exact element={<BasicInformation />} />
            <Route path="/Services" exact element={<Services />} />
            <Route path="/Notifications" exact element={<Notifications />} />
            <Route path="/AboutServicePlace" exact element={<AboutServicePlace />} />
            <Route path="/AboutBorn2Help" exact element={<AboutBorn2Help />} />
            <Route path="/Offers" exact element={<Feedback />} />
            <Route path="/Help" exact element={<Help />} />
            <Route exact path="/logout" element={<Logout/>}></Route>
            <Route path="/ContactUs" exact element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Routes>
        }
        {
          (isLoggedIn === false) && <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/logIn" exact element={<LogIn />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/TermsCondition" exact element={<TermsCondition />} />
            <Route path="/Disclaimer" exact element={<Disclaimer />} />
            <Route path="/ForgotPassword" exact element={<ForgotPassword />} />
            <Route path="/ContactAdmin" exact element={<ContactAdmin />} />
            <Route path="/Verification" exact element={<Verification />} />
            <Route path="*" element={<Navigate to="/"/>}></Route>
          </Routes>
        }
      </div>
    </BrowserRouter>
  )
}
