const router = require('express').Router();
const FinanceRequest = require('../models/FinanceRequest');

// POST: Save a new application
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

module.exports = router;