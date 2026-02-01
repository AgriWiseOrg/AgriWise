import React from 'react';
import { Bell, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestUpdates = () => {
  const navigate = useNavigate();

  const updates = [
    {
      id: 1,
      tag: "Deadline",
      title: "PM-Kisan E-KYC Last Date",
      date: "Feb 15, 2026",
      desc: "Complete your bio-metric verification to receive the next installment.",
      priority: "high"
    },
    {
      id: 2,
      tag: "New Scheme",
      title: "Solar Pump Subsidy 2026",
      date: "Jan 28, 2026",
      desc: "Apply now for 75% subsidy on solar-powered irrigation pumps.",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-8 text-orange-600 font-bold">
        <ArrowLeft size={20} /> Back to Hub
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
          <Bell className="text-orange-500" /> Latest Updates
        </h1>
        <p className="text-gray-500 mb-8">Stay informed about deadlines and new opportunities.</p>

        <div className="space-y-4">
          {updates.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-orange-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black uppercase px-2 py-1 bg-orange-100 text-orange-700 rounded-lg">
                  {item.tag}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar size={14} /> {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              <button className="text-orange-600 font-bold flex items-center gap-1 hover:underline">
                Read More <ExternalLink size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;