import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
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

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Get in touch</h1>
                    <p className="text-xl text-slate-600">We'd love to hear from you. Our team is always here to help.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div className="flex items-start gap-6">
                            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
                                <p className="text-slate-500 mb-2">Our friendly team is here to help.</p>
                                <a href="mailto:support@agriwise.com" className="text-emerald-600 font-bold hover:underline">support@agriwise.com</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Call Us</h3>
                                <p className="text-slate-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+919876543210" className="text-emerald-600 font-bold hover:underline">+91 98765 43210</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Visit Us</h3>
                                <p className="text-slate-500 mb-2">Come say hello at our office HQ.</p>
                                <p className="text-slate-900 font-medium">123 Farm Tech Park,<br />Electronic City, Bangalore - 560100</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">First name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="First name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Last name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="Last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="you@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Message</label>
                                <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[120px]" placeholder="Leave us a message..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
