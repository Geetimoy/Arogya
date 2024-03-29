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
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import Services from './Services';
import PatientProfiles from './PatientProfiles';
import ViewPatientDetails from './ViewPatientDetails';
import CreatePatientProfile from './CreatePatientProfile';
import YoungWomens from './YoungWomens';
import Janani from './Janani';
import ChildMalnutrition from './ChildMalnutrition';
import CreateYoungWomen from './CreateYoungWomen';
import TestReports from './TestReports';
import Bookings from './Bookings';
import SelectPatient from './SelectPatient';
import Notifications from './Notifications';
import ContactUs from './ContactUs';
import TermsOfUse from './TermsOfUse';
import Disclaimer from './Disclaimer';
import AboutServicePlace from './AboutServicePlace';
import AboutBorn2Help from './AboutBorn2Help';
import Feedback from './Feedback';
import Help from './Help';
import Logout from './Logout';
import AboutNgo from './AboutNgo';
import Settings from './Settings';
import UploadCertificates from './UploadCertificates';
import ContactAdmin from './ContactAdmin';
import LoginContext from '../context/login/LoginContext';
import AlertContext from '../context/alert/AlertContext';
import SystemContext from '../context/system/SystemContext';
import Alert from './util/Alert';
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from './util/Constants';
import SignUpVerification from './SignUpVerification';

export default function Core() {

  //const domainName = window.location.hostname;
  const domainName = 'ukhra.serviceplace.org.in'; //NGO, system_id=3
  //const domainName = 'b2h.serviceplace.org.in'; //NGO, system_id=1
  //const domainName = 'rgvn.serviceplace.org.in';//NGO, system_id=2
  //const domainName = 'telehealth.serviceplace.org.in';//Parent NGO, system_id=0
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
      var faviconFolder = '/b2b-favicon/';
    }
    else if(domainName === "rgvn.serviceplace.org.in"){
      setSystemId("rgvn.serviceplace.org.in");
      var faviconFolder = '/rgvn-favicon/';
    }
    else if(domainName === "ukhra.serviceplace.org.in"){
      setSystemId("ukhra.serviceplace.org.in");
      var faviconFolder = '/ukhra-favicon/';
    }
    else{
      setSystemId("telehealth.serviceplace.org.in");
      var faviconFolder = '/telehealth-favicon/';
    }
    
    document.querySelector("link[rel='icon']").setAttribute("href", faviconFolder+'favicon.ico');
    document.querySelector("link[rel='apple-touch-icon']").setAttribute("href", faviconFolder+'logo192.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='57x57']").setAttribute("href", faviconFolder+'apple-icon-57x57.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='60x60']").setAttribute("href", faviconFolder+'apple-icon-60x60.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='72x72']").setAttribute("href", faviconFolder+'apple-icon-72x72.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='76x76']").setAttribute("href", faviconFolder+'apple-icon-76x76.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='114x114']").setAttribute("href", faviconFolder+'apple-icon-114x114.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='120x120']").setAttribute("href", faviconFolder+'apple-icon-120x120.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='144x144']").setAttribute("href", faviconFolder+'apple-icon-144x144.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='152x152']").setAttribute("href", faviconFolder+'apple-icon-152x152.png');
    document.querySelector("link[rel='apple-touch-icon'][sizes='180x180']").setAttribute("href", faviconFolder+'apple-icon-180x180.png');
    document.querySelector("link[rel='icon'][sizes='192x192']").setAttribute("href", faviconFolder+'android-icon-192x192.png');
    document.querySelector("link[rel='icon'][sizes='32x32']").setAttribute("href", faviconFolder+'favicon-32x32.png');
    document.querySelector("link[rel='icon'][sizes='96x96']").setAttribute("href", faviconFolder+'favicon-96x96.png');
    document.querySelector("link[rel='icon'][sizes='16x16']").setAttribute("href", faviconFolder+'favicon-16x16.png');


    if(systemId){
      fetchSystemDetails(systemId);
    } 




    // eslint-disable-next-line
  }, [systemId]);

  const fetchSystemDetails = async(systemId) => {
    
    let jsonData = {
      'system_id':    systemId,
      'device_type':  DEVICE_TYPE,
      'device_token': DEVICE_TOKEN,
      'user_lat':     localStorage.getItem('latitude'),
      'user_long':    localStorage.getItem('longitude')
    };

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
    console.log(systemDetailsArray);
  }

  // For Color Dynamic
  const [domain, setDomain] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2aa142'); // Default color
  const [primaryBgColor, setPrimaryBgColor] = useState('#2aa142'); 

  // Function to get the current domain
  const getCurrentDomain = () => {
  const currentDomain = window.location.hostname;
  //console.log(currentDomain);
  setDomain(domainName);
  };

  // Function to set the primary color based on the domain
  const setColorByDomain = () => {
    switch (domain) {
      case 'telehealth.serviceplace.org.in':
        setPrimaryColor('#2aa142');
        setPrimaryBgColor('#2aa142');
        break;
      case 'ukhra.serviceplace.org.in':
        setPrimaryColor('#f79645');
        setPrimaryBgColor('#f79645');
        break;
      case 'rgvn.serviceplace.org.in':
        setPrimaryColor('#2aa142');
        setPrimaryBgColor('#2aa142');
        break;
      case 'b2h.serviceplace.org.in':
        setPrimaryColor('#c10000');
        setPrimaryBgColor('#c10000');
        break;
      default:
        setPrimaryColor('#2aa142'); // Default color: black
        break;
    }
  };

  // Effect to get the current domain and set the primary color
  useEffect(() => {
    getCurrentDomain();
    setColorByDomain();
   // eslint-disable-next-line
  }, [domain]);


  var containerClass = "serviceplace-container-class";

  if (domainName === "telehealth.serviceplace.org.in") {
    containerClass = 'serviceplace-container-class';
  } 
  else if (domainName === "b2h.serviceplace.org.in") {
    containerClass = 'b2h-container-class';
  } 
  else if (domainName === "rgvn.serviceplace.org.in"){
    containerClass = 'rgvn-container-class';
  } 
  else if (domainName === "ukhra.serviceplace.org.in"){
    containerClass = 'ukhra-container-class';
  } 
  
  const isLoggedIn = loginContext.loginState.is_logged_in;

  useEffect(()=>{
    //console.log(systemContext.systemDetails.thp_system_colors);
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <div className={`container-fluids ${containerClass}`}>
        {alertContext.alertMessage.show && <Alert type={alertContext.alertMessage.type} message={alertContext.alertMessage.message}/>}
        {
          (isLoggedIn === true) && <Routes>
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/Account" exact element={<Account />} />
            <Route path="/ProfilePhoto" exact element={<ProfilePhoto />} />
            <Route path="/ChangePassword" exact element={<ChangePassword />} />
            <Route path="/BasicInfo" exact element={<BasicInformation />} />
            <Route path="/Services" exact element={<Services />} />
            <Route path="/PatientProfiles" exact element={<PatientProfiles />} />
            <Route path="/ViewPatientDetails" exact element={<ViewPatientDetails />} />
            <Route path="/CreatePatientProfile" exact element={<CreatePatientProfile />} />
            <Route path="/YoungWomens" exact element={<YoungWomens />} />
            <Route path="/Janani" exact element={<Janani />} />
            <Route path="/Child-Malnutrition" exact element={<ChildMalnutrition />} />
            <Route path="/Create-Young-Women" exact element={<CreateYoungWomen />} />
            <Route path="/TestReports" exact element={<TestReports />} />
            <Route path="/Bookings" exact element={<Bookings />} />
            <Route path="/SelectPatient" exact element={<SelectPatient />} />
            <Route path="/Notifications" exact element={<Notifications />} />
            <Route path="/AboutServicePlace" exact element={<AboutServicePlace />} />
            <Route path="/AboutBorn2Help" exact element={<AboutBorn2Help />} />
            <Route path="/About-Ngo" exact element={<AboutNgo />} />
            <Route path="/Feedback" exact element={<Feedback />} />
            <Route path="/Help" exact element={<Help />} />
            <Route path="/Settings" exact element={<Settings />} />
            <Route path="/UploadCertificates" exact element={<UploadCertificates />} />
            <Route exact path="/logout" element={<Logout/>}></Route>
            <Route path="/ContactUs" exact element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Routes>
        }
        {
          (isLoggedIn === false) && <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/logIn" exact element={<LogIn colorname={primaryColor} bgcolor={primaryBgColor}/>} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/TermsOfUse" exact element={<TermsOfUse />} />
            <Route path="/Disclaimer" exact element={<Disclaimer />} />
            <Route path="/ForgotPassword" exact element={<ForgotPassword />} />
            <Route path="/Contact-Admin" exact element={<ContactAdmin />} />
            <Route path="/Verification/:loginId" exact element={<Verification />} />
            <Route path="/Signup-Verification/:loginId" exact element={<SignUpVerification />} />
            <Route path="/ResetPassword/:loginId" exact element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/"/>}></Route>
          </Routes>
        }
      </div>
    </BrowserRouter>
  )
}
