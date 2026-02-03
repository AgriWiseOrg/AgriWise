import React, { useState, useEffect } from 'react'; // Added hooks
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For backend calls
import { 
  Landmark, 
  CreditCard, 
  ShieldCheck, 
  ArrowUpRight, 
  Percent, 
  BadgeCheck, 
  ChevronLeft 
} from 'lucide-react';

const FinanceFarmer = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]); // Start with empty state
  const [loading, setLoading] = useState(true);

  // Fetch real data from your MongoDB
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/schemes');
        setProviders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load schemes:", err);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // Map backend color names to icons
  const getIcon = (type) => {
    if (type?.toLowerCase().includes('loan')) return <Landmark className="w-6 h-6" />;
    if (type?.toLowerCase().includes('private')) return <CreditCard className="w-6 h-6" />;
    return <ShieldCheck className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Back to Home</span>
        </div>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-emerald-600 w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">Verified by AgriWise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Loans & <span className="text-indigo-600">Finance</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Secure, low-interest credit options designed specifically for farmers. 
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 font-bold text-slate-400">Fetching latest schemes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((p) => (
              <div 
                key={p._id} // MongoDB uses _id
                className="group bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-slate-100 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl bg-${p.color || 'indigo'}-50 text-${p.color || 'indigo'}-600`}>
                      {getIcon(p.type)}
                    </div>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 text-slate-500 rounded-full tracking-tighter">
                      {p.tag || 'Active'}
                    </span>
                  </div>
                  
                  <h2 className="font-bold text-2xl mb-1 group-hover:text-indigo-600 transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium mb-8">
                    {p.type}
                  </p>
                  
                  <div className="bg-slate-50 rounded-3xl p-5 mb-2 group-hover:bg-indigo-50/50 transition-colors">
                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Annual Interest</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">{p.interest}</p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button 
                    className="w-full bg-slate-900 text-white p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 group-hover:shadow-lg group-hover:shadow-indigo-200"
                    onClick={() => console.log(`Applying for ${p._id}`)}
                  >
                    Apply Now
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceFarmer;