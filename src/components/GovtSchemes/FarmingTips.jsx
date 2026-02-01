import React from 'react';
import { Sprout, Droplets, Sun, Bug } from 'lucide-react';

const FarmingTips = () => {
  const tips = [
    { title: "Water Saving", desc: "Use drip irrigation to save 40% water.", icon: <Droplets />, color: "text-blue-600" },
    { title: "Organic Fertilizer", desc: "Mix compost with soil for better yield.", icon: <Sprout />, color: "text-green-600" },
    { title: "Pest Alert", desc: "Check undersides of leaves for aphids.", icon: <Bug />, color: "text-red-600" }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-8">Smart Farming Advisory</h1>
      <div className="grid gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-2xl bg-white shadow-sm ${tip.color}`}>{tip.icon}</div>
            <div>
              <h2 className="font-bold text-xl mb-1">{tip.title}</h2>
              <p className="text-gray-600">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmingTips;