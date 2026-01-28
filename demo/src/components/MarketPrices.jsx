import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarketPrices = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold">← Back</button>
      <h1 className="text-3xl font-black text-slate-800">Live Market Prices 📈</h1>
      <div className="mt-6 bg-white border rounded-2xl p-4 shadow-sm">
        <p className="text-slate-500 italic">Fetching today's mandi rates...</p>
      </div>
    </div>
  );
};

export default MarketPrices;