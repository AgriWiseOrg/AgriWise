const router = require('express').Router();
const Scheme = require('../models/Scheme');

// 1. ADD THIS: GET all schemes (This fixes the 404)
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.status(200).json(schemes);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch schemes" });
  }
});

// 2. KEEP THIS: Add a new scheme
router.post('/add', async (req, res) => {
  try {
    const newScheme = new Scheme(req.body);
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme);
  } catch (err) {
    res.status(400).json({ error: "Could not add scheme" });
  }
});

// 3. KEEP THIS: Remove a scheme
router.delete('/:id', async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;