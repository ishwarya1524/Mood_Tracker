const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registration - creates user and sends back token + user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    // Generate token after user created
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });

    // Return user and token
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error occurred while creating user" });
  }
});

// Login - verifies and returns token + user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });
  res.json({ user, token });
});

module.exports = router;
