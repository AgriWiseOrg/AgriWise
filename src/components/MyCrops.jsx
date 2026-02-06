import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, ChevronLeft, 
  LayoutGrid, Package, Sprout, 
  TrendingUp, X, Loader2 
} from 'lucide-react';

const MyCrops = ({ user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    quantity: '', 
    id: null 
  });

  // 1. Fetch only products belonging to this logged-in farmer
  useEffect(() => { 
    if (user?.id || user?._id) {
        fetchProducts(); 
    }
  }, [user]);

  const fetchProducts = async () => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/farmer/${userId}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  // 2. Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = user?._id || user?.id;
    const isEdit = !!formData.id;
    
    // Constructing payload to match Mongoose Schema exactly
    const payload = {
      name: formData.name,
      crop: formData.name, // Mapping for Marketplace consistency
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      description: formData.description || "Fresh harvest from local fields.",
      farmerId: userId,
      farmerName: user?.email ? user.email.split('@')[0] : "Verified Farmer", 
      location: user?.location || "Kerala, India"
    };

    try {
      const url = isEdit 
        ? `http://localhost:5001/api/products/${formData.id}` 
        : 'http://localhost:5001/api/products';
        
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        fetchProducts();
        resetForm();
      } else {
        alert(`Error: ${result.message || 'Failed to save product'}`);
      }
    } catch (err) { 
      alert('Error connecting to server. Please check if backend is running.'); 
    } finally { 
      setLoading(false); 
    }
  };

  // 3. Handle Delete
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this crop?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Could not delete the item.");
      }
    } catch (err) {
      alert("Delete failed due to network error.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', quantity: '', id: null });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
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
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Crop Inventory</h1>
            <p className="text-slate-500 font-medium tracking-tight">
                Manage your marketplace listings for <span className="text-emerald-600">{user?.email || 'Farmer'}</span>
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-100 active:scale-95"
          >
            <Plus size={20} /> Add New Crop
          </button>
        </header>

        {/* Insight Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Package /></div>
            <div><p className="text-slate-400 text-xs font-black uppercase tracking-widest">Active Listings</p><h4 className="text-2xl font-black">{products.length}</h4></div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><TrendingUp /></div>
            <div><p className="text-slate-400 text-xs font-black uppercase tracking-widest">Seller Status</p><h4 className="text-2xl font-black text-emerald-600">Verified</h4></div>
          </div>
        </section>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product._id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {product.name.toLowerCase().includes('rice') ? '🌾' : product.name.toLowerCase().includes('wheat') ? '🥖' : '🥦'}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{product.name}</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-black">
                    ₹{product.price} / qtl
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-1">{product.description || "Fresh harvest listing."}</p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <button 
                    onClick={() => {
                        setFormData({ 
                            name: product.name, 
                            price: product.price, 
                            description: product.description, 
                            quantity: product.quantity, 
                            id: product._id 
                        });
                        setShowForm(true);
                    }} 
                    className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"
                  >
                    <Edit3 size={18}/>
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {!loading && products.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No crops listed yet. Start by adding your harvest!</p>
            </div>
          )}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
          </div>
        )}
      </main>

      {/* Slide-over Form */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={resetForm} />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
            <button onClick={resetForm} className="self-end p-2 hover:bg-slate-100 rounded-full mb-8"><X /></button>
            <h2 className="text-3xl font-black mb-2">{formData.id ? 'Edit Crop' : 'New Listing'}</h2>
            <p className="text-slate-500 mb-10">Fill in the harvest details below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Crop Name</label>
                <input required placeholder="e.g. Basmati Rice" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Price (per Quintal)</label>
                <input type="number" required placeholder="₹" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Available Quantity (qtl)</label>
                <input type="number" required placeholder="Quantity in quintals" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Description</label>
                <textarea rows="3" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <button 
                disabled={loading}
                className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg hover:bg-emerald-700 transition-all mt-4 disabled:opacity-50"
              >
                {formData.id ? 'UPDATE LISTING' : 'PUBLISH TO MARKETPLACE'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCrops;