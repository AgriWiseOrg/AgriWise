const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
        index: true
    },
    market: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        default: 'India'
    }
}, { timestamps: true });

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
