import React from 'react';
import { ArrowLeft, Users, Target, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

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

            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-black text-slate-900 mb-6">About AgriWise</h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-12">
                    AgriWise is on a mission to democratize agricultural intelligence. We believe every farmer, regardless of their scale, deserves access to the same market data, financial tools, and technological insights as the biggest players in the industry.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-emerald-50 p-6 rounded-2xl">
                        <Target className="w-10 h-10 text-emerald-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
                        <p className="text-slate-600">To double the income of 10 million farmers by 2030 through technology and direct market access.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl">
                        <Users className="w-10 h-10 text-blue-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Who We Are</h3>
                        <p className="text-slate-600">A team of agronomists, engineers, and data scientists passionate about rural prosperity.</p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-2xl">
                        <Shield className="w-10 h-10 text-amber-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Our Promise</h3>
                        <p className="text-slate-600">Transparent pricing, secure payments, and unbiased advice for every user.</p>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why We Started</h2>
                    <p className="text-slate-600 mb-6">
                        Agriculture is the backbone of our economy, yet those who feed us often face the most uncertainty. Unpredictable weather, opaque market prices, and lack of access to credit trap many farmers in a cycle of debt. AgriWise was built to break that cycle.
                    </p>
                    <p className="text-slate-600">
                        By combining satellite data, government scheme aggregation, and a direct-to-buyer marketplace, we put the power back in the hands of the farmer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
