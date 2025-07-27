// server/src/models/diaryEntry.js
const pool = require('../../config/db');

async function addDiaryEntry({ user_id, entry_text, mood, date }) {
  const res = await pool.query(
    `INSERT INTO diary_entries (user_id, entry_text, mood, date) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, entry_text, mood, date]
  );
  return res.rows[0];
}

async function getDiaryEntries(user_id) {
  const res = await pool.query(
    `SELECT * FROM diary_entries WHERE user_id = $1 ORDER BY date DESC`,
    [user_id]
  );
  return res.rows;
}

async function updateDiaryEntry({ id, entry_text, mood }) {
  const res = await pool.query(
    `UPDATE diary_entries SET entry_text=$2, mood=$3 WHERE id=$1 RETURNING *`,
    [id, entry_text, mood]
  );
  return res.rows[0];
}

async function deleteDiaryEntry(id, user_id) {
  await pool.query(
    `DELETE FROM diary_entries WHERE id=$1 AND user_id=$2`,
    [id, user_id]
  );
}

module.exports = { addDiaryEntry, getDiaryEntries, updateDiaryEntry, deleteDiaryEntry };
