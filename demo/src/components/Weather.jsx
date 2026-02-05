import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/support/weather');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherLabel = (code) => {
    if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
    if (code <= 3) return { label: 'Partly Cloudy', icon: '🌤️' };
    if (code <= 48) return { label: 'Foggy', icon: '🌫️' };
    if (code <= 67) return { label: 'Rainy', icon: '🌧️' };
    if (code <= 77) return { label: 'Snowy', icon: '❄️' };
    if (code <= 82) return { label: 'Showers', icon: '🌦️' };
    return { label: 'Stormy', icon: '⛈️' };
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Fetching Regional Satellite Data...</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-2 border-slate-100 text-center space-y-4 max-w-sm">
        <span className="text-6xl">📡</span>
        <h2 className="text-2xl font-black text-slate-800">Connection Failed</h2>
        <p className="text-slate-500 font-medium">We couldn't reach the weather satellites. Please check your internet.</p>
        <button onClick={() => navigate('/')} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl">Return Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sky-600 font-black uppercase text-xs tracking-widest">
            <span>←</span> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-sky-700 uppercase">Live Satellite Link</span>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Current Weather Card */}
        <section className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-sky-200 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-8xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 block">{data.icon}</span>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter">{data.temp}°</h1>
                  <p className="text-xl font-bold text-sky-100 opacity-90">{getWeatherLabel(data.code).label}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Humidity</p>
                  <p className="font-bold">{data.humidity}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Wind</p>
                  <p className="font-bold">{data.wind} km/h</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 max-w-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-sky-200">Crop Advisory</h3>
              <p className="text-lg font-bold leading-relaxed">
                {data.advisory}
              </p>
              <div className="mt-4 flex items-center gap-2 text-emerald-300 font-black text-[10px] uppercase">
                <span className="p-1 bg-emerald-500/20 rounded">Expert System Verified</span>
              </div>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        </section>

        {/* 7-Day Forecast */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">7-Day Forecast</h2>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Precision</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {data.forecast.map((day, i) => {
              const date = new Date(day.date);
              const isToday = i === 0;
              const weather = getWeatherLabel(day.code);

              return (
                <div key={i} className={`p-6 rounded-[2rem] border-2 transition-all ${isToday ? 'bg-white border-sky-400 shadow-xl shadow-sky-50' : 'bg-white border-slate-100 hover:border-sky-200'}`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">
                    {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <span className="text-4xl block text-center mb-4">{weather.icon}</span>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-slate-800">{day.max}°</p>
                    <p className="text-xs font-bold text-slate-400">{day.min}°</p>
                  </div>
                  <p className="text-[8px] font-black text-sky-600 uppercase text-center mt-4 tracking-tighter">{weather.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Insights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black">Soil Moisture Insights</h3>
              <p className="text-slate-400 font-medium">Based on recent rainfall, your soil moisture level is currently <span className="text-emerald-400 font-bold">Optimal (65%)</span>.</p>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">💧</span>
          </div>

          <div className="bg-amber-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black">UV Threat Alert</h3>
              <p className="text-amber-100 font-medium">Extreme UV levels expected between 12 PM - 3 PM. Avoid direct exposure for delicate crops.</p>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Level 9/11</span>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">☀️</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Weather;