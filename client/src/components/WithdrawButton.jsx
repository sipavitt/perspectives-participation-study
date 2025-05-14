import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withdrawParticipant } from '../api';

const WithdrawButton = () => {
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    const confirm = window.confirm("Are you sure you want to withdraw from the study? Your data will be deleted.");
    if (!confirm) return;

    const code = localStorage.getItem('participantCode');
    if (!code) return;

    try {
      await withdrawParticipant({ code });
      localStorage.clear();
      navigate('/withdrawn');
    } catch (err) {
      console.error("Withdrawal failed:", err);
      alert("Something went wrong. Please try again or contact the research team.");
    }
  };

  return (
    <button className="withdraw-btn" onClick={handleWithdraw}>
      Withdraw from Study
    </button>
  );
};

export default WithdrawButton;
