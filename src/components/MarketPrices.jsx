import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarketPrices = () => {
  const navigate = useNavigate();

  const prices = [
    { id: 1, crop: 'Wheat (Sarbati)', mandi: 'Indore Mandi', price: '₹2,350', trend: 'up' },
    { id: 2, crop: 'Soybean (Yellow)', mandi: 'Ujjain Mandi', price: '₹4,800', trend: 'down' },
    { id: 3, crop: 'Chana (Desi)', mandi: 'Dewas Mandi', price: '₹5,100', trend: 'stable' },
    { id: 4, crop: 'Maize', mandi: 'Ratlam Mandi', price: '₹2,100', trend: 'up' },
    { id: 5, crop: 'Onion (Red)', mandi: 'Nashik Mandi', price: '₹1,800', trend: 'up' },
    { id: 6, crop: 'Potato', mandi: 'Indore Mandi', price: '₹1,200', trend: 'down' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={() => navigate('/')} className="mb-2 text-emerald-600 font-bold hover:underline">← Back</button>
          <h1 className="text-4xl font-black text-slate-800">Live Market Prices 📈</h1>
          <p className="text-slate-500">Real-time rates from major mandis (Demo Data)</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">🟢 Live Updates Active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-slate-800">{item.crop}</h3>
              <span className="text-sm text-slate-400 font-medium">{item.mandi}</span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-black text-slate-900">{item.price}</p>
                <p className="text-xs text-slate-400">per Quintal</p>
              </div>

              <div className={`flex items-center gap-1 font-bold ${item.trend === 'up' ? 'text-green-600' :
                  item.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                }`}>
                {item.trend === 'up' && '▲ +2.3%'}
                {item.trend === 'down' && '▼ -1.5%'}
                {item.trend === 'stable' && '• Stable'}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between text-sm">
              <span className="text-slate-500">Modal Price</span>
              <span className="font-bold text-slate-700">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2">💡 Market Insight</h3>
        <p className="text-blue-700">Wheat prices are expected to rise by 5-10% in the next week due to high demand in export markets.</p>
      </div>
    </div>
  );
};

export default MarketPrices;