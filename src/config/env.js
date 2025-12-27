const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || "1h",
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 min
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 5, // max requests
};
