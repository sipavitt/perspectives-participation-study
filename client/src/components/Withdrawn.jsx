import React from 'react';

const Withdrawn = () => (
  <div className="container">
  <h1>You Have Withdrawn from the Study</h1>

  <p>
    Your decision to withdraw has been recorded, and any responses you may have submitted so far have been permanently deleted. You will not be included in the study data.
  </p>

  <p>
    Thank you for your time and consideration. We understand that participation is voluntary, and we appreciate your interest.
  </p>

  <p>
    If you have any questions about the study or your participation, please feel free to contact the lead researcher:
  </p>

  <p>
    <strong>Si Pavitt</strong><br />
    <a href="mailto:simon.pavitt@open.ac.uk">simon.pavitt@open.ac.uk</a>
  </p>

  <p>
    If you would prefer to speak with someone independent of the research team, you can contact:
  </p>

  <p>
    <strong>Professor Zoe Walkington</strong><br />
    <a href="mailto:z.walkington@open.ac.uk">z.walkington@open.ac.uk</a>
  </p>

  <p>
    If you change your mind and wish to take part after all, you're welcome to begin the study again from the start by visiting the main study page:
  </p>

  <p>
    <a href="/" className="button-link">Return to Start</a>
  </p>
  </div>
);

export default Withdrawn;
