import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import the navigation hook
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  ShoppingCart, 
  Phone, 
  TrendingUp, 
  X,
  ArrowLeft // Import the arrow icon
} from "lucide-react";

const getCropImage = (crop) => {
  const images = {
    Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
    Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
  };
  return images[crop] || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400";
};

const Marketplace = () => {
  // Navigation Hook
  const navigate = useNavigate();

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* --- Navbar --- */}
      <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            {/* BACK BUTTON */}
            <button 
              onClick={() => navigate('/')} 
              className="p-2 -ml-2 hover:bg-emerald-600 rounded-full transition-colors duration-200 group"
              aria-label="Go back home"
            >
              <ArrowLeft className="text-emerald-100 group-hover:text-white" size={24} />
            </button>
            
            <div className="flex items-center gap-2">
              <TrendingUp size={24} />
              <h1 className="text-xl font-bold tracking-tight">AgriMarket</h1>
            </div>
          </div>

          <div className="hidden md:flex bg-emerald-800 rounded-full px-4 py-2 items-center w-1/3 border border-emerald-600 focus-within:ring-2 ring-emerald-400 transition-all">
            <Search size={18} className="text-emerald-300 mr-2" />
            <input 
              type="text" 
              placeholder="Search crops or farmers..." 
              className="bg-transparent outline-none w-full text-sm placeholder-emerald-300/70"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMobileFilterOpen(true)}>
            <Filter />
          </button>
        </div>
      </nav>

      {/* ... Rest of the component remains the same ... */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 flex gap-8">
        
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} className="text-emerald-600" />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 mb-2 block">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Punjab"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 mb-2 block">Max Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    placeholder="2500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <motion.div 
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                className="absolute right-0 top-0 h-full w-3/4 bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}><X /></button>
                </div>
                <input 
                  type="text" placeholder="Location" 
                  className="w-full border p-2 rounded mb-4"
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
                 <input 
                  type="number" placeholder="Max Price" 
                  className="w-full border p-2 rounded"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Fresh Produce <span className="text-slate-400 font-normal text-lg">({filtered.length} results)</span>
            </h2>

            <select
              className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={getCropImage(p.crop)} 
                      alt={p.crop} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 shadow-sm flex items-center gap-1">
                      <Star size={12} className="fill-emerald-600 text-emerald-600" /> {p.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{p.crop}</h3>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <MapPin size={12} className="mr-1" /> {p.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-700 font-bold text-lg">₹{p.price}</p>
                        <p className="text-[10px] text-slate-400 uppercase">per quintal</p>
                      </div>
                    </div>

                    <div className="my-3 pt-3 border-t border-slate-50 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                                {p.farmer[0]}
                            </div>
                            <span className="text-slate-600">{p.farmer}</span>
                        </div>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                            {p.quantity} qtl left
                        </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-emerald-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-emerald-200 shadow-lg">
                        <ShoppingCart size={16} /> Buy Now
                      </button>
                      <button className="px-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                        <Phone size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No crops found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {setLocationFilter(""); setMaxPrice(""); setSearchQuery("");}}
                className="mt-6 text-emerald-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Marketplace;