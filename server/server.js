const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Initialize 'app' FIRST before using it for routes
const app = express();
const User = require('./models/User');

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 Connected to Local MongoDB (Compass)'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 4. LOGIN ROUTE: Only allows existing users
app.post('/api/auth/login', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      // Epic 2: Strict login requirement
      return res.status(404).json({ error: "No account found with this number. Please register first." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 5. REGISTER ROUTE: Creates a new user
app.post('/api/auth/register', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ error: "This number is already registered. Try logging in." });
    }
    const user = new User({ phoneNumber });
    await user.save();
    res.status(201).json({ message: "Registration successful!", user });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 6. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));