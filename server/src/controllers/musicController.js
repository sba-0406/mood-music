// server/src/controllers/musicController.js
const { getMoodRecommendations, getTrackInfo } = require('../services/spotifyService');

exports.recommend = async (req, res, next) => {
  try {
    const { mood, limit } = req.query;
    const songs = await getMoodRecommendations(mood, limit?parseInt(limit):10);
    res.json({songs});
  } catch (e) { next(e); }
};

exports.getTrack = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await getTrackInfo(id);
    res.json(song);
  } catch(e) { next(e); }
};
