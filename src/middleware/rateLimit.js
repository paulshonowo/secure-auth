const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require("../config/env");
const { log } = require("../utils/logger");

const attempts = {};

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  if (!attempts[ip]) {
    attempts[ip] = [];
  }

  // Remove expired attempts
  attempts[ip] = attempts[ip].filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (attempts[ip].length >= RATE_LIMIT_MAX) {
    log("RATE_LIMIT_TRIGGERED", {
      ip,
      path: req.originalUrl
    });

    return res.status(429).json({
      message: "Too many requests. Try again later."
    });
  }

  attempts[ip].push(now);
  next();
}

module.exports = rateLimit;
