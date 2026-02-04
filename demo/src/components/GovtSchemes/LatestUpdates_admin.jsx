import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ArrowLeft, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LatestUpdates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: '', desc: '', tag: 'General', date: '', priority: 'medium' });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/latest-updates');
      setUpdates(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Error fetching updates"); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/latest-updates/add', newUpdate);
      setUpdates([res.data, ...updates]);
      setShowAddForm(false);
      setNewUpdate({ title: '', desc: '', tag: 'General', date: '', priority: 'medium' });
    } catch (err) { alert("Error adding update"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this update?")) {
      await axios.delete(`http://localhost:5001/api/latest-updates/${id}`);
      setUpdates(updates.filter(u => u._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 text-orange-600 font-bold hover:text-orange-800">
            <ArrowLeft size={20} /> Back to Hub
          </button>
          <button onClick={() => setShowAddForm(true)} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 shadow-lg shadow-orange-100">
            <Plus size={20} /> Add Update
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
            <Bell className="text-orange-500" /> Latest Updates
          </h1>
          <p className="text-gray-500">Stay informed about deadlines and new opportunities.</p>
        </div>

        {showAddForm && (
          <div className="mb-8 p-6 bg-white rounded-3xl shadow-lg border border-orange-100 animate-slide-down">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Post New Update</h3>
              <button onClick={() => setShowAddForm(false)} className="p-1 bg-gray-100 rounded-full"><X size={16} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input required placeholder="Title" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500"
                onChange={e => setNewUpdate({ ...newUpdate, title: e.target.value })} />
              <textarea required placeholder="Description" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500" rows="3"
                onChange={e => setNewUpdate({ ...newUpdate, desc: e.target.value })}></textarea>
              <div className="flex gap-4">
                <input required type="text" placeholder="Tag (e.g. Deadline)" className="flex-1 p-3 rounded-xl border border-gray-200"
                  onChange={e => setNewUpdate({ ...newUpdate, tag: e.target.value })} />
                <input required type="date" className="flex-1 p-3 rounded-xl border border-gray-200"
                  onChange={e => setNewUpdate({ ...newUpdate, date: e.target.value })} />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-xl font-bold">Post Update</button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {loading ? <p className="text-center text-gray-400">Loading updates...</p> : updates.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-orange-500 hover:shadow-md transition-all group relative">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black uppercase px-2 py-1 bg-orange-100 text-orange-700 rounded-lg">
                  {item.tag}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar size={14} /> {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>

              <button onClick={() => handleDelete(item._id)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;