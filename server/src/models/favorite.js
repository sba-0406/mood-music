// // server/src/models/user.js
// const pool = require('../../config/db');
// const bcrypt = require('bcryptjs');

// async function createUser({ name, email, password }) {
//   const hash = await bcrypt.hash(password, 10);
//   const result = await pool.query(
//     `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
//     [name, email, hash]
//   );
//   return result.rows[0];
// }

// async function findUserByEmail(email) {
//   const result = await pool.query(
//     `SELECT * FROM users WHERE email = $1`,
//     [email]
//   );
//   return result.rows[0];
// }

// async function findUserById(id) {
//   const result = await pool.query(
//     `SELECT id, name, email FROM users WHERE id = $1`,
//     [id]
//   );
//   return result.rows[0];
// }

// async function validatePassword(user, password) {
//   return bcrypt.compare(password, user.password);
// }

// module.exports = { createUser, findUserByEmail, findUserById, validatePassword };



// server/src/models/favorite.js

const pool = require('../../config/db');

/**
 * Add a song to the user's favorites.
 */
// server/src/models/favorite.js

async function addFavorite({ user_id, song_id, mood }) {
  const res = await pool.query(
    `INSERT INTO favorites (user_id, song_id, mood)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, song_id)
     DO UPDATE SET mood = EXCLUDED.mood, timestamp = NOW()
     RETURNING *`,
    [user_id, song_id, mood]
  );
  return res.rows[0];
}


/**
 * Get all favorites for a user (most recent first).
 */
async function getFavoritesByUser(user_id) {
  const res = await pool.query(
    `SELECT * FROM favorites WHERE user_id = $1 ORDER BY timestamp DESC`,
    [user_id]
  );
  return res.rows;
}

/**
 * Remove a favorite song for a user.
 */
async function removeFavorite(user_id, song_id) {
  await pool.query(
    `DELETE FROM favorites WHERE user_id = $1 AND song_id = $2`,
    [user_id, song_id]
  );
}

module.exports = { addFavorite, getFavoritesByUser, removeFavorite };
