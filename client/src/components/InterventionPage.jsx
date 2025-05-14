import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignGroup, markInterventionComplete } from '../api';
import WithdrawButton from './WithdrawButton';


const InterventionPage = () => {
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const code = localStorage.getItem('participantCode');
    if (!code) return;

    const assign = async () => {
      try {
        const res = await assignGroup({ code });
        const assignedGroup = res.data.group;
        setGroup(assignedGroup);

        await markInterventionComplete({ code });
        console.log(`Assigned group ${assignedGroup} and marked intervention complete.`);
      } catch (err) {
        console.error("Error during group assignment or completion:", err);
      }
    };

    assign();
  }, []);

  if (!group) return <p>Loading your experience...</p>;

  return (
    <div className="container">
      <h2>Intervention Condition {group}</h2>

      {group === 1 && (
        <div className="responsive-iframe-wrapper">
          <iframe
            src="https://player.stornaway.io/embed/139314b9"
            title="Game 1"
            frameBorder="0"
            allow="accelerometer; gyroscope; autoplay; xr-spatial-tracking"
            allowFullScreen
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          />
        </div>
      )}

      {group === 2 && (
       <div className="responsive-iframe-wrapper">
        <iframe
          title="Video 1"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/H_bB0sAqLNg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
       </div>
      )}

      {group === 3 && (
       <div className="responsive-iframe-wrapper">
         <iframe
          title="Video 2"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/R6DiFlAXrS0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
       </div>
      )}

      {group === 4 && (
        <div className="responsive-iframe-wrapper">
          <iframe
            src="https://player.stornaway.io/embed/139314b9"
            title="Game 2"
            frameBorder="0"
            allow="accelerometer; gyroscope; autoplay; xr-spatial-tracking"
            allowFullScreen
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          />
        </div>
      )}

      {group === 5 && (
        <div className="responsive-iframe-wrapper">
         <iframe
          title="Video 3"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/GVuiftq3KsI"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
       </div>
      )}

      <div className="button-row">
        <WithdrawButton />
        <button onClick={() => navigate('/post-survey')}>
          Continue to Survey
        </button>
      </div>
    </div>
  );
};

export default InterventionPage;
