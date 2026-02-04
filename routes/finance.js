const router = require('express').Router();
const FinanceRequest = require('../models/FinanceRequest');

// POST: Save a new application when a farmer clicks "Apply Now"
router.post('/apply', async (req, res) => {
  try {
    const newRequest = new FinanceRequest({
      farmerEmail: req.body.farmerEmail,
      schemeName: req.body.schemeName,
      schemeId: req.body.schemeId,
      interestRate: req.body.interestRate
    });

    await newRequest.save();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    console.error("Finance Application Error:", err);
    res.status(500).json({ error: "Failed to process application" });
  }
});

// GET: Fetch all applications for the Admin Dashboard tab
router.get('/all', async (req, res) => {
  try {
    const requests = await FinanceRequest.find().sort({ appliedAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;