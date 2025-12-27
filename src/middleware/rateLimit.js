const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require("../config/env");

const attempts = {};

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  if (!attempts[ip]) attempts[ip] = [];
  attempts[ip] = attempts[ip].filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (attempts[ip].length >= RATE_LIMIT_MAX) {
    return res.status(429).json({ message: "Too many requests. Try again later." });
  }

  attempts[ip].push(now);
  next();
}

module.exports = rateLimit;
