import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, MapPin, Star, ShoppingCart, 
  Phone, User, Package, ShieldCheck, 
  Leaf, Info, CheckCircle2, Truck,
  ChevronRight, Share2, Heart, Award
} from "lucide-react";
import { useCart } from "./CartContext"; // Added Import

const ProductDetails = () => {
  const navigate = useNavigate();
  const { state: product } = useLocation();
  const { addToCart } = useCart(); // Access the function from Context
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const reviews = [
    { id: 1, user: "Anil Kumar", rating: 5, comment: "Excellent quality rice. Very fresh!", date: "2 days ago" },
    { id: 2, user: "Meera J.", rating: 4, comment: "Good grain size, but shipping took an extra day.", date: "1 week ago" }
  ];

  // Helper function for adding to cart
  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-900">
      {/* --- Top Nav (Amazon Inspired) --- */}
      <nav className="bg-emerald-800 text-white sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-emerald-700 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-400" size={20} />
            <span className="font-black tracking-tighter text-lg">AGRIWISE</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Share2 size={20} className="cursor-pointer hover:text-emerald-300" />
          <Heart size={20} className="cursor-pointer hover:text-red-400" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- Left: Image Gallery (Fixed on Scroll for Desktop) --- */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 h-fit">
            <div className="relative group rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={product.imageUrl} 
                alt={product.crop}
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Verified Harvest
              </div>
            </div>
          </div>

          {/* --- Center: Product Info & Scrolling Content --- */}
          <div className="lg:w-[45%] flex flex-col gap-6">
            <div>
              <p className="text-emerald-600 font-bold text-sm">Brand: {product.farmer}'s Organic</p>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 capitalize leading-tight">
                {product.crop} - Fresh Harvest from {product.location}
              </h1>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-emerald-600 text-sm font-bold hover:underline cursor-pointer">
                  {product.rating} (112 ratings)
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-2xl font-light">-15%</span>
                <span className="text-3xl font-bold">₹{product.price}</span>
              </div>
              <p className="text-slate-500 text-sm italic">M.R.P.: <span className="line-through">₹{Math.floor(product.price * 1.15)}</span></p>
              <p className="text-emerald-700 font-bold text-sm mt-2 flex items-center gap-2">
                <Award size={16} /> Best Price in {product.location}
              </p>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-4 gap-2 py-4">
              {[
                { icon: <Truck />, label: "Fast Delivery" },
                { icon: <ShieldCheck />, label: "Quality Check" },
                { icon: <Leaf />, label: "100% Organic" },
                { icon: <CheckCircle2 />, label: "Free Returns" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Scrollable Details Section */}
            <div className="space-y-8 mt-4">
              <section>
                <h3 className="font-black text-lg border-b-2 border-emerald-500 w-fit pb-1 mb-4">Product Specifications</h3>
                <table className="w-full text-sm text-slate-600">
                  <tbody>
                    <tr className="border-b border-slate-50"><td className="py-2 font-bold w-1/3">Farmer</td><td>{product.farmer}</td></tr>
                    <tr className="border-b border-slate-50"><td className="py-2 font-bold">Origin</td><td>{product.location}, India</td></tr>
                    <tr className="border-b border-slate-50"><td className="py-2 font-bold">Quantity Available</td><td>{product.quantity} Quintals</td></tr>
                    <tr className="border-b border-slate-50"><td className="py-2 font-bold">Grade</td><td>Grade A (Export Quality)</td></tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h3 className="font-black text-lg border-b-2 border-emerald-500 w-fit pb-1 mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map(r => (
                    <div key={r.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">
                          {r.user[0]}
                        </div>
                        <span className="font-bold text-sm">{r.user}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={`${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed italic">"{r.comment}"</p>
                      <span className="text-[10px] text-slate-400 mt-2 block font-bold">{r.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* --- Right: Sticky Purchase Sidebar (Amazon Style) --- */}
          <div className="hidden lg:block lg:w-[25%]">
            <div className="border border-slate-200 p-6 rounded-3xl sticky top-24 shadow-sm bg-white">
              <p className="text-2xl font-bold">₹{product.price}</p>
              <p className="text-emerald-600 text-sm font-bold mt-2 flex items-center gap-1 underline cursor-pointer">
                FREE Delivery <ChevronRight size={14} />
              </p>
              <p className="text-slate-600 text-sm mt-4">Delivery by <span className="font-black">Monday, Feb 9</span></p>
              
              <div className="my-6 space-y-3">
                <p className="text-emerald-700 text-xl font-bold">In Stock</p>
                <div className="bg-slate-100 p-2 rounded-lg flex items-center justify-between text-sm font-bold">
                  <span>Quantity:</span>
                  <select className="bg-transparent outline-none">
                    {[...Array(10)].map((_, i) => <option key={i+1}>{i+1} Quintal</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 py-3 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
                  Buy Now
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>Secure transaction handled by AgriWise.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Fixed Bottom Bar (Amazon App Style) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-yellow-400 py-3 rounded-xl font-black text-sm active:scale-95"
        >
          Add to Cart
        </button>
        <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-black text-sm active:scale-95">Buy Now</button>
        <button className="p-3 border border-slate-200 rounded-xl">
           <Phone size={20} className="text-emerald-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;