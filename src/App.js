import React from 'react';
import { BrowserRouter, Routes, Route,} from "react-router-dom";

import './App.css';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import Account from './components/Account'


function App() {
  return (
      <div className='container-fluids'>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/logIn" exact element={<LogIn />} />
            <Route path="/Dashboard" exact element={<Dashboard />} />
            <Route path="/Account" exact element={<Account />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
