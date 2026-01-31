import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer'); // Default is lowercase
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isRegistering
      ? 'http://localhost:5001/api/auth/register'
      : 'http://localhost:5001/api/auth/login';

    const payload = isRegistering
      ? { email, password, role }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        onLogin(data.user);
      }

    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setError('Server not reachable. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4">
        <h1 className="text-3xl font-black text-green-700 text-center">AgriWise</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegistering && (
          <select
            className="w-full border p-3 rounded-xl bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {loading ? 'Please wait...' : isRegistering ? 'Register' : 'Login'}
        </button>

        <p
          onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
          className="text-center text-green-700 cursor-pointer font-semibold hover:underline"
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;