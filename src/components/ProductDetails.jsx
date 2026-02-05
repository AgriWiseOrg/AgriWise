import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, MapPin, User, ShieldCheck } from 'lucide-react';
import { useCart } from './CartContext';

const ProductDetails = () => {
    const { state: product } = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    if (!product) return <div>Product not found</div>;

    return (
        <div className="min-h-screen bg-emerald-50/30 p-4 md:p-10 font-sans">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition text-slate-700 font-bold"
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                {/* Image Section */}
                <div className="h-96 lg:h-full relative bg-slate-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl font-black text-emerald-800 text-xs uppercase tracking-widest shadow-lg">
                        Certified Quality
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-black text-emerald-950 mb-4 leading-tight">
                            {product.name || product.crop}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-emerald-500" /> {product.location}</span>
                            <span className="flex items-center gap-1.5"><User size={16} className="text-emerald-500" /> {product.farmerName || product.farmer}</span>
                        </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                        Freshly harvested {product.name} from {product.location}.
                        Grown with care by local farmers using sustainable agricultural practices.
                        Verified for quality and market standards.
                    </p>

                    <div className="bg-emerald-50 rounded-3xl p-8 mb-10">
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-black text-emerald-800">₹{product.price}</span>
                            <span className="text-slate-400 font-bold mb-2">/ quintal</span>
                        </div>
                        <p className="text-emerald-600 font-medium flex items-center gap-2">
                            <ShieldCheck size={18} /> Best Price Guarantee
                        </p>
                    </div>

                    <div className="flex gap-4 mt-auto">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-emerald-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-emerald-800 transition shadow-xl shadow-emerald-200 flex items-center justify-center gap-3"
                        >
                            <ShoppingCart size={24} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
