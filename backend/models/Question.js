const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  subject: { type: String, required: true },
  explanation: String
});

module.exports = mongoose.model('Question', QuestionSchema);