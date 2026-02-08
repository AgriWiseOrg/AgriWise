import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Plus, Trash2, X, LayoutDashboard, 
  Settings, Mail, Clock, Download 
} from 'lucide-react'; // Added Download icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SchemeList = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('manager');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScheme, setNewScheme] = useState({ name: '', benefit: '', minLand: '', maxLand: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
    fetchApplications();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/schemes');
      setSchemes(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Error fetching schemes:", err); }
    finally { setLoading(false); }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/schemes/all-applications');
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("Error fetching applications:", err); }
  };

  // --- NEW DOWNLOAD LOGIC ---
  const downloadCSV = () => {
    if (applications.length === 0) return;

    // 1. Define Headers
    const headers = ["Farmer Email", "Scheme Name", "Land Size (Acres)", "Applied Date"];
    
    // 2. Map data to rows
    const rows = applications.map(app => [
      app.farmerEmail,
      app.schemeName,
      app.landSize,
      new Date(app.appliedAt).toLocaleDateString()
    ]);

    // 3. Combine into CSV string
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    // 4. Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AgriWise_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/schemes/add', newScheme);
      setSchemes([res.data, ...schemes]);
      setShowAddForm(false);
      setNewScheme({ name: '', benefit: '', minLand: '', maxLand: '' });
    } catch (err) { alert("Error adding scheme"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this scheme?")) {
      try {
        await axios.delete(`http://localhost:5001/api/schemes/${id}`);
        setSchemes(schemes.filter(s => s._id !== id));
      } catch (err) { alert("Error deleting scheme"); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-2 text-emerald-700 font-bold">
              <ArrowLeft size={20} /> Back to Hub
            </button>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Schemes <span className="text-emerald-600 uppercase tracking-tighter">{activeTab}</span>
            </h1>
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={() => setActiveTab('manager')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'manager' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Settings size={18} /> Manage Schemes
            </button>
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <LayoutDashboard size={18} /> Applications
            </button>
          </div>
        </div>

        {activeTab === 'manager' ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setShowAddForm(true)} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                <Plus size={20} /> Add New Scheme
              </button>
            </div>

            <div className="grid gap-4">
              {loading ? <p className="text-center text-slate-400">Loading schemes...</p> : schemes.map(scheme => (
                <div key={scheme._id} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900">{scheme.name}</h3>
                    <p className="text-emerald-600 font-medium">{scheme.benefit}</p>
                    <p className="text-xs text-slate-400 mt-1">Eligibility: {scheme.minLand}-{scheme.maxLand} acres</p>
                  </div>
                  <button onClick={() => handleDelete(scheme._id)} className="p-3 text-slate-400 hover:text-rose-600 transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* NEW DOWNLOAD BUTTON SECTION */}
            <div className="flex justify-end">
              <button 
                onClick={downloadCSV}
                disabled={applications.length === 0}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} /> Download CSV Report
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Farmer Email</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Scheme</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Land Size</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {applications.length === 0 ? (
                    <tr><td colSpan="4" className="p-20 text-center text-slate-400 font-bold">No applications found.</td></tr>
                  ) : applications.map((app) => (
                    <tr key={app._id} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="p-6 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><Mail size={14} /></div>
                        <span className="font-bold text-slate-700">{app.farmerEmail}</span>
                      </td>
                      <td className="p-6 font-bold">{app.schemeName}</td>
                      <td className="p-6 font-black text-emerald-600 tracking-tighter">{app.landSize} acres</td>
                      <td className="p-6 text-slate-400 text-xs font-medium flex items-center gap-1">
                        <Clock size={12} /> {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add Scheme</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <input required placeholder="Scheme Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500"
                  onChange={e => setNewScheme({ ...newScheme, name: e.target.value })} />
                <input required placeholder="Benefit (e.g. ₹6,000/year)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200"
                  onChange={e => setNewScheme({ ...newScheme, benefit: e.target.value })} />
                <div className="flex gap-4">
                  <input required type="number" placeholder="Min Land (Acres)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200"
                    onChange={e => setNewScheme({ ...newScheme, minLand: e.target.value })} />
                  <input required type="number" placeholder="Max Land (Acres)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200"
                    onChange={e => setNewScheme({ ...newScheme, maxLand: e.target.value })} />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">Save Scheme</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeList;