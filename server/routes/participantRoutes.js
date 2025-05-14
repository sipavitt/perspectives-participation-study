const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant'); // ✅ import the model

const {
  createParticipant,
  saveConsent,
  saveDemographics,
  assignGroup,
  markInterventionComplete,
  savePostSurvey,
  withdrawParticipant
} = require('../controllers/participantController');

router.post('/start', createParticipant);
router.post('/consent', saveConsent);
router.post('/demographics', saveDemographics);
router.post('/assign-group', assignGroup);
router.post('/complete-intervention', markInterventionComplete);
router.post('/post-survey', savePostSurvey);
router.post('/withdraw', withdrawParticipant);

// ✅ Place this before module.exports
router.get('/all', async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const { Parser } = require('json2csv');

router.get('/export', async (req, res) => {
  try {
    const participants = await Participant.find().lean();

    // Flatten each participant's nested objects into individual keys
    const flattened = participants.map(p => {
      const flat = {
        participantCode: p.participantCode,
        groupAssignment: p.groupAssignment,
        interventionCompleted: p.interventionCompleted,
        withdrawn: p.withdrawn,
        createdAt: p.createdAt,
      };

      // Add demographics fields
      if (p.demographics) {
        Object.entries(p.demographics).forEach(([key, value]) => {
          flat[`demographics.${key}`] = value;
        });
      }

      // Add postSurvey fields
      if (p.postSurvey) {
        Object.entries(p.postSurvey).forEach(([key, value]) => {
          flat[`postSurvey.${key}`] = value;
        });
      }

      // Add consent array as individual columns
      if (Array.isArray(p.consent)) {
        p.consent.forEach((val, i) => {
          flat[`consent_${i + 1}`] = val;
        });
      }

      return flat;
    });

    const parser = new Parser();
    const csv = parser.parse(flattened);

    res.header('Content-Type', 'text/csv');
    res.attachment('participants.csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ message: 'Failed to export data' });
  }
});


module.exports = router;

