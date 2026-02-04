const router = require('express').Router();
const GovtScheme = require('../models/GovtScheme');
const GovtSchemeApplication = require('../models/GovtSchemeApplication');

// === SCHEMES CRUD ===

// GET all schemes
router.get('/', async (req, res) => {
    try {
        const schemes = await GovtScheme.find().sort({ createdAt: -1 });
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch schemes" });
    }
});

// ADD a new scheme (Admin)
router.post('/add', async (req, res) => {
    try {
        const newScheme = new GovtScheme(req.body);
        const savedScheme = await newScheme.save();
        res.status(201).json(savedScheme);
    } catch (err) {
        res.status(500).json({ error: "Failed to add scheme" });
    }
});

// DELETE a scheme (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await GovtScheme.findByIdAndDelete(req.params.id);
        res.json({ message: "Scheme deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete scheme" });
    }
});

// === APPLICATIONS ===

// APPLY for a scheme
router.post('/apply', async (req, res) => {
    try {
        const { farmerEmail, schemeId, schemeName } = req.body;

        // Check if already applied
        const existing = await GovtSchemeApplication.findOne({ farmerEmail, schemeId });
        if (existing) {
            return res.status(400).json({ error: "Already applied to this scheme" });
        }

        const application = new GovtSchemeApplication({
            farmerEmail,
            schemeId,
            schemeName
        });

        await application.save();
        res.status(201).json({ message: "Application submitted" });
    } catch (err) {
        console.error("Scheme Application Error:", err);
        res.status(500).json({ error: "Failed to submit application" });
    }
});

// LIST all applications (Admin)
router.get('/applications', async (req, res) => {
    try {
        const apps = await GovtSchemeApplication.find().sort({ appliedAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch applications" });
    }
});

// GET applications for a specific user
router.get('/user-applications', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email required" });

        const apps = await GovtSchemeApplication.find({ farmerEmail: email });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user applications" });
    }
});

module.exports = router;
