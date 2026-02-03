import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Phone, 
  User, 
  Package, 
  ShieldCheck 
} from "lucide-react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { state: product } = useLocation();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
        <p className="text-slate-500 mt-2">Please go back to the marketplace to select a crop.</p>
        <button 
          onClick={() => navigate("/marketplace")} 
          className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all"
        >
          Go back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Navbar synced with Marketplace */}
      <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 hover:bg-emerald-600 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Product Details</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-slate-100 relative">
            <img 
              src={product.imageUrl} 
              alt={product.crop}
              className="w-full h-full object-cover min-h-[350px] md:min-h-[500px]"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 flex items-center gap-1 shadow-sm border border-emerald-100">
              <ShieldCheck size={14} /> Verified Quality
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 capitalize">{product.crop}</h2>
                <div className="flex items-center gap-2 text-slate-500 mt-2">
                  <MapPin size={18} className="text-emerald-600" />
                  <span className="font-medium text-lg">{product.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-emerald-700">₹{product.price}</p>
                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider">per quintal</p>
              </div>
            </div>

            <div className="flex items-center gap-4 my-6 py-4 border-y border-slate-50">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                <Star className="text-yellow-500 fill-yellow-500" size={18} />
                <span className="font-bold text-yellow-700 text-lg">{product.rating}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2 text-slate-600">
                <Package size={20} className="text-emerald-600" />
                <span className="font-semibold">{product.quantity} quintals left</span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg uppercase">
                  {product.farmer[0]}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Farmer Name</p>
                  <p className="font-bold text-slate-800 text-lg">{product.farmer}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                This batch of {product.crop} is sourced directly from {product.farmer}'s farm in {product.location}. 
                It is organic-certified and has passed local quality checks.
              </p>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => alert("Proceeding to secure checkout...")}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={22} /> Buy Now
              </button>
              <button
                onClick={() => alert(`Contacting ${product.farmer}...`)}
                className="flex-1 border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={22} /> Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;