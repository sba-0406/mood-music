// server/src/utils/analytics.js
const pool = require('../../config/db');

/**
 * Returns a count of moods over time for a user (for analytics chart)
 */
async function getMoodAnalytics(userId) {
  const res = await pool.query(
    `SELECT mood, date_trunc('day', date) as day, COUNT(*) count
     FROM diary_entries
     WHERE user_id = $1
     GROUP BY mood, day
     ORDER BY day DESC`, [userId]);
  return res.rows;
}

module.exports = { getMoodAnalytics };

