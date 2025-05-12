const Participant = require('../models/Participant');

const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excludes confusing ones
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

exports.createParticipant = async (req, res) => {
  try {
    let code;
    let exists = true;
    while (exists) {
      code = generateCode();
      exists = await Participant.findOne({ participantCode: code });
    }

    const participant = new Participant({ participantCode: code });
    await participant.save();
    res.status(201).json({ participantCode: code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other controllers (saveConsent, assignGroup, etc.) will follow
