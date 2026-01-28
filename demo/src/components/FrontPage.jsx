import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Market Prices', icon: '📈', desc: 'Check today’s rates', color: 'text-blue-600', bg: 'bg-blue-50', path: '/market-prices' },
    { title: 'My Crops', icon: '🌾', desc: 'Manage your farm', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/my-crops' },
    { title: 'Govt Schemes', icon: '🏛️', desc: 'New subsidies alert', color: 'text-amber-600', bg: 'bg-amber-50', path: '/govt-schemes' },
    { title: 'Marketplace', icon: '🤝', desc: 'Buy & sell tools', color: 'text-purple-600', bg: 'bg-purple-50', path: '/marketplace' },
    { title: 'Weather', icon: '☀️', desc: 'Rain in 2 days', color: 'text-sky-600', bg: 'bg-sky-50', path: '/weather' },
    { title: 'Support', icon: '📞', desc: 'Talk to experts', color: 'text-rose-600', bg: 'bg-rose-50', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-emerald-700 tracking-tight">AgriWise</h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-widest">Farmer Dashboard</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-slate-700 font-bold text-sm border border-slate-200 transition-colors">
            🌐 <span className="hidden sm:inline">English</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Responsive Grid for Header Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative">
            <input 
              type="text" 
              placeholder="Search crops, schemes, or tools..." 
              className="w-full bg-white border border-slate-200 rounded-3xl py-4 px-12 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          <div className="hidden lg:flex items-center justify-around bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
            <div className="text-center"><p className="text-xs text-slate-400 font-bold">TEMP</p><p className="font-black text-xl">28°C</p></div>
            <div className="h-8 w-[1px] bg-slate-100"></div>
            <div className="text-center"><p className="text-xs text-slate-400 font-bold">HUMIDITY</p><p className="font-black text-xl">65%</p></div>
          </div>
        </div>

        {/* Featured Alert Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100/50 relative overflow-hidden group">
          <div className="relative z-10 max-w-lg">
            <h3 className="font-bold text-lg opacity-80 uppercase tracking-widest text-emerald-100">Market Intelligence</h3>
            <p className="text-3xl md:text-4xl font-black mt-2 leading-tight">Wheat prices increased by 5% today in your district!</p>
            <button className="mt-6 bg-white text-emerald-700 font-bold px-6 py-2 rounded-full text-sm hover:bg-emerald-50 transition-colors">View Details</button>
          </div>
          <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-10 group-hover:scale-110 transition-transform duration-700 select-none">🚜</div>
        </div>

        {/* Dynamic Action Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          {menuItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => navigate(item.path)}
              className="group flex items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all text-left"
            >
              <div className={`${item.bg} h-20 w-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 group-hover:rotate-12 transition-transform shadow-inner`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xl leading-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            </button>
          ))}
        </section>
      </main>

      {/* Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 sm:px-0 z-50">
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-full py-4 px-10 flex justify-between items-center shadow-2xl border border-white/10">
          <button onClick={() => navigate('/')} className="text-emerald-400 hover:scale-110 transition-transform">🏠</button>
          <button onClick={() => navigate('/marketplace')} className="opacity-50 hover:opacity-100 hover:scale-110 transition-transform">📦</button>
          <button className="bg-emerald-500 hover:bg-emerald-400 p-4 rounded-full -mt-16 border-[6px] border-slate-50 shadow-lg transition-all active:scale-90 text-2xl">➕</button>
          <button onClick={() => navigate('/support')} className="opacity-50 hover:opacity-100 hover:scale-110 transition-transform">💬</button>
          <button className="opacity-50 hover:opacity-100 hover:scale-110 transition-transform">👤</button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;