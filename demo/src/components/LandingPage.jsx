import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Sprout,
    ShieldCheck,
    CloudSun,
    ArrowRight,
    CheckCircle2,
    Users,
    Leaf,
    Calculator
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            title: "Real-Time Market Intelligence",
            description: "Get up-to-the-minute crop prices from mandis across the country. Make informed selling decisions with AI-driven price forecasts.",
            bg: "bg-blue-50"
        },
        {
            icon: <Calculator className="w-8 h-8 text-emerald-500" />,
            title: "Smart Pricing & Inventory",
            description: "Manage your crop listings and calculate the perfect selling price using our quality-based price calculator.",
            bg: "bg-emerald-50"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
            title: "Government Schemes",
            description: "Discover and apply for subsidies, grants, and financial aid tailored to your farming profile. never miss an opportunity.",
            bg: "bg-amber-50"
        },
        {
            icon: <CloudSun className="w-8 h-8 text-sky-500" />,
            title: "Precision Weather",
            description: "Hyper-local weather forecasts designed for agriculture. Plan your sowing and harvesting with confidence.",
            bg: "bg-sky-50"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200">

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-600 p-2 rounded-xl">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">AgriWise</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-5 py-2.5 text-slate-600 font-medium hover:text-emerald-600 transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate('/login')} // Assuming registration handles same flow or separate
                            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Abstract Background Gradient */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/50 to-transparent blur-3xl opacity-60" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-blue-50/50 to-transparent blur-3xl opacity-60" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Hero Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Revolutionizing Agriculture</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
                            >
                                Farming meets <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Future Intelligence.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-slate-600 leading-relaxed max-w-xl"
                            >
                                Empowering farmers with AI-driven insights, real-time market data, and direct access to government schemes. The all-in-one platform for modern agriculture.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 group"
                                >
                                    Start Farming Smart
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex items-center gap-8 pt-4"
                            >
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                            {/* You would usually put images here */}
                                            U{i}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-amber-400 text-sm">★★★★★</div>
                                    <p className="text-sm text-slate-500 font-medium">Trusted by <span className="text-slate-900 font-bold">10,000+</span> farmers</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Hero Visual */}
                        <div className="lg:w-1/2 relative">
                            {/* Abstract decorative cards instead of generic image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                className="relative z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[3rem] rotate-3 opacity-20 blur-xl"></div>
                                <div className="relative bg-slate-900 rounded-[3rem] p-6 sm:p-10 shadow-2xl border border-slate-700/50 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-12 opacity-50">
                                        <div className="w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                                    </div>

                                    {/* Dashboard Mockup Details */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center pb-6 border-b border-slate-700/50">
                                            <div>
                                                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Market Alert</p>
                                                <h3 className="text-white text-2xl font-bold">Wheat Prices ▲ 12%</h3>
                                            </div>
                                            <div className="bg-emerald-500/10 px-4 py-2 rounded-xl text-emerald-400 font-mono font-bold">
                                                + ₹240/qt
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                                <p className="text-slate-400 text-xs font-bold mb-1">Soil Moisture</p>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-white text-2xl font-bold">64%</span>
                                                    <span className="text-emerald-500 text-xs mb-1 font-bold">Optimal</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                                                    <div className="w-[64%] h-full bg-emerald-500 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                                <p className="text-slate-400 text-xs font-bold mb-1">Next Rain</p>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-white text-2xl font-bold">2 Days</span>
                                                    <span className="text-blue-400 text-xl mb-1">🌧️</span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 mt-2">Heavy rainfall expected</p>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 rounded-2xl flex items-center gap-4">
                                            <div className="bg-white/20 p-2.5 rounded-xl">
                                                <ShieldCheck className="text-white w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-bold">New Subsidy Available</p>
                                                <p className="text-emerald-100 text-xs">Fertilizer subsidy scheme 2024</p>
                                            </div>
                                            <ArrowRight className="text-white w-5 h-5 ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Everything you need to grow better.</h2>
                        <p className="text-slate-600 text-lg">AgriWise combines traditional farming wisdom with cutting-edge technology to help you maximize yields and profits.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50"
                            >
                                <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ready to modernize your farm?</h2>
                            <p className="text-slate-400 text-lg">Join thousands of farmers already using AgriWise to increase their profits and reduce risks.</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-10 py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 text-lg"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-900">AgriWise</span>
                    </div>
                    <div className="flex gap-8 text-slate-500 font-medium text-sm">
                        <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Features</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
                    </div>
                    <p className="text-slate-400 text-sm">© 2024 AgriWise Inc.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
