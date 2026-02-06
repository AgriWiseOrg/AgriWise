import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerSupport = () => {
    const navigate = useNavigate();
    const [lang, setLang] = useState('en');
    const [showDisputeForm, setShowDisputeForm] = useState(false);
    const [formStatus, setFormStatus] = useState('');

    const translations = {
        en: {
            title: 'Buyer Support & Assistance',
            subtitle: 'Streamlining your procurement journey. How can we help?',
            voiceCall: 'Call Support',
            whatsapp: 'Operations Chat',
            smsIvr: 'SMS Status',
            faqs: 'Buyer Resources',
            dispute: 'Report a Transaction Issue',
            back: 'Back to Marketplace',
            selectLang: 'Select Language',
            procurementTitle: 'Procurement & Bidding',
            procurementDesc: 'Advanced rules for bulk bidding and e-auctions.',
            procurementFull: 'The AgriWise procurement engine is designed for enterprise-grade efficiency, supporting both direct spot-buying and complex reverse auctions. Buyers can participate in transparent e-auctions where farmers bid down to meet your target price, ensuring competitive market rates for bulk orders. For long-term procurement, our "Contract Farming" module allows corporate buyers to bypass seasonal price volatility by locking in price floors with verified farmer groups 6-12 months in advance. Every transaction is backed by a legally binding digital contract, and our system filters out non-genuine bids using advanced bot-detection algorithms, ensuring a fair and reliable procurement environment.',
            logisticsTitle: 'Logistics & Tracking',
            logisticsDesc: 'Real-time fleet management and carrier coordination.',
            logisticsFull: 'Efficient supply chain management is at the heart of the buyer experience. Through AgriWise Connect, buyers gain direct access to a network of localized, KYC-verified fleet owners specializing in agricultural transport. Our "Smart Fleet" feature provides real-time GPS tracking for every grain shipment, allowing you to monitor transit status from the farm gate to your warehouse. To preserve crop quality, we offer cold-chain logistics equipped with IoT sensors that transmit live moisture and temperature data directly to your dashboard. All transit routes are AI-optimized to minimize fuel costs and delivery times, and mandatory transit insurance is automatically applied to all high-value orders to safeguard your investment.',
            paymentTitle: 'Invoices & Payments',
            paymentDesc: 'GST-compliant escrow and wallet settlement systems.',
            paymentFull: 'AgriWise employs a secure multi-signature escrow mechanism to provide absolute financial security for both parties. When you finalize a deal, your funds are securely held in an interest-free escrow account and are only released to the farmer after you digitially sign off on the "Quality Received" certificate at the destination. We support a wide array of payment methods, including Corporate Net Banking, UPI, and dedicated buyer wallets for instant settlement. To simplify compliance, our system generates automated, GST-compliant invoices that are available for instant download. Our clear settlement cycles and structured late-payment penalties ensure that the supply chain remains liquid and reliable.',
            qualityTitle: 'Quality Standards',
            qualityDesc: 'Detailed grading charts and lab certification protocols.',
            qualityFull: 'Quality assurance is the cornerstone of our marketplace. Every agricultural lot listed on AgriWise is graded against our proprietary "AgriWise Standard v2.0" framework. This involves rigorous testing for key parameters such as Moisture Content (MC%), Foreign Matter (FM%), and Grain Uniformity. Buyers can opt for on-site laboratory testing at the loading point, conducted by certified third-party inspectors. We categorize produce into three distinct grades: A+ (Premium Export Grade with 0% impurities), A (Standard Trading Grade for domestic markets), and B (Industrial Processing Grade). This granular level of transparency allows you to buy with confidence, knowing exactly what will arrive at your factory gate.'
        },
        hi: {
            title: 'खरीददार सहायता और सहायता',
            subtitle: 'आपकी खरीद यात्रा को सुव्यवस्थित करना। हम कैसे मदद कर सकते हैं?',
            voiceCall: 'कॉल सपोर्ट',
            whatsapp: 'संचालन चैट',
            smsIvr: 'एसएमएस स्थिति',
            faqs: 'खरीददार संसाधन',
            dispute: 'लेनदेन की समस्या की रिपोर्ट करें',
            back: 'मार्केटप्लेस पर वापस',
            selectLang: 'भाषा चुनें',
            procurementTitle: 'खरीद और बोली',
            procurementDesc: 'थोक बोली और ई-नीलामी के लिए उन्नत नियम।',
            procurementFull: 'एग्रीवाइज़ खरीद इंजन को एंटरप्राइज-ग्रेड दक्षता के लिए डिज़ाइन किया गया है, जो प्रत्यक्ष स्पॉट-बायिंग और जटिल रिवर्स ऑक्शन दोनों का समर्थन करता है। खरीदार पारदर्शी ई-नीलामी में भाग ले सकते हैं जहां किसान आपके लक्षित मूल्य को पूरा करने के लिए बोली लगाते हैं।',
            logisticsTitle: 'रसद और ट्रैकिंग',
            logisticsDesc: 'वास्तविक समय बेड़े प्रबंधन और वाहक समन्वय।',
            logisticsFull: 'कुशल आपूर्ति श्रृंखला प्रबंधन खरीदार के अनुभव के केंद्र में है। एग्रीवाइज कनेक्ट के माध्यम से, खरीदारों को कृषि परिवहन में विशेषज्ञता रखने वाले स्थानीयकृत, केवाईसी-सत्यापित बेड़े मालिकों के नेटवर्क तक सीधी पहुंच मिलती है।',
            paymentTitle: 'चालान और भुगतान',
            paymentDesc: 'जीएसटी-अनुपालन एस्क्रो और वॉलेट निपटान प्रणाली।',
            paymentFull: 'एग्रीवाइज़ दोनों पक्षों के लिए पूर्ण वित्तीय सुरक्षा प्रदान करने के लिए एक सुरक्षित मल्टी-सिग्नेचर एस्क्रो तंत्र का उपयोग करता है। जब आप एक सौदे को अंतिम रूप देते हैं, तो आपका फंड सुरक्षित रूप से रखा जाता है।',
            qualityTitle: 'गुणवत्ता मानक',
            qualityDesc: 'विस्तृत ग्रेडिंग चार्ट और लैब प्रमाणन प्रोटोकॉल।',
            qualityFull: 'गुणवत्ता आश्वासन हमारे बाजार की आधारशिला है। एग्रीवाइज पर सूचीबद्ध प्रत्येक कृषि लॉट को हमारे मालिकाना "एग्रीवाइज स्टैंडर्ड v2.0" ढांचे के खिलाफ ग्रेड किया गया है।'
        },
        te: {
            title: 'కొనుగోలుదారు మద్దతు & సహాయం',
            subtitle: 'మీ సేకరణ ప్రయాణాన్ని క్రమబద్ధీకరించడం. మేము ఎలా సహాయపడగలము?',
            voiceCall: 'కాల్ సపోర్ట్',
            whatsapp: 'ఆపరేషన్స్ చాట్',
            smsIvr: 'SMS స్థితి',
            faqs: 'కొనుగోలుదారు వనరులు',
            dispute: 'లావాదేవీ సమస్యను నివేదించండి',
            back: 'మార్కెట్‌ప్లేస్‌కు తిరిగి వెళ్ళండి',
            selectLang: 'భాషను ఎంచుకోండి',
            procurementTitle: 'సేకరణ & బిడ్డింగ్',
            procurementDesc: 'బల్క్ బిడ్డింగ్ మరియు ఇ-వేలం కోసం అధునాతన నియమాలు.',
            procurementFull: 'అగ్రివైజ్ ప్రొక్యూర్‌మెంట్ ఇంజిన్ ఎంటర్‌ప్రైజ్-గ్రేడ్ సామర్థ్యం కోసం రూపొందించబడింది, ప్రత్యక్ష స్పాట్-బైయింగ్ మరియు సంక్లిష్ట రివర్స్ వేలం రెండింటికి మద్దతు ఇస్తుంది.',
            logisticsTitle: 'లాజిస్టిక్స్ & ట్రాకింగ్',
            logisticsDesc: 'రియల్ టైమ్ ఫ్లీట్ మేనేజ్‌మెంట్ మరియు క్యారియర్ కోఆర్డినేషన్.',
            logisticsFull: 'సమర్థవంతమైన సప్లై చైన్ మేనేజ్‌మెంట్ కొనుగోలుదారు అనుభవంలో ప్రధానమైనది. అగ్రివైజ్ కనెక్ట్ ద్వారా, కొనుగోలుదారులు ఫ్లీట్ యజమానుల నెట్‌వర్క్‌కు ప్రత్యక్ష ప్రాప్యతను పొందుతారు.',
            paymentTitle: 'ఇన్‌వాయిస్‌లు & చెల్లింపులు',
            paymentDesc: 'GST-అనుకూల ఎస్క్రో మరియు వాలెట్ సెటిల్మెంట్ సిస్టమ్స్.',
            paymentFull: 'రెండు పార్టీలకు పూర్తి ఆర్థిక భద్రతను అందించడానికి అగ్రివైజ్ సురక్షితమైన మల్టీ-సిగ్నేచర్ ఎస్క్రో మెకానిజంను ఉపయోగిస్తుంది.',
            qualityTitle: 'నాణ్యత ప్రమాణాలు',
            qualityDesc: 'వివరణాత్మక గ్రేడింగ్ చార్ట్‌లు మరియు ల్యాబ్ సర్టిఫికేషన్ ప్రోటోకాల్స్.',
            qualityFull: 'నాణ్యత హామీ మా మార్కెట్‌ప్లేస్‌కు పునాది. అగ్రివైజ్‌లో జాబితా చేయబడిన ప్రతి వ్యవసాయ లాట్ మా "అగ్రివైజ్ స్టాండర్డ్ v2.0" ఫ్రేమ్‌వర్క్ ప్రకారం గ్రేడ్ చేయబడింది.'
        },
        ta: {
            title: 'வாங்குபவர் ஆதரவு & உதவி',
            subtitle: 'உங்கள் கொள்முதல் பயணத்தை நெறிப்படுத்துதல். நாங்கள் எவ்வாறு உதவ முடியும்?',
            voiceCall: 'அழைப்பு ஆதரவு',
            whatsapp: 'செயல்பாடுகள் அரட்டை',
            smsIvr: 'SMS நிலை',
            faqs: 'வாங்குபவர் வளங்கள்',
            dispute: 'பரிவர்த்தனை சிக்கலைப் புகாரளிக்கவும்',
            back: 'சந்தைக்குத் திரும்பு',
            selectLang: 'மொழியைத் தேர்ந்தெடுக்கவும்',
            procurementTitle: 'கொள்முதல் & ஏலம்',
            procurementDesc: 'மொத்த ஏலம் மற்றும் மின்-ஏலங்களுக்கான மேம்பட்ட விதிகள்.',
            procurementFull: 'AgriWise கொள்முதல் இயந்திரம் நிறுவன தர செயல்திறனுக்காக வடிவமைக்கப்பட்டுள்ளது, நேரடி ஸ்பாட்-பையிங் மற்றும் சிக்கலான தலைகீழ் ஏலம் இரண்டையும் ஆதரிக்கிறது.',
            logisticsTitle: 'தளவாடங்கள் & கண்காணிப்பு',
            logisticsDesc: 'நிகழ்நேர கடற்படை மேலாண்மை மற்றும் கேரியர் ஒருங்கிணைப்பு.',
            logisticsFull: 'திறமையான விநியோகச் சங்கிலி மேலாண்மை வாங்குபவரின் அனுபவத்தின் மையத்தில் உள்ளது. AgriWise Connect மூலம், வாங்குபவர்கள் கடற்படை உரிமையாளர்களின் நெட்வொர்க்கிற்கு நேரடி அணுகலைப் பெறுகிறார்கள்.',
            paymentTitle: 'இன்வாய்ஸ்கள் & கொடுப்பனவுகள்',
            paymentDesc: 'ஜிஎஸ்டி-இணக்கமான எஸ்க்ரோ மற்றும் வாலட் தீர்வு அமைப்புகள்.',
            paymentFull: 'AgriWise இரு தரப்பினருக்கும் முழுமையான நிதிப் பாதுகாப்பை வழங்க பாதுகாப்பான மல்டி-சிக்னேச்சர் எஸ்க்ரோ பொறிமுறையைப் பயன்படுத்துகிறது.',
            qualityTitle: 'தரநிலைகள்',
            qualityDesc: 'விரிவான தரப்படுத்தல் விளக்கப்படங்கள் மற்றும் ஆய்வக சான்றிதழ் நெறிமுறைகள்.',
            qualityFull: 'தர உறுதிப்பாடு என்பது எங்கள் சந்தையின் மூலக்கல்லாகும். AgriWise இல் பட்டியலிடப்பட்டுள்ள ஒவ்வொரு விவசாய தொகுதியும் எங்களின் "AgriWise Standard v2.0" கட்டமைப்பிற்கு எதிராக தரப்படுத்தப்பட்டுள்ளது.'
        },
        ml: {
            title: 'വാങ്ങുന്നവർക്കുള്ള പിന്തുണയും സഹായവും',
            subtitle: 'നിങ്ങളുടെ സംഭരണ യാത്ര കാര്യക്ഷമമാക്കുന്നു. ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും?',
            voiceCall: 'കോൾ സപ്പോർട്ട്',
            whatsapp: 'ഓപ്പറേഷൻസ് ചാറ്റ്',
            smsIvr: 'SMS നില',
            faqs: 'വാങ്ങുന്നവർക്കുള്ള വിഭവങ്ങൾ',
            dispute: 'ഇടപാട് പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
            back: 'മാർക്കറ്റ് പ്ലേസിലേക്ക് മടങ്ങുക',
            selectLang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
            procurementTitle: 'സംഭരണം & ബിഡ്ഡിംഗ്',
            procurementDesc: 'ബൾക്ക് ബിഡ്ഡിംഗിനും ഇ-ലേലത്തിനുമുള്ള വിപുലമായ നിയമങ്ങൾ.',
            procurementFull: 'AgriWise സംഭരണ എഞ്ചിൻ എന്റർപ്രൈസ്-ഗ്രേഡ് കാര്യക്ഷമതയ്ക്കായി രൂപകൽപ്പന ചെയ്തിട്ടുള്ളതാണ്, നേരിട്ടുള്ള സ്പോട്ട്-ബയിംഗും സങ്കീർണ്ണമായ റിവേഴ്സ് ലേലവും പിന്തുണയ്ക്കുന്നു.',
            logisticsTitle: 'ലോജിസ്റ്റിക്സ് & ട്രാക്കിംഗ്',
            logisticsDesc: 'തത്സമയ ഫ്ലീറ്റ് മാനേജ്‌മെന്റും കാരിയർ ഏകോപനവും.',
            logisticsFull: 'കാര്യക്ഷമമായ സപ്ലൈ ചെയിൻ മാനേജ്‌മെന്റ് വാങ്ങുന്നയാളുടെ അനുഭവത്തിന്റെ ഹൃദയഭാഗത്താണ്. AgriWise കണക്റ്റ് വഴി, വാങ്ങുന്നവർക്ക് ഉടമകളുടെ ശൃംഖലയിലേക്ക് നേരിട്ട് പ്രവേശനം ലഭിക്കുന്നു.',
            paymentTitle: 'ഇൻവോയ്സുകൾ & പേയ്മെന്റുകൾ',
            paymentDesc: 'ജിഎസ്ടിക്ക് അനുസൃതമായ എസ്‌ക്രോ, വാലറ്റ് സെറ്റിൽമെന്റ് സിസ്റ്റങ്ങൾ.',
            paymentFull: 'രണ്ട് കക്ഷികൾക്കും പൂർണ്ണമായ സാമ്പത്തിക സുരക്ഷ നൽകുന്നതിന് AgriWise സുരക്ഷിതമായ ഒരു മൾട്ടി-സിഗ്നേച്ചർ എസ്‌ക്രോ സംവിധാനം ഉപയോഗിക്കുന്നു.',
            qualityTitle: 'ഗുണനിലവാര മാനദണ്ഡങ്ങൾ',
            qualityDesc: 'വിശദമായ ഗ്രേഡിംഗ് ചാർട്ടുകളും ലാബ് സർട്ടിഫിക്കേഷൻ പ്രോട്ടോക്കോളുകളും.',
            qualityFull: 'ഗുണമേന്മ ഉറപ്പാക്കൽ ഞങ്ങളുടെ വിപണിയുടെ ആണിക്കല്ലാണ്. AgriWise-ൽ ലിസ്റ്റ് ചെയ്തിട്ടുള്ള ഓരോ കാർഷിക ലോട്ടും ഞങ്ങളുടെ "AgriWise Standard v2.0" ചട്ടക്കൂടിന് അനുസൃതമായി ഗ്രേഡ് ചെയ്തിരിക്കുന്നു.'
        },
        kn: {
            title: 'ಖರೀದಿದಾರರ ಬೆಂಬಲ ಮತ್ತು ಸಹಾಯ',
            subtitle: 'ನಿಮ್ಮ ಸಂಗ್ರಹಣೆಯ ಪ್ರಯಾಣವನ್ನು ಸುಗಮಗೊಳಿಸುವುದು. ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
            voiceCall: 'ಕರೆ ಬೆಂಬಲ',
            whatsapp: 'ಆಪರೇಷನ್ಸ್ ಚಾಟ್',
            smsIvr: 'SMS ಸ್ಥಿತಿ',
            faqs: 'ಖರೀದಿದಾರರ ಸಂಪನ್ಮೂಲಗಳು',
            dispute: 'ವಹಿವಾಟಿನ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
            back: 'ಮಾರುಕಟ್ಟೆಗೆ ಹಿಂತಿರುಗಿ',
            selectLang: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
            procurementTitle: 'ಸಂಗ್ರಹಣೆ ಮತ್ತು ಬಿಡ್ಡಿಂಗ್',
            procurementDesc: 'ಬಲ್ಕ್ ಬಿಡ್ಡಿಂಗ್ ಮತ್ತು ಇ-ಹರಾಜುಗಳಿಗಾಗಿ ಸುಧಾರಿತ ನಿಯಮಗಳು.',
            procurementFull: 'AgriWise ಸಂಗ್ರಹಣೆ ಎಂಜಿನ್ ಎಂಟರ್‌ಪ್ರೈಸ್-ದರ್ಜೆಯ ದಕ್ಷತೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ, ನೇರ ಸ್ಪಾಟ್-ಬೈಯಿಂಗ್ ಮತ್ತು ಸಂಕೀರ್ಣ ರಿವರ್ಸ್ ಹರಾಜು ಎರಡನ್ನೂ ಬೆಂಬಲಿಸುತ್ತದೆ.',
            logisticsTitle: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್',
            logisticsDesc: 'ನೈಜ-ಸಮಯದ ಫ್ಲೀಟ್ ನಿರ್ವಹಣೆ ಮತ್ತು ವಾಹಕ ಸಮನ್ವಯ.',
            logisticsFull: 'ಸಮರ್ಥ ಪೂರೈಕೆ ಸರಪಳಿ ನಿರ್ವಹಣೆಯು ಖರೀದಿದಾರರ ಅನುಭವದ ಕೇಂದ್ರದಲ್ಲಿದೆ. AgriWise ಕನೆಕ್ಟ್ ಮೂಲಕ, ಖರೀದಿದಾರರು ವಾಹನ ಮಾಲೀಕರ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ನೇರ ಪ್ರವೇಶವನ್ನು ಪಡೆಯುತ್ತಾರೆ.',
            paymentTitle: 'ಇನ್‌ವಾಯ್ಸ್‌ಗಳು ಮತ್ತು ಪಾವತಿಗಳು',
            paymentDesc: 'GST-ಅನುಸರಣೆ ಎಸ್ಕ್ರೊ ಮತ್ತು ವ್ಯಾಲೆಟ್ ಸೆಟಲ್ಮೆಂಟ್ ಸಿಸ್ಟಮ್ಸ್.',
            paymentFull: 'ಎರಡೂ ಪಕ್ಷಗಳಿಗೆ ಸಂಪೂರ್ಣ ಆರ್ಥಿಕ ಭದ್ರತೆಯನ್ನು ಒದಗಿಸಲು AgriWise ಸುರಕ್ಷಿತ ಮಲ್ಟಿ-ಸಿಗ್ನೇಚರ್ ಎಸ್ಕ್ರೊ ಕಾರ್ಯವಿಧಾನವನ್ನು ಬಳಸುತ್ತದೆ.',
            qualityTitle: 'ಗುಣಮಟ್ಟದ ಮಾನದಂಡಗಳು',
            qualityDesc: 'ವಿವರವಾದ ಗ್ರೇಡಿಂಗ್ ಚಾರ್ಟ್‌ಗಳು ಮತ್ತು ಲ್ಯಾಬ್ ಪ್ರಮಾಣೀಕರಣ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು.',
            qualityFull: 'ಗುಣಮಟ್ಟದ ಭರವಸೆಯು ನಮ್ಮ ಮಾರುಕಟ್ಟೆಯ ಮೂಲಾಧಾರವಾಗಿದೆ. AgriWise ನಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾದ ಪ್ರತಿಯೊಂದು ಕೃಷಿ ಲಾಟ್ ಅನ್ನು ನಮ್ಮ "AgriWise Standard v2.0" ಚೌಕಟ್ಟಿನ ವಿರುದ್ಧ ಗ್ರೇಡ್ ಮಾಡಲಾಗಿದೆ.'
        },
        pa: {
            title: 'ਖਰੀਦਦਾਰ ਸਹਾਇਤਾ ਅਤੇ ਮਦਦ',
            subtitle: 'ਤੁਹਾਡੀ ਖਰੀਦ ਯਾਤਰਾ ਨੂੰ ਸੁਚਾਰੂ ਬਣਾਉਣਾ। ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
            voiceCall: 'ਕਾਲ ਸਪੋਰਟ',
            whatsapp: 'ਓਪਰੇਸ਼ਨ ਚੈਟ',
            smsIvr: 'SMS ਸਥਿਤੀ',
            faqs: 'ਖਰੀਦਦਾਰ ਸਰੋਤ',
            dispute: 'ਲੈਣ-ਦੇਣ ਦੀ ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
            back: 'ਮਾਰਕੀਟਪਲੇਸ ਤੇ ਵਾਪਸ ਜਾਓ',
            selectLang: 'ਭਾਸ਼ਾ ਚੁਣੋ',
            procurementTitle: 'ਖਰੀਦ ਅਤੇ ਬੋਲੀ',
            procurementDesc: 'ਬਲਕ ਬੋਲੀ ਅਤੇ ਈ-ਨਿਲਾਮੀ ਲਈ ਉੱਨਤ ਨਿਯਮ।',
            procurementFull: 'AgriWise ਖਰੀਦ ਇੰਜਣ ਐਂਟਰਪ੍ਰਾਈਜ਼-ਗ੍ਰੇਡ ਕੁਸ਼ਲਤਾ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ, ਜੋ ਸਿੱਧੀ ਸਪਾਟ-ਬਾਇੰਗ ਅਤੇ ਗੁੰਝਲਦਾਰ ਰਿਵਰਸ ਨਿਲਾਮੀ ਦੋਵਾਂ ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ।',
            logisticsTitle: 'ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਟ੍ਰੈਕਿੰਗ',
            logisticsDesc: 'ਰੀਅਲ-ਟਾਈਮ ਫਲੀਟ ਪ੍ਰਬੰਧਨ ਅਤੇ ਕੈਰੀਅਰ ਤਾਲਮੇਲ।',
            logisticsFull: 'ਕੁਸ਼ਲ ਸਪਲਾਈ ਚੇਨ ਪ੍ਰਬੰਧਨ ਖਰੀਦਦਾਰ ਦੇ ਅਨੁਭਵ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਹੈ। AgriWise ਕਨੈਕਟ ਦੇ ਜ਼ਰੀਏ, ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਮਾਲਕਾਂ ਦੇ ਨੈਟਵਰਕ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ ਮਿਲਦੀ ਹੈ।',
            paymentTitle: 'ਇਨਵੌਇਸ ਅਤੇ ਭੁਗਤਾਨ',
            paymentDesc: 'GST-ਅਨੁਕੂਲ ਐਸਕਰੋ ਅਤੇ ਵਾਲਿਟ ਸੈਟਲਮੈਂਟ ਸਿਸਟਮ।',
            paymentFull: 'AgriWise ਦੋਵਾਂ ਧਿਰਾਂ ਲਈ ਪੂਰੀ ਵਿੱਤੀ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਇੱਕ ਸੁਰੱਖਿਅਤ ਮਲਟੀ-ਸਿਗਨੇਚਰ ਐਸਕਰੋ ਵਿਧੀ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ।',
            qualityTitle: 'ਗੁਣਵੱਤਾ ਦੇ ਮਿਆਰ',
            qualityDesc: 'ਵਿਸਤ੍ਰਿਤ ਗ੍ਰੇਡਿੰਗ ਚਾਰਟ ਅਤੇ ਲੈਬ ਪ੍ਰਮਾਣੀਕਰਣ ਪ੍ਰੋਟੋਕੋਲ।',
            qualityFull: 'ਗੁਣਵੱਤਾ ਦਾ ਭਰੋਸਾ ਸਾਡੇ ਬਾਜ਼ਾਰ ਦੀ ਨੀਂਹ ਹੈ। AgriWise ਤੇ ਸੂਚੀਬੱਧ ਹਰੇਕ ਖੇਤੀਬਾੜੀ ਲਾਟ ਨੂੰ ਸਾਡੇ "AgriWise Standard v2.0" ਫਰੇਮਵਰਕ ਦੇ ਵਿਰੁੱਧ ਗ੍ਰੇਡ ਕੀਤਾ ਗਿਆ ਹੈ।'
        },
        mr: {
            title: 'खरेदीदार समर्थन आणि मदत',
            subtitle: 'तुमचा खरेदी प्रवास सुव्यवस्थित करणे. आम्ही कशी मदत करू शकतो?',
            voiceCall: 'कॉल सपोर्ट',
            whatsapp: 'ऑपरेशन्स चॅट',
            smsIvr: 'SMS स्थिती',
            faqs: 'खरेदीदार संसाधने',
            dispute: 'व्यवहार समस्येची तक्रार करा',
            back: 'मार्केटप्लेसवर परत जा',
            selectLang: 'भाषा निवडा',
            procurementTitle: 'खरेदी आणि बोली',
            procurementDesc: 'बल्क बिडिंग और ई-लिलावासाठी प्रगत नियम।',
            procurementFull: 'एग्रीवाइझ प्रोक्युरमेंट इंजिन एंटरप्राइझ-ग्रेड कार्यक्षमतेसाठी डिझाइन केलेले आहे, थेट स्पॉट-बायिंग आणि जटिल रिव्हर्स ऑक्शन दोन्हीला समर्थन देते।',
            logisticsTitle: 'लॉजिस्टिक्स आणि ट्रॅकिंग',
            logisticsDesc: 'रिअल-टाइम फ्लीट व्यवस्थापन आणि वाहक समन्वय।',
            logisticsFull: 'कार्यक्षम पुरवठा साखळी व्यवस्थापन खरेदीदाराच्या अनुभवाच्या केंद्रस्थानी असते। एग्रीवाइज कनेक्टद्वारे, खरेदीदारांना मालकांच्या नेटवर्कमध्ये थेट प्रवेश मिळतो।',
            paymentTitle: 'इनव्हॉइस आणि पेमेंट',
            paymentDesc: 'GST-सुसंगत एस्क्रो आणि वॉलेट सेटलमेंट सिस्टम।',
            paymentFull: 'एग्रीवाइझ दोन्ही पक्षांसाठी पूर्ण आर्थिक सुरक्षा प्रदान करण्यासाठी सुरक्षित मल्टी-सिग्नेचर एस्क्रो यंत्रणेचा वापर करते।',
            qualityTitle: 'गुणवत्ता मानके',
            qualityDesc: 'तपशीलवार ग्रेडिंग चार्ट आणि लॅब प्रमाणन प्रोटोकॉल।',
            qualityFull: 'गुणवत्ता हमी हा आमच्या बाजारपेठेचा आधारस्तंभ आहे। एग्रीवाइजवर सूचीबद्ध केलेल्या प्रत्येक कृषी लॉटला आमच्या "एग्रीवाइज स्टँडर्ड v2.0" फ्रेमवर्कनुसार ग्रेड दिले जाते।'
        }
    };

    const t = translations[lang] || translations['en'];

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => setFormStatus(''), 3000);
        }, 1500);
    };

    const [activeView, setActiveView] = useState('main');

    const MainView = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
            {/* Hero Section */}
            <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-slate-50 relative overflow-hidden group">
                <div className="relative z-10">
                    <span className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">Enterprise Support 2.0</span>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                        Optimize your <br /><span className="text-blue-600">procurement</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-bold max-w-xl leading-relaxed">
                        Streamline bidding, logistics, and quality assurance through our advanced buyer assistance portal.
                    </p>
                </div>
                <div className="absolute right-[-50px] top-[-50px] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>
            </div>

            {/* Multimodal Action Bar */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="tel:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-[2.5rem] shadow-2xl shadow-blue-200 hover:scale-105 transition-all group text-center">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📞</span>
                    <span className="font-black text-xl tracking-tight">{t.voiceCall}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Direct Ops Line</span>
                </a>
                <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all group text-center">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">💬</span>
                    <span className="font-black text-xl tracking-tight">{t.whatsapp}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">24/7 Logistics Help</span>
                </a>
                <a href="sms:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-300 hover:scale-105 transition-all group text-center">
                    <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📱</span>
                    <span className="font-black text-xl tracking-tight">{t.smsIvr}</span>
                    <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Query Status</span>
                </a>
            </section>

            <hr className="border-slate-200" />

            {/* Interactive Feature Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard
                    icon="📦"
                    title={t.procurementTitle}
                    desc={t.procurementDesc}
                    color="blue"
                    onClick={() => setActiveView('procurement')}
                    footer="Open Procurement Hub →"
                    bgIcon="🏢"
                />
                <FeatureCard
                    icon="🚚"
                    title={t.logisticsTitle}
                    desc={t.logisticsDesc}
                    color="indigo"
                    onClick={() => setActiveView('logistics')}
                    footer="Logistics Dashboard →"
                    bgIcon="🛣️"
                />
                <FeatureCard
                    icon="🔬"
                    title={t.qualityTitle}
                    desc={t.qualityDesc}
                    color="amber"
                    onClick={() => setActiveView('quality')}
                    footer="Grading Protocols →"
                    bgIcon="📋"
                />
                <FeatureCard
                    icon="💳"
                    title={t.paymentTitle}
                    desc={t.paymentDesc}
                    color="emerald"
                    onClick={() => setActiveView('payments')}
                    footer="Escrow Settings →"
                    bgIcon="💰"
                />
            </section>

            {/* Dispute Resolution Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-[3rem] p-10 md:p-14 text-white overflow-hidden relative group shadow-2xl">
                <div className="relative z-10 max-w-lg space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{t.dispute} ⚖️</h2>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">Flag issues with quality, weight mismatch, or delivery delays. Our dedicated auditing team will mediate to ensure a fair resolution within 48 hours.</p>
                    <button
                        onClick={() => setShowDisputeForm(!showDisputeForm)}
                        className="bg-white text-slate-900 font-black px-10 py-5 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95 shadow-xl shadow-black/20"
                    >
                        {showDisputeForm ? 'Cancel Dispute' : 'Raise Dispute Now'}
                    </button>
                </div>
                <div className="absolute -right-16 -bottom-16 text-[15rem] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000 uppercase pointer-events-none">⚖️</div>
            </section>

            {showDisputeForm && (
                <form onSubmit={handleQuerySubmit} className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-2xl space-y-6 animate-in slide-in-from-top duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Farmer Name / ID</label>
                            <input required type="text" placeholder="Seller Details" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Order/Lot ID</label>
                            <input required type="text" placeholder="Transaction ID" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type of Issue</label>
                        <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all font-bold text-slate-700">
                            <option value="">Select category...</option>
                            <option value="quality">Quality Mismatch</option>
                            <option value="weight">Weight/Quantity Shortage</option>
                            <option value="delivery">Late Delivery</option>
                            <option value="invoice">Invoice/GST Error</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                        <textarea required rows="4" placeholder="Briefly describe the issue for our verification team..." className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium resize-none"></textarea>
                    </div>
                    <button
                        disabled={formStatus === 'sending'}
                        className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl transition-all active:scale-95 ${formStatus === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white shadow-rose-200'}`}
                    >
                        {formStatus === 'sending' ? 'Registering...' : formStatus === 'success' ? 'Dispute Raised! ✅' : 'Submit for Investigation'}
                    </button>
                </form>
            )}
        </div>
    );

    const FeatureCard = ({ icon, title, desc, onClick, color, footer, bgIcon }) => {
        const colors = {
            blue: "from-blue-50 border-blue-100 hover:border-blue-300",
            indigo: "from-indigo-50 border-indigo-100 hover:border-indigo-300",
            amber: "from-amber-50 border-amber-100 hover:border-amber-300",
            emerald: "from-emerald-50 border-emerald-100 hover:border-emerald-300"
        };
        const btnColors = {
            blue: "bg-blue-600",
            indigo: "bg-indigo-600",
            amber: "bg-amber-600",
            emerald: "bg-emerald-600"
        };
        return (
            <div onClick={onClick} className={`bg-gradient-to-br ${colors[color]} to-white border-2 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl transition-all group relative overflow-hidden`}>
                <div className="relative z-10">
                    <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">{icon}</span>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
                    <p className="text-slate-500 font-bold mb-6 leading-relaxed">{desc}</p>
                    <span className={`inline-block ${btnColors[color]} text-white font-black px-6 py-3 rounded-xl text-sm transition-transform active:scale-95`}>{footer}</span>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">{bgIcon}</div>
            </div>
        );
    };

    const SubPageHeader = () => (
        <button onClick={() => setActiveView('main')} className="text-blue-600 font-black flex items-center gap-2 mb-8 bg-blue-50 px-6 py-3 rounded-2xl hover:bg-blue-100 transition-all w-fit group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
        </button>
    );

    const SubPageView = ({ title, fullText, icon, colorClass, children, bgIcon }) => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            <SubPageHeader />
            <div className={`bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 ${colorClass} relative overflow-hidden`}>
                <div className="max-w-2xl relative z-10 space-y-8">
                    <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">{title} {icon}</h2>
                    <p className="text-slate-600 font-bold text-lg md:text-xl leading-relaxed">{fullText}</p>
                    {children}
                </div>
                <div className="absolute -right-20 -bottom-20 text-[20rem] opacity-5 rotate-12 pointer-events-none">{bgIcon}</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Main Navigation Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={() => activeView === 'main' ? navigate('/marketplace') : setActiveView('main')} className="flex items-center gap-2 text-blue-700 font-black uppercase text-xs tracking-widest hover:text-blue-500 transition-colors">
                        <span>←</span> {activeView === 'main' ? t.back : 'Dashboard'}
                    </button>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="bg-slate-100 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-700 outline-none cursor-pointer hover:bg-white hover:ring-2 hover:ring-blue-100 transition-all shadow-sm"
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
            </header>

            <main className="max-w-4xl mx-auto p-6 mt-8">
                {activeView === 'main' && <MainView />}
                {activeView === 'procurement' && (
                    <SubPageView title={t.procurementTitle} fullText={t.procurementFull} icon="📦" colorClass="border-blue-50" bgIcon="🏢">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <button className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-blue-400 transition-all text-left group">
                                <span className="text-3xl group-hover:scale-110 transition-transform">⚖️</span>
                                <span className="font-black text-slate-800 tracking-tight">E-Auction Rules</span>
                            </button>
                            <button className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-blue-400 transition-all text-left group">
                                <span className="text-3xl group-hover:scale-110 transition-transform">📝</span>
                                <span className="font-black text-slate-800 tracking-tight">Tender Tracker</span>
                            </button>
                        </div>
                    </SubPageView>
                )}
                {activeView === 'logistics' && (
                    <SubPageView title={t.logisticsTitle} fullText={t.logisticsFull} icon="🚚" colorClass="border-indigo-50" bgIcon="🛣️">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                            <h4 className="font-black uppercase tracking-widest text-xs mb-4 opacity-80">Live Tracking Feature</h4>
                            <p className="font-bold text-lg leading-relaxed">Use the "Marketplace &gt; Orders" tab to see real-time GPS status and temperature logs for your current shipments.</p>
                        </div>
                    </SubPageView>
                )}
                {activeView === 'quality' && (
                    <SubPageView title={t.qualityTitle} fullText={t.qualityFull} icon="🔬" colorClass="border-amber-50" bgIcon="📋">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            {['Grade A+', 'Grade A', 'Grade B'].map((g, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border-2 border-amber-100 text-center group hover:bg-white hover:shadow-xl hover:border-amber-400 transition-all">
                                    <span className="text-4xl block mb-3 group-hover:rotate-12 transition-transform">{['🏅', '🥈', '🥉'][i]}</span>
                                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-2">{g}</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{['Export Grade', 'Domestic Std', 'Industrial'][i]}</p>
                                </div>
                            ))}
                        </div>
                    </SubPageView>
                )}
                {activeView === 'payments' && (
                    <SubPageView title={t.paymentTitle} fullText={t.paymentFull} icon="💳" colorClass="border-emerald-50" bgIcon="💰">
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-emerald-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95">Download GST Helper</button>
                            <button className="bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">Wallet Settings</button>
                        </div>
                    </SubPageView>
                )}
            </main>

            {/* Premium Decorative Footer */}
            <footer className="text-center p-14 opacity-40">
                <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] italic">AgriWise Enterprise — Securing the Supply Chain</p>
            </footer>
        </div>
    );
};

export default BuyerSupport;
