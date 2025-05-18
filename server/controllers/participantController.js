const Participant = require('../models/Participant');

// Helper to generate unique 4-letter participant code
const generateCode = async () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code, exists;
  do {
    code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    exists = await Participant.findOne({ participantCode: code });
  } while (exists);
  return code;
};

// Create new participant
exports.createParticipant = async (req, res) => {
  try {
    const code = await generateCode();
    const participant = new Participant({ participantCode: code });
    await participant.save();
    res.status(201).json({ participantCode: code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save consent responses
exports.saveConsent = async (req, res) => {
  const { code, consentGiven } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { consentGiven },
      { new: true }
    );

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Consent saving failed.' });
  }
};



// Save demographics
exports.saveDemographics = async (req, res) => {
  const { code, demographics } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { demographics },
      { new: true }
    );
    res.json(participant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign group with balancing logic (5 groups, labelled)
exports.assignGroup = async (req, res) => {
  const { code } = req.body;

  try {
    // Count participants per numeric groupAssignment
    const counts = await Participant.aggregate([
      { $match: { groupAssignment: { $ne: null } } },
      { $group: { _id: "$groupAssignment", count: { $sum: 1 } } }
    ]);

    const groupCounts = Array(5).fill(0);
    counts.forEach(g => {
      const index = g._id - 1; // _id is the group number
      if (index >= 0 && index < 5) {
        groupCounts[index] = g.count;
      }
    });

    const minCount = Math.min(...groupCounts);
    const group = groupCounts.indexOf(minCount) + 1;

    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { groupAssignment: group },
      { new: true }
    );

    res.json({ group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



// Mark intervention complete
exports.markInterventionComplete = async (req, res) => {
  const { code } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { interventionCompleted: true },
      { new: true }
    );
    res.json(participant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save post-survey responses
exports.savePostSurvey = async (req, res) => {
  const { code, responses } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { postSurvey: responses },
      { new: true }
    );
    console.log(`Saved post-survey for ${code}:`, responses);
    res.json({ success: true });
  } catch (err) {
    console.error("Post-survey save error:", err.message);
    res.status(500).json({ message: err.message });
  }
};




// Handle withdraw
exports.withdrawParticipant = async (req, res) => {
  const { code } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { withdrawn: true, consent: [], demographics: {}, postSurvey: {} },
      { new: true }
    );
    res.json({ message: "Participant withdrawn", code: participant.participantCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
