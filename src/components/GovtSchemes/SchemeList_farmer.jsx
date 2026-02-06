import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ArrowUpRight, Loader2 } from 'lucide-react';
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
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [user]);

  const handleApply = async (scheme) => {
    if (!landSize) {
      alert("Please enter your land size first to check eligibility.");
      return;
    }
    const isEligible = landSize >= scheme.minLand && landSize <= scheme.maxLand;
    if (!isEligible) {
      alert("You are not eligible for this scheme based on your land size.");
      return;
    }

    setSubmittingId(scheme._id);
    try {
      await axios.post('http://localhost:5001/api/schemes/apply', {
        farmerEmail: user?.email || "unknown@agriwise.com",
        schemeName: scheme.name,
        schemeId: scheme._id,
        landSize: landSize
      });
      setMyApplications([...myApplications, scheme._id]);
      alert("Application Submitted Successfully!");
    } catch (err) {
      alert("Application failed. Please try again.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-6 text-emerald-700 font-bold">
        <ArrowLeft size={20} /> Back to Hub
      </button>

      <h1 className="text-3xl font-black text-slate-900 mb-2">My Schemes</h1>
      <p className="text-slate-500 mb-8">Personalized government schemes based on your profile.</p>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm mb-8 border border-emerald-100">
        <label className="block text-sm font-bold text-slate-700 mb-2">Check Eligibility (Land Size in Acres):</label>
        <input
          type="number"
          value={landSize}
          onChange={(e) => setLandSize(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          placeholder="e.g. 5"
        />
      </div>

      <div className="grid gap-4">
        {loading ? <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-emerald-600" /></div> :
          schemes.map(scheme => {
            const isEligible = landSize !== '' && landSize >= scheme.minLand && landSize <= scheme.maxLand;
            const isApplied = myApplications.includes(scheme._id);
            const isSubmitting = submittingId === scheme._id;

            return (
              <div key={scheme._id} className={`p-6 rounded-[2rem] border-2 transition-all ${isEligible ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-white'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{scheme.name}</h3>
                    <p className="text-emerald-700 font-bold text-lg">{scheme.benefit}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                      Eligibility: {scheme.minLand} - {scheme.maxLand} Acres
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {landSize && (
                      <div className={`p-2 rounded-full ${isEligible ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                        {isEligible ? <CheckCircle size={24} /> : <XCircle size={24} />}
                      </div>
                    )}

                    <button
                      onClick={() => handleApply(scheme)}
                      disabled={!isEligible || isApplied || isSubmitting || !landSize}
                      className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                            ${isApplied
                          ? 'bg-emerald-600 text-white opacity-50 cursor-default'
                          : isEligible && landSize
                            ? 'bg-slate-900 text-white hover:bg-emerald-600 shadow-lg'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> :
                        isApplied ? "Applied" : "Apply Now"}
                      {!isApplied && !isSubmitting && <ArrowUpRight size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SchemeList;