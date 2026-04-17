const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Video = require('../models/Video');

router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find().sort('-createdAt');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(video);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;