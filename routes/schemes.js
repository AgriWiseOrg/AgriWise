const router = require('express').Router();
const Scheme = require('../models/Scheme');

// CREATE: Add a new scheme
router.post('/add', async (req, res) => {
  try {
    const newScheme = new Scheme(req.body);
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme);
  } catch (err) {
    res.status(400).json({ error: "Could not add scheme" });
  }
});

// DELETE: Remove a scheme by ID
router.delete('/:id', async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;