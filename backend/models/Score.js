const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [Number],
  timeTaken: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);