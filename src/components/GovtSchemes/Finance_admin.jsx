import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ChevronLeft, Plus, Trash2, X, LayoutDashboard, Settings, Mail, Clock, Download 
} from 'lucide-react';

const FinanceAdmin = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [requests, setRequests] = useState([]); 
  const [activeTab, setActiveTab] = useState('manager'); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScheme, setNewScheme] = useState({ name: '', type: '', interest: '', color: 'indigo' });

  useEffect(() => {
    fetchSchemes();
    fetchRequests();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/schemes');
      setSchemes(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/finance/all');
      setRequests(res.data);
    } catch (err) { console.error(err); }
  };

  // --- CSV Export Logic ---
  const downloadCSV = () => {
    if (requests.length === 0) {
      alert("No data available to export");
      return;
    }

    // Define CSV Headers
    const headers = ["Farmer Email", "Scheme Name", "Interest Rate", "Applied Date"];
    
    // Map data to CSV rows
    const rows = requests.map(req => [
      req.farmerEmail,
      `"${req.schemeName}"`, // Quotes handle commas in names
      req.interestRate,
      new Date(req.appliedAt).toLocaleDateString()
    ]);

    // Construct the string
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AgriWise_Farmer_Requests_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/schemes/add', newScheme);
      setSchemes([...schemes, res.data]);
      setShowAddForm(false);
      setNewScheme({ name: '', type: '', interest: '', color: 'indigo' });
    } catch (err) { alert("Error adding scheme"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this scheme?")) {
      await axios.delete(`http://localhost:5001/api/schemes/${id}`);
      setSchemes(schemes.filter(s => s._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header with Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Finance <span className="text-indigo-600 uppercase tracking-tighter">{activeTab}</span>
            </h1>
            <p className="text-slate-500">AgriWise Backend Management Portal</p>
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={() => setActiveTab('manager')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'manager' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Settings size={18} /> Manage Schemes
            </button>
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <LayoutDashboard size={18} /> Farmer Requests
            </button>
          </div>
        </div>

        {activeTab === 'manager' ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setShowAddForm(true)} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <Plus size={20} /> Add New Scheme
              </button>
            </div>
            {/* Schemes Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Scheme Details</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Category</th>
                    <th className="p-6 text-right font-black text-slate-400 uppercase text-[10px] tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {schemes.map((s) => (
                    <tr key={s._id} className="hover:bg-indigo-50/10 transition-colors">
                      <td className="p-6">
                        <p className="font-bold text-slate-900">{s.name}</p>
                        <p className="text-[10px] text-indigo-500 font-bold">{s.interest}</p>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">{s.type}</span>
                      </td>
                      <td className="p-6 text-right">
                        <button onClick={() => handleDelete(s._id)} className="p-3 text-slate-400 hover:text-rose-600 transition-all"><Trash2 size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* APPLICATIONS DASHBOARD VIEW */
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={downloadCSV}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Download size={20} /> Export Applications (CSV)
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Farmer Email</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Requested Scheme</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Interest Rate</th>
                    <th className="p-6 font-black text-slate-400 uppercase text-[10px]">Applied On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {requests.length === 0 ? (
                    <tr><td colSpan="4" className="p-20 text-center text-slate-400 font-bold">No applications found in database.</td></tr>
                  ) : requests.map((req) => (
                    <tr key={req._id} className="hover:bg-indigo-50/20 transition-colors">
                      <td className="p-6 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><Mail size={14} /></div>
                        <span className="font-bold text-slate-700">{req.farmerEmail}</span>
                      </td>
                      <td className="p-6 font-bold">{req.schemeName}</td>
                      <td className="p-6 font-black text-indigo-600 tracking-tighter">{req.interestRate}</td>
                      <td className="p-6 text-slate-400 text-xs font-medium flex items-center gap-1">
                        <Clock size={12} /> {new Date(req.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Logic */}
        {showAddForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Scheme</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X size={20}/></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <input required placeholder="Scheme Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all" 
                  onChange={e => setNewScheme({...newScheme, name: e.target.value})} />
                <input required placeholder="Category (e.g. Loan, Subsidy)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200" 
                  onChange={e => setNewScheme({...newScheme, type: e.target.value})} />
                <input required placeholder="Interest (e.g. 4.5% p.a.)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-200" 
                  onChange={e => setNewScheme({...newScheme, interest: e.target.value})} />
                <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Save Product</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceAdmin;