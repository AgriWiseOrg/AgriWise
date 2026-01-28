import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyCrops = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold">← Back</button>
      <h1 className="text-3xl font-black text-slate-800">My Farm 🌾</h1>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="font-bold text-emerald-800 text-lg">Wheat (Spring)</h3>
          <p className="text-emerald-600">Growth Stage: Flowering</p>
        </div>
      </div>
    </div>
  );
};

export default MyCrops;