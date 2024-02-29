import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import './firebase.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/patientDashboard' element={<patientDashboard />} />
        <Route path='/doctorDashboard' element={<doctorDashboard />} />
        <Route path='/practitionerDashboard' element={<practitionerDashboard />} />
        <Route path='/adminDashboard' element={<adminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;