import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  return (
    /* Added w-full and h-screen to ensure it fills the background */
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div>
          <h1 className="text-5xl font-black text-green-700 tracking-tight">AgriWise</h1>
          <p className="mt-4 text-gray-500 text-lg">Enter your phone number to continue</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="relative">
            <input
              type="tel"
              required
              className="peer block w-full px-4 py-5 rounded-2xl border-2 border-gray-200 text-gray-900 text-2xl text-center focus:border-green-600 focus:ring-0 transition-all outline-none"
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-4 text-2xl font-bold rounded-2xl text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-200"
          >
            Get Started
          </button>
        </form>
        
        <p className="text-sm text-gray-400">
          By continuing, you agree to receive an SMS for verification.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;