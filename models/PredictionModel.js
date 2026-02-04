const mongoose = require('mongoose');

const PredictionModelSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    slope: {
        type: Number,
        required: true
    },
    intercept: {
        type: Number,
        required: true
    },
    rSquared: {
        type: Number,
        default: 0
    },
    sampleSize: {
        type: Number,
        required: true
    },
    lastTrained: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PredictionModel', PredictionModelSchema);
