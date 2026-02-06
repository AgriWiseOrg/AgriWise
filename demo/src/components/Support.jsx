import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const navigate = useNavigate();
    const [lang, setLang] = useState('en');
    const [showDisputeForm, setShowDisputeForm] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [subsidyStep, setSubsidyStep] = useState(0);
    const [activeView, setActiveView] = useState('main'); // 'main', 'diagnostic', 'schemes'
    const [diagnosticStep, setDiagnosticStep] = useState(0);
    const [symptoms, setSymptoms] = useState([]);



    const translations = {
        en: {
            title: 'Decision Support & Assistance',
            subtitle: 'Knowledge is power. How can we help you today?',
            voiceCall: 'Voice Help',
            whatsapp: 'WhatsApp Chat',
            smsIvr: 'SMS/IVR info',
            faqs: 'Quick Guidance',
            dispute: 'Report a Problem',
            marketTitle: 'Market & Pricing',
            marketDesc: 'Learn how to use price charts and when to sell for maximum profit.',
            govtTitle: 'Govt Schemes',
            govtDesc: 'Understand official schemes like PM-Kisan, KCC, and PMFBY subsidies.',
            disputeTitle: 'Dispute Resolution',
            disputeDesc: 'Fairness for all. Report issues with buyers or payments.',
            back: 'Back to Home',
            selectLang: 'Select Language',
            subsidyTitle: 'Subsidy Finder',
            subsidyDesc: 'Check eligibility in 3 steps.',
            findNow: 'Find Now'
        },
        hi: {
            title: 'निर्णय समर्थन और सहायता',
            subtitle: 'ज्ञान ही शक्ति है। हम आज आपकी कैसे मदद कर सकते हैं?',
            voiceCall: 'आवाज सहायता',
            whatsapp: 'व्हाट्सएप चैट',
            smsIvr: 'SMS/IVR जानकारी',
            faqs: 'त्वरित मार्गदर्शन',
            dispute: 'समस्या की रिपोर्ट करें',
            marketTitle: 'बाजार और मूल्य निर्धारण',
            marketDesc: 'सीखें कि मूल्य चार्ट का उपयोग कैसे करें और अधिकतम लाभ के लिए कब बेचना है।',
            govtTitle: 'सरकारी योजनाएं',
            govtDesc: 'समझें कि आप अभी किन सब्सिडी (पीएम-किसान, केसीसी, आदि) के पात्र हैं।',
            disputeTitle: 'विवाद समाधान',
            disputeDesc: 'सभी के लिए निष्पक्षता। खरीदारों या भुगतान के साथ समस्याओं की रिपोर्ट करें।',
            back: 'होम पर वापस',
            selectLang: 'भाषा चुनें',
            weatherTitle: 'मौसम सलाह',
            weatherDesc: 'वास्तविक समय क्षेत्रीय अलर्ट।',
            temp: 'तापमान',
            humidity: 'आर्द्रता',
            wind: 'हवा',
            adv: 'सलाह',
            subsidyTitle: 'सब्सिडी खोजें',
            subsidyDesc: '3 चरणों में पात्रता की जांच करें।',
            findNow: 'अभी खोजें'
        },
        te: {
            title: 'నిర్ణయ మద్దతు & సహాయం',
            subtitle: 'జ్ఞానమే శక్తి. ఈరోజు మేము మీకు ఎలా సహాయం చేయగలము?',
            voiceCall: 'వాయిస్ సహాయం',
            whatsapp: 'వాట్సాప్ చాట్',
            smsIvr: 'SMS/IVR సమాచారం',
            faqs: 'త్వరిత మార్గదర్శకత్వం',
            dispute: 'సమస్యను నివేదించండి',
            marketTitle: 'మార్కెట్ & ధరలు',
            marketDesc: 'ధరల చార్ట్‌లను ఎలా ఉపయోగించాలో మరియు గరిష్ట లాభం కోసం ఎప్పుడు అమ్మాలి అనే విషయాన్ని తెలుసుకోండి.',
            govtTitle: 'ప్రభుత్వ పథకాలు',
            govtDesc: 'పీఎం-కిసాన్, కేసీసీ వంటి అధికారిక పథకాల గురించి అర్థం చేసుకోండి.',
            disputeTitle: 'వివాద పరిష్కారం',
            disputeDesc: 'అందరికీ నిష్పక్షపాతం. కొనుగోలుదారులు లేదా చెల్లింపులతో సమస్యలను నివేదించండి.',
            back: 'హోమ్‌కు వెళ్లండి',
            selectLang: 'భాషను ఎంచుకోండి',
            weatherTitle: 'వాతావరణ సలహా',
            weatherDesc: 'రియల్ టైమ్ ప్రాంతీయ అలర్ట్‌లు.',
            temp: 'ఉష్ణోగ్రత',
            humidity: 'తేమ',
            wind: 'గాలి',
            adv: 'సలహా',
            subsidyTitle: 'సబ్సిడీ ఫైండర్',
            subsidyDesc: '3 దశల్లో అర్హతు తనిఖీ చేయండి.',
            findNow: 'ఇప్పుడే కనుగొనండి'
        },
        ta: {
            title: 'முடிவு ஆதரவு & உதவி',
            subtitle: 'அறிவு என்பது சக்தி. இன்று நாம் உங்களுக்கு எப்படி உதவ முடியும்?',
            voiceCall: 'குரல் உதவி',
            whatsapp: 'வாட்ஸ்அப் அரட்டை',
            smsIvr: 'SMS/IVR தகவல்',
            faqs: 'விரைவான வழிகாட்டுதல்',
            dispute: 'சிக்கலைப் புகாரளிக்கவும்',
            marketTitle: 'சந்தை & விலை',
            marketDesc: 'விலை விளக்கப்படங்களை எவ்வாறு பயன்படுத்துவது மற்றும் லாபத்திற்காக எப்போது விற்பது என்பதைக் கற்றுக் கொள்ளுங்கள்.',
            govtTitle: 'அரசு திட்டங்கள்',
            govtDesc: 'பிஎம்-கிசான், கேசிசி போன்ற அதிகாரப்பூர்வ திட்டங்களைப் புரிந்து கொள்ளுங்கள்.',
            disputeTitle: 'பிணக்கு தீர்வு',
            disputeDesc: 'அனைவருக்கும் நியாயம். வாங்குபவர்கள் அல்லது கொடுப்பனவுகளில் உள்ள சிக்கல்களைப் புகாரளிக்கவும்.',
            back: 'முகப்புக்குத் திரும்பு',
            selectLang: 'மொழியைத் தேர்ந்தெடுக்கவும்',
            weatherTitle: 'வானிலை ஆலோசனை',
            weatherDesc: 'நிகழ்நேர பிராந்திய எச்சரிக்கைகள்.',
            temp: 'வெப்பநிலை',
            humidity: 'ஈரப்பதம்',
            wind: 'காற்று',
            adv: 'ஆலோசனை',
            subsidyTitle: 'மானியம் தேடுபவர்',
            subsidyDesc: '3 படிகளில் தகுதியைச் சரிபார்க்கவும்.',
            findNow: 'இப்போது கண்டறியவும்'
        },
        ml: {
            title: 'തീരുമാന പിന്തുണയും സഹായവും',
            subtitle: 'അറിവ് ശക്തിയാണ്. ഇന്ന് ഞങ്ങൾക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?',
            voiceCall: 'വോയ്‌സ് സഹായം',
            whatsapp: 'വാട്ട്‌സ്ആപ്പ് ചാറ്റ്',
            smsIvr: 'SMS/IVR വിവരങ്ങൾ',
            faqs: 'ദ്രുത മാർഗ്ഗനിർദ്ദേശം',
            dispute: 'ഒരു പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
            marketTitle: 'മാർക്കറ്റ് & വിലനിർണ്ണയം',
            marketDesc: 'വില ചാർട്ടുകൾ എങ്ങനെ ഉപയോഗിക്കാമെന്നും ലാഭത്തിനായി എപ്പോൾ വിൽക്കാമെന്നും മനസിലാക്കുക.',
            govtTitle: 'സർക്കാർ പദ്ധതികൾ',
            govtDesc: 'പിഎം-കിസാൻ, കെസിസി തുടങ്ങിയ ഔദ്യോഗിക പദ്ധതികൾ മനസ്സിലാക്കുക.',
            disputeTitle: 'തർക്ക പരിഹാരം',
            disputeDesc: 'എല്ലാവർക്കും നീതി. വാങ്ങുന്നവർ അല്ലെങ്കിൽ പേയ്‌മെന്റുകൾ എന്നിവയിലെ പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക.',
            back: 'ഹോമിലേക്ക് മടങ്ങുക',
            selectLang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
            weatherTitle: 'കാലാവസ്ഥാ നിർദ്ദേശം',
            weatherDesc: 'തത്സമയ പ്രാദേശിക അലേർട്ടുകൾ.',
            temp: 'താപനില',
            humidity: 'ആർദ്രത',
            wind: 'കാറ്റ്',
            adv: 'നിർദ്ദേശം',
            subsidyTitle: 'സബ്‌സിഡി ഫൈൻഡർ',
            subsidyDesc: '3 ഘട്ടങ്ങളിലൂടെ യോഗ്യത പരിശോധിക്കുക.',
            findNow: 'ഇപ്പോൾ കണ്ടെത്തുക'
        },
        kn: {
            title: 'ನಿರ್ಧಾರ ಬೆಂಬಲ ಮತ್ತು ಸಹಾಯ',
            subtitle: 'ಜ್ಞಾನವೇ ಶಕ್ತಿ. ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
            voiceCall: 'ಧ್ವನಿ ಸಹಾಯ',
            whatsapp: 'ವಾಟ್ಸಾಪ್ ಚಾಟ್',
            smsIvr: 'SMS/IVR ಮಾಹಿತಿ',
            faqs: 'ತ್ವರಿತ ಮಾರ್ಗದರ್ಶನ',
            dispute: 'ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
            marketTitle: 'ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬೆಲೆ',
            marketDesc: 'ಬೆಲೆ ಚಾರ್ಟ್‌ಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು ಮತ್ತು ಲಾಭಕ್ಕಾಗಿ ಯಾವಾಗ ಮಾರಾಟ ಮಾಡಬೇಕೆಂದು ತಿಳಿಯಿರಿ.',
            govtTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
            govtDesc: 'ಪಿಎಂ-ಕಿಸಾನ್, ಕೆಸಿಸಿ ಅಂತಹ ಅಧಿಕೃತ ಯೋಜನೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
            disputeTitle: 'ವಿವಾದ ಪರಿಹಾರ',
            disputeDesc: 'ಎಲ್ಲರಿಗೂ ನ್ಯಾಯ. ಖರೀದಿದಾರರು ಅಥವಾ ಪಾವತಿಗಳ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ.',
            back: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
            selectLang: 'ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
            weatherTitle: 'ಹವಾಮಾನ ಸಲಹೆ',
            weatherDesc: 'ನೈಜ ಸಮಯದ ಪ್ರಾದೇಶಿಕ ಎಚ್ಚರಿಕೆಗಳು.',
            temp: 'ತಾಪಮಾನ',
            humidity: 'ಆರ್ದ್ರತೆ',
            wind: 'ಗಾಳಿ',
            adv: 'ಸಲಹೆ',
            subsidyTitle: 'ಸಬ್ಸಿಡಿ ಫೈಂಡರ್',
            subsidyDesc: '3 ಹಂತಗಳಲ್ಲಿ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
            findNow: 'ಈಗಲೇ ಹುಡುಕಿ'
        },
        pa: {
            title: 'ਫੈਸਲਾ ਸਹਾਇਤਾ ਅਤੇ ਮਦਦ',
            subtitle: 'ਗਿਆਨ ਹੀ ਸ਼ਕਤੀ ਹੈ। ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
            voiceCall: 'ਵਾਇਸ ਮਦਦ',
            whatsapp: 'ਵਟਸਐਪ ਚੈਟ',
            smsIvr: 'SMS/IVR ਜਾਣਕਾਰੀ',
            faqs: 'ਤੁਰੰਤ ਮਾਰਗਦਰਸ਼ਨ',
            dispute: 'ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
            marketTitle: 'ਮਾਰਕੀਟ ਅਤੇ ਕੀਮਤ',
            marketDesc: 'ਕੀਮਤ ਚਾਰਟ ਦੀ ਵਰਤੋਂ ਕਰਨਾ ਅਤੇ ਮੁਨਾਫੇ ਲਈ ਕਦੋਂ ਵੇਚਣਾ ਹੈ ਸਿੱਖੋ।',
            govtTitle: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
            govtDesc: 'ਪੀਐਮ-ਕਿਸਾਨ, ਕੇਸੀਸੀ ਵਰਗੀਆਂ ਅਧਿਕਾਰਤ ਸਕੀਮਾਂ ਨੂੰ ਸਮਝੋ।',
            disputeTitle: 'ਝਗੜਾ ਨਿਪਟਾਰਾ',
            disputeDesc: 'ਸਭ ਲਈ ਇਨਸਾਫ। ਖਰੀਦਦਾਰਾਂ ਜਾਂ ਭੁਗਤਾਨਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦੀ ਰਿਪੋਰਟ ਕਰੋ।',
            back: 'ਹੋਮ ਤੇ ਵਾਪਸ',
            selectLang: 'ਭਾਸ਼ਾ ਚੁਣੋ',
            weatherTitle: 'ਮੌਸਮ ਦੀ ਸਲਾਹ',
            weatherDesc: 'ਰੀਅਲ-ਟਾਈਮ ਖੇਤਰੀ ਅਲਰਟ।',
            temp: 'ਤਾਪਮਾਨ',
            humidity: 'ਨਮੀ',
            wind: 'ਹਵਾ',
            adv: 'ਸਲਾਹ',
            subsidyTitle: 'ਸਬਸਿਡੀ ਫਾਈਂਡਰ',
            subsidyDesc: '3 ਕਦਮਾਂ ਵਿੱਚ ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ।',
            findNow: 'ਹੁਣੇ ਲੱਭੋ'
        },
        mr: {
            title: 'निर्णय समर्थन आणि मदत',
            subtitle: 'ज्ञान हीच शक्ती आहे. आज आम्ही तुम्हाला कशी मदत करू शकतो?',
            voiceCall: 'व्हॉइस मदत',
            whatsapp: 'व्हॉट्सॲप चॅट',
            smsIvr: 'SMS/IVR माहिती',
            faqs: 'त्वरीत मार्गदर्शन',
            dispute: 'समस्येची तक्रार करा',
            marketTitle: 'बाजार आणि किंमत',
            marketDesc: 'किंमत चार्ट कसे वापरावे आणि नफ्यासाठी कधी विक्री करावी हे शिका।',
            govtTitle: 'सरकारी योजना',
            govtDesc: 'पीएम-किसान, केसीसी यांसारख्या अधिकृत योजना समजून घ्या।',
            disputeTitle: 'विवाद निवारण',
            disputeDesc: 'सर्वांसाठी न्याय। खरेदीदार किंवा पेमेंटमधील समस्यांची तक्रार करा।',
            back: 'होमवर परत जा',
            selectLang: 'भाषा निवडा',
            weatherTitle: 'हवामान सल्ला',
            weatherDesc: 'रिअल-टाइम प्रादेशिक अलर्ट।',
            temp: 'तापमान',
            humidity: 'आर्द्रता',
            wind: 'वारा',
            adv: 'सल्ला',
            subsidyTitle: 'सब्सिडी शोधक',
            subsidyDesc: '3 चरणांमध्ये पात्रता तपासा।',
            findNow: 'आता शोधा'
        }
    };

    const t = translations[lang];

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus(''), 3000);
        }, 1500);
    };


    // Diagnostic Wizard Data
    const diagnosticSymptoms = [
        { id: 'yellowing', label: 'Yellow Leaves', icon: '🍂' },
        { id: 'spots', label: 'Brown/Black Spots', icon: '🌑' },
        { id: 'holes', label: 'Holes in Leaves', icon: '🕳️' },
        { id: 'wilting', label: 'Wilting/Drooping', icon: '🥀' },
        { id: 'pests', label: 'Visible Insects', icon: '🐛' }
    ];

    const getDiagnosis = () => {
        if (symptoms.includes('yellowing')) return { title: 'Nitrogen Deficiency', remedy: 'Apply urea or organic compost. Check soil moisture.' };
        if (symptoms.includes('spots')) return { title: 'Fungal Infection (Blight)', remedy: 'Use copper-based fungicide. Avoid overhead watering.' };
        if (symptoms.includes('pests')) return { title: 'Aphid/Caterpillar Infestation', remedy: 'Spray Neem oil or recommended insecticide.' };
        return { title: 'General Nutrient Stress', remedy: 'Balanced NPK application and consistent irrigation required.' };
    };


    // --- Sub-Page Views ---

    const MainView = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Title Section */}
            <section className="text-center space-y-2">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{t.title} 📞</h1>
                <p className="text-slate-500 font-medium text-lg">{t.subtitle}</p>
            </section>

            {/* Multimodal Action Bar */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="tel:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-[2.5rem] shadow-2xl shadow-rose-200 hover:scale-105 transition-all group">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📞</span>
                    <span className="font-black text-xl">{t.voiceCall}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Available 24/7</span>
                </a>
                <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all group">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">💬</span>
                    <span className="font-black text-xl">{t.whatsapp}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Fast Response</span>
                </a>
                <a href="sms:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-300 hover:scale-105 transition-all group">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📱</span>
                    <span className="font-black text-xl">{t.smsIvr}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Dial *123#</span>
                </a>
            </section>

            <hr className="border-slate-200" />

            {/* Feature Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Market Insight Module Card */}
                <div onClick={() => setActiveView('market')} className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-orange-300 transition-all group relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">📈</span>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Market & Pricing Insights</h3>
                        <p className="text-slate-500 font-bold mb-6">Stay ahead with official Mandi rates and strategic selling advice.</p>
                        <span className="inline-block bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm">Explore Portal →</span>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">💹</div>
                </div>

                {/* Crop Health Interactive Card */}
                <div onClick={() => setActiveView('diagnostic')} className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-emerald-300 transition-all group relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">🌱</span>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Crop Health Diagnostic</h3>
                        <p className="text-slate-500 font-bold mb-6">Identify pests, diseases, and nutrient deficiencies in seconds.</p>
                        <span className="inline-block bg-emerald-600 text-white font-black px-6 py-3 rounded-xl text-sm">Open Diagnostic Tool →</span>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">🩺</div>
                </div>

                {/* Premium Scheme Portal Card */}
                <div onClick={() => setActiveView('schemes')} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-blue-300 transition-all group relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">🏛️</span>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Premium Scheme Portal</h3>
                        <p className="text-slate-500 font-bold mb-6">Explore the full list of central and state subsidies with eligibility checks.</p>
                        <span className="inline-block bg-blue-600 text-white font-black px-6 py-3 rounded-xl text-sm">Enter Portal →</span>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">📜</div>
                </div>

                {/* Subsidy Eligibility Wizard Card (Moved or kept as secondary) */}
                <div className="bg-white border-2 border-emerald-100 rounded-[3rem] p-10 shadow-xl shadow-emerald-50 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg shadow-emerald-200">💰</div>
                        <div>
                            <h3 className="font-black text-2xl text-slate-800">Subsidy Quick-Check</h3>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Eligibility Fast Track</p>
                        </div>
                    </div>

                    {subsidyStep === 0 ? (
                        <div className="space-y-6">
                            <p className="text-slate-500 font-bold leading-relaxed text-lg">Quickly verify your basic eligibility for the 3 most popular schemes.</p>
                            <button onClick={() => setSubsidyStep(1)} className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                                {t.findNow} →
                            </button>
                        </div>
                    ) : (
                        <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 animate-in zoom-in duration-300">
                            <ul className="space-y-3 mb-6">
                                <li className="text-slate-700 font-bold flex items-center gap-3">🎯 PM-Kisan (Income)</li>
                                <li className="text-slate-700 font-bold flex items-center gap-3">🎯 PMFBY (Insurance)</li>
                                <li className="text-slate-700 font-bold flex items-center gap-3">🎯 KCC (Low Interest)</li>
                            </ul>
                            <button onClick={() => setSubsidyStep(0)} className="text-emerald-700 font-black uppercase text-xs underline">Back</button>
                        </div>
                    )}
                </div>
            </section>


            {/* Dispute Link */}
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-black mb-2">{t.disputeTitle} ⚖️</h2>
                    <p className="text-slate-400 font-medium text-lg">{t.disputeDesc}</p>
                </div>
                <button onClick={() => setShowDisputeForm(!showDisputeForm)} className="relative z-10 bg-white text-slate-900 font-black px-10 py-5 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-2xl">
                    {showDisputeForm ? 'Close Report' : 'Report Issue'}
                </button>
                <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-5 group-hover:rotate-12 transition-transform duration-1000">🛡️</div>
            </section>
        </div>
    );

    const DiagnosticView = () => (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-8">
            <button onClick={() => setActiveView('main')} className="text-indigo-600 font-black flex items-center gap-2 mb-4 bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all">
                ← Back to Support
            </button>

            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-50 overflow-hidden relative">
                <div className="max-w-2xl relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">Diagnostic <span className="text-emerald-600 font-serif italic text-3xl md:text-5xl">Assistant</span></h2>
                    <p className="text-slate-500 font-bold text-lg mb-10">Select the symptoms you are seeing on your crop to generate an instant health advisory.</p>

                    {diagnosticStep === 0 ? (
                        <div className="space-y-8">
                            <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Step 1: Identify Symptoms</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {diagnosticSymptoms.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSymptoms(prev => prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id])}
                                        className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all text-left ${symptoms.includes(s.id) ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200' : 'bg-slate-50 border-slate-100 hover:border-emerald-300'}`}
                                    >
                                        <span className="text-3xl">{s.icon}</span>
                                        <span className="font-black text-lg">{s.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setDiagnosticStep(1)}
                                disabled={symptoms.length === 0}
                                className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl"
                            >
                                Generate Analysis →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in zoom-in duration-500">
                            <div className="bg-emerald-50 rounded-[2.5rem] p-10 border-2 border-emerald-100 relative overflow-hidden">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 block mb-6">Analysis Result</span>
                                <h3 className="text-3xl font-black text-slate-900 mb-2">Likely Case: <span className="text-emerald-700">{getDiagnosis().title}</span></h3>
                                <p className="text-slate-600 font-bold text-lg leading-relaxed mb-8">{getDiagnosis().remedy}</p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => window.open('https://wa.me/916301230747', '_blank')} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg">Chat with Expert</button>
                                    <button onClick={() => { setDiagnosticStep(0); setSymptoms([]); }} className="bg-white border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-black">Reset Tool</button>
                                </div>
                                <div className="absolute right-[-20px] bottom-[-20px] text-[15rem] opacity-5">🧬</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden lg:block absolute right-10 top-20 text-[20rem] opacity-5 font-black group-hover:rotate-12 transition-transform">🌱</div>
            </div>
        </div>
    );

    const MarketView = () => (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-8">
            <button onClick={() => setActiveView('main')} className="text-orange-600 font-black flex items-center gap-2 mb-4 bg-orange-50 px-6 py-3 rounded-2xl hover:bg-orange-100 transition-all">
                ← Back to Dashboard
            </button>

            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-orange-50 relative overflow-hidden">
                <div className="max-w-3xl relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Market <span className="text-orange-600">Intelligence Portal</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-black text-slate-800">Official Pricing Links</h3>
                            <p className="text-slate-500 font-bold text-sm">Access official government dashboards for real-time Mandi arrivals and pricing across India.</p>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: 'Agmarknet (Govt of India)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                                    { label: 'e-NAM (Digital Market)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                                    { label: 'NHB (Horticulture Board)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
                                ].map((l, i) => (
                                    <a key={i} href={l.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-orange-200 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{l.icon}</span>
                                            <span className="font-black text-slate-700">{l.label}</span>
                                        </div>
                                        <span className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-[2.5rem] p-8 border-2 border-orange-100 flex flex-col justify-center">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="text-xl font-black text-orange-900 mb-3">Pricing Strategy</h3>
                            <p className="text-orange-800 font-bold text-sm leading-relaxed">
                                Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.
                            </p>
                            <button onClick={() => navigate('/market-prices')} className="mt-6 bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 hover:scale-105 transition-transform">View Market Trends</button>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[-20px] top-[-20px] text-[20rem] opacity-5 font-black grayscale pointer-events-none">📈</div>
            </div>
        </div>
    );

    const SchemePortalView = () => (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-8">
            <button onClick={() => setActiveView('main')} className="text-blue-600 font-black flex items-center gap-2 mb-4 bg-blue-50 px-6 py-3 rounded-2xl hover:bg-blue-100 transition-all">
                ← Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-b-8 border-blue-600">
                        <h2 className="text-4xl font-black text-slate-900 mb-6">Central Gov <span className="text-blue-600">Schemes</span></h2>
                        <div className="space-y-4">
                            {[
                                { name: 'PM-Kisan Samman Nidhi', benefit: '₹6,000 yearly income support', link: 'https://pmkisan.gov.in/' },
                                { name: 'Fasal Bima Yojana', benefit: 'Low-cost crop insurance', link: 'https://pmfby.gov.in/' },
                                { name: 'Kisan Credit Card (KCC)', benefit: 'Loans at 4% interest rate', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                                { name: 'Soil Health Card', benefit: 'Free soil testing & reports', link: 'https://soilhealth.dac.gov.in/' }
                            ].map((s, i) => (
                                <div key={i} className="group flex items-center justify-between p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all">
                                    <div>
                                        <h4 className="font-black text-slate-800 text-lg">{s.name}</h4>
                                        <p className="text-blue-600 font-bold text-sm">{s.benefit}</p>
                                    </div>
                                    <a href={s.link} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">↗</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-700 to-blue-900 rounded-[3rem] p-8 text-white shadow-2xl h-full">
                        <span className="text-4xl block mb-6">🛡️</span>
                        <h3 className="text-2xl font-black mb-4">Need Help Applying?</h3>
                        <p className="text-blue-100 font-bold mb-8 leading-relaxed">Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.</p>
                        <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="block text-center bg-white text-blue-900 font-black py-4 rounded-xl shadow-xl hover:scale-105 transition-transform">Get Expert Help</a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20 selection:bg-indigo-100">
            {/* Nav Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 text-slate-900 font-black text-lg group">
                        <span className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">←</span>
                        <span>{t.back}</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="bg-slate-100 border-none rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest text-indigo-700 outline-none cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                        >
                            <option value="en">English (EN)</option>
                            <option value="hi">हिंदी (HI)</option>
                            <option value="te">తెలుగు (TE)</option>
                            <option value="ta">தமிழ் (TA)</option>
                            <option value="ml">മലയാളം (ML)</option>
                            <option value="kn">ಕನ್ನಡ (KN)</option>
                            <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                            <option value="mr">मराठी (MR)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 md:p-10">
                {activeView === 'main' && <MainView />}
                {activeView === 'diagnostic' && <DiagnosticView />}
                {activeView === 'schemes' && <SchemePortalView />}
                {activeView === 'market' && <MarketView />}

                {/* Dispute Form (Shared) */}
                {showDisputeForm && (
                    <form onSubmit={handleQuerySubmit} className="mt-10 bg-white border-4 border-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl space-y-8 animate-in slide-in-from-top duration-500">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Submit Investigation Request</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Buyer Detail</label>
                                <input required type="text" placeholder="Company or Individual Name" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Order Ref</label>
                                <input type="text" placeholder="#ID-2024-XXXX" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-bold" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Issue Category</label>
                            <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-black text-slate-700">
                                <option value="">What went wrong?</option>
                                <option value="payment">Delayed Payment</option>
                                <option value="price">Agreed Price Dispute</option>
                                <option value="delivery">Pickup Refusal</option>
                                <option value="quality">Unfair Grading</option>
                            </select>
                        </div>
                        <button
                            disabled={formStatus === 'sending'}
                            className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${formStatus === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}
                        >
                            {formStatus === 'sending' ? 'Registering...' : formStatus === 'success' ? 'Report Received! ✅' : 'Seal and Submit for Investigation'}
                        </button>
                    </form>
                )}
            </div>

            {/* Decorative Footer */}
            <div className="text-center p-14 bg-white border-t border-slate-200 mt-20">
                <p className="text-slate-300 font-black italic tracking-[0.2em] uppercase text-sm">AgriWise Decision Support Framework v3.0</p>
                <p className="text-slate-200 mt-2 font-medium">Protecting the livelihood of Indian Farmers through transparency</p>
            </div>
        </div>
    );
};

export default Support;
