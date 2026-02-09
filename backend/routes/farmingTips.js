const router = require('express').Router();
const FarmingTip = require('../models/FarmingTip');

// GET all tips
router.get('/', async (req, res) => {
    try {
        const tips = await FarmingTip.find().sort({ createdAt: -1 });
        res.json(tips);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tips" });
    }
});

// ADD tip
router.post('/add', async (req, res) => {
    try {
        const newTip = new FarmingTip(req.body);
        const savedTip = await newTip.save();
        res.status(201).json(savedTip);
    } catch (err) {
        res.status(500).json({ error: "Failed to add tip" });
    }
});

// DELETE tip
router.delete('/:id', async (req, res) => {
    try {
        await FarmingTip.findByIdAndDelete(req.params.id);
        res.json({ message: "Tip deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete tip" });
    }
});

module.exports = router;
