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
// @desc    Get real-time weather and crop-specific advisories
router.get('/weather', async (req, res) => {
    const { lat = 28.6139, lon = 77.2090, crop = 'General' } = req.query;

    try {
        const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`);

        const current = weatherRes.data.current;
        const daily = weatherRes.data.daily;
        const hourly = weatherRes.data.hourly;

        // Agricultural Advisory Logic
        let advisory = "Conditions are stable for most crops.";
        let level = "Normal";
        let icon = "✅";

        const temp = current.temperature_2m;
        const code = current.weather_code;

        // Crop-Specific Logic
        if (crop === 'Rice') {
            if (temp > 35) advisory = "High heat! Rice requires standing water. Increase irrigation to prevent soil cracking.";
            else if (code >= 51) advisory = "Rain expected. Good for transplanting, but ensure drainage isn't blocked.";
            else advisory = "Maintain 2-3 inches of standing water in the fields.";
        } else if (crop === 'Wheat') {
            if (temp > 28) advisory = "Warm winds detected. Terminal heat may reduce grain size. Apply light irrigation.";
            else if (code >= 51) advisory = "Rain expected. Postpone irrigation to avoid waterlogging and root rot.";
            else advisory = "Ideal conditions for tillering. Monitor for rust diseases.";
        } else if (crop === 'Tomato') {
            if (temp > 32) advisory = "Extreme heat can cause blossom drop. Use mulch to keep roots cool.";
            else if (code >= 51) advisory = "High humidity/Rain. Risk of Late Blight. Apply protective fungicide spray.";
            else advisory = "Perfect for fruit setting. Maintain consistent soil moisture.";
        } else {
            // General Logic
            if (temp > 38) {
                advisory = "Extreme heat alert! Protect all young saplings and increase water frequency.";
                level = "Critical"; icon = "🔥";
            } else if (code >= 51) {
                advisory = "Precipitation alert. Delay pesticide application and check drainage channels.";
                level = "Warning"; icon = "🌧️";
            }
        }

        // Extract precipitation probability for the next 8 hours
        const rainProb = hourly.precipitation_probability.slice(0, 8);

        res.json({
            success: true,
            data: {
                temp,
                humidity: current.relative_humidity_2m,
                wind: current.wind_speed_10m,
                code,
                advisory,
                level,
                icon,
                rainProb,
                crop,
                location: { lat, lon },
                forecast: daily.time.slice(0, 5).map((t, i) => ({
                    date: t,
                    max: daily.temperature_2m_max[i],
                    min: daily.temperature_2m_min[i],
                    code: daily.weather_code[i]
                }))
            }
        });
    } catch (error) {
        console.error('❌ WEATHER API ERROR:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch regional weather intelligence.' });
    }
});

// @route   GET api/support/advisory
// @desc    Get latest farmer advisories
router.get('/advisory', (req, res) => {
    res.json(advisories);
});

module.exports = router;
