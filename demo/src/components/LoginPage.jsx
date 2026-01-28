import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Mode toggle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div>
          <h1 className="text-5xl font-black text-green-700 tracking-tight">AgriWise</h1>
          <p className="mt-4 text-gray-500 text-lg">
            {isRegistering ? 'Create your farmer account' : 'Welcome back, Farmer'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="tel"
            required
            className="peer block w-full px-4 py-5 rounded-2xl border-2 border-gray-200 text-gray-900 text-2xl text-center focus:border-green-600 focus:ring-0 outline-none"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-5 px-4 text-2xl font-bold rounded-2xl text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg"
          >
            {loading ? 'Processing...' : (isRegistering ? 'Register Now' : 'Login')}
          </button>
        </form>

        <div className="mt-6">
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="text-green-700 font-bold hover:underline"
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;