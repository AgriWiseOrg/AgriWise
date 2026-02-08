const router = require('express').Router();
const GovtScheme = require('../models/GovtScheme');
// Ensure this matches your file name: SchemeApplication.js
const SchemeApplication = require('../models/SchemeApplication'); 

// === SCHEMES CRUD ===

router.get('/', async (req, res) => {
    try {
        const schemes = await GovtScheme.find().sort({ createdAt: -1 });
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch schemes" });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newScheme = new GovtScheme(req.body);
        const savedScheme = await newScheme.save();
        res.status(201).json(savedScheme);
    } catch (err) {
        res.status(500).json({ error: "Failed to add scheme" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await GovtScheme.findByIdAndDelete(req.params.id);
        res.json({ message: "Scheme deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete scheme" });
    }
});

// === APPLICATIONS ===

router.post('/apply', async (req, res) => {
    try {
        const { farmerEmail, schemeId, schemeName } = req.body;

        const existing = await SchemeApplication.findOne({ farmerEmail, schemeId });
        if (existing) {
            return res.status(400).json({ error: "Already applied to this scheme" });
        }

        const application = new SchemeApplication({
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

// FIXED CANCEL ROUTE: Uses URL params to avoid 404
router.delete('/cancel/:farmerEmail/:schemeId', async (req, res) => {
    try {
        const { farmerEmail, schemeId } = req.params;

        const deletedApp = await SchemeApplication.findOneAndDelete({ 
            farmerEmail, 
            schemeId 
        });

        if (!deletedApp) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.json({ message: "Application cancelled successfully" });
    } catch (err) {
        console.error("Scheme Cancellation Error:", err);
        res.status(500).json({ error: "Failed to cancel application" });
    }
});

router.get('/user-applications', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email required" });

        const apps = await SchemeApplication.find({ farmerEmail: email });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user applications" });
    }
});

module.exports = router;