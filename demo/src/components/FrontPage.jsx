import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Ensure this path is correct

const FrontPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // Automatically get count from global state
  const [weatherData, setWeatherData] = useState({ temp: '--', icon: '☀️' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/support/weather');
        const json = await res.json();
        if (json.success) setWeatherData({ temp: json.data.temp, icon: json.data.icon });
      } catch (err) {
        console.error("Failed to fetch header weather", err);
      }
    };
    fetchWeather();
  }, []);

  // Get dynamic greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const menuItems = [
    { title: 'Market Prices', icon: '📈', desc: 'Real-time crop rates', color: 'text-blue-600', bg: 'bg-blue-50', path: '/market-prices', badge: 'Live' },
    { title: 'My Crops', icon: '🌾', desc: 'Track your growth', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/my-crops' },
    { title: 'Govt Schemes', icon: '🏛️', desc: 'Subsidy & Grants', color: 'text-amber-600', bg: 'bg-amber-50', path: '/govt-schemes', badge: 'New' },
    { title: 'Marketplace', icon: '🤝', desc: 'Buy/Sell Equipment', color: 'text-purple-600', bg: 'bg-purple-50', path: '/marketplace' },
    { title: 'Weather', icon: '☀️', desc: 'Precision forecasting', color: 'text-sky-600', bg: 'bg-sky-50', path: '/weather' },
    { title: 'Support', icon: '📞', desc: 'Expert consultation', color: 'text-rose-600', bg: 'bg-rose-50', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* --- Modern Top Nav --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <span className="text-white text-xl">🌱</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none">AgriWise</h2>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Smart Farming</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart Button with Animated Badge */}
            <button
              onClick={() => navigate('/cart')}
              className="group relative p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 transition-all"
            >
              <span className="text-xl group-hover:scale-110 transition-transform block">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={onLogout}
              className="hidden sm:block bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">

        {/* --- Welcome Header --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">{greeting}, Farmer! 👋</h1>
            <p className="text-slate-500 mt-2 font-medium">Here is what's happening on your farm today.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-4 py-2 text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase">Weather</p>
              <p className="font-bold text-slate-800 flex items-center gap-1">{weatherData.temp}°C <span className="text-sky-500">{weatherData.icon}</span></p>
            </div>
            <div className="w-[1px] h-8 bg-slate-200"></div>
            <div className="px-4 py-2 text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase">Air Quality</p>
              <p className="font-bold text-emerald-600">Good</p>
            </div>
          </div>
        </header>

        {/* --- Interactive Search --- */}
        <div className="relative group max-w-2xl">
          <input
            type="text"
            placeholder="Search for crops, mandi rates, or tools..."
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 px-14 shadow-xl shadow-slate-100/50 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl group-focus-within:scale-110 transition-transform">🔍</span>
        </div>

        {/* --- High Impact Banner --- */}
        <div className="group relative bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Market Alert
            </span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Wheat prices are <span className="text-emerald-400 italic">surging</span> in Kerala.
            </h2>
            <p className="text-slate-400 text-lg font-medium">Sell now to maximize your profit by up to 12%.</p>
            <button className="bg-white text-slate-900 font-black px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-2 group-hover:gap-4">
              Analyze Trends <span>→</span>
            </button>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none"></div>
          <div className="absolute -right-12 -bottom-12 text-[15rem] opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-1000">🌾</div>
        </div>

        {/* --- Navigation Grid --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative flex flex-col items-start bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden"
            >
              {item.badge && (
                <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg uppercase">
                  {item.badge}
                </span>
              )}

              <div className={`${item.bg} h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h4 className="font-black text-slate-800 text-2xl tracking-tight">{item.title}</h4>
              <p className="text-slate-500 font-medium mt-2 leading-relaxed">{item.desc}</p>

              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Open Dashboard <span>→</span>
              </div>
            </button>
          ))}
        </section>
      </main>

      {/* --- Floating Bottom Nav --- */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl text-white rounded-[2rem] py-4 px-8 flex justify-between items-center shadow-2xl border border-white/10 ring-1 ring-white/5">
          <button onClick={() => navigate('/')} className="text-emerald-400 flex flex-col items-center gap-1 transition-all">
            <span className="text-2xl">🏠</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => navigate('/marketplace')} className="opacity-50 hover:opacity-100 flex flex-col items-center gap-1 transition-all">
            <span className="text-2xl">📦</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Market</span>
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-400 p-5 rounded-full -mt-20 border-[8px] border-[#f8fafc] shadow-xl transition-all active:scale-90 text-3xl">
            ➕
          </button>
          <button onClick={() => navigate('/support')} className="opacity-50 hover:opacity-100 flex flex-col items-center gap-1 transition-all">
            <span className="text-2xl">💬</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Chat</span>
          </button>
          <button onClick={() => navigate('/cart')} className="opacity-50 hover:opacity-100 flex flex-col items-center gap-1 transition-all">
            <span className="text-2xl">🛒</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;