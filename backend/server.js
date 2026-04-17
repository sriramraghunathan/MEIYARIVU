const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/scores', require('./routes/scores'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/liveclasses', require('./routes/liveclasses'));

app.get('/', (req, res) => res.send('TNPSC Coach API running'));

// Handle invalid JSON / body parsing errors from `express.json()`
app.use((err, req, res, next) => {
  console.error('Request error:', err);
  if (res.headersSent) return next(err);
  return res.status(400).json({ msg: err?.message || 'Invalid request payload' });
});
app.get('/ping', (req, res) => res.json({ status: 'ok' }));
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Start listening only after DB connection succeeds.
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));