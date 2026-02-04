const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Adjust path if needed

const MarketPrice = require('../models/MarketPrice');
const DemandForecast = require('../models/DemandForecast');

const CROPS = ['Wheat', 'Rice', 'Corn', 'Potato', 'Tomato', 'Onion', 'Soybean'];
const MONTHS_BACK = 6;

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agriwise');
        console.log('🍃 MongoDB Connected');

        // CLEAR OLD DATA
        await MarketPrice.deleteMany({});
        await DemandForecast.deleteMany({});
        console.log('🗑️  Cleared old market data');

        // 1. SEED MARKET PRICES (History)
        const priceDocs = [];
        const markets = ['New Delhi', 'Mumbai', 'Indore', 'Pune', 'Nagpur'];

        CROPS.forEach(crop => {
            let basePrice = 2000 + Math.random() * 3000; // Base price between 2000-5000

            for (let i = 0; i < MONTHS_BACK; i++) {
                // Generate one entry per month
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                date.setDate(1); // First of the month

                // Random fluctuation
                let fluctuation = (Math.random() * 400) - 200;
                // Correct trend: prices should ideally go UP over time (so LOWER in the past)
                let price = Math.round(basePrice - (i * 50) + fluctuation);

                priceDocs.push({
                    crop,
                    market: markets[Math.floor(Math.random() * markets.length)],
                    price,
                    date,
                    state: 'India'
                });
            }
        });

        await MarketPrice.insertMany(priceDocs);
        console.log(`✅ Seeded ${priceDocs.length} price history records`);

        // 2. SEED DEMAND FORECASTS
        const demandDocs = [
            { crop: 'Wheat', demandLevel: 'High', growth: '+15%', reason: 'Global shortage expected' },
            { crop: 'Rice', demandLevel: 'Moderate', growth: '+5%', reason: 'Stable export demand' },
            { crop: 'Corn', demandLevel: 'High', growth: '+10%', reason: 'Increased poultry feed demand' },
            { crop: 'Potato', demandLevel: 'Low', growth: '-2%', reason: 'Surplus cold storage stock' },
            { crop: 'Tomato', demandLevel: 'Very High', growth: '+25%', reason: 'Crop damage due to rain' },
            { crop: 'Soybean', demandLevel: 'High', growth: '+18%', reason: 'Edible oil price hike' }
        ];

        await DemandForecast.insertMany(demandDocs);
        console.log(`✅ Seeded ${demandDocs.length} demand forecasts`);

        process.exit();
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
