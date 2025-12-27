const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const { log } = require("../utils/logger");

// In-memory user store (MVP only)
const users = [];

async function signup(email, password) {
  const existing = users.find(u => u.email === email);
  if (existing) {
    log("SIGNUP_FAILED", { email, reason: "USER_EXISTS" });
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed };
  users.push(user);

  log("USER_SIGNUP", { email });

  const token = generateToken({ email });
  return { email, token };
}

async function login(email, password) {
  const user = users.find(u => u.email === email);

  if (!user) {
    log("LOGIN_FAILED", { email, reason: "USER_NOT_FOUND" });
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    log("LOGIN_FAILED", { email, reason: "INVALID_PASSWORD" });
    throw new Error("Invalid credentials");
  }

  log("LOGIN_SUCCESS", { email });

  const token = generateToken({ email });
  return { email, token };
}

async function resetPassword(email, newPassword) {
  const user = users.find(u => u.email === email);

  if (!user) {
    log("PASSWORD_RESET_FAILED", { email, reason: "USER_NOT_FOUND" });
    throw new Error("User not found");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  log("PASSWORD_RESET", { email });

  return { email };
}

module.exports = {
  signup,
  login,
  resetPassword
};
