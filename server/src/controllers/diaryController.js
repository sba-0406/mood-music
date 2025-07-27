// server/src/controllers/diaryController.js
const { addDiaryEntry, getDiaryEntries, updateDiaryEntry, deleteDiaryEntry } = require('../models/diaryEntry');

exports.add = async (req, res, next) => {
  try {
    const { entry_text, mood, date } = req.body;
    const user_id = req.user.id;
    const entry = await addDiaryEntry({ user_id, entry_text, mood, date: date || new Date() });
    res.json(entry);
  } catch(e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const list = await getDiaryEntries(user_id);
    res.json(list);
  } catch(e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const { id, entry_text, mood } = req.body;
    const updated = await updateDiaryEntry({ id, entry_text, mood });
    res.json(updated);
  } catch(e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user_id = req.user.id;
    await deleteDiaryEntry(id, user_id);
    res.json({ success:true });
  } catch(e) { next(e); }
};
