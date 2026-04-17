const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  durationMinutes: { type: Number, default: 30 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', TestSchema);