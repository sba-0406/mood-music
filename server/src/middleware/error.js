// server/src/middleware/error.js
module.exports = (err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error.'
  });
};
