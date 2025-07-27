// server/src/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
