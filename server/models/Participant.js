const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  participantCode: { type: String, required: true, unique: true },
  consentGiven: { type: Boolean, default: false },
  demographics: Object,
  group: { type: String, default: null },  // ✅ Add this line
  groupAssignment: { type: Number },
  interventionCompleted: { type: Boolean, default: false },
  postSurvey: Object,
  withdrawn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
