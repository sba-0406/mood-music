// server/src/controllers/moodController.js
const { getAllMoods } = require('../models/mood');

exports.list = async (req, res, next) => {
  try {
    const moods = await getAllMoods();
    res.json(moods);
  } catch (e) { next(e); }
};
