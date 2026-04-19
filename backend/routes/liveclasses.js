const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const LiveClass = require('../models/LiveClass');

function classEndTime(doc) {
  return new Date(doc.scheduledAt).getTime() + doc.duration * 60 * 1000;
}

router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'admin' && req.query.all === 'true') {
      const classes = await LiveClass.find().sort({ scheduledAt: 1 });
      return res.json(classes);
    }

    const now = Date.now();
    const all = await LiveClass.find({ isActive: true }).sort({ scheduledAt: 1 });
    const upcoming = all.filter((c) => classEndTime(c) > now);
    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const liveClass = new LiveClass(req.body);
    await liveClass.save();
    res.json(liveClass);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const liveClass = await LiveClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(liveClass);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await LiveClass.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Live class deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
