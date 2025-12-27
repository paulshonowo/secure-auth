const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

// Simple in-memory user store (replace with DB in production)
const users = [];

async function signup(email, password) {
  const existing = users.find(u => u.email === email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = { email, password: hashed };
  users.push(user);
  const token = generateToken({ email });
  return { email, token };
}

async function login(email, password) {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ email });
  return { email, token };
}

async function resetPassword(email, newPassword) {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error("User not found");

  user.password = await bcrypt.hash(newPassword, 10);
  return { email };
}

module.exports = { signup, login, resetPassword };
