import React from 'react';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <button onClick={() => navigate('/')} className="mb-4 text-emerald-600 font-bold block">← Back</button>
      <div className="bg-sky-500 text-white p-10 rounded-[3rem] shadow-xl">
        <span className="text-7xl">☀️</span>
        <h1 className="text-5xl font-black mt-4">28°C</h1>
        <p className="text-sky-100 font-bold uppercase tracking-widest mt-2">Mostly Sunny</p>
      </div>
    </div>
  );
};

export default Weather;