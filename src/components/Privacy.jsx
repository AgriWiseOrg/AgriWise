import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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

            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-black text-slate-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                        <p className="text-slate-600">
                            We collect information you provide directly to us, such as when you create or modify your account, request support, or otherwise communicate with us. This information may include: name, email address, phone number, farm location, crop details, and banking information for transaction processing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                        <p className="text-slate-600">
                            We use the information we collect to provide, maintain, and improve our services, such as to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                            <li>Process transactions and send related information, including confirmations and invoices.</li>
                            <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
                            <li>Respond to your comments, questions, and requests and provide customer service.</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
                        <p className="text-slate-600">
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. All payment data is encrypted and processed by secure third-party payment gateways.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sharing of Information</h2>
                        <p className="text-slate-600">
                            We do not sell your personal information to third parties. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
                        <p className="text-slate-600">
                            If you have any questions about this Privacy Policy, please contact us at privacy@agriwise.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
