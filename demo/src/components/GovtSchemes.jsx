import React from 'react';
import { useNavigate } from 'react-router-dom';

const GovtSchemes = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold">← Back</button>
      <h1 className="text-3xl font-black text-slate-800">Government Schemes 🏛️</h1>
      <ul className="mt-6 space-y-4">
        <li className="p-4 bg-white border rounded-xl shadow-sm">PM-Kisan Samman Nidhi</li>
        <li className="p-4 bg-white border rounded-xl shadow-sm">Soil Health Card Scheme</li>
      </ul>
    </div>
  );
};

export default GovtSchemes;