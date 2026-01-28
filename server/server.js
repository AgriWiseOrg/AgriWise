const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Initialize 'app' FIRST before using it for routes
const app = express();
const User = require('./models/User');
const FoodProduct = require('./models/FoodProduct');

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

// 6. PRODUCT ROUTES

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl, farmerId } = req.body;
  try {
    const product = new FoodProduct({
      name,
      price,
      description,
      imageUrl,
      farmer: farmerId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Get products for a specific farmer
app.get('/api/products/:farmerId', async (req, res) => {
  try {
    const products = await FoodProduct.find({ farmer: req.params.farmerId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const product = await FoodProduct.findByIdAndUpdate(
      req.params.id,
      { name, price, description, imageUrl },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await FoodProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// 6. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));