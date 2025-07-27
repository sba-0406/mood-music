// server/src/routes/music.js
const express = require('express');
const router = express.Router();
const { recommend, getTrack } = require('../controllers/musicController');

router.get('/recommend', recommend);
router.get('/track/:id', getTrack);

module.exports = router;
