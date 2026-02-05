import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Sprout, Landmark, ShoppingBag, 
  CloudSun, LifeBuoy, Search, LogOut, ShoppingCart, 
  ChevronRight, MapPin, Droplets // Changed Wind to Droplets
} from 'lucide-react';
import { useCart } from './CartContext';

const FrontPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [weatherData, setWeatherData] = useState({ temp: '24', humidity: '62%' }); // Updated state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Market Prices', icon: <TrendingUp />, desc: 'Real-time crop rates', color: 'bg-blue-500', path: '/market-prices', badge: 'Live' },
    { title: 'My Crops', icon: <Sprout />, desc: 'Track your growth', color: 'bg-emerald-500', path: '/my-crops' },
    { title: 'Govt Schemes', icon: <Landmark />, desc: 'Subsidy & Grants', color: 'bg-orange-500', path: '/govt-schemes', badge: 'New' },
    { title: 'Marketplace', icon: <ShoppingBag />, desc: 'Equipment & Seeds', color: 'bg-purple-500', path: '/marketplace' },
    { title: 'Weather', icon: <CloudSun />, desc: 'Precision forecast', color: 'bg-sky-500', path: '/weather' },
    { title: 'Support', icon: <LifeBuoy />, desc: 'Expert help', color: 'bg-rose-500', path: '/support' },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-100">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-50 blur-[100px]" />
      </div>

      <nav className={`sticky top-0 z-[100] transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-white/70 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              AgriWise
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/cart')} className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-700" />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-32">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {greeting}, <span className="text-emerald-600">Farmer</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg font-medium tracking-tight">
              Let's optimize your harvest today.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 bg-white border border-slate-100 p-4 rounded-3xl shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Temperature</p>
                <p className="text-xl font-bold text-slate-800">{weatherData.temp}°C</p>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-slate-100" />
            
            {/* --- Updated: Humidity Level --- */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Humidity</p>
                <p className="text-xl font-bold text-blue-600">{weatherData.humidity}</p>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="relative mb-12 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for crops, mandi rates, or expert advice..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-14 shadow-sm focus:shadow-xl focus:border-emerald-500 transition-all outline-none text-lg"
          />
        </div>

        {/* --- Hero with New Status Ripple Animation --- */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 text-white shadow-2xl shadow-emerald-900/20 mb-12"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-3 w-3">
                {/* Modern Ripple Animation */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-[0.2em]">Market Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
              Wheat prices are up <span className="text-emerald-400 italic">12%</span> in your region.
            </h2>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-3 group">
              View Market Trends
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-20">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
          </div>
          <Sprout className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500/10 rotate-12" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {menuItems.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(item.path)}
                className="group relative bg-white border border-slate-100 p-8 rounded-[2rem] text-left hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden"
              >
                <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-${item.color.split('-')[1]}-100 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                
                {item.badge && (
                  <span className="absolute top-8 right-8 bg-slate-50 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-slate-100">
                    {item.badge}
                  </span>
                )}

                <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                
                <div className="mt-8 flex items-center gap-2 text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Enter Dashboard <ChevronRight size={16} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg">
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 flex justify-between items-center shadow-2xl">
          <NavButton icon={<TrendingUp size={20} />} label="Stats" active />
          <NavButton icon={<ShoppingBag size={20} />} label="Shop" />
          
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-transform active:scale-90 -mt-2 border-4 border-[#FDFDFD]">
            <Sprout size={28} />
          </button>
          
          <NavButton icon={<LifeBuoy size={20} />} label="Help" />
          <NavButton icon={<MapPin size={20} />} label="Local" />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, active = false }) => (
  <button className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${active ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default FrontPage;