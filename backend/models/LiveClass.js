const mongoose = require('mongoose');

const LiveClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  subject: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  meetLink: { type: String, required: true },
  duration: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LiveClass', LiveClassSchema);
