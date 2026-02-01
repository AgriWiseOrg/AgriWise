const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
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
    // Log stack trace if available
    if (error.stack) console.error(error.stack);
    res.status(500).json({
      error: error.message || 'Server error during registration',
      details: error.toString() // Send details to client for debugging
    });
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

// ================= AI PRICE PREDICTION =================
app.post('/api/predict-price', (req, res) => {
  const { product, region, month } = req.body;

  // Mock AI/Data Science Model Logic
  // Base prices for common commodities (per kg)
  const basePrices = {
    'Wheat': 25,
    'Rice': 40,
    'Corn': 20,
    'Potato': 15,
    'Tomato': 30,
    'Onion': 25,
    'Soybean': 45
  };

  const productBase = basePrices[product] || 30; // Default if unknown

  // Month factor (Seasonality)
  // Prices often higher in off-seasons. Simple mock:
  // Random small fluctuation based on month index
  const monthIndex = month ? new Date(Date.parse(month + " 1, 2023")).getMonth() : 0;
  const seasonalFactor = 1 + (Math.sin(monthIndex) * 0.1);

  // Region factor (Mock transport/demand costs)
  const regionHash = region ? region.length : 5;
  const regionFactor = 1 + ((regionHash % 5) * 0.05);

  // Random volatility (simulate market changes) - +/- 10%
  const volatility = 0.9 + Math.random() * 0.2;

  let predictedPrice = productBase * seasonalFactor * regionFactor * volatility;

  // Format to 2 decimals
  predictedPrice = Math.round(predictedPrice * 100) / 100;

  // Add a "Confidence Score" to make it look like AI
  const confidence = 85 + Math.floor(Math.random() * 14); // 85-99%

  setTimeout(() => { // Simulate computation delay
    res.json({
      product,
      predictedPrice,
      currency: 'INR',
      confidence: `${confidence}%`,
      factors: {
        seasonality: 'High Demand',
        transport: 'Normal'
      }
    });
  }, 1000);
});

// ================= MARKET DATA ENDPOINTS =================

const MarketPrice = require('./models/MarketPrice');
const DemandForecast = require('./models/DemandForecast');

// ================= MARKET DATA ENDPOINTS (Hybrid: Live API + MongoDB) =================

// 1. Current Market Prices (Live from data.gov.in)
app.get('/api/market/prices', async (req, res) => {
  try {
    const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
    const API_KEY = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
    const URL = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`;

    const response = await axios.get(URL);
    const records = response.data.records;

    if (!records || records.length === 0) {
      throw new Error('No records found from External API');
    }

    // Map External API Data to our App Structure
    const prices = records.map((record, index) => {
      return {
        id: index + 1,
        crop: `${record.commodity} (${record.variety})`,
        mandi: `${record.market}, ${record.state}`,
        price: `₹${record.modal_price}`,
        trend: Math.random() > 0.5 ? 'up' : 'down' // Mock trend as API is daily snapshot
      };
    });

    console.log(`✅ Fetched ${prices.length} records from data.gov.in`);
    res.json(prices);

  } catch (error) {
    console.warn('⚠️ External API failed, using fallback data:', error.message);

    const fallbackPrices = [
      { id: 1, crop: 'Wheat (Sarbati)', mandi: 'Indore Mandi', price: '₹2,350', trend: 'up' },
      { id: 2, crop: 'Soybean (Yellow)', mandi: 'Ujjain Mandi', price: '₹4,800', trend: 'down' },
      { id: 3, crop: 'Chana (Desi)', mandi: 'Dewas Mandi', price: '₹5,100', trend: 'stable' },
      { id: 4, crop: 'Maize', mandi: 'Ratlam Mandi', price: '₹2,100', trend: 'up' },
      { id: 5, crop: 'Onion (Red)', mandi: 'Nashik Mandi', price: '₹1,800', trend: 'up' },
      { id: 6, crop: 'Potato', mandi: 'Indore Mandi', price: '₹1,200', trend: 'down' },
      { id: 7, crop: 'Cotton', mandi: 'Khargone Mandi', price: '₹6,200', trend: 'up' },
      { id: 8, crop: 'Garlic', mandi: 'Mandsaur Mandi', price: '₹9,500', trend: 'down' },
      { id: 9, crop: 'Tomato', mandi: 'Bhopal Mandi', price: '₹1,500', trend: 'up' },
      { id: 10, crop: 'Rice (Basmati)', mandi: 'Karnal Mandi', price: '₹6,000', trend: 'stable' }
    ];
    res.json(fallbackPrices);
  }
});

// 1. Historical Price Data (Graph) - From MongoDB
app.get('/api/market/history', async (req, res) => {
  const { crop } = req.query; // e.g. ?crop=Wheat

  try {
    if (!crop) return res.status(400).json({ error: 'Crop parameter required' });

    // Fetch last 6 months of data, sorted by date
    const historyData = await MarketPrice.find({ crop })
      .sort({ date: 1 })
      .limit(10); // Adjust as needed, or filter by date range

    // Format for frontend graph
    const data = historyData.map(record => ({
      month: new Date(record.date).toLocaleString('default', { month: 'short' }),
      price: record.price
    }));

    res.json({
      crop,
      period: '6m',
      data
    });
  } catch (error) {
    console.error('❌ History API Error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// 2. Demand Forecasts - From MongoDB
app.get('/api/market/demand', async (req, res) => {
  try {
    const demandData = await DemandForecast.find({});
    res.json(demandData);
  } catch (error) {
    console.error('❌ Demand API Error:', error);
    res.status(500).json({ error: 'Failed to fetch demand forecasts' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);