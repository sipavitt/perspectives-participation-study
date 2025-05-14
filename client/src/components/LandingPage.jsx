import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { startParticipant } from '../api';

const LandingPage = () => {
  const navigate = useNavigate();

  // Prevent repeat participation from same browser
  useEffect(() => {
    if (localStorage.getItem('hasParticipated')) {
      navigate('/already-participated');
    }
  }, [navigate]);

  const handleStart = async () => {
    try {
      const res = await startParticipant();
      console.log("Participant code:", res.data.participantCode);

      localStorage.setItem('participantCode', res.data.participantCode);
      localStorage.setItem('hasParticipated', 'true'); // Set repeat block flag
      navigate('/consent');
    } catch (err) {
      console.error("Error starting participant:", err);
      alert("Something went wrong. Please refresh and try again.");
    }
  };

  return (
    <div className="container">
      <h1>Perspectives and Participation</h1>
      <p>This study will guide you through a short interactive experience about cybersecurity. It will take around 10–15 minutes. Click below to begin.</p>
      <button onClick={handleStart}>Start Study</button>
<p style={{ marginTop: '1rem' }}>
  <a
    href="https://github.com/sipavitt/perspectives-participation-study/issues/new?template=bug_report.md"
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontSize: '0.9rem', color: '#555' }}
  >
    Report a Bug
  </a>
</p>

    </div>
  );
};

export default LandingPage;
