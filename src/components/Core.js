import React, { useContext } from 'react';
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
import AboutServicePlace from './AboutServicePlace';
import AboutBorn2Help from './AboutBorn2Help';
import Feedback from './Feedback';
import Help from './Help';
import Logout from './Logout';
import LoginContext from '../context/login/LoginContext';
import AlertContext from '../context/alert/AlertContext';
import Alert from './util/Alert';

export default function Core() {

  const loginContext = useContext(LoginContext);
  const alertContext = useContext(AlertContext);

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
            <Route exact path="/logout" element={<Logout/>}></Route>
            <Route path="*" element={<Navigate to="/dashboard"/>}></Route>
          </Routes>
        }
        {
          (isLoggedIn === false) && <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/logIn" exact element={<LogIn />} />
            <Route path="*" element={<Navigate to="/"/>}></Route>
          </Routes>
        }
      </div>
    </BrowserRouter>
  )
}
