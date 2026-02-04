import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Phone, 
  TrendingUp, 
  ArrowLeft,
  ShoppingCart,
  ChevronRight,
  PackageCheck,
  Store
} from "lucide-react";
import { useCart } from "./CartContext"; 

const getCropImage = (crop) => {
  const images = {
    Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
    Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
  };
  return images[crop] || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400";
};

const Marketplace = () => {
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart(); 
  
  const [products] = useState([
    { id: 1, crop: "Rice", price: 2200, quantity: 50, location: "Kerala", farmer: "Ramesh", rating: 4.5 },
    { id: 2, crop: "Wheat", price: 1800, quantity: 30, location: "Punjab", farmer: "Suresh", rating: 4.0 },
    { id: 3, crop: "Tomato", price: 1200, quantity: 20, location: "Tamil Nadu", farmer: "Arjun", rating: 3.8 },
    { id: 4, crop: "Rice", price: 2100, quantity: 100, location: "Andhra", farmer: "Lakshmi", rating: 4.8 },
    { id: 5, crop: "Wheat", price: 1950, quantity: 45, location: "Haryana", farmer: "Vikram", rating: 4.2 },
  ]);

  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  let filtered = products.filter((p) => {
    const matchesLocation = locationFilter === "" || p.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = maxPrice === "" || p.price <= parseInt(maxPrice);
    const matchesSearch = p.crop.toLowerCase().includes(searchQuery.toLowerCase()) || p.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesPrice && matchesSearch;
  });

  if (sortBy === "priceLow") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans text-slate-900 pb-10">
      {/* --- Premium Navbar --- */}
      <nav className="bg-emerald-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 hover:bg-emerald-800 rounded-xl transition-all border border-emerald-800"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Store size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tight uppercase">Agri<span className="text-emerald-400">Market</span></h1>
            </div>
          </div>

          <div className="hidden md:flex bg-emerald-950/50 rounded-2xl px-5 py-2.5 items-center w-2/5 border border-emerald-800 focus-within:border-emerald-400 transition-all shadow-inner">
            <Search size={18} className="text-emerald-500 mr-3" />
            <input 
              type="text" 
              placeholder="Search crops or farmers..." 
              className="bg-transparent outline-none w-full text-sm placeholder-emerald-700 text-emerald-50"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/cart')} 
              className="p-3 bg-emerald-800 hover:bg-emerald-700 rounded-2xl transition-all relative border border-emerald-700 shadow-lg"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-emerald-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-10">
        {/* --- Sidebar Filters --- */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-emerald-100 sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Filter size={20} className="text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Market Filters</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase text-emerald-800 mb-3 block tracking-widest">Region / State</label>
                <div className="relative group">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <input
                    type="text"
                    placeholder="e.g. Kerala"
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-emerald-800 mb-3 block tracking-widest">Max Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 font-bold">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl pl-9 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-50">
                 <div className="bg-emerald-900 rounded-2xl p-4 text-white">
                    <TrendingUp className="text-emerald-400 mb-2" size={20} />
                    <p className="text-xs font-medium opacity-80 leading-relaxed">Wheat prices are predicted to rise by 4% this week.</p>
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- Product Grid --- */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-black text-emerald-900 tracking-tight">Verified Harvests</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-slate-500 text-sm font-medium">{filtered.length} products available</p>
              </div>
            </div>

            <select
              className="bg-white border-2 border-emerald-50 px-5 py-3 rounded-2xl text-sm font-bold text-emerald-900 outline-none shadow-sm hover:border-emerald-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">✨ Featured Selection</option>
              <option value="priceLow">📉 Price: Low to High</option>
              <option value="priceHigh">📈 Price: High to Low</option>
              <option value="rating">⭐️ Highest Farmer Rating</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((p) => {
                const productImg = getCropImage(p.crop);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={p.id}
                    className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src={productImg} 
                        alt={p.crop} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl text-xs font-black text-emerald-800 flex items-center gap-1.5 shadow-xl">
                        <Star size={14} className="fill-emerald-500 text-emerald-500" /> {p.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-emerald-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest">
                        New Batch
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <div className="space-y-0.5">
                          <h3 className="font-black text-xl text-emerald-900 capitalize tracking-tight">{p.crop}</h3>
                          <div className="flex items-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                            <MapPin size={12} className="mr-1 text-emerald-500" /> {p.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-700 font-black text-2xl tracking-tighter">₹{p.price}</p>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Quintal</p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="py-4 border-t border-emerald-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-black text-sm border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    {p.farmer[0]}
                                </div>
                                <div className="leading-tight">
                                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Farmer</p>
                                  <span className="text-slate-800 font-black text-sm">{p.farmer}</span>
                                </div>
                            </div>
                            <div className="text-right leading-tight">
                               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Stock</p>
                               <span className="text-emerald-600 font-black text-xs">{p.quantity} qtl</span>
                            </div>
                        </div>

                        <div className="flex gap-2.5 mt-2">
                          <button
                            onClick={() => navigate(`/product/${p.id}`, { state: { ...p, imageUrl: productImg } })}
                            className="flex-1 bg-white border-2 border-emerald-100 py-3 rounded-2xl font-black text-emerald-900 text-[10px] uppercase tracking-widest hover:bg-emerald-50 hover:border-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            Details <ChevronRight size={14} />
                          </button> 
                          
                          <button 
                            onClick={() => addToCart({ ...p, imageUrl: productImg })}
                            className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all active:scale-90 flex items-center justify-center shadow-lg shadow-emerald-100"
                            title="Add to Cart"
                          >
                            <ShoppingCart size={18} />
                          </button>

                          <button className="w-12 h-12 bg-white border-2 border-emerald-100 text-emerald-700 rounded-2xl hover:bg-emerald-50 transition-colors flex items-center justify-center">
                            <Phone size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      {/* --- Footer Branding --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white border border-emerald-100 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-emerald-900 rounded-2xl">
              <PackageCheck size={32} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-lg">100% Quality Assurance</h4>
              <p className="text-slate-500 text-sm font-medium">Every harvest is verified for grade and moisture by local experts.</p>
            </div>
          </div>
          <button className="bg-emerald-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-100">
            Become a Verified Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;