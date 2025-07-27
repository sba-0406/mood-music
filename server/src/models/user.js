// server/src/models/user.js
const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

async function createUser({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
    [name, email, hash]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(
    `SELECT id, name, email FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function validatePassword(user, password) {
  return bcrypt.compare(password, user.password);
}

module.exports = { createUser, findUserByEmail, findUserById, validatePassword };
