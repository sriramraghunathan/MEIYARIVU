const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Score = require('../models/Score');

router.get('/students', adminAuth, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAttempts = await Score.countDocuments();
    res.json({ totalStudents, totalAttempts });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;