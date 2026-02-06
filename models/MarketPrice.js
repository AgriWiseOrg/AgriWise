const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    market: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    trend: { type: String } // 'up', 'down', 'stable'
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
