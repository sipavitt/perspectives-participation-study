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
  const { code, consent } = req.body;
  try {
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { consent },
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

  const groupLabels = ['game1', 'game2', 'video1', 'video2', 'video3'];

  try {
    // Count how many participants per group label
    const counts = await Participant.aggregate([
      { $match: { group: { $ne: null } } },
      { $group: { _id: "$group", count: { $sum: 1 } } }
    ]);

    // Build a lookup of label -> count
    const groupCounts = {};
    groupLabels.forEach(label => { groupCounts[label] = 0; });
    counts.forEach(g => {
      groupCounts[g._id] = g.count;
    });

    // Find the label with the lowest count
    const group = Object.entries(groupCounts).sort((a, b) => a[1] - b[1])[0][0];

    // Save it to the participant record
    const participant = await Participant.findOneAndUpdate(
      { participantCode: code },
      { group },
      { new: true }
    );

    if (!participant) {
      console.warn(`No participant found with code ${code}`);
      return res.status(404).json({ message: "Participant not found" });
    }


    console.log(`Assigned ${group} to participant ${code}`);
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
