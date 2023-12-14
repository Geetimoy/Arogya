import React from 'react';
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
import Person from './components/Person';
import Services from './components/Services';
import Notifications from './components/Notifications';

function App() {
  return (
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
            <Route path="/Person" exact element={<Person />} />
            <Route path="/Services" exact element={<Services />} />
            <Route path="/Notifications" exact element={<Notifications />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
