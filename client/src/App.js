import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ConsentForm from './components/ConsentForm';
import DemographicsForm from './components/DemographicsForm';
import InterventionPage from './components/InterventionPage';
import PostSurvey from './components/PostSurvey';
import Debrief from './components/Debrief';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consent" element={<ConsentForm />} />
        <Route path="/demographics" element={<DemographicsForm />} />
        <Route path="/intervention" element={<InterventionPage />} />
        <Route path="/post-survey" element={<PostSurvey />} />
        <Route path="/debrief" element={<Debrief />} />
      </Routes>
    </Router>
  );
}

export default App;
