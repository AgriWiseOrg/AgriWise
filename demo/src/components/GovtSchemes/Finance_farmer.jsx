import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const providers = [
    { 
      id: 1,
      name: "Kisan Credit Card (KCC)", 
      type: "Govt Loan", 
      interest: "4% p.a.", 
      icon: <Landmark className="w-6 h-6" />,
      tag: "Most Popular",
      color: "emerald"
    },
    { 
      id: 2,
      name: "Agri-Gold Loan", 
      type: "Private Bank", 
      interest: "7% p.a.", 
      icon: <CreditCard className="w-6 h-6" />,
      tag: "Instant Approval",
      color: "amber"
    },
    { 
      id: 3,
      name: "NABARD Refinance", 
      type: "Govt Scheme", 
      interest: "4.5% p.a.", 
      icon: <ShieldCheck className="w-6 h-6" />,
      tag: "Low Interest",
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* NEW BACK BUTTON DESIGN */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all active:scale-90 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Back to Home</span>
        </div>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-emerald-600 w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Verified by AgriWise
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Loans & <span className="text-indigo-600">Finance</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Secure, low-interest credit options designed specifically for farmers. 
            Compare and apply for government-backed schemes in minutes.
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
              <Percent />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-tighter text-[10px]">Starting Interest</p>
              <p className="font-black text-2xl text-slate-800 tracking-tight">4.0% p.a.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
              <ShieldCheck />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-tighter text-[10px]">Security</p>
              <p className="font-black text-2xl text-slate-800 tracking-tight">100% Verified</p>
            </div>
          </div>
        </div>

        {/* Scheme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((p) => (
            <div 
              key={p.id} 
              className="group bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-slate-100 flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-${p.color}-50 text-${p.color}-600`}>
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 text-slate-500 rounded-full tracking-tighter">
                    {p.tag}
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
                  onClick={() => console.log(`Applying for ${p.name}`)}
                >
                  Apply Now
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceFarmer;