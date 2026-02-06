import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Sprout, Landmark, Bell, ArrowLeft, ChevronRight } from 'lucide-react';

const GovtSchemes = () => {
  const navigate = useNavigate();

  const hubs = [
    {
      id: 'schemes',
      title: 'Schemes for Me',
      description: 'Unlock government subsidies and financial aid tailored for your farm.',
      icon: <Award size={32} />,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-200',
      path: '/schemes/list'
    },
    {
      id: 'tips',
      title: 'Smart Farming Tips',
      description: 'Modern advisory for sustainable growth and pest management.',
      icon: <Sprout size={32} />,
      gradient: 'from-green-400 to-emerald-500',
      shadow: 'shadow-green-200',
      path: '/schemes/tips'
    },
    {
      id: 'finance',
      title: 'Loans & Finance',
      description: 'Low-interest credit options and micro-finance for equipment.',
      icon: <Landmark size={32} />,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-200',
      path: '/schemes/finance'
    },
    {
      id: 'updates',
      title: 'Latest Updates',
      description: 'Never miss a deadline. News and notifications from agri-departments.',
      icon: <Bell size={32} />,
      gradient: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-200',
      path: '/schemes/updates'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            AgriWise <span className="text-emerald-600">Support</span>
          </h1>
          <p className="text-lg text-gray-500 mt-3 max-w-lg">
            Your digital partner for navigating government schemes, financial growth, and expert farming advice.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 w-fit"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {hubs.map((hub) => (
          <div
            key={hub.id}
            onClick={() => navigate(hub.path)}
            className="group relative bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 active:scale-95"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.gradient} opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${hub.gradient} text-white shadow-lg ${hub.shadow} group-hover:scale-110 transition-transform`}>
                {hub.icon}
              </div>
              <div className="text-gray-300 group-hover:text-emerald-500 transition-colors">
                <ChevronRight size={28} />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                {hub.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base">
                {hub.description}
              </p>
            </div>
            <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${hub.gradient} transition-all duration-300 w-0 group-hover:w-full`} />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-16 p-8 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">Stay ahead of the season</h3>
          <p className="text-emerald-100 opacity-80">We've tracked 45+ new schemes this month.</p>
        </div>
        <button 
          onClick={() => navigate('/schemes/updates')}
          className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all active:scale-95"
        >
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default GovtSchemes;