import React from 'react';
import { ArrowLeft, TrendingUp, Calculator, ShieldCheck, CloudSun, ShoppingCart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            title: "Real-Time Market Intelligence",
            description: "Access live mandi prices from over 2,000 markets nationwide. Our AI analyzes historical trends to predict future price movements with 85% accuracy.",
            details: ["Live APMC Data", "Price History Charts", "AI Price Predictions"]
        },
        {
            icon: <Calculator className="w-8 h-8 text-emerald-500" />,
            title: "Crop Value Calculator",
            description: "Don't guess your crop's worth. Input quality parameters (moisture, grain size, etc.) and get an instant, fair market value estimate before you sell.",
            details: ["Quality-based Pricing", "Fair Value Estimation", "Negotiation Support"]
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
            title: "Government Schemes",
            description: "We aggregate thousands of central and state schemes. Filter by your state, crop, and land size to find subsidies you are eligible for.",
            details: ["Eligibility Check", "Application Assistance", "Document Vault"]
        },
        {
            icon: <CloudSun className="w-8 h-8 text-sky-500" />,
            title: "Precision Weather",
            description: "Hyper-local forecasts for your exact farm location. Receive alerts for pests, diseases, and extreme weather events tailored to your crops.",
            details: ["14-Day Forecast", "Pest Alerts", "Sowing Advisories"]
        },
        {
            icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
            title: "Direct Marketplace",
            description: "Sell directly to verified buyers. No middlemen, no commission. Payments are held in secure escrow until you are satisfied.",
            details: ["Verified Buyers", "Secure Escrow", "Direct Negotiaton"]
        },
        {
            icon: <BookOpen className="w-8 h-8 text-rose-500" />,
            title: "Knowledge Hub",
            description: "Learn modern farming techniques from experts. Video tutorials, articles, and community forums to solve your farming problems.",
            details: ["Expert Tutorials", "Community Forum", "Best Practices"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Powerful Tools for Modern Farmers</h1>
                    <p className="text-xl text-slate-600">Everything you need to manage your farm, finances, and future in one app.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-6 h-20">{feature.description}</p>
                            <ul className="space-y-2">
                                {feature.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
