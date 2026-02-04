import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Landmark, 
  CreditCard, 
  ShieldCheck, 
  ArrowUpRight, 
  BadgeCheck, 
  ChevronLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const FinanceFarmer = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedSchemes, setAppliedSchemes] = useState([]);
  const [submittingId, setSubmittingId] = useState(null);

  // Load finance schemes from the database
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/schemes');
        setProviders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const handleApply = async (scheme) => {
    if (!scheme || !scheme._id) return;
    setSubmittingId(scheme._id);

    try {
      const payload = {
        // Mock email - ideally retrieved from your login context/session
        farmerEmail: "farmer@agriwise.com", 
        schemeName: scheme.name,
        schemeId: scheme._id,
        interestRate: scheme.interest
      };

      // POST to the finance request endpoint
      const response = await axios.post('http://localhost:5001/api/finance/apply', payload);
      
      if (response.status === 201) {
        setAppliedSchemes((prev) => [...prev, scheme._id]);
        alert(`Request Received! Our team will reach out to you shortly regarding the ${scheme.name} scheme.`);
      }
    } catch (err) {
      console.error("Application error:", err);
      // Detailed alert to help you debug connectivity issues
      alert("Application failed. Ensure your backend is running and the '/api/finance' route is registered in server.js.");
    } finally {
      setSubmittingId(null);
    }
  };

  const getIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('loan')) return <Landmark className="w-6 h-6" />;
    if (t.includes('private')) return <CreditCard className="w-6 h-6" />;
    return <ShieldCheck className="w-6 h-6" />;
  };

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
       <div className="flex flex-col items-center gap-4">
         <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
         <p className="font-bold text-slate-400 text-xl">Loading AgriWise Finance...</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Back to Dashboard</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-emerald-600 w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">Verified by AgriWise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Loans & <span className="text-indigo-600">Finance</span>
          </h1>
          <p className="text-slate-500 mt-2">Personalized financial support for your agricultural growth.</p>
        </div>

        {error ? (
          <div className="p-10 bg-red-50 text-red-600 rounded-3xl text-center font-bold shadow-sm border border-red-100">
            {error}
          </div>
        ) : !providers.length ? (
          <div className="p-10 bg-white rounded-3xl text-center text-slate-400 border border-dashed border-slate-200">
            No active finance schemes available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((p) => {
              if (!p) return null;
              const isApplied = appliedSchemes.includes(p._id);
              const isSubmitting = submittingId === p._id;
              
              return (
                <div key={p._id} className="group bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/60 hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
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
                      {p.name || "Finance Scheme"}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium mb-8">
                      {p.type || "General Category"}
                    </p>
                    
                    <div className="bg-slate-50 rounded-3xl p-5 mb-2 group-hover:bg-indigo-50/50 transition-colors">
                      <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Annual Interest</p>
                      <p className="text-4xl font-black text-slate-900 tracking-tight">
                        {p.interest}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button 
                      onClick={() => !isApplied && !isSubmitting && handleApply(p)}
                      disabled={isApplied || isSubmitting}
                      className={`w-full p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                        isApplied 
                        ? "bg-emerald-100 text-emerald-600 cursor-default" 
                        : "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-200"
                      } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : isApplied ? (
                        <>Applied <CheckCircle2 className="w-5 h-5" /></>
                      ) : (
                        <>Apply Now <ArrowUpRight className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceFarmer;