import React, { useState, useEffect } from 'react';
import { Sprout, Droplets, Sun, Bug, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FarmingTips = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/farming-tips');
        setTips(Array.isArray(res.data) ? res.data : []);
      } catch (err) { console.error("Error fetching tips"); }
      finally { setLoading(false); }
    };
    fetchTips();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'water': return <Droplets />;
      case 'sun': return <Sun />;
      case 'bug': return <Bug />;
      default: return <Sprout />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-6 text-slate-500 font-bold hover:text-slate-800">
          <ArrowLeft size={20} /> Back to Hub
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">Smart Farming Advisory</h1>

        {loading ? (
          <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-emerald-600" /></div>
        ) : (
          <div className="grid gap-6">
            {tips.map((tip) => (
              <div key={tip._id} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-2xl bg-white shadow-sm ${tip.color}`}>{getIcon(tip.iconType)}</div>
                <div>
                  <h2 className="font-bold text-xl mb-1 text-slate-900">{tip.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingTips;