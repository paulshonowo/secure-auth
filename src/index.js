const express = require("express");
const authRoutes = require("./routes/auth");

function secureAuth() {
  const router = express.Router();
  router.use("/auth", authRoutes);
  return router;
}

module.exports = secureAuth;
