const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  participantCode: { type: String, required: true, unique: true },
  consent: [Boolean],
  demographics: Object,
  groupAssignment: { type: Number },
  interventionCompleted: { type: Boolean, default: false },
  postSurvey: Object,
  withdrawn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
