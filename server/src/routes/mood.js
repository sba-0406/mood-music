// server/src/routes/mood.js
const express = require('express');
const router = express.Router();
const { list } = require('../controllers/moodController');

router.get('/list', list);

module.exports = router;
