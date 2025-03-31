import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Landing from './Landing';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import NgoList from './NgoList';
import Account from './Account';
import ProfilePhoto from './ProfilePhoto';
import ChangePassword from './ChangePassword';
import BasicInformationMain from './BasicInformationMain';
import BasicInformationDoctor from './BasicInformationDoctor';
import BasicInformationPatient from './BasicInformationPatient';
import Verification from './Verification';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import Services from './Services';

import PatientProfiles from './patientprofiles/PatientProfiles';
import PatientBasicInformation from './patientprofiles/PatientBasicInformation';
import ViewPatientDetails from './patientprofiles/ViewPatientDetails';
import CreatePatientProfile from './patientprofiles/CreatePatientProfile';
import PatientTestReports from './patientprofiles/PatientTestReports';
import PatientPrescription from './patientprofiles/PatientPrescription';
import PatientMedicalHistory from './patientprofiles/PatientMedicalHistory';
import PatientBooking from './patientprofiles/PatientBooking';
import PatientPeriodicData from './patientprofiles/PatientPeriodicData';
import PatientBookedAppointment from './patientprofiles/PatientBookedAppointment';
import PatientViewBasicInformation from './patientprofiles/PatientViewBasicInformation';
import PatientViewMedicalHistory from './patientprofiles/PatientViewMedicalHistory';
import PatientViewPeriodicData from './patientprofiles/PatientViewPeriodicData';
import PatientProfilePhoto from './patientprofiles/PatientProfilePhoto';


import Janani from './janani/Janani';
import CreateJanani from './janani/CreateJanani';
import JananiBasicInformation from './janani/JananiBasicInformation';
import JananiUploadPrescriptions from './janani/JananiUploadPrescriptions';
import JananiPeriodicData from './janani/JananiPeriodicData';
import JananiPrescriptions from './janani/JananiPrescriptions';
import JananiMedicalHistory from './janani/JananiMedicalHistory';
import JananiAwarenesssurvey from './janani/JananiAwarenessSurvey';
import JananiTestReports from './janani/JananiTestReports';
import JananiUploadTestReports from './janani/JananiUploadTestReports';
import JananiUploadInitialPrescriptions from './janani/JananiUploadInitialPrescriptions';
import JananiUploadDoctorPrescriptions from './janani/JananiUploadDoctorPrescriptions';
import JananiBooking from './janani/JananiBooking';
import JananiBookedAppointment from './janani/JananiBookedAppointment';
import JananiViewBasicInformation from './janani/JananiViewBasicInformation';
import JananiViewMedicalHistory from './janani/JananiViewMedicalHistory';
import JananiViewPeriodicData from './janani/JananiViewPeriodicData';
import JananiProfilePhoto from './janani/JananiProfilePhoto';

import ChildMalnutrition from './childmalnutrition/ChildMalnutrition';
import CreateChildMalnutrition from './childmalnutrition/CreateChildMalnutrition';
import ChildPrescription from './childmalnutrition/ChildPrescription';
import ChildTestReports from './childmalnutrition/ChildTestReports';
import ChildMedicalHistory from './childmalnutrition/ChildMedicalHistory';
import ChildPeriodicData from './childmalnutrition/ChildPeriodicData';
import ChildAwarenessSurvey from './childmalnutrition/ChildAwarenessSurvey';
import ChildBasicInfo from './childmalnutrition/ChildBasicInfo';
import ChildUploadPrescription from './childmalnutrition/ChildUploadPrescription';
import ChildUploadInitialPrescriptions from './childmalnutrition/ChildUploadInitialPrescriptions';
import ChildUploadDoctorPrescriptions from './childmalnutrition/ChildUploadDoctorPrescriptions';
import ChildUploadTestReports from './childmalnutrition/ChildUploadTestReports';
import ChildBooking from './childmalnutrition/ChildBooking';
import ChildBookedAppointment from './childmalnutrition/ChildBookedAppointment';
import ChildViewBasicInfo from './childmalnutrition/ChildViewBasicInfo';
import ChildViewMedicalHistory from './childmalnutrition/ChildViewMedicalHistory';
import ChildViewPeriodicData from './childmalnutrition/ChildViewPeriodicData';
import ChildProfilePhoto from './childmalnutrition/ChildProfilePhoto';

import YoungWomens from './youngwomens/YoungWomens';
import CreateYoungWomen from './youngwomens/CreateYoungWomen';
import YoungWomanBasicInformation from './youngwomens/YoungWomanBasicInformation';
import UpdateMedicalHistory from './youngwomens/UpdateMedicalHistory';
import UpdatePeriodicData from './youngwomens/UpdatePeriodicData';
import UpdateAwarenessSurvey from './youngwomens/UpdateAwarenessSurvey';
import YoungWomanUploadPrescription from './youngwomens/YoungWomanUploadPrescription';
import YoungWomanUploadDoctorPrescriptions from './youngwomens/YoungWomanUploadDoctorPrescriptions';
import YoungWomanUploadInitialPrescriptions from './youngwomens/YoungWomanUploadInitialPrescriptions';
import YoungWomanPrescriptions from './youngwomens/YoungWomanPrescriptions';
import TestReports from './youngwomens/TestReports';
import YoungWomanPatientBooking from './youngwomens/YoungWomanPatientBooking';
import YoungWomanTestReports from './youngwomens/YoungWomanTestReports';
import YoungWomanUploadTestReports from './youngwomens/YoungWomanUploadTestReports';
import YoungWomanBooking from './youngwomens/YoungWomanBooking';
import YoungWomanBookedAppointment from './youngwomens/YoungWomanBookedAppointment';
import YoungWomanViewBasicInformation from './youngwomens/YoungWomanViewBasicInformation';
import YoungWomanViewMedicalHistory from './youngwomens/YoungWomanViewMedicalHistory';
import YoungWomanViewPeriodicData from './youngwomens/YoungWomanViewPeriodicData';
import YoungWomanProfilePhoto from './youngwomens/YoungWomanProfilePhoto';

import ElderPersons from './elderpersons/ElderPersons';
import CreateElderPerson from './elderpersons/CreateElderPerson';
import ElderBasicInformation from './elderpersons/ElderBasicInformation';
import ElderAwarenessSurvey from './elderpersons/ElderAwarenessSurvey';
import ElderPeriodicData from './elderpersons/ElderPeriodicData';
import ElderMedicalHistory from './elderpersons/ElderMedicalHistory';
import ElderPrescription from './elderpersons/ElderPrescription';
import ElderUploadDoctorPrescriptions from './elderpersons/ElderUploadDoctorPrescriptions';
import ElderUploadInitialPrescriptions from './elderpersons/ElderUploadInitialPrescriptions';
import ElderTestReports from './elderpersons/ElderTestReports';
import ElderUploadTestReports from './elderpersons/ElderUploadTestReports';
import ElderBooking from './elderpersons/ElderBooking';
import ElderBookedAppointment from './elderpersons/ElderBookedAppointment';
import ElderViewBasicInformation from './elderpersons/ElderViewBasicInformation';
import ElderViewPeriodicData from './elderpersons/ElderViewPeriodicData';
import ElderViewMedicalHistory from './elderpersons/ElderViewMedicalHistory`';
import ElderViewAwarenessSuevey from './elderpersons/ElderViewAwarenessSurvey';
import ElderProfilePhoto from './elderpersons/ElderProfilePhoto';


import AppointmentScheduling from './AppointmentScheduling';
import AppointmentSchedulingVolunteer from './AppointmentSchedulingVolunteer';

import DoctorAppointments from './DoctorAppointments';
import PatientProfilesBooking from './PatientProfilesBooking';

import UploadPrescription from './UploadPrescription';
import UploadTestReport from './UploadTestReport';

import CreateSchedule from './CreateSchedule';
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
import InitialHistory from './InitialHistory';
import MedicalHistory from './MedicalHistory';
import ContactAdmin from './ContactAdmin';
import LoginContext from '../context/login/LoginContext';
import AlertContext from '../context/alert/AlertContext';
import SystemContext from '../context/system/SystemContext';
import Alert from './util/Alert';
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from './util/Constants';
import SignUpVerification from './SignUpVerification';
import PatientUploadInitialPrescriptions from './patientprofiles/PatientUploadInitialPrescriptions';
import PatientUploadTestReports from './patientprofiles/PatientUploadTestReports';
import DoctorAppointmentsVolunteer from './DoctorAppointmentsVolunteer';
import PatientUploadDoctorPrescriptions from './patientprofiles/PatientUploadDoctorPrescriptions';







export default function Core() {

  //const domainName = window.location.hostname;
  const domainName = 'sevaapurulia.serviceplace.org.in'; //NGO, system_id=4
  //const domainName = 'ukhraapp.serviceplace.org.in'; //NGO, system_id=3
  //const domainName = 'b2happ.serviceplace.org.in'; //NGO, system_id=1
  //const domainName = 'rgvnapp.serviceplace.org.in';//NGO, system_id=2
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

    if(domainName === "b2happ.serviceplace.org.in"){
      setSystemId("b2happ.serviceplace.org.in");
      var faviconFolder   = '/b2b-favicon/';
      var manifestFolder  = '/b2b-manifest/'
    }
    else if(domainName === "rgvnapp.serviceplace.org.in"){
      setSystemId("rgvnapp.serviceplace.org.in");
      var faviconFolder   = '/rgvn-favicon/';
      var manifestFolder  = '/rgvn-manifest/'
    }
    else if(domainName === "ukhraapp.serviceplace.org.in"){
      setSystemId("ukhraapp.serviceplace.org.in");
      var faviconFolder   = '/ukhra-favicon/';
      var manifestFolder  = '/ukhra-manifest/'
    }
    else if(domainName === "sevaapurulia.serviceplace.org.in"){
      setSystemId("sevaapurulia.serviceplace.org.in");
      var faviconFolder   = '/sevaapurulia-favicon/';
      var manifestFolder  = '/sevaapurulia-manifest/'
    }
    else{
      setSystemId("telehealth.serviceplace.org.in");
      var faviconFolder   = '/telehealth-favicon/';
      var manifestFolder  = '/telehealth-manifest/'
    }
    
    //REPLACE FAVICON PATH
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

    document.querySelector("meta[name='msapplication-TileImage']").setAttribute("href", faviconFolder+'ms-icon-144x144.png');

    //REPLACE MAFIFEST PATH
    document.querySelector("link[rel='manifest']").setAttribute("href", manifestFolder+'manifest.json');

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
      case 'ukhraapp.serviceplace.org.in':
        setPrimaryColor('#f79645');
        setPrimaryBgColor('#f79645');
        break;
      case 'sevaapurulia.serviceplace.org.in':
        setPrimaryColor('#f79645');
        setPrimaryBgColor('#f79645');
        break;
      case 'rgvnapp.serviceplace.org.in':
        setPrimaryColor('#2aa142');
        setPrimaryBgColor('#2aa142');
        break;
      case 'b2happ.serviceplace.org.in':
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
  else if (domainName === "b2happ.serviceplace.org.in") {
    containerClass = 'b2h-container-class';
  } 
  else if (domainName === "rgvnapp.serviceplace.org.in"){
    containerClass = 'rgvn-container-class';
  } 
  else if (domainName === "ukhraapp.serviceplace.org.in"){
    containerClass = 'ukhra-container-class';
  }
  else if (domainName === "sevaapurulia.serviceplace.org.in"){
    containerClass = 'sevaapurulia-container-class';
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
            <Route path="/BasicInfo" exact element={<BasicInformationMain/>} />
            <Route path="/basicinfodoctor" exact element={<BasicInformationDoctor/>} />
            <Route path="/basicinfopatient" exact element={<BasicInformationPatient/>} />
            <Route path="/Services" exact element={<Services />} />

            <Route path="/PatientProfiles" exact element={<PatientProfiles />} />
            <Route path="/patientprofiles/patient-basicinfo/:accountKey" exact element={<PatientBasicInformation />} />
            <Route path="/patientprofiles/ViewPatientDetails/:accountKey" exact element={<ViewPatientDetails />} />
            <Route path="/patientprofiles/CreatePatientProfile/" exact element={<CreatePatientProfile />} />
            <Route path="/patientprofiles/patient-test-reports/:patientKey/:appointmentId" exact element={<PatientTestReports />} />
            <Route path="/patientprofiles/patient-upload-test-reports/:patientKey/:appointmentId" exact element={<PatientUploadTestReports/>} />
            <Route path="/patientprofiles/patient-prescription/:accountKey" exact element={<PatientPrescription />} />
            <Route path="/patientprofiles/patient-prescription/:accountKey/:prescriptionType" exact element={<PatientPrescription />} />
            <Route path="/patientprofiles/patient-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<PatientPrescription />} />
            <Route path="/patientprofiles/patient-upload-prescription/:accountKey/:prescriptionType" exact element={<PatientUploadInitialPrescriptions />} />
            <Route path="/patientprofiles/patient-upload-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<PatientUploadDoctorPrescriptions /> } />
            <Route path="/patientprofiles/patient-medical-history/:accountKey" exact element={<PatientMedicalHistory />} />
            <Route path="/patientprofiles/patient-booking/:accountKey" exact element={<PatientBooking />} />
            <Route path="/patientprofiles/patient-periodic-data/:accountKey" exact element={<PatientPeriodicData />} />
            <Route path="/patientprofiles/patient-booked-appointment/:patientKey" exact element={<PatientBookedAppointment />} />
            <Route path="/patientprofiles/patient-view-basicinfo/:accountKey" exact element={<PatientViewBasicInformation />} />
            <Route path="/patientprofiles/patient-view-medical-history/:accountKey" exact element={<PatientViewMedicalHistory />} />
            <Route path="/patientprofiles/patient-view-periodic-data/:accountKey" exact element={<PatientViewPeriodicData />} />
            <Route path="/patientprofiles/patient-profile-photo/:accountKey" exact element={<PatientProfilePhoto />} />

            
            <Route path="/Janani" exact element={<Janani />} />
            <Route path="/janani/create-janani" exact element={<CreateJanani />} />
            <Route path="/janani/janani-basic-information/:accountKey" exact element={<JananiBasicInformation />} />
            <Route path="/janani/janani-prescription/:accountKey" exact element={<JananiPrescriptions />} />
            <Route path="/janani/janani-prescription/:accountKey/:prescriptionType" exact element={<JananiPrescriptions />} />
            <Route path="/janani/janani-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<JananiPrescriptions />} />
            <Route path="/janani/janani-upload-prescription/:accountKey/:prescriptionType" exact element={<JananiUploadInitialPrescriptions />} />
            <Route path="/janani/janani-upload-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<JananiUploadDoctorPrescriptions /> } />
            <Route path="/janani/janani-periodic-data/:accountKey" exact element={<JananiPeriodicData />} />
            <Route path="/janani/janani-awareness-survey/:accountKey" exact element={<JananiAwarenesssurvey />} />
            <Route path="/janani/janani-medical-history/:accountKey" exact element={<JananiMedicalHistory />} />
            <Route path="/janani/janani-test-reports/:patientKey/:appointmentId" exact element={<JananiTestReports />} />
            <Route path="/janani/janani-upload-test-reports/:patientKey/:appointmentId" exact element={<JananiUploadTestReports/>} />
            <Route path="/janani/janani-booking/:accountKey" exact element={<JananiBooking />} />
            <Route path="/janani/janani-booked-appointment/:patientKey" exact element={<JananiBookedAppointment />} />
            <Route path="/janani/janani-view-basic-information/:accountKey" exact element={<JananiViewBasicInformation />} />
            <Route path="/janani/janani-view-medical-history/:accountKey" exact element={<JananiViewMedicalHistory />} />
            <Route path="/janani/janani-view-periodic-data/:accountKey" exact element={<JananiViewPeriodicData />} />
            <Route path="/janani/janani-profile-photo/:accountKey" exact element={<JananiProfilePhoto />} />

            
            <Route path="/Child-Malnutrition" exact element={<ChildMalnutrition />} />
            <Route path="/Create-Child-Malnutrition" exact element={<CreateChildMalnutrition />} />
            <Route path="/childmalnutrition/child-basic-info/:accountKey" exact element={<ChildBasicInfo/>} />
            <Route path="/childmalnutrition/child-prescription/:accountKey" exact element={<ChildPrescription />} />
            <Route path="/childmalnutrition/child-prescription/:accountKey/:prescriptionType" exact element={<ChildPrescription />} />
            <Route path="/childmalnutrition/child-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<ChildPrescription />} />
            <Route path="/childmalnutrition/child-upload-prescription/:accountKey" exact element={<ChildUploadPrescription />}/>
            <Route path="/childmalnutrition/child-upload-prescription/:accountKey/:prescriptionType" exact element={<ChildUploadInitialPrescriptions />} />
            <Route path="/childmalnutrition/child-upload-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<ChildUploadDoctorPrescriptions /> } />
            <Route path="/childmalnutrition/child-test-reports/:patientKey/:appointmentId" exact element={<ChildTestReports />} />
            <Route path="/childmalnutrition/child-upload-test-reports/:patientKey/:appointmentId" exact element={<ChildUploadTestReports/>} />
            <Route path="/childmalnutrition/child-medical-history/:accountKey" exact element={<ChildMedicalHistory />} />
            <Route path="/childmalnutrition/child-periodic-data/:accountKey" exact element={<ChildPeriodicData />} />
            <Route path="/childmalnutrition/child-awareness-survey/:accountKey" exact element={<ChildAwarenessSurvey />} />
            <Route path="/childmalnutrition/child-booking/:accountKey" exact element={<ChildBooking />} />
            <Route path="/childmalnutrition/child-booked-appointment/:patientKey" exact element={<ChildBookedAppointment />} />
            <Route path="/childmalnutrition/child-view-basic-info/:accountKey" exact element={<ChildViewBasicInfo/>} />
            <Route path="/childmalnutrition/child-view-medical-history/:accountKey" exact element={<ChildViewMedicalHistory/>} />
            <Route path="/childmalnutrition/child-view-periodic-data/:accountKey" exact element={<ChildViewPeriodicData />} />
            <Route path="/childmalnutrition/child-profile-photo/:accountKey" exact element={<ChildProfilePhoto />} />

            <Route path="/YoungWomens" exact element={<YoungWomens />} />
            <Route path="/youngwomens/Create-Young-Women" exact element={<CreateYoungWomen />} />
            <Route path="/youngwomens/young-woman-basicinfo/:accountKey" exact element={<YoungWomanBasicInformation />} />
            <Route path="/youngwomens/update-medical-history/:accountKey" exact element={<UpdateMedicalHistory />} />
            <Route path="/youngwomens/update-periodic-data/:accountKey" exact element={<UpdatePeriodicData />} />
            <Route path="/youngwomens/update-awareness-survey/:accountKey" exact element={<UpdateAwarenessSurvey />} />
            <Route path="/youngwomens/young-woman-prescriptions/:accountKey" exact element={<YoungWomanPrescriptions />} />
            <Route path="/youngwomens/young-woman-prescriptions/:accountKey/:prescriptionType" exact element={<YoungWomanPrescriptions />} />
            <Route path="/youngwomens/young-woman-prescriptions/:accountKey/:prescriptionType/:appointmentId" exact element={<YoungWomanPrescriptions />} />
            <Route path="/youngwomens/young-woman-upload-prescription/:accountKey" exact element={<YoungWomanUploadPrescription />} />
            <Route path="/youngwomens/young-woman-upload-prescription/:accountKey/:prescriptionType" exact element={<YoungWomanUploadInitialPrescriptions />} />
            <Route path="/youngwomens/young-woman-upload-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<YoungWomanUploadDoctorPrescriptions /> } />
            <Route path="/youngwomens/young-woman-test-reports/:patientKey/:appointmentId" exact element={<YoungWomanTestReports />} />
            <Route path="/youngwomens/young-woman-upload-test-reports/:patientKey/:appointmentId" exact element={<YoungWomanUploadTestReports/>} />
            <Route path="/youngwomens/young-woman-patient-booking" exact element={<YoungWomanPatientBooking />} />
            <Route path="/youngwomens/youngwomen-booking/:accountKey" exact element={<YoungWomanBooking />} />
            <Route path="/youngwomens/youngwomen-booked-appointment/:patientKey" exact element={<YoungWomanBookedAppointment />} />
            <Route path="/youngwomens/young-woman-view-basicinfo/:accountKey" exact element={<YoungWomanViewBasicInformation />} />
            <Route path="/youngwomens/young-woman-view-medical-history/:accountKey" exact element={<YoungWomanViewMedicalHistory />} />
            <Route path="/youngwomens/young-woman-view-periodic-data/:accountKey" exact element={<YoungWomanViewPeriodicData />} />
            <Route path="/youngwomens/young-woman-profile-photo/:accountKey" exact element={<YoungWomanProfilePhoto />} />


            <Route path="/Elder-Persons" exact element={<ElderPersons />} />
            <Route path="/elderpersons/Create-Elder-Person" exact element={<CreateElderPerson />} />
            <Route path="/elderpersons/Elder-Basic-Info/:accountKey" exact element={<ElderBasicInformation />} />
            <Route path="/elderpersons/Elder-Awareness-Survey/:accountKey" exact element={<ElderAwarenessSurvey />} />
            <Route path="/elderpersons/Elder-Periodic-Data/:accountKey" exact element={<ElderPeriodicData />} />
            <Route path="/elderpersons/Elder-Medical-History/:accountKey" exact element={<ElderMedicalHistory />} />
            <Route path="/elderpersons/elder-prescription/:accountKey" exact element={<ElderPrescription />} />
            <Route path="/elderpersons/elder-prescription/:accountKey/:prescriptionType" exact element={<ElderPrescription />} />
            <Route path="/elderpersons/elder-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<ElderPrescription />} />
            <Route path="/elderpersons/elder-upload-prescription/:accountKey/:prescriptionType" exact element={<ElderUploadInitialPrescriptions />} />
            <Route path="/elderpersons/elder-upload-prescription/:accountKey/:prescriptionType/:appointmentId" exact element={<ElderUploadDoctorPrescriptions /> } />
            <Route path="/elderpersons/elder-test-reports/:patientKey/:appointmentId" exact element={<ElderTestReports /> } />
            <Route path="/elderpersons/elder-upload-test-reports/:patientKey/:appointmentId" exact element={<ElderUploadTestReports/>} />
            <Route path="/elderpersons/elder-booking/:accountKey" exact element={<ElderBooking />} />
            <Route path="/elderpersons/elder-booked-appointment/:patientKey" exact element={<ElderBookedAppointment />} />
            <Route path="/elderpersons/Elder-View-Basic-Info/:accountKey" exact element={<ElderViewBasicInformation />} />
            <Route path="/elderpersons/Elder-View-Periodic-Data/:accountKey" exact element={<ElderViewPeriodicData />} />
            <Route path="/elderpersons/Elder-view-medical-history/:accountKey" exact element={<ElderViewMedicalHistory />} />
            <Route path="/elderpersons/Elder-View-Awareness-Survey/:accountKey" exact element={<ElderViewAwarenessSuevey />} />
            <Route path="/elderpersons/Elder-profile-photo/:accountKey" exact element={<ElderProfilePhoto />} />
            

            <Route path="/doctor-appointments" exact element={<DoctorAppointments />} />
            <Route path="/doctor-appointments-volunteer" exact element={<DoctorAppointmentsVolunteer/>} />
            <Route path="/patientprofiles-booking/:doctorAccountKey/:scheduleId" exact element={<PatientProfilesBooking />} />

            <Route path="/upload-prescription" exact element={<UploadPrescription />} />
            <Route path="/upload-test-report" exact element={<UploadTestReport />} />
            
            <Route path="/appointment-scheduling" exact element={<AppointmentScheduling />} />
            <Route path="/appointment-scheduling-volunteer" exact element={<AppointmentSchedulingVolunteer />} />
            
            <Route path="/create-schedule/:scheduleType/:scheduleId" exact element={<CreateSchedule />} />
            <Route path="/create-schedule/:scheduleType" exact element={<CreateSchedule />} />

            <Route path="/Bookings/:scheduleId" exact element={<Bookings />} />
            <Route path="/SelectPatient" exact element={<SelectPatient />} />
            <Route path="/Notifications" exact element={<Notifications />} />
            <Route path="/AboutServicePlace" exact element={<AboutServicePlace />} />
            <Route path="/AboutBorn2Help" exact element={<AboutBorn2Help />} />
            <Route path="/About-Ngo" exact element={<AboutNgo />} />
            <Route path="/Feedback" exact element={<Feedback />} />
            <Route path="/Help" exact element={<Help />} />
            <Route path="/Settings" exact element={<Settings />} />
            <Route path="/UploadCertificates" exact element={<UploadCertificates />} />
            <Route path="/InitialHistory" exact element={<InitialHistory />} />
            <Route path="/MedicalHistory" exact element={<MedicalHistory />} />
      
            <Route exact path="/logout" element={<Logout/>}></Route>
            <Route path="/ContactUs" exact element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Routes>
        }
        {
          (isLoggedIn === false) && <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/ngolist" exact element={<NgoList />} />
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
