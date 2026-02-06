import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ArrowUpRight, Loader2, Sprout, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SchemeList = ({ user }) => {
  const navigate = useNavigate();
  const [landSize, setLandSize] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/schemes');
        setSchemes(Array.isArray(res.data) ? res.data : []);
        
        if (user && user.email) {
            const appsRes = await axios.get(`http://localhost:5001/api/schemes/user-applications?email=${user.email}`);
            setMyApplications(appsRes.data.map(app => app.schemeId));
        }
      } catch (err) { 
        console.error(err);
      }
      finally { setLoading(false); }
    };
    fetchData();
  }, [user]);

  const handleApply = async (scheme) => {
    if (!landSize) {
      document.getElementById('land-input').focus();
      return;
    }
    const isEligible = landSize >= (scheme.minLand || 0) && landSize <= (scheme.maxLand || 9999);
    if (!isEligible) return;

    setSubmittingId(scheme._id);
    try {
      await axios.post('http://localhost:5001/api/schemes/apply', {
        farmerEmail: user?.email || "unknown@agriwise.com",
        schemeName: scheme.name,
        schemeId: scheme._id,
        landSize: landSize
      });
      setMyApplications([...myApplications, scheme._id]);
    } catch (err) {
      alert("Application failed.");
    } finally {
      setSubmittingId(null);
    }
  };

  // Helper to safely display range
  const renderRange = (min, max) => {
    if (min === undefined || max === undefined) return "Eligibility: N/A";
    return `${min} - ${max} Acres`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/govt-schemes')} 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors mb-4 font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight">Government <span className="text-emerald-600">Schemes</span></h1>
          </div>
          
          {/* Enhanced Input */}
          <div className={`
            relative group bg-white p-1 pl-1 pr-6 rounded-full border-2 transition-all flex items-center gap-3 shadow-sm
            ${!landSize ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-200'}
          `}>
            <div className={`p-3 rounded-full transition-colors ${!landSize ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Sprout size={20} />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Land Size</label>
              <input
                id="land-input"
                type="number"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="w-32 bg-transparent outline-none font-bold text-slate-800 placeholder:text-slate-300"
                placeholder="Enter acres..."
              />
            </div>
            {!landSize && (
               <span className="absolute -bottom-8 left-4 text-xs font-bold text-emerald-600 animate-bounce">
                 Start here!
               </span>
            )}
          </div>
        </div>

        {loading && <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-emerald-500" /></div>}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && schemes.map(scheme => {
            const min = scheme.minLand || 0;
            const max = scheme.maxLand || 10000;
            const isEligible = landSize && landSize >= min && landSize <= max;
            const isApplied = myApplications.includes(scheme._id);
            const isSubmitting = submittingId === scheme._id;
            
            // If no land size entered, show neutral state. If entered, show eligible/ineligible.
            const cardStatus = !landSize ? 'neutral' : isEligible ? 'eligible' : 'ineligible';

            return (
              <div 
                key={scheme._id} 
                className={`
                  flex flex-col h-full bg-white rounded-3xl border transition-all duration-300 relative overflow-hidden group
                  ${cardStatus === 'eligible' ? 'border-emerald-200 shadow-xl shadow-emerald-900/5' : ''}
                  ${cardStatus === 'ineligible' ? 'border-slate-100 opacity-60 grayscale-[0.5]' : ''}
                  ${cardStatus === 'neutral' ? 'border-slate-200 hover:border-emerald-300 hover:shadow-lg' : ''}
                `}
              >
                {/* Top Banner (Benefit) */}
                <div className={`px-6 py-4 border-b flex justify-between items-start
                   ${cardStatus === 'eligible' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/50 border-slate-100'}
                `}>
                   <div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Benefit</span>
                     <p className="font-bold text-emerald-700 text-lg leading-none mt-1">
                       {scheme.benefit || "View Details"}
                     </p>
                   </div>
                   <div className={`p-2 rounded-xl ${cardStatus === 'eligible' ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                      <ShieldCheck size={20} />
                   </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Title with min-height to align cards */}
                  <h3 className="font-bold text-xl text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {scheme.name || "Untitled Scheme"}
                  </h3>

                  {/* Range Data */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-6 bg-slate-50 p-2 rounded-lg w-fit">
                    <span className="text-slate-400">Range:</span>
                    {renderRange(scheme.minLand, scheme.maxLand)}
                  </div>

                  {/* Push button to bottom */}
                  <div className="mt-auto">
                    {isApplied ? (
                      <button disabled className="w-full py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(scheme)}
                        className={`
                          w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                          ${cardStatus === 'neutral' 
                            ? 'bg-slate-900 text-white hover:bg-slate-800' // Dark button encourages click
                            : cardStatus === 'eligible'
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }
                        `}
                      >
                         {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                         {!isSubmitting && (cardStatus === 'neutral' ? "Check Eligibility" : cardStatus === 'eligible' ? "Apply Now" : "Not Eligible")}
                         {!isSubmitting && cardStatus !== 'ineligible' && <ArrowUpRight size={18} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SchemeList;