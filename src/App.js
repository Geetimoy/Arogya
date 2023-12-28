import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route,} from "react-router-dom";

import './App.css';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import ProfilePhoto from './components/ProfilePhoto';
import ChangePassword from './components/ChangePassword';
import BasicInformation from './components/BasicInformation';
import Verification from './components/Verification';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import Services from './components/Services';
import Notifications from './components/Notifications';
import ContactUs from './components/ContactUs';
import TermsCondition from './components/TermsCondition';
import AboutServicePlace from './components/AboutServicePlace';
<<<<<<< HEAD
import AlertState from './context/alert/AlertState';
=======
import AboutBorn2Help from './components/AboutBorn2Help';
import Feedback from './components/Feedback';
import Help from './components/Help';
>>>>>>> 69c3ea00659a49ceae2d521815525e862c73e415

function App() {
  return (
    <AlertState>
      <div className='container-fluids'>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/logIn" exact element={<LogIn />} />
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/Account" exact element={<Account />} />
            <Route path="/ProfilePhoto" exact element={<ProfilePhoto />} />
            <Route path="/ChangePassword" exact element={<ChangePassword />} />
            <Route path="/BasicInfo" exact element={<BasicInformation />} />
            <Route path="/Verification" exact element={<Verification />} />
            <Route path="/ForgotPassword" exact element={<ForgotPassword />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/Services" exact element={<Services />} />
            <Route path="/Notifications" exact element={<Notifications />} />
            <Route path="/ContactUs" exact element={<ContactUs />} />
            <Route path="/TermsCondition" exact element={<TermsCondition />} />
            <Route path="/AboutServicePlace" exact element={<AboutServicePlace />} />
            <Route path="/AboutBorn2Help" exact element={<AboutBorn2Help />} />
            <Route path="/Offers" exact element={<Feedback />} />
            <Route path="/Help" exact element={<Help />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AlertState>
  );
}

export default App;
