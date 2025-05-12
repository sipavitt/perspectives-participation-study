const express = require('express');
const router = express.Router();
const { createParticipant } = require('../controllers/participantController');

router.post('/start', createParticipant);

module.exports = router;
