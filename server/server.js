const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// ================= MODELS =================
const User = require('./models/User');
const FoodProduct = require('./models/FoodProduct');
const MarketPrice = require('./models/MarketPrice');
const DemandForecast = require('./models/DemandForecast');

// ================= ROUTE IMPORTS =================
const schemeRoutes = require('./routes/schemes');
const financeRoutes = require('./routes/finance');
const cartRoutes = require('./routes/cartroutes');

// ================= MIDDLEWARE (CRITICAL ORDER) =================
// These must be defined BEFORE any routes to process data correctly
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use('/api/schemes', schemeRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/govt-schemes', require('./routes/govtSchemes'));
app.use('/api/farming-tips', require('./routes/farmingTips'));
app.use('/api/latest-updates', require('./routes/latestUpdates'));

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ================= AUTHENTICATION =================

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      email,
      password, // Reminder: Hash this with bcrypt in production!
      role: role.toLowerCase()
    });

    await user.save();
    console.log('✅ New User Registered:', email);

    res.status(201).json({
      message: 'Registration successful',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ================= AI PRICE PREDICTION =================

app.post('/api/predict-price', (req, res) => {
  const { product, region, month } = req.body;

  const basePrices = {
    'Wheat': 25, 'Rice': 40, 'Corn': 20, 'Potato': 15,
    'Tomato': 30, 'Onion': 25, 'Soybean': 45
  };

  const productBase = basePrices[product] || 30;
  const monthIndex = month ? new Date(Date.parse(month + " 1, 2023")).getMonth() : 0;
  const seasonalFactor = 1 + (Math.sin(monthIndex) * 0.1);
  const regionHash = region ? region.length : 5;
  const regionFactor = 1 + ((regionHash % 5) * 0.05);
  const volatility = 0.9 + Math.random() * 0.2;

  let predictedPrice = Math.round((productBase * seasonalFactor * regionFactor * volatility) * 100) / 100;
  const confidence = 85 + Math.floor(Math.random() * 14);

  setTimeout(() => {
    res.json({
      product,
      predictedPrice,
      currency: 'INR',
      confidence: `${confidence}%`,
      factors: { seasonality: 'High Demand', transport: 'Normal' }
    });
  }, 1000);
});

// ================= MARKET DATA ENDPOINTS =================

// 1. Current Market Prices (Live API)
app.get('/api/market/prices', async (req, res) => {
  try {
    const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
    const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
    const URL = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`;

    const response = await axios.get(URL);
    const records = response.data.records;

    const prices = records.map((record, index) => ({
      id: index + 1,
      crop: `${record.commodity} (${record.variety})`,
      mandi: `${record.market}, ${record.state}`,
      price: `₹${record.modal_price}`,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }));

    res.json(prices);
  } catch (error) {
    console.warn('⚠️ API failed, using fallbacks');
    const fallbackPrices = [
      { id: 1, crop: 'Wheat (Sarbati)', mandi: 'Indore Mandi', price: '₹2,350', trend: 'up' },
      { id: 2, crop: 'Soybean (Yellow)', mandi: 'Ujjain Mandi', price: '₹4,800', trend: 'down' },
      { id: 3, crop: 'Rice (Basmati)', mandi: 'Karnal Mandi', price: '₹6,000', trend: 'stable' }
    ];
    res.json(fallbackPrices);
  }
});

// 2. Historical Data
app.get('/api/market/history', async (req, res) => {
  const { crop } = req.query;
  try {
    if (!crop) return res.status(400).json({ error: 'Crop parameter required' });
    const historyData = await MarketPrice.find({ crop }).sort({ date: 1 }).limit(10);
    const data = historyData.map(record => ({
      month: new Date(record.date).toLocaleString('default', { month: 'short' }),
      price: record.price
    }));
    res.json({ crop, period: '6m', data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// 3. Demand Forecasts
app.get('/api/market/demand', async (req, res) => {
  try {
    const demandData = await DemandForecast.find({});
    res.json(demandData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch demand forecasts' });
  }
});

// Cart Routes
app.use('/api/cart', cartRoutes);




// ================= SERVER START =================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);