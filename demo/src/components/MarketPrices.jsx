import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, MapPin, Calendar, CheckCircle, Loader2, BarChart2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  'Wheat', 'Rice', 'Corn', 'Potato', 'Tomato', 'Onion', 'Soybean',
  'Cotton', 'Sugarcane', 'Mustard', 'Barley', 'Pulse', 'Jute',
  'Groundnut', 'Sunflower', 'Tea', 'Coffee'
];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Central India'];

const MarketPrices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live'); // 'live', 'trends', 'demand', 'predict'

  // Data States
  const [marketPrices, setMarketPrices] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(true);

  const [historyData, setHistoryData] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [demandData, setDemandData] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  // Fetch Initial Data
  useEffect(() => {
    fetchPrices();
    fetchDemand();
    fetchCrops(); // Fetch dynamic list
  }, []);

  const [availableCrops, setAvailableCrops] = useState(PRODUCTS); // Fallback to constant

  const fetchCrops = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/market/crops');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setAvailableCrops(data);
        setSelectedCrop(data[0]); // Select first available by default
        fetchHistory(data[0]);
        fetchForecast(data[0]);
      } else {
        // Fallback if empty
        fetchHistory('Wheat');
        fetchForecast('Wheat');
      }
    } catch (err) {
      console.error("Failed to fetch crops list", err);
    }
  };

  const fetchPrices = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/market/prices');
      const data = await res.json();
      setMarketPrices(data);
    } catch (err) {
      console.error("Failed to fetch prices", err);
    } finally {
      setLoadingPrices(false);
    }
  };

  const fetchHistory = async (crop) => {
    try {
      // Handle crops with parentheses in URL
      const encodedCrop = encodeURIComponent(crop);
      const res = await fetch(`http://localhost:5001/api/market/history?crop=${encodedCrop}`);
      const data = await res.json();
      setHistoryData(data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const fetchDemand = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/market/demand');
      const data = await res.json();
      setDemandData(data);
    } catch (err) {
      console.error("Failed to fetch demand", err);
    }
  };


  const fetchForecast = async (crop) => {
    setLoadingForecast(true);
    try {
      const encodedCrop = encodeURIComponent(crop);
      const res = await fetch(`http://localhost:5001/api/market/forecast-30-days?crop=${encodedCrop}`);
      const data = await res.json();
      setForecastData(data);
    } catch (err) {
      console.error("Failed to fetch forecast", err);
    } finally {
      setLoadingForecast(false);
    }
  };

  // AI Prediction State
  const [formData, setFormData] = useState({
    product: '', // Will be set by effect
    region: REGIONS[0],
    month: MONTHS[new Date().getMonth()]
  });

  // Update formData when availableCrops changes
  useEffect(() => {
    if (availableCrops.length > 0) {
      setFormData(prev => ({ ...prev, product: availableCrops[0] }));
    }
  }, [availableCrops]);

  const [prediction, setPrediction] = useState(null);
  const [loadingPredict, setLoadingPredict] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoadingPredict(true);
    setPrediction(null);
    try {
      const response = await fetch('http://localhost:5001/api/predict-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPredict(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button onClick={() => navigate('/')} className="mb-2 text-emerald-600 font-bold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-4xl font-black text-slate-800">
              {activeTab === 'live' && 'Live Market Prices 📈'}
              {activeTab === 'trends' && 'Price Trends 📊'}
              {activeTab === 'demand' && 'Demand Forecasts ⚡'}
              {activeTab === 'predict' && 'AI Price Predictor 🤖'}
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex overflow-x-auto max-w-full">
            {[
              { id: 'live', label: 'Live Rates', icon: Zap },
              { id: 'trends', label: 'Trends', icon: BarChart2 },
              { id: 'demand', label: 'Demand', icon: TrendingUp },
              { id: 'predict', label: 'AI Predictor', icon: CheckCircle }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all ${activeTab === tab.id
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">

          {/* 1. LIVE RATES */}
          {activeTab === 'live' && (
            loadingPrices ? (
              <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-emerald-600" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketPrices.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-slate-800">{item.crop}</h3>
                      <span className="text-sm text-slate-400 font-medium">{item.mandi}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-black text-slate-900">{item.price}</p>
                        <p className="text-xs text-slate-400">per Quintal</p>
                      </div>
                      {item.trend && ['up', 'down', 'stable'].includes(item.trend) && (
                        <div className={`flex items-center gap-1 font-bold ${item.trend === 'up' ? 'text-green-600' :
                          item.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                          }`}>
                          {item.trend === 'up' && '▲ Up'}
                          {item.trend === 'down' && '▼ Down'}
                          {item.trend === 'stable' && '• Stable'}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          )}

          {/* 2. TRENDS (Historical Graph) */}
          {activeTab === 'trends' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">6-Month Price History</h2>
                <select
                  value={selectedCrop}
                  onChange={(e) => {
                    setSelectedCrop(e.target.value);
                    fetchHistory(e.target.value);
                  }}
                  className="p-2 border rounded-lg bg-slate-50 font-bold text-slate-700"
                >
                  {availableCrops.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {historyData && historyData.data && historyData.data.length > 0 ? (
                <div className="h-96 mt-10 relative">
                  {/* Y-Axis Label */}
                  <div className="absolute -left-12 top-1/2 -rotate-90 text-xs font-bold text-slate-400">
                    Price (₹ per Quintal)
                  </div>
                  {(() => {
                    const data = historyData.data;
                    const maxPrice = 7000;
                    const width = 100; // viewbox units
                    const height = 100; // viewbox units
                    const padding = 5;

                    // Calculate points
                    const points = data.map((d, i) => {
                      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                      const y = height - padding - ((d.price || 0) / maxPrice) * (height - 2 * padding);
                      return `${x},${y}`;
                    }).join(' ');

                    // Calculate fill area
                    const firstX = padding;
                    const lastX = width - padding;
                    const fillPath = `${points} L${lastX},${height} L${firstX},${height} Z`;

                    return (
                      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path d={`M${points.split(' ')[0]} ${fillPath}`} fill="url(#lineGradient)" stroke="none" />

                        {/* Line */}
                        <path d={`M${points}`} fill="none" stroke="#059669" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Checkpoints */}
                        {data.map((d, i) => {
                          const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                          const y = height - padding - ((d.price || 0) / maxPrice) * (height - 2 * padding);
                          return (
                            <g key={i} className="group cursor-pointer">
                              <circle cx={x} cy={y} r="1.5" className="fill-white stroke-emerald-600 stroke-[0.5] group-hover:r-2 transition-all" />

                              {/* Tooltip */}
                              <foreignObject x={x - 10} y={y - 15} width="20" height="20" className="overflow-visible pointer-events-none">
                                <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 left-1/2 -translate-x-1/2 transform">
                                  <div className="bg-slate-800 text-white text-[4px] px-1 py-0.5 rounded shadow-lg whitespace-nowrap">
                                    ₹{d.price}
                                  </div>
                                  <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[2px] border-t-slate-800"></div>
                                </div>
                              </foreignObject>

                              {/* X-Axis Label */}
                              <text x={x} y={height + 5} fontSize="3" textAnchor="middle" fill="#64748b" className="font-sans font-medium">
                                {d.month}
                              </text>
                            </g>
                          )
                        })}
                      </svg>
                    );
                  })()}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-400">
                  {historyData ? 'No price history available for this crop.' : 'Loading trends...'}
                </div>
              )}
            </div>
          )}

          {/* 3. DEMAND FORECASTS */}
          {activeTab === 'demand' && (
            <div className="space-y-8">
              {/* Forecast Section */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">30-Day Price Forecast</h2>
                      <p className="text-sm text-slate-400">AI-Powered future price predictions</p>
                    </div>
                  </div>
                  <select
                    value={selectedCrop}
                    onChange={(e) => {
                      setSelectedCrop(e.target.value);
                      fetchForecast(e.target.value);
                    }}
                    className="p-3 border rounded-xl bg-slate-50 font-bold text-slate-700 min-w-[150px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                {loadingForecast ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <p className="animate-pulse">Analyzing market trends...</p>
                  </div>
                ) : forecastData && forecastData.data && forecastData.data.length > 0 ? (
                  <div className="h-96 w-full relative group/chart">
                    {(() => {
                      const data = forecastData.data;
                      const prices = data.map(d => d.price);
                      const minPrice = Math.min(...prices) * 0.95;
                      const maxPrice = Math.max(...prices) * 1.05;
                      const width = 100;
                      const height = 100;
                      const padding = 5;

                      const points = data.map((d, i) => {
                        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                        const y = height - padding - ((d.price - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);
                        return `${x},${y}`;
                      }).join(' ');

                      const fillPath = `${points} L${width - padding},${height} L${padding},${height} Z`;

                      return (
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines (Optional) */}
                          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="0.5" />
                          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="0.5" />

                          <path d={`M${points.split(' ')[0]} ${fillPath}`} fill="url(#forecastGradient)" stroke="none" />
                          <path d={`M${points}`} fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                          {data.map((d, i) => {
                            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                            const y = height - padding - ((d.price - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);

                            // Show fewer labels for clarity
                            const showLabel = i % 5 === 0 || i === data.length - 1;

                            return (
                              <g key={i} className="group/point">
                                <circle cx={x} cy={y} r="1.5" className="fill-white stroke-indigo-600 stroke-1 opacity-0 group-hover/chart:opacity-100 transition-opacity" />
                                <foreignObject x={x - 15} y={y - 20} width="30" height="30" className="overflow-visible pointer-events-none">
                                  <div className="flex flex-col items-center opacity-0 group-hover/point:opacity-100 transition-all transform -translate-y-1">
                                    <div className="bg-slate-900/90 backdrop-blur text-white text-[3px] px-1.5 py-1 rounded-md shadow-xl whitespace-nowrap z-50">
                                      <div className="font-bold">₹{d.price}</div>
                                      <div className="text-[2px] text-slate-300">{new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                                    </div>
                                    <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-t-[2px] border-t-slate-900/90"></div>
                                  </div>
                                </foreignObject>

                                {showLabel && (
                                  <text x={x} y={height + 5} fontSize="2.5" textAnchor="middle" fill="#94a3b8" className="select-none">
                                    {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                  </text>
                                )}
                              </g>
                            )
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
                    <p>Select a crop to generate AI price forecast</p>
                  </div>
                )}
              </div>

              {/* Existing Demand Cards */}

            </div>
          )}


          {/* 4. AI PREDICTOR (Existing Logic) */}
          {activeTab === 'predict' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Input Phase */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Forecast Parameters</h2>
                </div>

                <form onSubmit={handlePredict} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Crop</label>
                    <select
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    >
                      {availableCrops.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <select
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      >
                        {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <select
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      >
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingPredict}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                  >
                    {loadingPredict ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Crunching Data...
                      </>
                    ) : (
                      'Run AI Prediction'
                    )}
                  </button>
                </form>
              </div>

              {/* Results Phase */}
              <div className="flex flex-col gap-6">
                <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center">
                  {/* Background Element */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-800 rounded-bl-full opacity-50"></div>

                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 relative z-10">
                    <CheckCircle className="w-5 h-5 text-indigo-400" />
                    Prediction Result
                  </h2>

                  {prediction ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6 relative z-10"
                    >
                      <div>
                        <span className="text-indigo-300 text-sm uppercase tracking-wider">Estimated Price (per Quintal)</span>
                        <div className="text-6xl font-bold mt-2">
                          ₹{prediction.predictedPrice}
                          <span className="text-xl text-indigo-300 font-normal ml-2">/ Quintal</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-400">{prediction.confidence}</div>
                          <div className="text-xs text-indigo-300">Confidence</div>
                        </div>
                        <div className="w-px h-10 bg-indigo-700"></div>
                        <div>
                          <div className="text-xs text-indigo-300 mb-1">Impact Factors</div>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-indigo-700 rounded text-[10px]">Seasonality</span>
                            <span className="px-2 py-1 bg-indigo-700 rounded text-[10px]">Region</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-indigo-300/50 relative z-10">
                      <div className="w-20 h-20 bg-indigo-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-10 h-10" />
                      </div>
                      <p>Select parameters to generate forecast</p>
                    </div>
                  )}
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-800 text-sm mb-1">⚠️ Disclaimer</h4>
                  <p className="text-xs text-orange-700">Predictions are based on market history and logic. Actual market prices may vary due to unforeseen circumstances like weather disasters.</p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MarketPrices;