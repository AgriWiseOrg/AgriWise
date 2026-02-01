import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SchemeList = () => {
  const navigate = useNavigate();
  const [landSize, setLandSize] = useState('');
  
  const schemes = [
    { id: 1, name: "PM-Kisan Samman Nidhi", benefit: "₹6,000/year", minLand: 0, maxLand: 5 },
    { id: 2, name: "Tractor Subsidy Scheme", benefit: "50% off on machinery", minLand: 2, maxLand: 100 },
    { id: 3, name: "Free Seed Distribution", benefit: "Free seeds for Rabi crops", minLand: 0, maxLand: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-6 text-emerald-700 font-semibold">
        <ArrowLeft size={20} /> Back to Hub
      </button>

      <h1 className="text-3xl font-bold mb-4">Schemes for Me</h1>
      
      {/* Eligibility Filter: Aligns with your "Dropdowns and icons" plan */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-emerald-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter your land size (in acres):</label>
        <input 
          type="number" 
          value={landSize} 
          onChange={(e) => setLandSize(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="e.g. 3"
        />
      </div>

      <div className="grid gap-4">
        {schemes.map(scheme => {
          const isEligible = landSize !== '' && landSize >= scheme.minLand && landSize <= scheme.maxLand;
          return (
            <div key={scheme.id} className={`p-5 rounded-2xl border-2 transition-all ${isEligible ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{scheme.name}</h3>
                  <p className="text-emerald-700 font-medium">{scheme.benefit}</p>
                </div>
                {landSize && (isEligible ? <CheckCircle className="text-emerald-600" /> : <XCircle className="text-red-400" />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemeList;