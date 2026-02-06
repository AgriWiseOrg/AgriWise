import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Dynamic Weather Assets ---

  const SatelliteRadar = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[1px] border-white/20 rounded-full animate-[spin_10s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-emerald-400 to-transparent origin-bottom"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.05)_100%)]"></div>
    </div>
  );

  const Sunbeams = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`absolute top-[-10%] left-[${i * 20}%] w-32 h-[120%] bg-gradient-to-b from-white/20 to-transparent blur-3xl -rotate-12 animate-[pulse_4s_ease-in-out_infinite]`} style={{ animationDelay: `${i * 0.5}s` }}></div>
      ))}
    </div>
  );

  const Raindrops = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute w-[1px] h-10 bg-white/40 animate-[fall_1s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s`, animationDelay: `${Math.random()}s` }}></div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </div>
  );

  const [selectedCrop, setSelectedCrop] = useState('General');

  const fetchWeather = async (lat = 28.6139, lon = 77.2090, crop = 'General') => {
    try {
      const res = await fetch(`http://localhost:5001/api/support/weather?lat=${lat}&lon=${lon}&crop=${crop}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error("Failed to fetch weather", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, selectedCrop),
        () => fetchWeather(28.6139, 77.2090, selectedCrop)
      );
    } else {
      fetchWeather(28.6139, 77.2090, selectedCrop);
    }
  }, [selectedCrop]);

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-sky-400 uppercase tracking-widest text-xs">Syncing Satellite Intelligence...</p>
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

  const isRainy = data.code >= 51;
  const isSunny = data.code === 0;

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest hover:text-sky-500 transition-colors">
            <span>←</span> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest">Live Satellite Portal</span>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 space-y-10 mt-8">
        {/* Current Weather Section - Command Center Style */}
        <section className={`relative overflow-hidden rounded-[3.5rem] p-8 md:p-12 text-white shadow-2xl transition-all duration-1000 ${isRainy ? 'bg-gradient-to-br from-slate-800 to-indigo-950' : isSunny ? 'bg-gradient-to-br from-amber-400 to-orange-600' : 'bg-gradient-to-br from-sky-500 to-indigo-600'}`}>
          {/* Background Animations */}
          <SatelliteRadar />
          {isSunny && <Sunbeams />}
          {isRainy && <Raindrops />}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-8xl drop-shadow-2xl">{data.icon}</span>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-none">{data.temp}°</h1>
                  <p className="text-xl font-bold text-sky-100 opacity-90 mt-2">{getWeatherLabel(data.code).label}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-white/60">Agricultural Advisory</h3>
                  <p className="text-xl font-bold leading-relaxed">{data.advisory}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">Optimize Intelligence for your Crop:</p>
                  <div className="flex flex-wrap gap-2">
                    {['General', 'Rice', 'Wheat', 'Tomato'].map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCrop(c)}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${selectedCrop === c ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">24h Rainfall Probability</h3>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded">Next 8h</span>
                </div>
                <div className="flex items-end gap-2 h-32 bg-white/5 rounded-[2rem] p-6 border border-white/5">
                  {data.rainProb && data.rainProb.map((p, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className="bg-emerald-400 rounded-t-lg transition-all duration-1000 hover:bg-white"
                        style={{ height: `${p}%` }}
                      ></div>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">{p}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 px-2">
                  <span className="text-[8px] font-black uppercase opacity-40">Now</span>
                  <span className="text-[8px] font-black uppercase opacity-40">+8 Hours</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Humidity</p>
                  <p className="text-2xl font-black">{data.humidity}%</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Wind Speed</p>
                  <p className="text-2xl font-black">{data.wind} <span className="text-xs opacity-40">km/h</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Day Extended Forecast */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase tracking-widest text-xs opacity-50">Precision Extended Forecast</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.forecast.map((day, i) => {
              const date = new Date(day.date);
              const isToday = i === 0;
              const weather = getWeatherLabel(day.code);

              return (
                <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all ${isToday ? 'bg-white border-sky-400 shadow-xl shadow-sky-50' : 'bg-white border-slate-100 hover:border-sky-200'}`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-6">
                    {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <span className="text-5xl block text-center mb-6">{weather.icon}</span>
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-800">{day.max}°</p>
                    <p className="text-sm font-bold text-slate-400">{day.min}°</p>
                  </div>
                  <p className="text-[9px] font-black text-sky-600 uppercase text-center mt-6 tracking-widest">{weather.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Static Insights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black">Soil Nutrition Alert</h3>
              <p className="text-slate-400 font-medium">Following the {isRainy ? 'expected rain' : 'dry spell'}, soil nutrient leaching risk is <span className="text-emerald-400 font-bold">Low</span>. Ideal for fertilization.</p>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">🧪</span>
          </div>

          <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black text-slate-800">Satellite Map Overlays</h3>
              <p className="text-slate-500 font-medium leading-relaxed">View your field from space with NDVI and moisture indices. (Beta Access Required)</p>
              <button className="bg-slate-900 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest">Join Beta Registry</button>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000 grayscale">🛰️</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Weather;