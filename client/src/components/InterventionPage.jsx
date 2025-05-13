import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignGroup } from '../api';

const InterventionPage = () => {
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const code = localStorage.getItem('participantCode');
    if (!code) return;

    const fetchGroup = async () => {
      try {
        const res = await assignGroup({ code });
        setGroup(res.data.group);
        console.log("Assigned group:", res.data.group);
      } catch (err) {
        console.error("Error assigning group:", err);
      }
    };

    fetchGroup();
  }, []);

  if (!group) return <p>Loading your experience...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Intervention: {group}</h2>

      {group === 'game1' && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
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

      {group === 'game2' && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
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

      {group === 'video1' && (
        <iframe
          title="Video 1"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/H_bB0sAqLNg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {group === 'video2' && (
        <iframe
          title="Video 2"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/R6DiFlAXrS0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {group === 'video3' && (
        <iframe
          title="Video 3"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/GVuiftq3KsI"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/post-survey')}>
          Continue to Survey
        </button>
      </div>
    </div>
  );
};

export default InterventionPage;
