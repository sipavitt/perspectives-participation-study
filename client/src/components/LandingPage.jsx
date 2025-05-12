import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startParticipant } from '../api';

const LandingPage = () => {
  const navigate = useNavigate();

const handleStart = async () => {
  try {
    const res = await startParticipant();
    console.log("Participant code:", res.data.participantCode); // Add this
    localStorage.setItem('participantCode', res.data.participantCode);
    navigate('/consent');
  } catch (err) {
    console.error("Error starting participant:", err);
    alert("Something went wrong. Please refresh and try again.");
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Perspectives and Participation</h1>
      <p>This study will guide you through a short interactive experience about cybersecurity. It will take around 10–15 minutes. Click below to begin.</p>
      <button onClick={handleStart}>Start Study</button>
    </div>
  );
};

export default LandingPage;
