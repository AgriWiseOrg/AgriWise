import React, { useState, useEffect } from 'react';
import { Sprout, Droplets, Sun, Bug, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FarmingTips = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTip, setNewTip] = useState({ title: '', desc: '', iconType: 'sprout', color: 'text-green-600' });

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/farming-tips');
      setTips(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Error fetching tips"); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/farming-tips/add', newTip);
      setTips([res.data, ...tips]);
      setShowAddForm(false);
      setNewTip({ title: '', desc: '', iconType: 'sprout', color: 'text-green-600' });
    } catch (err) { alert("Error adding tip"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this tip?")) {
      await axios.delete(`http://localhost:5001/api/farming-tips/${id}`);
      setTips(tips.filter(t => t._id !== id));
    }
  };

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

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">Smart Farming Advisory</h1>
          <button onClick={() => setShowAddForm(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
            <Plus size={20} /> Add Tip
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-fade-in">
            <h3 className="font-bold text-lg mb-4">Add New Advisory</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Title (e.g. Water Saving)" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={e => setNewTip({ ...newTip, title: e.target.value })} />
              <textarea required placeholder="Description" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" rows="3"
                onChange={e => setNewTip({ ...newTip, desc: e.target.value })}></textarea>

              <div className="flex gap-4">
                <select className="p-3 rounded-xl border border-slate-200 bg-white" onChange={e => setNewTip({ ...newTip, iconType: e.target.value })}>
                  <option value="sprout">Plant Icon</option>
                  <option value="water">Water Icon</option>
                  <option value="sun">Sun Icon</option>
                  <option value="bug">Pest Icon</option>
                </select>
                <select className="p-3 rounded-xl border border-slate-200 bg-white" onChange={e => setNewTip({ ...newTip, color: e.target.value })}>
                  <option value="text-green-600">Green</option>
                  <option value="text-blue-600">Blue</option>
                  <option value="text-orange-600">Orange</option>
                  <option value="text-red-600">Red</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold">Save</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="bg-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          {tips.map((tip) => (
            <div key={tip._id} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow group relative">
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${tip.color}`}>{getIcon(tip.iconType)}</div>
              <div>
                <h2 className="font-bold text-xl mb-1 text-slate-900">{tip.title}</h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl">{tip.desc}</p>
              </div>
              <button onClick={() => handleDelete(tip._id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FarmingTips;