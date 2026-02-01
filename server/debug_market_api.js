const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api/market';

const testMarketAPI = async () => {
    console.log('🧪 Testing Market APIs (Deep Debug)...');

    try {
        console.log('\n--- Testing /history ---');
        const historyRes = await axios.get(`${BASE_URL}/history?crop=Wheat`);
        console.log('Full History Response:', JSON.stringify(historyRes.data, null, 2));

    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
    }
};

testMarketAPI();
