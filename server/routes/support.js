const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock data for advisories
const advisories = [
    { id: 1, category: 'Market', message: 'Wheat prices are expected to rise in MP by 5% next week.', date: '2024-02-04' },
    { id: 2, category: 'Govt', message: 'New PM-Kisan installment being released soon. Check your status.', date: '2024-02-03' },
    { id: 3, category: 'Finance', message: 'Special low-interest kisan credit cards available for organic farmers.', date: '2024-02-02' }
];

// @route   POST api/support/query
// @desc    Submit a general support query
router.post('/query', async (req, res) => {
    const { name, email, subject, message, language } = req.body;
    console.log('📬 NEW SUPPORT QUERY:', { name, email, subject, message, language });

    // In a real app, you would save this to MongoDB or send an email
    res.status(200).json({
        success: true,
        message: 'Your query has been received. Our expert will contact you soon.'
    });
});

// @route   POST api/support/dispute
// @desc    Submit a dispute report
router.post('/dispute', async (req, res) => {
    const { farmerName, buyerName, transactionId, issue, details } = req.body;
    console.log('⚖️ NEW DISPUTE REPORTED:', { farmerName, buyerName, transactionId, issue, details });

    res.status(200).json({
        success: true,
        message: 'Dispute has been registered. Our resolution team is looking into it.'
    });
});

// @route   GET api/support/weather
// @desc    Get real-time weather and crop advisories
router.get('/weather', async (req, res) => {
    const { lat = 28.6139, lon = 77.2090 } = req.query; // Default to New Delhi

    try {
        const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        const current = weatherRes.data.current;

        // Generate simple agricultural advisory logic
        let advisory = "Conditions are stable for most crops.";
        let level = "Normal";
        let icon = "✅";

        if (current.temperature_2m > 38) {
            advisory = "Extreme heat alert! Increase irrigation frequency for all vegetable crops immediately.";
            level = "Critical";
            icon = "🔥";
        } else if (current.temperature_2m > 32) {
            advisory = "High temperature observed. Monitor soil moisture closely.";
            level = "Warning";
            icon = "⚠️";
        }

        if (current.weather_code >= 51 && current.weather_code <= 67) {
            advisory = "Rain expected. Ensure proper drainage in fields and cover harvested produce.";
            level = "Warning";
            icon = "🌧️";
        } else if (current.weather_code >= 71) {
            advisory = "Heavy precipitation/extreme weather. Stay safe and protect young saplings.";
            level = "Critical";
            icon = "⛈️";
        }

        res.json({
            success: true,
            data: {
                temp: current.temperature_2m,
                humidity: current.relative_humidity_2m,
                wind: current.wind_speed_10m,
                code: current.weather_code,
                advisory,
                level,
                icon,
                location: { lat, lon }
            }
        });
    } catch (error) {
        console.error('❌ WEATHER API ERROR:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch real-time weather data.' });
    }
});

// @route   GET api/support/advisory
// @desc    Get latest farmer advisories
router.get('/advisory', (req, res) => {
    res.json(advisories);
});

module.exports = router;
