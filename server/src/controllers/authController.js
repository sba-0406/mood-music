// server/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, validatePassword } = require('../models/user');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields.' });
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'Email already registered.' });
    const user = await createUser({ name, email, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
    if (!await validatePassword(user, password)) return res.status(400).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e) { next(e); }
};
