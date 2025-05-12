const express = require('express');
const router = express.Router();
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

module.exports = router;
