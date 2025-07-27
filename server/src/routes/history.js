// server/src/routes/history.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { add, list } = require('../controllers/historyController');

router.use(auth);

router.post('/add', add);
router.get('/list', list);

module.exports = router;
