import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');

  const translations = {
    en: {
      back: 'Back to Dashboard',
      portal: 'Live Satellite Portal',
      advisory: 'Agricultural Advisory',
      optimize: 'Optimize Intelligence for your Crop:',
      rainProb: '24h Rainfall Probability',
      next8h: 'Next 8h',
      now: 'Now',
      plus8h: '+8 Hours',
      humidity: 'Humidity',
      wind: 'Wind Speed',
      extended: 'Precision Extended Forecast',
      today: 'Today',
      windSpray: 'Wind & Spray Guidance',
      stress: 'Atmospheric Stress',
      evaporation: 'Evaporation',
      fungalRisk: 'Fungal Risk',
      high: 'High',
      low: 'Low',
      normal: 'Normal',
      ideal: 'IDEAL',
      extremeWind: 'EXTREME WIND',
      stable: 'Stable',
      monitor: 'Monitor immediately',
      listen: 'Listen to Advisory',
      syncing: 'Syncing Satellite Intelligence...',
      failed: 'Connection Failed',
      reach: "We couldn't reach the weather satellites. Please check your internet.",
      return: 'Return Home'
    },
    hi: {
      back: 'डैशबोर्ड पर वापस',
      portal: 'लाइव सैटेलाइट पोर्टल',
      advisory: 'कृषि सलाह',
      optimize: 'अपनी फसल के लिए बुद्धिमत्ता को अनुकूलित करें:',
      rainProb: '24 घंटे बारिश की संभावना',
      next8h: 'अगले 8 घंटे',
      now: 'अभी',
      plus8h: '+8 घंटे',
      humidity: 'आर्द्रता',
      wind: 'हवा की गति',
      extended: 'सटीक विस्तारित पूर्वानुमान',
      today: 'आज',
      windSpray: 'हवा और स्प्रे मार्गदर्शन',
      stress: 'वायुमंडलीय तनाव',
      evaporation: 'वाष्पीकरण',
      fungalRisk: 'कवक जोखिम',
      high: 'उच्च',
      low: 'कम',
      normal: 'सामान्य',
      ideal: 'आदर्श',
      extremeWind: 'तेज हवा',
      stable: 'स्थिर',
      monitor: 'तुरंत निगरानी करें',
      listen: 'सलाह सुनें',
      syncing: 'सैटेलाइट इंटेलिजेंस सिंक हो रहा है...',
      failed: 'कनेक्शन विफल रहा',
      reach: "हम मौसम उपग्रहों तक नहीं पहुँच सके। कृपया अपना इंटरनेट जांचें।",
      return: 'होम पर वापस'
    },
    te: {
      back: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
      portal: 'లైవ్ శాటిలైట్ పోర్టల్',
      advisory: 'వ్యవసాయ సలహా',
      optimize: 'మీ పంట కోసం మేధస్సును ఆప్టిమైజ్ చేయండి:',
      rainProb: '24 గంటల వర్షపాతం సంభావ్యత',
      next8h: 'తదుపరి 8 గంటలు',
      now: 'ఇప్పుడు',
      plus8h: '+8 గంటలు',
      humidity: 'తేమ',
      wind: 'గాలి వేగం',
      extended: 'ఖచ్చితమైన పొడిగించిన సూచిక',
      today: 'ఈ రోజు',
      windSpray: 'గాలి & స్ప్రే మార్గదర్శకత్వం',
      stress: 'వాతావరణ ఒత్తిడి',
      evaporation: 'ఆవిరి',
      fungalRisk: 'శిలీంధ్రాల ప్రమాదం',
      high: 'ఎక్కువ',
      low: 'తక్కువ',
      normal: 'సాధారణం',
      ideal: 'అనుకూలం',
      extremeWind: 'తీవ్రమైన గాలి',
      stable: 'స్థిరంగా ఉంది',
      monitor: 'వెంటనే పర్యవేక్షించండి',
      listen: 'సలహా వినండి',
      syncing: 'శాటిలైట్ ఇంటెలిజెన్స్ సింక్ అవుతోంది...',
      failed: 'కనెక్షన్ విఫలమైంది',
      reach: "మేము వాతావరణ ఉపగ్రహాలను చేరుకోలేకపోయాము. దయచేసి మీ ఇంటర్నెట్‌ని తనిఖీ చేయండి.",
      return: 'హోమ్‌కు తిరిగి వెళ్లండి'
    }
  };

  const t = translations[lang] || translations.en;

  const speakAdvisory = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const langMap = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };
    const targetLang = langMap[lang] || 'en-IN';
    const voice = voices.find(v => v.lang.startsWith(targetLang)) || voices.find(v => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- Dynamic Weather Assets ---

  const SatelliteRadar = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[1px] border-white/20 rounded-full animate-[spin_10s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-emerald-400 to-transparent origin-bottom"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.05)_100%)]"></div>
    </div>
  );

  const Sunbeams = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`absolute top-[-10%] left-[${i * 20}%] w-32 h-[120%] bg-gradient-to-b from-white/20 to-transparent blur-3xl -rotate-12 animate-[pulse_4s_ease-in-out_infinite]`} style={{ animationDelay: `${i * 0.5}s` }}></div>
      ))}
    </div>
  );

  const Raindrops = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute w-[1px] h-10 bg-white/40 animate-[fall_1s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s`, animationDelay: `${Math.random()}s` }}></div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </div>
  );

  const [selectedCrop, setSelectedCrop] = useState('General');

  const fetchWeather = async (lat = 28.6139, lon = 77.2090, crop = 'General') => {
    try {
      const res = await fetch(`http://localhost:5001/api/support/weather?lat=${lat}&lon=${lon}&crop=${crop}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error("Failed to fetch weather", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, selectedCrop),
        () => fetchWeather(28.6139, 77.2090, selectedCrop)
      );
    } else {
      fetchWeather(28.6139, 77.2090, selectedCrop);
    }
  }, [selectedCrop]);

  const getWeatherLabel = (code) => {
    if (code === 0) return { label: lang === 'en' ? 'Clear Sky' : lang === 'hi' ? 'साफ आकाश' : 'నిర్మలమైన ఆకాశం', icon: '☀️' };
    if (code <= 3) return { label: lang === 'en' ? 'Partly Cloudy' : lang === 'hi' ? 'आंशिक रूप से बादल' : 'పాక్షికంగా ఆకాశం', icon: '🌤️' };
    if (code <= 48) return { label: lang === 'en' ? 'Foggy' : lang === 'hi' ? 'धुंधला' : 'పొగమంచు', icon: '🌫️' };
    if (code <= 67) return { label: lang === 'en' ? 'Rainy' : lang === 'hi' ? 'बरसाती' : 'వర్షం', icon: '🌧️' };
    if (code <= 77) return { label: lang === 'en' ? 'Snowy' : lang === 'hi' ? 'बर्फबारी' : 'హిమపాతం', icon: '❄️' };
    if (code <= 82) return { label: lang === 'en' ? 'Showers' : lang === 'hi' ? 'बोछारें' : 'జల్లులు', icon: '🌦️' };
    return { label: lang === 'en' ? 'Stormy' : lang === 'hi' ? 'तूफानी' : 'తుఫాను', icon: '⛈️' };
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-sky-400 uppercase tracking-widest text-xs">{t.syncing}</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-2 border-slate-100 text-center space-y-4 max-w-sm">
        <span className="text-6xl">📡</span>
        <h2 className="text-2xl font-black text-slate-800">{t.failed}</h2>
        <p className="text-slate-500 font-medium">{t.reach}</p>
        <button onClick={() => navigate('/')} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl">{t.return}</button>
      </div>
    </div>
  );

  const isRainy = data.code >= 51;
  const isSunny = data.code === 0;

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest hover:text-sky-500 transition-colors">
            <span>←</span> {t.back}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {['en', 'hi', 'te'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest">{t.portal}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 space-y-10 mt-8">
        {/* Current Weather Section - Command Center Style */}
        <section className={`relative overflow-hidden rounded-[3.5rem] p-8 md:p-12 text-white shadow-2xl transition-all duration-1000 ${isRainy ? 'bg-gradient-to-br from-slate-800 to-indigo-950' : isSunny ? 'bg-gradient-to-br from-amber-400 to-orange-600' : 'bg-gradient-to-br from-sky-500 to-indigo-600'}`}>
          {/* Background Animations */}
          <SatelliteRadar />
          {isSunny && <Sunbeams />}
          {isRainy && <Raindrops />}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-8xl drop-shadow-2xl">{data.icon}</span>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-none">{data.temp}°</h1>
                  <p className="text-xl font-bold text-sky-100 opacity-90 mt-2">{getWeatherLabel(data.code).label}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-white/60">{t.advisory}</h3>
                    <p className="text-xl font-bold leading-relaxed">{data.advisory}</p>
                  </div>
                  <button
                    onClick={() => speakAdvisory(data.advisory)}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group active:scale-90"
                    title={t.listen}
                  >
                    <span className="text-2xl group-hover:scale-110 block transition-transform">🔊</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">{t.optimize}</p>
                  <div className="flex flex-wrap gap-2">
                    {['General', 'Rice', 'Wheat', 'Tomato'].map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCrop(c)}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${selectedCrop === c ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">24h Rainfall Probability</h3>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded">Next 8h</span>
                </div>
                <div className="flex items-end gap-2 h-32 bg-white/5 rounded-[2rem] p-6 border border-white/5">
                  {data.rainProb && data.rainProb.map((p, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className="bg-emerald-400 rounded-t-lg transition-all duration-1000 hover:bg-white"
                        style={{ height: `${p}%` }}
                      ></div>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">{p}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 px-2">
                  <span className="text-[8px] font-black uppercase opacity-40">{t.now}</span>
                  <span className="text-[8px] font-black uppercase opacity-40">{t.plus8h}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.humidity}</p>
                  <p className="text-2xl font-black">{data.humidity}%</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.wind}</p>
                  <p className="text-2xl font-black">{data.wind} <span className="text-xs opacity-40">km/h</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Day Extended Forecast */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase tracking-widest text-xs opacity-50">{t.extended}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.forecast.map((day, i) => {
              const date = new Date(day.date);
              const isToday = i === 0;
              const weather = getWeatherLabel(day.code);

              return (
                <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all ${isToday ? 'bg-white border-sky-400 shadow-xl shadow-sky-50' : 'bg-white border-slate-100 hover:border-sky-200'}`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-6">
                    {isToday ? t.today : date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'hi' ? 'hi-IN' : 'te-IN', { weekday: 'short' })}
                  </p>
                  <span className="text-5xl block text-center mb-6">{weather.icon}</span>
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-800">{day.max}°</p>
                    <p className="text-sm font-bold text-slate-400">{day.min}°</p>
                  </div>
                  <p className="text-[9px] font-black text-sky-600 uppercase text-center mt-6 tracking-widest">{weather.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Agricultural Insights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black italic text-emerald-400">{t.windSpray}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {lang === 'en' ? 'Current wind speed is ' : lang === 'hi' ? 'वर्तमान हवा की गति ' : 'ప్రస్తుత గాలి వేగం '}
                <span className="text-white font-bold">{data.wind} km/h</span>.
                {data.wind < 15
                  ? (lang === 'en' ? ' Conditions are IDEAL for pesticide spraying.' : lang === 'hi' ? ' कीटनाशक छिड़काव के लिए स्थितियां आदर्श हैं।' : ' పురుగుమందుల పిచికారీకి పరిస్థితులు అనుకూలంగా ఉన్నాయి.')
                  : (lang === 'en' ? ` ${t.extremeWind}: Postpone spraying to prevent chemical drift.` : lang === 'hi' ? ` ${t.extremeWind}: रासायनिक बहाव को रोकने के लिए छिड़काव स्थगित करें।` : ` ${t.extremeWind}: రసాయన ప్రవాహాన్ని నిరోధించడానికి పిచికారీని వాయిదా వేయండి.`)}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(100, (data.wind / 30) * 100)}%` }}></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Turbulence Index</span>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">🌬️</span>
          </div>

          <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black text-slate-800">{t.stress}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {lang === 'en' ? 'Humidity is at ' : lang === 'hi' ? 'आर्द्रता ' : 'తేమ '}
                <span className="text-slate-900 font-bold">{data.humidity}%</span>.
                {data.humidity > 75
                  ? (lang === 'en' ? ` ${t.high.toUpperCase()} MOISTURE: ${t.monitor}.` : lang === 'hi' ? ` उच्च नमी: ${t.monitor}।` : ` అధిక తేమ: ${t.monitor}.`)
                  : (lang === 'en' ? ` ${t.stable} atmospheric moisture levels detected.` : lang === 'hi' ? ' वायुमंडलीय नमी का स्तर स्थिर पाया गया।' : ' వాతావరణ తేమ స్థాయిలు స్థిరంగా ఉన్నాయి.')}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t.evaporation}</p>
                  <p className="text-lg font-black text-slate-800">{data.temp > 30 ? t.high : t.normal}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t.fungalRisk}</p>
                  <p className="text-lg font-black text-slate-800">{data.humidity > 70 ? t.high : t.low}</p>
                </div>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000 grayscale">🌡️</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Weather;