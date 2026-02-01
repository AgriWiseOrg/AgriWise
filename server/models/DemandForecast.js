const mongoose = require('mongoose');

const DemandForecastSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
        unique: true
    },
    demandLevel: {
        type: String, // High, Moderate, Low
        required: true
    },
    growth: {
        type: String, // e.g. "+12%"
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DemandForecast', DemandForecastSchema);
