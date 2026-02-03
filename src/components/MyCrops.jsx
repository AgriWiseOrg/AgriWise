import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, ChevronLeft, 
  LayoutGrid, Package, Sprout, 
  TrendingUp, Search, X, Loader2 
} from 'lucide-react';

const MyCrops = ({ user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', id: null });

  useEffect(() => { if (user?._id) fetchProducts(); }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${user._id}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isEdit = !!formData.id;
    try {
      await fetch(isEdit ? `http://localhost:5001/api/products/${formData.id}` : 'http://localhost:5001/api/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, farmerId: user._id })
      });
      fetchProducts();
      resetForm();
    } catch (err) { alert('Error saving'); }
    finally { setLoading(false); }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', id: null });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* 1. Minimalist Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Sprout size={24} />
          </div>
          <span className="font-black text-xl tracking-tight hidden lg:block text-slate-800">AgriPro</span>
        </div>
        
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold transition-all">
            <LayoutGrid size={20} /> <span className="hidden lg:block">Inventory</span>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 p-3 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-xl font-medium transition-all">
            <ChevronLeft size={20} /> <span className="hidden lg:block">Exit Panel</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        {/* 2. Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Store Management</h1>
            <p className="text-slate-500 font-medium">Manage your active listings and pricing</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus size={20} /> Add New Crop
          </button>
        </header>

        {/* 3. Insight Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Package /></div>
            <div><p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Items</p><h4 className="text-2xl font-black">{products.length}</h4></div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><TrendingUp /></div>
            <div><p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Status</p><h4 className="text-2xl font-black text-emerald-600">Active</h4></div>
          </div>
        </section>

        {/* 4. The Inventory Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product._id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden">
               {/* Visual Accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                {product.name.includes('Wheat') ? '🌾' : '🥦'}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{product.name}</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-black">
                    ₹{product.price}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {product.description || "Fresh harvest ready for distribution. High quality grade A produce."}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <button onClick={() => setFormData({...product, id: product._id}) || setShowForm(true)} className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"><Edit3 size={18}/></button>
                  <button className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"><Trash2 size={18}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
          </div>
        )}
      </main>

      {/* Modern Slide-over Form (Simple implementation) */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={resetForm} />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <button onClick={resetForm} className="self-end p-2 hover:bg-slate-100 rounded-full mb-8"><X /></button>
            <h2 className="text-3xl font-black mb-2">{formData.id ? 'Edit Crop' : 'New Listing'}</h2>
            <p className="text-slate-500 mb-10">Fill in the details to update your store.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Product Title</label>
                <input required className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Price (INR)</label>
                <input type="number" required className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
                <textarea rows="4" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <button className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all mt-4">
                {formData.id ? 'UPDATE LISTING' : 'CREATE LISTING'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCrops;