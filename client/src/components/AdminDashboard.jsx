import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/participants/all');
        setParticipants(res.data);
      } catch (err) {
        console.error('Failed to fetch participants:', err);
        alert('Error fetching participant data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>
      <strong>Total Participants:</strong> {participants.length}<br />
      <strong>Completed Intervention:</strong> {
      participants.filter(p => p.interventionCompleted).length
      }
      </p>


      <p>Total participants: {participants.length}</p>

<button
  onClick={() => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin';
  }}
  style={{ float: 'right' }}
>
  Logout
</button>

<a
  href="/api/participants/export"
  download
  style={{ display: 'inline-block', margin: '1rem 0', padding: '0.5rem 1rem', background: '#007bff', color: '#fff', textDecoration: 'none' }}
>
  📥 Download CSV
</a>



      <table border="1" cellPadding="6" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Group</th>
            <th>Completed</th>
            <th>Withdrawn</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p.participantCode}>
              <td>{p.participantCode}</td>
              <td>{p.groupAssignment || '—'}</td>
              <td>{p.interventionCompleted ? '✅' : '❌'}</td>
              <td>{p.withdrawn ? '✅' : ''}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
