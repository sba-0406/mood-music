// server/src/routes/playlist.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { add, list, remove } = require('../controllers/playlistController');

router.use(auth);

router.post('/add', add);
router.get('/list', list);
router.post('/remove', remove);

module.exports = router;
