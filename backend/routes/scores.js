const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Score = require('../models/Score');
const Test = require('../models/Test');

router.post('/', auth, async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    const test = await Test.findById(testId).populate('questions');
    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });

    const newScore = new Score({
      user: req.user.id,
      test: testId,
      score,
      total: test.questions.length,
      answers,
      timeTaken
    });
    await newScore.save();
    res.json({ score, total: test.questions.length });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/leaderboard/:testId', auth, async (req, res) => {
  try {
    const scores = await Score.find({ test: req.params.testId })
      .populate('user', 'name')
      .sort('-score')
      .limit(20);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/mine', auth, async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id })
      .populate('test', 'title')
      .sort('-createdAt');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;