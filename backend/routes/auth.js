const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requiredFields = ['name', 'email', 'phone', 'password'];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    // Frontend sends `form` directly; fail fast with a clear message.
    const missing = requiredFields.filter(
      (f) => req.body?.[f] === undefined || String(req.body?.[f]).trim() === ''
    );
    if (missing.length) {
      return res.status(400).json({ msg: `Missing fields: ${missing.join(', ')}` });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set on the server' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, password: hashed });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    // Most common DB errors for registration:
    // - duplicate key: email unique index (code 11000)
    // - schema validation errors (name === 'ValidationError')
    console.error('Register error:', err);
    if (err?.code === 11000) return res.status(400).json({ msg: 'Email already registered' });
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Invalid registration data', details: err.message });
    }
    res.status(500).json({ msg: err.message || 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set on the server' });
    }
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: err.message || 'Login failed' });
  }
});

module.exports = router;