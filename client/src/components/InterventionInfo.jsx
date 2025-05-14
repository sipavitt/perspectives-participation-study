import React from 'react';
import { useNavigate } from 'react-router-dom';

const InterventionInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Important: Intervention Ahead</h2>
      <p>You are about to take part in a cyber security intervention that will last approximately 5 minutes.</p>
      <p>Your full attention is critical to the success of this study. Please focus on the material presented and avoid distractions during this time.</p>

      <div className="button-row">
        <div></div>
        <button onClick={() => navigate('/intervention')}>Continue</button>
      </div>
    </div>
  );
};

export default InterventionInfo;
