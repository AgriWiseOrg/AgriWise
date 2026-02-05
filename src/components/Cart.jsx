import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
                <ShoppingBag size={64} className="mb-4 text-emerald-200" />
                <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/marketplace')}
                    className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
                >
                    Browse Marketplace
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-emerald-700 font-bold hover:underline">
                    <ArrowLeft size={20} /> Back
                </button>

                <h1 className="text-3xl font-black text-gray-800 mb-8">Shopping Cart</h1>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{item.name || item.crop}</h3>
                                    <p className="text-emerald-600 font-medium">₹{item.price} / qtl</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-bold text-gray-600">Qty: {item.quantity}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-gray-600">Total Price</span>
                        <span className="text-3xl font-black text-emerald-700">₹{totalPrice}</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={clearCart}
                            className="px-6 py-3 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition"
                        >
                            Clear Cart
                        </button>
                        <button className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
