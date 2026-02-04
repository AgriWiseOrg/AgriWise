import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Landmark, 
  CreditCard, 
  ShieldCheck, 
  ArrowUpRight, 
  BadgeCheck, 
  ChevronLeft 
} from 'lucide-react';

const FinanceFarmer = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        // Ensure port 5001 matches your backend server.js
        const res = await axios.get('http://localhost:5001/api/schemes');
        console.log("Fetched Schemes:", res.data); // Debugging log
        setProviders(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const getIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('loan')) return <Landmark className="w-6 h-6" />;
    if (t.includes('private')) return <CreditCard className="w-6 h-6" />;
    return <ShieldCheck className="w-6 h-6" />;
  };

  // Maps DB color strings to valid Tailwind classes
  const getTheme = (color) => {
    const themes = {
      emerald: "bg-emerald-50 text-emerald-600",
      blue: "bg-blue-50 text-blue-600",
      amber: "bg-amber-50 text-amber-600",
      indigo: "bg-indigo-50 text-indigo-600"
    };
    return themes[color] || themes.indigo;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
       <p className="animate-pulse font-bold text-slate-400 text-xl">Loading AgriWise Finance...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Back</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-emerald-600 w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">Verified Schemes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Loans & <span className="text-indigo-600">Finance</span>
          </h1>
        </div>

        {error ? (
          <div className="p-10 bg-red-50 text-red-600 rounded-3xl text-center font-bold">
            {error}
          </div>
        ) : providers.length === 0 ? (
          <div className="p-10 bg-white rounded-3xl text-center text-slate-400">
            No active schemes found in the database.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((p) => (
              <div 
                key={p._id} 
                className="group bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/60 hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl ${getTheme(p.color)}`}>
                      {getIcon(p.type)}
                    </div>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 text-slate-500 rounded-full tracking-tighter">
                      {p.tag || 'Active'}
                    </span>
                  </div>
                  
                  <h2 className="font-bold text-2xl mb-1 group-hover:text-indigo-600 transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium mb-8">{p.type}</p>
                  
                  <div className="bg-slate-50 rounded-3xl p-5 mb-2 group-hover:bg-indigo-50/50 transition-colors">
                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Annual Interest</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">{p.interest}</p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button className="w-full bg-slate-900 text-white p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95">
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