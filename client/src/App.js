import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ConsentForm from './components/ConsentForm';
import DemographicsForm from './components/DemographicsForm';
import InterventionPage from './components/InterventionPage';
import PostSurvey from './components/PostSurvey';
import Debrief from './components/Debrief';
import ThankYou from './components/ThankYou';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';


function App() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consent" element={<ConsentForm />} />
        <Route path="/demographics" element={<DemographicsForm />} />
        <Route path="/intervention" element={<InterventionPage />} />
        <Route path="/post-survey" element={<PostSurvey />} />
        <Route path="/debrief" element={<Debrief />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;

