import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startParticipant } from '../api';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const res = await startParticipant(); // Ask backend to make a new participant
      localStorage.setItem('participantCode', res.data.participantCode); // Store code in browser
      navigate('/consent'); // Move to the next page
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Perspectives and Participation</h1>
      <p>Welcome to the study. This website will guide you through a short experience about cybersecurity and digital behaviour. It will take around 10–15 minutes. Please click below to begin.</p>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default LandingPage;
