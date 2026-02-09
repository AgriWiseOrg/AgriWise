const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' }); // Adjust path if needed

const MarketPriceSchema = new mongoose.Schema({
    crop: String,
    date: Date,
    price: Number,
    market: String,
    state: String
});
const MarketPrice = mongoose.model('MarketPrice', MarketPriceSchema);

const PredictionModelSchema = new mongoose.Schema({
    crop: String,
    slope: Number,
    intercept: Number,
    sampleSize: Number,
    lastTrained: Date
});
const PredictionModel = mongoose.model('PredictionModel', PredictionModelSchema);

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const crops = await MarketPrice.distinct('crop');
        console.log('Distinct crops in MarketPrice:', crops);

        for (const crop of crops) {
            const count = await MarketPrice.countDocuments({ crop });
            const model = await PredictionModel.findOne({ crop });
            console.log(`Crop: ${crop}, Records: ${count}, Model Exists: ${!!model}`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
