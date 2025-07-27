// server/src/routes/diary.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { add, list, update, remove } = require('../controllers/diaryController');

router.use(auth);

router.post('/add', add);
router.get('/list', list);
router.post('/update', update);
router.post('/remove', remove);

module.exports = router;
