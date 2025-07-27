// server/src/controllers/historyController.js
const { addHistory, getHistoryByUser } = require('../models/history');

exports.add = async (req, res, next) => {
  try {
    const { song_id, mood } = req.body;
    const user_id = req.user.id;
    await addHistory({ user_id, song_id, mood });
    res.json({ success:true });
  } catch(e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const list = await getHistoryByUser(user_id);
    res.json(list);
  } catch(e) { next(e); }
};
