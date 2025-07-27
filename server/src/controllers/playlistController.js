// server/src/controllers/playlistController.js
const { addFavorite, getFavoritesByUser, removeFavorite } = require('../models/favorite');

exports.add = async (req, res, next) => {
  try {
    const { song_id, mood } = req.body;
    const user_id = req.user.id;
    const fav = await addFavorite({ user_id, song_id, mood });
    res.json(fav);
  } catch(e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const list = await getFavoritesByUser(user_id);
    res.json(list);
  } catch(e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { song_id } = req.body;
    await removeFavorite(user_id, song_id);
    res.json({ success: true });
  } catch(e) { next(e); }
};
