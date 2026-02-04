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

// GET: Fetch applications for a specific user (by email)
router.get('/user-applications', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email query parameter is required" });
    }
    const userRequests = await FinanceRequest.find({ farmerEmail: email });
    res.json(userRequests);
  } catch (err) {
    console.error("Fetch User Applications Error:", err);
    res.status(500).json({ error: "Failed to fetch user applications" });
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