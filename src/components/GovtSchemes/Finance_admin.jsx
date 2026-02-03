import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Filter,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';

const FinanceAdmin = () => {
  const navigate = useNavigate();

  // This would be fetched from your Node.js/MongoDB backend
  const schemes = [
    { id: 1, name: "Kisan Credit Card (KCC)", type: "Govt Loan", interest: "4% p.a.", status: "Active" },
    { id: 2, name: "Agri-Gold Loan", type: "Private Bank", interest: "7% p.a.", status: "Active" },
    { id: 3, name: "NABARD Refinance", type: "Govt Scheme", interest: "4.5% p.a.", status: "Draft" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Admin Dashboard</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">
              Scheme <span className="text-indigo-600">Manager</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">
              Create, update, and monitor agricultural financial products.
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Plus className="w-5 h-5" />
            Add New Scheme
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by scheme name or type..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Scheme Details</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Category</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Rate</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Status</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {schemes.map((s) => (
                <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="p-6">
                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.name}</p>
                    <p className="text-xs text-slate-400 font-medium">ID: #SCH-00{s.id}</p>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-tighter">
                      {s.type}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-black text-slate-700">{s.interest}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <p className="text-sm font-bold text-slate-600">{s.status}</p>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 hover:bg-white hover:shadow-md text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button className="p-3 hover:bg-white hover:shadow-md text-slate-400 hover:text-rose-600 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Showing {schemes.length} active financial schemes for AgriWise Users.
        </p>
      </div>
    </div>
  );
};

export default FinanceAdmin;