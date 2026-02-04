import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Ensure this path is correct
import { 
  ArrowLeft, Trash2, Plus, Minus, 
  ShoppingBag, ShieldCheck, Truck, ChevronRight 
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-900">
      {/* --- Header --- */}
      <nav className="bg-emerald-800 text-white sticky top-0 z-50 px-4 py-4 flex items-center gap-4 shadow-md">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Shopping Basket ({totalItems})</h1>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        {cartItems.length === 0 ? (
          /* --- Empty Cart State --- */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm mt-10">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Your basket is empty</h2>
            <p className="text-slate-500 mt-2 text-center max-w-xs">
              Looks like you haven't added any fresh harvest to your basket yet.
            </p>
            <button 
              onClick={() => navigate("/marketplace")}
              className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* --- Left: Cart Items List --- */}
            <div className="lg:w-2/3 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="font-black text-lg mb-4 flex items-center gap-2">
                  Items from Verified Farmers
                </h2>
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 flex gap-4 first:pt-0 last:pb-0">
                      {/* Product Image */}
                      <img 
                        src={item.imageUrl} 
                        alt={item.crop} 
                        className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-2xl bg-slate-100"
                      />
                      
                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-slate-800 text-lg capitalize">{item.crop}</h3>
                            <p className="font-black text-lg text-slate-900">₹{item.price * item.quantity}</p>
                          </div>
                          <p className="text-sm text-emerald-600 font-medium">Farmer: {item.farmer}</p>
                          <p className="text-xs text-slate-400 mt-1">Unit Price: ₹{item.price}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-2 py-1 border border-slate-200">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white rounded-md transition-colors text-slate-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white rounded-md transition-colors text-slate-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:bg-red-50 rounded-lg p-2 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Right: Price Summary --- */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                <h3 className="font-black text-xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-slate-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-sm border-t border-slate-100 pt-4">
                    <span>Tax (GST)</span>
                    <span className="font-bold text-slate-900">₹0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-6 mb-8">
                  <span className="font-black text-lg">Total Amount</span>
                  <span className="text-2xl font-black text-emerald-800">₹{totalPrice}</span>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                    Checkout Now <ChevronRight size={20} />
                  </button>
                  
                  <div className="bg-emerald-50 p-3 rounded-xl flex items-center gap-3">
                    <Truck size={20} className="text-emerald-600 shrink-0" />
                    <p className="text-[10px] text-emerald-800 font-bold leading-tight uppercase">
                      Free Carbon-Neutral Delivery applied to this order!
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span>Secure Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;