// server/src/models/history.js
const pool = require('../../config/db');

async function addHistory({ user_id, song_id, mood }) {
  await pool.query(
    `INSERT INTO history (user_id, song_id, mood) VALUES ($1, $2, $3)`,
    [user_id, song_id, mood]
  );
}

async function getHistoryByUser(user_id, limit=25) {
  const res = await pool.query(
    `SELECT * FROM history WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2`,
    [user_id, limit]
  );
  return res.rows;
}

module.exports = { addHistory, getHistoryByUser };
