import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startParticipant } from '../api';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const response = await startParticipant();
      const { participantCode } = response.data;
      if (!participantCode) throw new Error('No participant code returned');

      localStorage.setItem('participantCode', participantCode);
      navigate('/consent');
    } catch (err) {
      console.error('Error creating participant:', err);
      alert('There was an issue starting the study. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Welcome to the Perspectives and Participation Study</h1>
      <hr />
      <br />

      <p>
        Thank you for your interest! This short online study explores how different types of training materials affect how people think about cyber-security at work.
      </p>

      <h3>What’s involved?</h3>
      <ul>
        <li>You’ll watch a short video (about 5 minutes)</li>
        <li>Then you’ll complete a short questionnaire about your views and motivations</li>
        <li>The whole study takes <strong>10–15 minutes</strong></li>
      </ul>

      <h3>Who can take part?</h3>
      <ul>
        <li>Aged between 18 and 65</li>
        <li>Fluent in English</li>
        <li>No cyber-security knowledge needed</li>
      </ul>

      <h3>Your data and your rights</h3>
      <ul>
        <li>Your responses are <strong>anonymous</strong> — we do not collect names or contact details</li>
        <li>You can <strong>withdraw at any time</strong> before clicking the final submit button</li>
        <li>After you submit, your data is anonymised and can’t be withdrawn</li>
      </ul>

      <h3>Why take part?</h3>
      <p>
        Your responses will help researchers better understand how to support secure behaviour in everyday working life.
        This study has been approved by The Open University’s Human Research Ethics Committee.
      </p>

      <p>
        If you’re ready, click below to get started.
      </p>

      <p>
        If you have questions, feel free to contact the lead researcher:<br />
        <strong>Si Pavitt</strong><br />
        <a href="mailto:simon.pavitt@open.ac.uk">simon.pavitt@open.ac.uk</a>
      </p>

      <div className="button-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <a
          href="/assets/docs/20250518%20-%20Participant%20Information%20Sheet.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          View Participant Information Sheet
        </a>
        <button onClick={handleStart}>Continue to Consent Form</button>
      </div>
    </div>
  );
};

export default LandingPage;
