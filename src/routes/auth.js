const express = require("express");
const router = express.Router();
const rateLimit = require("../middleware/rateLimit");
const { signup, login, resetPassword } = require("../services/authService");

router.post("/signup", rateLimit, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signup(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", rateLimit, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/reset-password", rateLimit, async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await resetPassword(email, newPassword);
    res.json({ message: "Password reset successfully", email: result.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
