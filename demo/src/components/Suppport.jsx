import React from 'react';
import { useNavigate } from 'react-router-dom';

const Suppport = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold">← Back</button>
      <h1 className="text-3xl font-black text-slate-800">Support 📞</h1>
      <div className="mt-6 space-y-4">
        <button className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-200">Call Agricultural Expert</button>
        <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold">WhatsApp Chat</button>
      </div>
    </div>
  );
};

export default Suppport;