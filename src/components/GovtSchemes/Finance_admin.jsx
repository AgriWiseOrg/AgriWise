import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ChevronLeft, Plus, Pencil, Trash2, Search, Filter, BadgeCheck, X
} from 'lucide-react';

const FinanceAdmin = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]); // Use dynamic state instead of hardcoded
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScheme, setNewScheme] = useState({
    name: '', type: '', interest: '', status: 'Active', tag: 'New'
  });

  // Fetch schemes from MongoDB on load
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/schemes');
      setSchemes(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/schemes/add', newScheme);
      setSchemes([...schemes, res.data]);
      setShowAddForm(false);
      setNewScheme({ name: '', type: '', interest: '', status: 'Active', tag: 'New' });
    } catch (err) {
      alert("Error adding scheme");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this scheme permanently?")) {
      try {
        await axios.delete(`http://localhost:5001/api/schemes/${id}`);
        setSchemes(schemes.filter(s => s._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header & Back Button */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center hover:text-indigo-600 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Admin Dashboard</span>
        </div>

        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Scheme <span className="text-indigo-600">Manager</span></h1>
            <p className="text-slate-500">Add or remove agricultural financial products.</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Plus className="w-5 h-5" /> Add New Scheme
          </button>
        </div>

        {/* Add Scheme Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">New Scheme</h2>
                <button onClick={() => setShowAddForm(false)}><X /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <input required placeholder="Scheme Name" className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500" 
                  onChange={e => setNewScheme({...newScheme, name: e.target.value})} />
                <input required placeholder="Category (e.g. Govt Loan)" className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200" 
                  onChange={e => setNewScheme({...newScheme, type: e.target.value})} />
                <input required placeholder="Interest Rate (e.g. 4% p.a.)" className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200" 
                  onChange={e => setNewScheme({...newScheme, interest: e.target.value})} />
                <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700">Save Scheme</button>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Scheme Details</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Category</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {schemes.map((s) => (
                <tr key={s._id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase">{s.interest}</p>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{s.type}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 text-slate-400 hover:text-indigo-600 transition-all"><Pencil className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(s._id)} className="p-3 text-slate-400 hover:text-rose-600 transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceAdmin;