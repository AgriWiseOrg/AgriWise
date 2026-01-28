import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarketPlace = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold">← Back</button>
      <h1 className="text-3xl font-black text-slate-800">Marketplace 🤝</h1>
      <p className="mt-4 text-slate-600">Buy and sell equipment, seeds, and fertilizers.</p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-40 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold">Listing #1</div>
        <div className="h-40 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold">Listing #2</div>
      </div>
    </div>
  );
};

export default MarketPlace;