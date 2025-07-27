// server/src/models/mood.js
const pool = require('../../config/db');

async function getAllMoods() {
  const res = await pool.query(`SELECT * FROM moods`);
  return res.rows;
}

module.exports = { getAllMoods };
