import React from 'react';
import { Landmark, CreditCard, ShieldCheck } from 'lucide-react';

const Finance = () => {
  const providers = [
    { name: "Kisan Credit Card (KCC)", type: "Govt Loan", interest: "4% p.a." },
    { name: "Agri-Gold Loan", type: "Private Bank", interest: "7% p.a." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2 text-indigo-900">Loans & Finance</h1>
      <p className="text-gray-500 mb-8 font-medium">Verified credit options for your agricultural needs.</p>
      
      <div className="space-y-4">
        {providers.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">{p.name}</h2>
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">{p.type}</span>
              <p className="mt-2 text-indigo-600 font-semibold">Interest: {p.interest}</p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;