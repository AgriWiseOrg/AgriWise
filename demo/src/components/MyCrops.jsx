import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCrops = ({ user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    id: null
  });

  useEffect(() => {
    if (user && user._id) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${user._id}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      id: product._id
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', imageUrl: '', id: null });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = !!formData.id;
    const endpoint = isEdit
      ? `http://localhost:5001/api/products/${formData.id}`
      : 'http://localhost:5001/api/products';

    const method = isEdit ? 'PUT' : 'POST';
    const body = {
      ...formData,
      farmerId: user._id
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        await fetchProducts();
        resetForm();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={() => navigate('/')} className="mb-2 text-emerald-600 font-bold hover:underline">← Back</button>
          <h1 className="text-4xl font-black text-slate-800">My Farm Products 🌾</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg"
        >
          + Add Product
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {formData.id ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Organic Wheat"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-emerald-500 outline-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ideally describe quality, quantity..."
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-xl">{product.name}</h3>
                <p className="text-emerald-600 font-bold text-lg">₹{product.price}</p>
              </div>
              {/* Placeholder for Image if we had one */}
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                🥗
              </div>
            </div>

            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description || 'No description provided.'}</p>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 py-2 text-emerald-700 font-bold hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center text-slate-400">
            <p className="text-xl">No products added yet.</p>
            <p>Click "Add Product" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCrops;