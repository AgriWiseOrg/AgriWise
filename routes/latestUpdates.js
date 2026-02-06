const router = require('express').Router();
const LatestUpdate = require('../models/LatestUpdate');

// GET all updates
router.get('/', async (req, res) => {
    try {
        const updates = await LatestUpdate.find().sort({ date: -1 });
        res.json(updates);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch updates" });
    }
});

// ADD update
router.post('/add', async (req, res) => {
    try {
        const newUpdate = new LatestUpdate(req.body);
        const savedUpdate = await newUpdate.save();
        res.status(201).json(savedUpdate);
    } catch (err) {
        res.status(500).json({ error: "Failed to add update" });
    }
});

// DELETE update
router.delete('/:id', async (req, res) => {
    try {
        await LatestUpdate.findByIdAndDelete(req.params.id);
        res.json({ message: "Update deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete update" });
    }
});

module.exports = router;
