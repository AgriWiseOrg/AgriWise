const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const User = require('./models/User');
const FoodProduct = require('./models/FoodProduct');

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ================= REGISTER =================
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 2. Create user (Force role to lowercase to match Schema enum)
    const user = new User({
      email,
      password, // Note: In a real app, hash this with bcrypt!
      role: role.toLowerCase() 
    });

    await user.save();
    console.log('✅ New User Registered:', email);

    res.status(201).json({
      message: 'Registration successful',
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('❌ Registration Error details:', error);
    res.status(500).json({ error: error.message || 'Server error during registration' });
  }
});

// ================= LOGIN =================
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ... Keep your existing Product routes below ...

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);