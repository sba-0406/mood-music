// server/src/routes/analytics.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMoodAnalytics } = require('../utils/analytics');

router.use(auth);

router.get('/mood', async (req, res, next) => {
  try {
    const data = await getMoodAnalytics(req.user.id);
    res.json(data);
  } catch(e) { next(e); }
});

module.exports = router;
