const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Test = require('../models/Test');
const Question = require('../models/Question');

router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find().select('-questions');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions');
    if (!test) return res.status(404).json({ msg: 'Test not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.json(test);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/question', adminAuth, async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;