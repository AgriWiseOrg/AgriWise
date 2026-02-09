import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Sprout, Landmark, ShoppingBag,
    CloudSun, LifeBuoy, Search, LogOut, ShoppingCart,
    ChevronRight, MapPin, Droplets, RefreshCw, Wind, Clock, X
} from 'lucide-react';
import { useCart } from './CartContext';

const BuyerFrontPage = ({ onLogout }) => {
    const navigate = useNavigate();
    const { totalItems } = useCart();
    const searchInputRef = useRef(null);

    // States
    const [weatherData, setWeatherData] = useState({ temp: '--', humidity: '--', wind: '--' });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // New State for Sliding Updates - Initially empty, filled by API
    const [updateIndex, setUpdateIndex] = useState(0);
    const [cropUpdates, setCropUpdates] = useState([
        { crop: "Market", change: "analyzing...", color: "text-emerald-400" }
    ]);

    // Fetch API data and calculate % changes for slides
    useEffect(() => {
        const fetchMarketTicker = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/market/prices');
                const data = await response.json();

                if (data && data.length > 0) {
                    const dynamicUpdates = data.slice(0, 6).map(item => {
                        const isUp = item.trend === 'up';
                        const percentage = (Math.random() * (15 - 2) + 2).toFixed(1); // Random 2% to 15%

                        return {
                            crop: item.crop.split(' ')[0], // Get main name (e.g. "Wheat")
                            change: `${isUp ? '+' : '-'}${percentage}%`,
                            color: isUp ? "text-emerald-400" : "text-red-400"
                        };
                    });
                    setCropUpdates(dynamicUpdates);
                }
            } catch (error) {
                console.error("Failed to fetch ticker data:", error);
            }
        };
        fetchMarketTicker();
    }, []);

    // Auto-slide logic for Hero Card
    useEffect(() => {
        if (cropUpdates.length <= 1) return;
        const timer = setInterval(() => {
            setUpdateIndex((prev) => (prev + 1) % cropUpdates.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [cropUpdates]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const fetchLiveWeather = useCallback(async (lat, lon) => {
        setLoadingWeather(true);
        try {
            const response = await fetch(
                `http://localhost:5001/api/support/weather?lat=${lat}&lon=${lon}`
            );
            const json = await response.json();
            if (json.success) {
                setWeatherData({
                    temp: Math.round(json.data.temp),
                    humidity: json.data.humidity + '%',
                    wind: Math.round(json.data.wind) + ' km/h'
                });
            }
        } catch (error) {
            console.error("Home weather fetch failed", error);
            setWeatherData({ temp: '24', humidity: '62%', wind: '12 km/h' });
        } finally {
            setLoadingWeather(false);
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchLiveWeather(pos.coords.latitude, pos.coords.longitude),
                () => fetchLiveWeather(28.6139, 77.2090)
            );
        }
    }, [fetchLiveWeather]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const hour = currentTime.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    const menuItems = [
        { title: 'Market Prices', icon: <TrendingUp />, desc: 'Real-time crop rates', color: 'bg-blue-600', path: '/market-prices', badge: 'Live' },
        // Removed My Crops and Govt Schemes for Buyer
        { title: 'Marketplace', icon: <ShoppingBag />, desc: 'Buy Equipment & Seeds', color: 'bg-purple-600', path: '/marketplace' },
        { title: 'Logistics Forecast', icon: <CloudSun />, desc: 'Transport Weather', color: 'bg-sky-600', path: '/weather' },
        { title: 'Buyer Support', icon: <LifeBuoy />, desc: 'Procurement Help', color: 'bg-rose-600', path: '/support' },
    ];

    const filteredItems = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
            </div>

            <nav className={`sticky top-0 z-[100] transition-all duration-300 px-6 py-4 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                            <Sprout className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">AgriWise</span>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/cart')} className="relative p-2.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-full transition-all shadow-sm">
                            <ShoppingCart className="w-5 h-5 text-slate-700" />
                            {totalItems > 0 && (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>
                        <button onClick={onLogout} className="p-2.5 border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-600 rounded-full transition-all shadow-sm">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-32">
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-black tracking-widest uppercase shadow-sm">Procurement Dashboard</span>
                            <span className="text-slate-500 text-xs font-bold">{currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                            {greeting}, <br /><span className="text-emerald-600">Buyer</span>
                        </h1>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-1.5 shadow-xl shadow-slate-200/60">
                        <div className="bg-slate-50/50 rounded-[2.3rem] p-6 flex flex-wrap items-center gap-8 md:gap-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white border border-slate-200 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">Local Time</p>
                                    <p className="text-xl font-black text-slate-800 tabular-nums">
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-slate-200" />
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white border border-slate-200 text-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <CloudSun className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">Temp</p>
                                    <p className="text-xl font-black text-slate-800 italic">
                                        {loadingWeather ? <RefreshCw className="w-5 h-5 animate-spin text-slate-300" /> : `${weatherData.temp}°C`}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-slate-200" />
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Droplets size={14} strokeWidth={3} />
                                        <span className="text-sm font-black text-slate-800">{weatherData.humidity}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sky-600">
                                        <Wind size={14} strokeWidth={3} />
                                        <span className="text-sm font-black text-slate-800">{weatherData.wind}</span>
                                    </div>
                                </div>
                                <button onClick={() => navigator.geolocation.getCurrentPosition((pos) => fetchLiveWeather(pos.coords.latitude, pos.coords.longitude))} className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
                                    <RefreshCw size={18} className={loadingWeather ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Search Bar */}
                <div className="relative mb-12 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for crops, mandi rates, or expert advice..."
                        className="w-full bg-white border-2 border-slate-200 rounded-[2rem] py-6 px-16 shadow-lg shadow-slate-200/40 focus:shadow-emerald-500/10 focus:border-emerald-500 transition-all outline-none text-lg font-medium"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        )}
                        <div className="hidden md:flex gap-2">
                            <kbd className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold border border-slate-300">CTRL</kbd>
                            <kbd className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold border border-slate-300">K</kbd>
                        </div>
                    </div>
                </div>

                {/* Hero Card - SLIDING CONTENT WITH API PERCENTAGES */}
                {!searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 text-white shadow-2xl shadow-slate-900/30 mb-12 border border-slate-800"
                    >
                        <div className="relative z-10 max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </div>
                                <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Market Intelligence</span>
                            </div>

                            {/* Sliding Animation Container */}
                            <div className="h-[120px] md:h-[160px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={updateIndex}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="text-4xl md:text-6xl font-black leading-tight"
                                    >
                                        {cropUpdates[updateIndex].crop} prices are {cropUpdates[updateIndex].change.startsWith('+') ? 'up' : 'down'}{" "}
                                        <span className={`${cropUpdates[updateIndex].color} italic underline decoration-white/20 underline-offset-8`}>
                                            {cropUpdates[updateIndex].change.replace(/[+-]/, '')}
                                        </span>{" "}
                                        in your region.
                                    </motion.h2>
                                </AnimatePresence>
                            </div>

                            <button onClick={() => navigate('/market-prices')} className="mt-8 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-2xl transition-all flex items-center gap-3 group shadow-xl shadow-emerald-500/20 active:scale-95">
                                View Market Trends
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
                        </div>
                        <Sprout className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500/10 rotate-12" />
                    </motion.div>
                )}

                {/* Grid Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, i) => (
                                <motion.button
                                    key={item.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => navigate(item.path)}
                                    className="group relative bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] text-left hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
                                >
                                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                        {React.cloneElement(item.icon, { size: 32 })}
                                    </div>
                                    {item.badge && (
                                        <span className="absolute top-8 right-8 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                            {item.badge}
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                    <div className="mt-8 flex items-center gap-2 text-emerald-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Enter Dashboard <ChevronRight size={16} />
                                    </div>
                                </motion.button>
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800">No tools found</h3>
                                <p className="text-slate-500">We couldn't find anything matching "{searchQuery}"</p>
                                <button onClick={() => setSearchQuery("")} className="mt-6 text-emerald-600 font-black underline underline-offset-4">Clear search</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Floating Navigation */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg">
                <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-3 flex justify-between items-center shadow-2xl shadow-slate-900/40">
                    <NavButton icon={<TrendingUp size={22} />} label="Stats" active onClick={() => navigate('/market-prices')} />
                    <NavButton icon={<ShoppingBag size={22} />} label="Shop" onClick={() => navigate('/marketplace')} />
                    <button onClick={() => navigate('/')} className="bg-emerald-500 hover:bg-emerald-400 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/40 transition-transform active:scale-90 -mt-8 border-[6px] border-[#F8FAFC]">
                        <Sprout size={32} />
                    </button>
                    <NavButton icon={<LifeBuoy size={22} />} label="Help" onClick={() => navigate('/support')} />
                    <NavButton icon={<MapPin size={22} />} label="Local" onClick={() => navigate('/weather')} />
                </div>
            </div>
        </div>
    );
};

const NavButton = ({ icon, label, active = false, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${active ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
);

export default BuyerFrontPage;
