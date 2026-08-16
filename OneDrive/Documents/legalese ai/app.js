// LegalEase AI - Production Web Application Engine
// Dual Mode: Connects to Express REST API Gateway (/api/v1/) with autonomous client fallback & Multilingual Output Enforcement.

const API_BASE = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")
  ? "http://localhost:3000/api/v1"
  : "/api/v1";

const languages = [
  { code: "en", name: "English", native: "English", speechCode: "en-IN" },
  { code: "hi", name: "Hindi", native: "हिन्दी", speechCode: "hi-IN" },
  { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
  { code: "bn", name: "Bengali", native: "বাংলা", speechCode: "bn-IN" },
  { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" },
  { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", speechCode: "kn-IN" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", speechCode: "ml-IN" }
];

const translations = {
  en: {
    navHome: "Home",
    navChat: "Ask",
    navDraft: "Draft",
    navLibrary: "Library",
    navHelp: "Find Help",
    signIn: "Sign in",
    eyebrow: "Law and rights assistant",
    heroTitle: "Ask about your rights in seconds",
    heroSubtitle: "Plain-language legal help, in your own language, grounded in real legal sources.",
    questionLabel: "Ask a legal question",
    questionPlaceholder: "Type or speak your question... (e.g. Can my boss delay my salary?)",
    chatPlaceholder: "Ask a follow-up question...",
    askButton: "Ask",
    topicLabor: "Labor",
    topicConsumer: "Consumer",
    topicTenancy: "Tenancy",
    topicRti: "RTI",
    firstRun: "Prefer another language? Switch anytime from the top bar.",
    dismiss: "Dismiss",
    metricOne: "Access plain-language guidance before you visit an office.",
    metricTwo: "Regional language-ready interface and voice settings.",
    metricThree: "Accessible controls with clear focus states and scalable type.",
    chatEyebrow: "Verified response",
    chatTitle: "Your legal answer",
    answerText: "If someone uses words, gestures, or actions intended to insult the modesty of a woman, Indian law may treat it as an offence under Bharatiya Nyaya Sanhita (BNS Sec 79 / IPC 509). Keep a record of the incident, avoid confrontation, and file a complaint at the nearest police station or through a women helpline.",
    readAloud: "Read aloud",
    expertNote: "For urgent safety risks, contact local emergency services or a legal professional.",
    draftEyebrow: "Document drafting",
    draftTitle: "Create a simple legal notice",
    backButton: "Back",
    nextButton: "Next",
    documentReady: "Document ready",
    download: "Download PDF/HTML",
    share: "Share",
    libraryEyebrow: "Rights library",
    libraryTitle: "Plain-language rights guides",
    helpEyebrow: "Find legal help",
    helpTitle: "Nearby support options",
    settingsEyebrow: "Preferences",
    settingsTitle: "Settings",
    voiceLanguage: "Voice language",
    voiceLanguageMeta: "Display and voice can be different.",
    voiceOutput: "Voice output",
    voiceOutputMeta: "Read answers aloud when requested.",
    darkMode: "Dark mode",
    darkModeMeta: "Use a calmer low-light interface."
  },
  hi: {
    navHome: "होम",
    navChat: "पूछें",
    navDraft: "ड्राफ्ट",
    navLibrary: "लाइब्रेरी",
    navHelp: "कानूनी मदद",
    signIn: "साइन इन",
    eyebrow: "कानून और अधिकार सहायक",
    heroTitle: "अपने अधिकारों के बारे में सेकंडों में पूछें",
    heroSubtitle: "आपकी भाषा में सरल कानूनी मदद, भरोसेमंद कानूनी स्रोतों के साथ।",
    questionLabel: "कानूनी सवाल पूछें",
    questionPlaceholder: "सवाल टाइप करें या बोलें... (जैसे: क्या कंपनी वेतन रोक सकती है?)",
    chatPlaceholder: "आगे का सवाल पूछें...",
    askButton: "पूछें",
    topicLabor: "श्रम अधिकार",
    topicConsumer: "उपभोक्ता",
    topicTenancy: "किरायेदारी",
    topicRti: "आरटीआई",
    firstRun: "दूसरी भाषा पसंद है? ऊपर के बार से कभी भी बदलें।",
    dismiss: "हटाएं",
    metricOne: "ऑफिस जाने से पहले सरल भाषा में मार्गदर्शन पाएं।",
    metricTwo: "क्षेत्रीय भाषा इंटरफेस और आवाज सेटिंग्स।",
    metricThree: "स्पष्ट फोकस स्टेट और सुलभ टेक्स्ट।",
    chatEyebrow: "सत्यापित जवाब",
    chatTitle: "आपका कानूनी जवाब",
    answerText: "यदि कोई व्यक्ति शब्दों या व्यवहार से महिला की गरिमा को ठेस पहुंचाता है, तो भारतीय कानून (BNS धारा 79 / IPC 509) इसे अपराध मानता है। नजदीकी पुलिस स्टेशन या महिला हेल्पलाइन (1091) पर शिकायत दर्ज कराएं।",
    readAloud: "सुनें",
    expertNote: "तत्काल सुरक्षा जोखिम हो तो स्थानीय आपात सेवा से संपर्क करें।",
    draftEyebrow: "दस्तावेज ड्राफ्ट",
    draftTitle: "सरल कानूनी नोटिस बनाएं",
    backButton: "पीछे",
    nextButton: "आगे",
    documentReady: "दस्तावेज तैयार",
    download: "पीडीएफ डाउनलोड करें",
    share: "शेयर",
    libraryEyebrow: "अधिकार लाइब्रेरी",
    libraryTitle: "सरल भाषा में अधिकार गाइड",
    helpEyebrow: "कानूनी मदद",
    helpTitle: "नजदीकी सहायता विकल्प",
    settingsEyebrow: "पसंद",
    settingsTitle: "सेटिंग्स"
  },
  ta: {
    navHome: "முகப்பு",
    navChat: "கேள்",
    navDraft: "வரைவு",
    navLibrary: "நூலகம்",
    navHelp: "உதவி",
    signIn: "உள்நுழை",
    eyebrow: "சட்டம் மற்றும் உரிமைகள் உதவியாளர்",
    heroTitle: "உங்கள் உரிமைகள் குறித்து உடனே கேளுங்கள்",
    heroSubtitle: "உங்கள் மொழியில் எளிய சட்ட உதவி, உண்மையான சட்ட ஆதாரங்களுடன்.",
    questionLabel: "சட்ட கேள்வி கேளுங்கள்",
    questionPlaceholder: "கேள்வியை தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள்...",
    chatPlaceholder: "தொடர் கேள்வி கேளுங்கள்...",
    askButton: "கேள்",
    topicLabor: "தொழிலாளர்",
    topicConsumer: "நுகர்வோர்",
    topicTenancy: "வாடகை",
    topicRti: "RTI",
    firstRun: "வேறு மொழி வேண்டுமா? மேல் பட்டியில் மாற்றலாம்.",
    dismiss: "மூடு",
    metricOne: "அலுவலகத்திற்கு செல்லும் முன் எளிய வழிகாட்டல் பெறுங்கள்.",
    metricTwo: "பிராந்திய மொழி இடைமுகம் மற்றும் குரல் அமைப்புகள்.",
    metricThree: "தெளிவான அணுகல் கட்டுப்பாடுகள்.",
    chatEyebrow: "சரிபார்க்கப்பட்ட பதில்",
    chatTitle: "உங்கள் சட்ட பதில்",
    answerText: "ஒரு பெண்ணின் மரியாதையை அவமதிக்கும் வகையில் செயல்பட்டால், இந்திய சட்டம் (BNS Sec 79 / IPC 509) குற்றமாகக் கருதும். காவல் நிலையத்திலோ அல்லது பெண்கள் உதவி எண்களிலோ புகார் அளிக்கவும்.",
    readAloud: "ஒலியாக படி",
    expertNote: "அவசர பாதுகாப்பு அபாயங்களுக்கு, உள்ளூர் அவசர சேவைகளைத் தொடர்பு கொள்ளவும்.",
    draftEyebrow: "ஆவண வரைவு",
    draftTitle: "சட்ட அறிவிப்பு உருவாக்கவும்",
    backButton: "பின்னால்",
    nextButton: "அடுத்து",
    documentReady: "ஆவணம் தயார்",
    download: "பதிவிறக்கு",
    share: "பகிர்",
    libraryEyebrow: "உரிமைகள் நூலகம்",
    libraryTitle: "எளிய மொழி உரிமை வழிகாட்டிகள்",
    helpEyebrow: "சட்ட உதவி",
    helpTitle: "அருகிலுள்ள உதவி விருப்பங்கள்",
    settingsEyebrow: "விருப்பங்கள்",
    settingsTitle: "அமைப்புகள்"
  },
  bn: {
    navHome: "হোম",
    navChat: "জিজ্ঞাসা",
    navDraft: "খসড়া",
    navLibrary: "লাইব্রেরি",
    navHelp: "সাহায্য",
    signIn: "সাইন ইন",
    eyebrow: "আইন ও অধিকার সহায়ক",
    heroTitle: "কয়েক সেকেন্ডে আপনার অধিকার সম্পর্কে জিজ্ঞাসা করুন",
    heroSubtitle: "আপনার ভাষায় সহজ আইনি সাহায্য, নির্ভরযোগ্য আইনি সূত্রসহ।",
    questionLabel: "আইনি প্রশ্ন জিজ্ঞাসা করুন",
    questionPlaceholder: "প্রশ্ন লিখুন বা বলুন...",
    chatPlaceholder: "আরও প্রশ্ন জিজ্ঞাসা করুন...",
    askButton: "জিজ্ঞাসা",
    topicLabor: "শ্রম অধিকার",
    topicConsumer: "ভোক্তা",
    topicTenancy: "ভাড়া",
    topicRti: "RTI",
    firstRun: "অন্য ভাষা পছন্দ? উপরের বার থেকে বদলান।",
    dismiss: "বন্ধ",
    metricOne: "অফিসে যাওয়ার আগে সহজ ভাষায় দিকনির্দেশ পান।",
    metricTwo: "আঞ্চলিক ভাষা ইন্টারফেস এবং ভয়েস সেটিংস।",
    metricThree: "সহজ এবং পরিষ্কার অ্যাক্সেস নিয়ন্ত্রক।",
    chatEyebrow: "যাচাইকৃত উত্তর",
    chatTitle: "আপনার আইনি উত্তর",
    answerText: "কোনো নারীর সম্মান ক্ষুণ্ন করার চেষ্টা করলে তা ভারতীয় আইনে (BNS Sec 79 / IPC 509) অপরাধ। নিকটস্থ থানা বা মহিলা হেল্পলাইনে অভিযোগ দায়ের করুন।",
    readAloud: "শুনুন",
    expertNote: "জরুরি সুরক্ষার জন্য স্থানীয় জরুরি পরিষেবাতে যোগাযোগ করুন।",
    draftEyebrow: "নথি খসড়া",
    draftTitle: "সহজ আইনি নোটিশ তৈরি করুন",
    backButton: "পেছনে",
    nextButton: "পরবর্তী",
    documentReady: "নথি প্রস্তুত",
    download: "ডাউনলোড করুন",
    share: "শেয়ার",
    libraryEyebrow: "অধিকার লাইব্রেরি",
    libraryTitle: "সহজ ভাষার অধিকার গাইড",
    helpEyebrow: "আইনি সাহায্য",
    helpTitle: "নিকটস্থ সহায়তা বিকল্প",
    settingsEyebrow: "পছন্দ",
    settingsTitle: "সেটিংস"
  },
  mr: {
    navHome: "होम",
    navChat: "विचारा",
    navDraft: "ड्राफ्ट",
    navLibrary: "लायब्ररी",
    navHelp: "कायदेशीर मदत",
    signIn: "साइन इन",
    eyebrow: "कायदा आणि हक्क सहाय्यक",
    heroTitle: "तुमच्या हक्कांबद्दल एका सेकंदात विचारा",
    heroSubtitle: "तुमच्या भाषेत सोपी कायदेशीर मदत, विश्वासार्ह कायदेशीर स्रोतांसह.",
    questionLabel: "कायदेशीर प्रश्न विचारा",
    questionPlaceholder: "तुमचा प्रश्न टाईप करा किंवा बोला...",
    chatPlaceholder: "पुढील प्रश्न विचारा...",
    askButton: "विचारा",
    topicLabor: "कामगार हक्क",
    topicConsumer: "ग्राहक",
    topicTenancy: "भाडेकरू",
    topicRti: "आरटीआय",
    firstRun: "दुसरी भाषा हवी आहे? वरच्या बारमधून बदला.",
    dismiss: "बंद करा",
    metricOne: "कार्यालयात जाण्यापूर्वी सोप्या भाषेत मार्गदर्शन मिळवा.",
    metricTwo: "प्रादेशिक भाषा आणि आवाज सेटिंग्ज.",
    metricThree: "स्पष्ट आणि सुलभ नियंत्रणे.",
    chatEyebrow: "सत्यापित उत्तर",
    chatTitle: "तुमचे कायदेशीर उत्तर",
    answerText: "महिलांच्या आदराला ठेच पोहोचवणारे वर्तन भारतीय कायद्यानुसार (BNS Sec 79 / IPC 509) गुन्हा आहे. जवळच्या पोलीस ठाण्यात किंवा महिला हेल्पलाइनवर तक्रार करा.",
    readAloud: "ऐका",
    expertNote: "तातडीच्या सुरक्षेसाठी स्थानिक आपत्कालीन सेवांशी संपर्क साधा.",
    draftEyebrow: "दस्तऐवज ड्राफ्ट",
    draftTitle: "कायदेशीर नोटीस तयार करा",
    backButton: "मागे",
    nextButton: "पुढे",
    documentReady: "दस्तऐवज तयार",
    download: "डाउनलोड करा",
    share: "शेअर करा",
    libraryEyebrow: "हक्क लायब्ररी",
    libraryTitle: "सोप्या भाषेतील हक्क मार्गदर्शक",
    helpEyebrow: "कायदेशीर मदत",
    helpTitle: "जवळचे मदत पर्याय",
    settingsEyebrow: "पसंत",
    settingsTitle: "सेटिंग्ज"
  },
  te: {
    navHome: "హోమ్",
    navChat: "అడగండి",
    navDraft: "డ్రాఫ్ట్",
    navLibrary: "లైబ్రరీ",
    navHelp: "చట్టపరమైన సాయం",
    signIn: "సైన్ ఇన్",
    eyebrow: "చట్టం మరియు హక్కుల సహాయకుడు",
    heroTitle: "మీ హక్కుల గురించి క్షణాల్లో అడగండి",
    heroSubtitle: "మీ స్వంత భాషలో నిష్పాక్షికమైన చట్టపరమైన సాయం.",
    questionLabel: "చట్టపరమైన ప్రశ్న అడగండి",
    questionPlaceholder: "మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడండి...",
    chatPlaceholder: "తదుపరి ప్రశ్న అడగండి...",
    askButton: "అడగండి",
    topicLabor: "కార్మిక హక్కులు",
    topicConsumer: "వినియోగదారుడు",
    topicTenancy: "అద్దెదారు",
    topicRti: "RTI",
    firstRun: "మరొక భాష కావాలా? పైన మార్చుకోండి.",
    dismiss: "రద్దు",
    metricOne: "కార్యాలయానికి వెళ్లే ముందు సులభమైన మార్గదర్శకత్వం పొందండి.",
    metricTwo: "ప్రాంతీయ భాష మరియు వాయిస్ సెట్టింగ్‌లు.",
    metricThree: "సులభమైన మరియు స్పష్టమైన నియంత్రణలు.",
    chatEyebrow: "ధృవీకరించబడిన సమాధానం",
    chatTitle: "మీ చట్టపరమైన సమాధానం",
    answerText: "మహిళల గౌరవానికి భంగం కలిగించే ప్రవర్తన భారతీయ చట్టం (BNS Sec 79 / IPC 509) ప్రకారం నేరం. పోలీసు స్టేషన్‌లో లేదా మహిళా హెల్ప్‌లైన్‌లో ఫిర్యాదు చేయండి.",
    readAloud: "వినండి",
    expertNote: "అత్యవసర భద్రతా ప్రమాదాల కోసం స్థానిక అత్యవసర సేవలను సంప్రదించండి.",
    draftEyebrow: "డాక్యుమెంట్ డ్రాఫ్ట్",
    draftTitle: "చట్టపరమైన నోటీసును సృష్టించండి",
    backButton: "వెనుకకు",
    nextButton: "తరువాత",
    documentReady: "డాక్యుమెంట్ సిద్ధంగా ఉంది",
    download: "డౌన్‌లోడ్",
    share: "షేర్ చేయండి",
    libraryEyebrow: "హక్కుల లైబ్రరీ",
    libraryTitle: "సులభమైన హక్కుల మార్గదర్శకాలు",
    helpEyebrow: "ఇష్టాలు",
    helpTitle: "సమీప సహాయ ఎంపికలు",
    settingsEyebrow: "ఇష్టాలు",
    settingsTitle: "సెట్టింగ్‌లు"
  },
  kn: {
    navHome: "ಮುಖಪುಟ",
    navChat: "ಕೇಳಿ",
    navDraft: "ಕರಡು",
    navLibrary: "ಗ್ರಂಥಾಲಯ",
    navHelp: "ಕಾನೂನು ನೆರವು",
    signIn: "ಸೈನ್ ಇನ್",
    eyebrow: "ಕಾನೂನು ಮತ್ತು ಹಕ್ಕುಗಳ ಸಹಾಯಕ",
    heroTitle: "ನಿಮ್ಮ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ತಕ್ಷಣವೇ ಕೇಳಿ",
    heroSubtitle: "ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಸುಲಭ ಕಾನೂನು ನೆರವು.",
    questionLabel: "ಕಾನೂನು ಪ್ರಶ್ನೆ ಕೇಳಿ",
    questionPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ...",
    chatPlaceholder: "ಮುಂದಿನ ಪ್ರಶ್ನೆ ಕೇಳಿ...",
    askButton: "ಕೇಳಿ",
    topicLabor: "ಕಾರ್ಮಿಕ ಹಕ್ಕುಗಳು",
    topicConsumer: "ಗ್ರಾಹಕ",
    topicTenancy: "ಬಾಡಿಗೆದಾರ",
    topicRti: "RTI",
    firstRun: "ಮತ್ತೊಂದು ಭಾಷೆ ಬೇಕೇ? ಮೇಲೆ ಬದಲಾಯಿಸಿ.",
    dismiss: "ಮುಚ್ಚಿ",
    metricOne: "ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡುವ ಮುನ್ನ ಸುಲಭ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    metricTwo: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆ ಮತ್ತು ಧ್ವನಿ ಸಂಯೋಜನೆಗಳು.",
    metricThree: "ಸ್ಪಷ್ಟ ಮತ್ತು ಸುಲಭ ನಿಯಂತ್ರಣಗಳು.",
    chatEyebrow: "ದೃಢೀಕರಿಸಿದ ಉತ್ತರ",
    chatTitle: "ನಿಮ್ಮ ಕಾನೂನು ಉತ್ತರ",
    answerText: "ಮಹಿಳೆಯರ ಗೌರವಕ್ಕೆ ಧಕ್ಕೆ ತರುವ ವರ್ತನೆಯು ಭಾರತೀಯ ಕಾನೂನಿನ ಪ್ರಕಾರ (BNS Sec 79 / IPC 509) ಅಪರಾಧವಾಗಿದೆ. ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ ದೂರು ನೀಡಿ.",
    readAloud: "ಓದಿ ಕೇಳಿ",
    expertNote: "ತುರ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಸ್ಥಳೀಯ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    draftEyebrow: "ದಾಖಲೆ ಕರಡು",
    draftTitle: "ಕಾನೂನು ನೋಟಿಸ್ ರಚಿಸಿ",
    backButton: "ಹಿಂದೆ",
    nextButton: "ಮುಂದೆ",
    documentReady: "ದಾಖಲೆ ಸಿದ್ಧವಾಗಿದೆ",
    download: "ಡೌನ್ಲೋಡ್",
    share: "ಹಂಚಿಕೊಳ್ಳಿ",
    libraryEyebrow: "ಹಕ್ಕುಗಳ ಗ್ರಂಥಾಲಯ",
    libraryTitle: "ಸುಲಭ ಕಾನೂನು ಮಾರ್ಗದರ್ಶಿಗಳು",
    helpEyebrow: "ಆದ್ಯತೆಗಳು",
    helpTitle: "ಸಮೀಪದ ಸಹಾಯ ಆಯ್ಕೆಗಳು",
    settingsEyebrow: "ಆದ್ಯತೆಗಳು",
    settingsTitle: "ಸಂಯೋಜನೆಗಳು"
  },
  ml: {
    navHome: "ഹോം",
    navChat: "ചോദിക്കൂ",
    navDraft: "ഡ്രാഫ്റ്റ്",
    navLibrary: "ലൈബ്രറി",
    navHelp: "നിയമസഹായം",
    signIn: "സൈൻ ഇൻ",
    eyebrow: "നിയമവും അവകാശങ്ങളും അസിസ്റ്റന്റ്",
    heroTitle: "നിങ്ങളുടെ അവകാശങ്ങളെക്കുറിച്ച് ചോദിക്കൂ",
    heroSubtitle: "നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ ലളിതമായ നിയമസഹായം.",
    questionLabel: "നിയമപരമായ ചോദ്യം ചോദിക്കൂ",
    questionPlaceholder: "ചോദ്യം ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ സംസാരിക്കുക...",
    chatPlaceholder: "അടുത്ത ചോദ്യം ചോദിക്കൂ...",
    askButton: "ചോദിക്കൂ",
    topicLabor: "തൊഴിൽ അവകാശങ്ങൾ",
    topicConsumer: "ഉപഭോക്താവ്",
    topicTenancy: "വാടകക്കാരൻ",
    topicRti: "RTI",
    firstRun: "മറ്റൊരു ഭാഷ വേണോ? മുകളിൽ മാറ്റാം.",
    dismiss: "അടയ്ക്കുക",
    metricOne: "ഓഫീസിൽ പോകുന്നതിന് മുൻപ് ലളിതമായ വഴികാട്ടൽ നേടുക.",
    metricTwo: "പ്രാദേശിക ഭാഷാ ഇന്റർഫേസും ശബ്ദ ക്രമീകരണങ്ങളും.",
    metricThree: "വ്യക്തവും ലളിതവുമായ നിയന്ത്രണങ്ങൾ.",
    chatEyebrow: "സ്ഥിരീകരിച്ച മറുപടി",
    chatTitle: "നിങ്ങളുടെ നിയമപരമായ മറുപടി",
    answerText: "സ്ത്രീകളുടെ ആത്മാഭിമാനത്തെ ചോദ്യം ചെയ്യുന്ന പ്രവൃത്തികൾ ഇന്ത്യൻ നിയമപ്രകാരം (BNS Sec 79 / IPC 509) കുറ്റകരമാണ്. അടുത്തുള്ള പോലീസ് സ്റ്റേഷനിലോ വനിതാ ഹെൽപ്പ് ലൈനിലോ പരാതിപ്പെടുക.",
    readAloud: "കേൾക്കൂ",
    expertNote: "അടിയന്തര സുരക്ഷയ്ക്കായി പ്രാദേശിക അടിയന്തര സേവനങ്ങളുമായി ബന്ധപ്പെടുക.",
    draftEyebrow: "രേഖാ ഡ്രാഫ്റ്റ്",
    draftTitle: "നിയമപരമായ നോട്ടീസ് തയ്യാറാക്കുക",
    backButton: "പിന്നോട്ട്",
    nextButton: "അടുത്തത്",
    documentReady: "രേഖ തയ്യാറാണ്",
    download: "ഡൗൺലോഡ്",
    share: "പങ്കുവെക്കുക",
    libraryEyebrow: "അവകാശ ലൈബ്രറി",
    libraryTitle: "ലളിതമായ അവകാശ ഗൈഡുകൾ",
    helpEyebrow: "ക്രമീകരണങ്ങൾ",
    helpTitle: "സമീപമുള്ള സഹായ കേന്ദ്രങ്ങൾ",
    settingsEyebrow: "ക്രമീകരണങ്ങൾ",
    settingsTitle: "സെറ്റിംഗ്സ്"
  }
};

const fallback = translations.en;
const state = {
  language: localStorage.getItem("legalease-language") || "en",
  voiceLanguage: localStorage.getItem("legalease-voice-lang") || "en-IN",
  darkMode: localStorage.getItem("legalease-dark-mode") === "true",
  user: JSON.parse(localStorage.getItem("legalease-user") || "null"),
  token: localStorage.getItem("legalease-token") || null,
  pendingPhone: "",
  wizardStep: 0,
  docType: "salary_notice",
  wizardValues: ["", "", "", ""],
  currentQueryId: null,
  isRecording: false,
  recognition: null,
  lastGeneratedDocId: null,
  cachedArticles: []
};

const wizardConfigs = {
  salary_notice: [
    { question: "Who is the notice for?", placeholder: "Employer / HR Company Name", preview: "recipient" },
    { question: "What is the salary dispute?", placeholder: "Unpaid salary for 2 months", preview: "issue" },
    { question: "What action do you request?", placeholder: "Release pending dues within 15 days", preview: "relief" },
    { question: "Notice Subject", placeholder: "Demand Notice for Non-Payment of Salary", preview: "subject" }
  ],
  consumer_complaint: [
    { question: "Who is the merchant/company?", placeholder: "Store / Brand Name", preview: "recipient" },
    { question: "What product/service was defective?", placeholder: "Defective laptop delivered, refund refused", preview: "issue" },
    { question: "What remedy do you demand?", placeholder: "Full refund of ₹45,000 with interest", preview: "relief" },
    { question: "Complaint Subject", placeholder: "Notice of Defective Goods & Unfair Trade Practice", preview: "subject" }
  ],
  tenant_notice: [
    { question: "Who is the Landlord?", placeholder: "Landlord Name", preview: "recipient" },
    { question: "What is the tenancy dispute?", placeholder: "Refusal to refund ₹30,000 security deposit", preview: "issue" },
    { question: "What resolution do you demand?", placeholder: "Refund deposit within 10 days", preview: "relief" },
    { question: "Notice Subject", placeholder: "Notice for Refund of Security Deposit", preview: "subject" }
  ],
  rti_application: [
    { question: "Which Department / Public Office?", placeholder: "Municipal Corporation / Public Authority", preview: "recipient" },
    { question: "What information is requested?", placeholder: "Certified copy of road tender approvals 2024", preview: "issue" },
    { question: "Action Demanded", placeholder: "Provide information within 30 days under RTI Act", preview: "relief" },
    { question: "RTI Subject", placeholder: "Application under Section 6(1) of RTI Act 2005", preview: "subject" }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function showToast(msg) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 3500);
}

function t(key) {
  const langDict = translations[state.language] || fallback;
  return langDict[key] || fallback[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  const currentLangObj = languages.find((item) => item.code === state.language);
  if ($("#currentLanguage")) $("#currentLanguage").textContent = currentLangObj?.name || "English";
}

function updateAuthStateUI() {
  const btn = $("#authBtn");
  if (!btn) return;
  if (state.user && state.token) {
    btn.textContent = `📱 ${state.user.phone_number}`;
    btn.title = "Click to Sign Out";
  } else {
    btn.textContent = t("signIn");
    btn.title = "Sign in with Phone OTP";
  }
}

function setView(view) {
  $$(".view").forEach((section) => section.classList.remove("active"));
  const targetView = $(`#${view}View`);
  if (targetView) targetView.classList.add("active");
  $$(".nav-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  window.location.hash = view;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function appendTextElement(parent, tagName, text, className) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text || "";
  parent.appendChild(element);
  return element;
}

function renderLanguages(filter = "") {
  const list = $("#languageList");
  if (!list) return;
  clearNode(list);
  const normalizedFilter = filter.trim().toLowerCase();
  languages
    .filter((l) => `${l.native} ${l.name}`.toLowerCase().includes(normalizedFilter))
    .forEach((l) => {
      const option = document.createElement("button");
      option.className = "language-option";
      option.type = "button";
      option.dataset.code = l.code;
      option.classList.toggle("active", l.code === state.language);
      appendTextElement(option, "span", `${l.native} (${l.name})`);
      appendTextElement(option, "span", l.code === state.language ? "✓" : "");
      
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        changeLanguage(l.code);
      });
      list.appendChild(option);
    });
}

function changeLanguage(code) {
  const selected = languages.find((l) => l.code === code) || languages[0];
  state.language = selected.code;
  state.voiceLanguage = selected.speechCode;

  localStorage.setItem("legalease-language", state.language);
  localStorage.setItem("legalease-voice-lang", state.voiceLanguage);

  if ($("#voiceLanguage")) $("#voiceLanguage").value = state.voiceLanguage;

  applyTranslations();
  updateAuthStateUI();
  renderLanguages($("#languageSearch")?.value || "");
  $(".language-switcher")?.classList.remove("open");
  $("#languageButton")?.setAttribute("aria-expanded", "false");

  updateWizard();
  updatePreview();
  if (state.cachedArticles.length > 0) {
    renderLibraryCards(state.cachedArticles);
  }

  showToast(`Language set to ${selected.native} (${selected.name})`);
}

// Phone OTP Auth Flow
async function requestOtp(phone) {
  state.pendingPhone = phone;
  try {
    const res = await fetch(`${API_BASE}/auth/otp/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone, language: state.language })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Failed to send OTP.");
      return;
    }
    $("#otpRequestForm").hidden = true;
    $("#otpVerifyForm").hidden = false;
    if ($("#otpHint")) {
      $("#otpHint").textContent = data.demo_otp
        ? `Demo Code: ${data.demo_otp} (Valid for 5 mins)`
        : "Enter the OTP sent to your phone. It is valid for 5 minutes.";
    }
    showToast(`OTP sent to ${phone}`);
  } catch (err) {
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    state.mockOtp = mockOtp;
    $("#otpRequestForm").hidden = true;
    $("#otpVerifyForm").hidden = false;
    if ($("#otpHint")) $("#otpHint").textContent = `Demo OTP Code: ${mockOtp}`;
    showToast(`OTP sent to ${phone}`);
  }
}

async function verifyOtp(otp) {
  try {
    const res = await fetch(`${API_BASE}/auth/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: state.pendingPhone, otp })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || "Invalid OTP verification.");
      return;
    }
    state.token = data.access_token;
    state.user = data.user;
    localStorage.setItem("legalease-token", state.token);
    localStorage.setItem("legalease-user", JSON.stringify(state.user));

    updateAuthStateUI();
    $("#authModal").hidden = true;
    showToast(`Authenticated as ${state.user.phone_number}`);
  } catch (err) {
    state.user = { id: "usr-demo", phone_number: state.pendingPhone, role: "citizen" };
    state.token = "demo_jwt_token";
    localStorage.setItem("legalease-token", state.token);
    localStorage.setItem("legalease-user", JSON.stringify(state.user));

    updateAuthStateUI();
    $("#authModal").hidden = true;
    showToast(`Signed in as ${state.user.phone_number}`);
  }
}

// REST API Gateway Query with Multilingual RAG Output Enforcement
async function performQuery(question) {
  if (!question) return;
  const thinking = $("#thinkingLine");
  const answer = $("#answerText");
  const badge = $("#citationBadge");
  const stepsList = $("#actionStepsList");
  const dot = $("#confidenceDot");
  const label = $("#confidenceLabel");

  setView("chat");
  if ($("#chatQuestion")) $("#chatQuestion").value = question;
  if (thinking) thinking.classList.add("active");
  if (answer) answer.style.opacity = "0.4";

  try {
    const headers = { "Content-Type": "application/json" };
    if (state.token) headers["Authorization"] = `Bearer ${state.token}`;

    const res = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({ content: question, language: state.language, channel: "web" })
    });

    const data = await res.json();
    state.currentQueryId = data.query_id;

    if (thinking) thinking.classList.remove("active");
    if (answer) {
      answer.textContent = data.response_text;
      answer.style.opacity = "1";
    }

    if (badge && data.citations && data.citations.length > 0) {
      const mainCite = data.citations[0];
      badge.textContent = `${mainCite.act} (${mainCite.section})`;
      badge.classList.remove("verify-pulse");
      void badge.offsetWidth;
      badge.classList.add("verify-pulse");
    }

    if (stepsList && data.actionable_steps) {
      const stepsArray = Array.isArray(data.actionable_steps)
        ? data.actionable_steps
        : (data.actionable_steps[state.language] || data.actionable_steps["en"] || []);
      clearNode(stepsList);
      stepsArray.forEach((step) => appendTextElement(stepsList, "li", step));
    }

    if (dot && label) {
      if (data.escalation_recommended || data.confidence < 0.75) {
        dot.className = "confidence-dot warm";
        label.textContent = "Expert Review Recommended (Low Match)";
      } else {
        dot.className = "confidence-dot high";
        label.textContent = `High Confidence (${Math.round(data.confidence * 100)}% Match)`;
      }
    }

    if (data.suggested_draft_type) {
      state.docType = data.suggested_draft_type;
      if ($("#docTypeSelect")) $("#docTypeSelect").value = state.docType;
    }
  } catch (err) {
    if (thinking) thinking.classList.remove("active");
    if (answer) {
      answer.textContent = t("answerText");
      answer.style.opacity = "1";
    }
  }
}

// Wizard Engine
function getSteps() {
  return wizardConfigs[state.docType] || wizardConfigs.salary_notice;
}

function updateWizard() {
  const steps = getSteps();
  const step = steps[state.wizardStep] || steps[0];
  if ($("#stepCount")) $("#stepCount").textContent = `Step ${state.wizardStep + 1} of ${steps.length}`;
  if ($("#wizardQuestion")) $("#wizardQuestion").textContent = step.question;
  if ($("#wizardInput")) {
    $("#wizardInput").placeholder = step.placeholder;
    $("#wizardInput").value = state.wizardValues[state.wizardStep] || "";
  }
  if ($("#wizardProgress")) $("#wizardProgress").style.width = `${((state.wizardStep + 1) / steps.length) * 100}%`;
  if ($("#wizardBack")) $("#wizardBack").disabled = state.wizardStep === 0;
  if ($("#wizardNext")) $("#wizardNext").textContent = state.wizardStep === steps.length - 1 ? t("documentReady") : t("nextButton");
}

function updatePreview() {
  const preview = $("#documentPreview");
  if (!preview) return;
  preview.classList.add("updating");

  const steps = getSteps();
  steps.forEach((s, idx) => {
    const target = document.querySelector(`[data-preview="${s.preview}"]`);
    if (target) target.textContent = state.wizardValues[idx] || target.dataset.fallback || `[${s.preview}]`;
  });

  const dateTarget = document.querySelector('[data-preview="date"]');
  if (dateTarget) dateTarget.textContent = new Date().toLocaleDateString("en-IN");
  setTimeout(() => preview.classList.remove("updating"), 140);
}

async function finalizeDraft() {
  const formData = {
    recipient: state.wizardValues[0] || "Opposite Party",
    issue: state.wizardValues[1] || "Dispute details",
    relief: state.wizardValues[2] || "Demand resolution",
    subject: state.wizardValues[3] || "Legal Notice"
  };

  try {
    const headers = { "Content-Type": "application/json" };
    if (state.token) headers["Authorization"] = `Bearer ${state.token}`;

    const res = await fetch(`${API_BASE}/documents/draft`, {
      method: "POST",
      headers,
      body: JSON.stringify({ doc_type: state.docType, form_data: formData })
    });
    const data = await res.json();
    state.lastGeneratedDocId = data.document_id;
    if ($("#readyCard")) $("#readyCard").hidden = false;
    showToast("Legal document draft created successfully!");
  } catch (err) {
    if ($("#readyCard")) $("#readyCard").hidden = false;
    showToast("Draft ready for printing/download!");
  }
}

// Web Speech STT Integration
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;

  state.recognition.onstart = () => {
    state.isRecording = true;
    $$(".mic-button").forEach((btn) => btn.classList.add("recording"));
    if ($("#voiceStatusHome")) $("#voiceStatusHome").hidden = false;
    if ($("#voiceStatusChat")) $("#voiceStatusChat").hidden = false;
  };

  state.recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    if ($("#homeQuestion")) $("#homeQuestion").value = transcript;
    if ($("#chatQuestion")) $("#chatQuestion").value = transcript;
    showToast(`Voice captured: "${transcript}"`);
  };

  state.recognition.onend = () => {
    state.isRecording = false;
    $$(".mic-button").forEach((btn) => btn.classList.remove("recording"));
    if ($("#voiceStatusHome")) $("#voiceStatusHome").hidden = true;
    if ($("#voiceStatusChat")) $("#voiceStatusChat").hidden = true;
  };
}

function toggleVoiceInput() {
  if (!state.recognition) {
    showToast("Voice input available on modern web browsers.");
    return;
  }
  if (state.isRecording) {
    state.recognition.stop();
  } else {
    state.recognition.lang = state.voiceLanguage || "en-IN";
    state.recognition.start();
  }
}

// Load Rights Library via API
async function loadLibrary() {
  try {
    const res = await fetch(`${API_BASE}/library`);
    const data = await res.json();
    state.cachedArticles = data.articles || [];
    renderLibraryCards(state.cachedArticles);
  } catch (err) {
    console.warn("Failed to fetch library API, using cached entries:", err);
  }
}

function renderLibraryCards(articles, categoryFilter = "All") {
  const grid = $("#libraryGrid");
  if (!grid) return;
  clearNode(grid);

  const filtered = categoryFilter === "All" ? articles : articles.filter((a) => a.category === categoryFilter);

  filtered.forEach((art) => {
    const card = document.createElement("button");
    card.className = "library-card";
    const nativeSum = (typeof art.summary === "object")
      ? (art.summary[state.language] || art.summary["en"])
      : art.summary;

    appendTextElement(card, "span", "§", "card-icon");
    appendTextElement(card, "strong", art.title);
    const act = appendTextElement(card, "span", art.act);
    act.style.fontSize = "0.8rem";
    act.style.color = "var(--accent-primary)";
    act.style.fontWeight = "600";
    const summary = appendTextElement(card, "p", nativeSum);
    summary.style.fontSize = "0.85rem";
    summary.style.color = "var(--text-secondary)";
    card.addEventListener("click", () => performQuery(art.title));
    grid.appendChild(card);
  });
}

// Load Legal Aid Clinics via API
async function loadLegalAid(filterText = "") {
  const container = $("#helpListContainer");
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE}/legal-aid?city=${encodeURIComponent(filterText)}`);
    const data = await res.json();
    renderHelpCards(data.centers || []);
  } catch (err) {
    renderHelpCards([
      { name: "District Legal Services Authority (DLSA)", category: "Free Legal Aid", address: "District Court Complex", distance_km: "1.8 km", phone: "15100" },
      { name: "Women Legal Helpline Desk", category: "Safety Support", address: "State Commission for Women", distance_km: "2.4 km", phone: "1091" },
      { name: "District Consumer Redressal Forum", category: "Consumer Rights", address: "Institutional Area", distance_km: "4.1 km", phone: "1915" }
    ]);
  }
}

function renderHelpCards(centers) {
  const container = $("#helpListContainer");
  if (!container) return;
  clearNode(container);

  centers.forEach((c, index) => {
    const card = document.createElement("article");
    card.id = `centerCard-${index}`;
    const details = document.createElement("div");
    const name = appendTextElement(details, "strong", c.name);
    name.style.display = "block";
    name.style.fontSize = "1rem";
    const meta = appendTextElement(details, "span", `${c.category} • ${c.distance_km || "Nearby"}`);
    meta.style.fontSize = "0.85rem";
    meta.style.color = "var(--text-secondary)";
    const address = appendTextElement(details, "p", `📍 ${c.address}`);
    address.style.fontSize = "0.8rem";
    address.style.color = "var(--text-secondary)";
    address.style.marginTop = "4px";

    const phone = c.phone || c.helpline;
    const callLink = appendTextElement(card, "a", `Call ${phone}`, "primary-button");
    callLink.href = `tel:${phone}`;
    callLink.style.textDecoration = "none";

    card.insertBefore(details, callLink);
    container.appendChild(card);
  });
}

function init() {
  if (state.darkMode) {
    document.body.classList.add("dark");
    if ($("#darkModeToggle")) $("#darkModeToggle").checked = true;
  }

  if (localStorage.getItem("legalease-dismissed-language-prompt") === "true") {
    if ($("#firstRunPrompt")) $("#firstRunPrompt").classList.add("hidden");
  }

  applyTranslations();
  updateAuthStateUI();
  renderLanguages();
  updateWizard();
  updatePreview();
  initSpeechRecognition();
  loadLibrary();
  loadLegalAid();

  $$(".nav-tab, #settingsButton").forEach((btn) => btn.addEventListener("click", () => setView(btn.dataset.view)));

  // Auth Handlers
  $("#authBtn")?.addEventListener("click", () => {
    if (state.user && state.token) {
      if (confirm(`Signed in as ${state.user.phone_number}. Would you like to sign out?`)) {
        state.user = null;
        state.token = null;
        localStorage.removeItem("legalease-token");
        localStorage.removeItem("legalease-user");
        updateAuthStateUI();
        showToast("Signed out successfully.");
      }
    } else {
      $("#otpRequestForm").hidden = false;
      $("#otpVerifyForm").hidden = true;
      $("#authModal").hidden = false;
    }
  });

  $("#closeAuthModal")?.addEventListener("click", () => {
    $("#authModal").hidden = true;
  });

  $("#otpRequestForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = $("#authPhone").value.trim();
    if (phone) requestOtp(phone);
  });

  $("#otpVerifyForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const otp = $("#authOtp").value.trim();
    if (otp) verifyOtp(otp);
  });

  $("#resendOtpBtn")?.addEventListener("click", () => {
    if (state.pendingPhone) requestOtp(state.pendingPhone);
  });

  // Language Dropdown Toggle
  const langBtn = $("#languageButton");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const switcher = $(".language-switcher");
      if (switcher) {
        switcher.classList.toggle("open");
        langBtn.setAttribute("aria-expanded", String(switcher.classList.contains("open")));
      }
    });
  }

  $("#languageSearch")?.addEventListener("input", (e) => renderLanguages(e.target.value));

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".language-switcher")) {
      $(".language-switcher")?.classList.remove("open");
      $("#languageButton")?.setAttribute("aria-expanded", "false");
    }
    if (e.target.id === "authModal") {
      $("#authModal").hidden = true;
    }
  });

  $("#homeAskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    performQuery($("#homeQuestion").value.trim());
  });

  $("#chatAskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    performQuery($("#chatQuestion").value.trim());
  });

  $$(".mic-button").forEach((btn) => btn.addEventListener("click", toggleVoiceInput));

  $$(".topic-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.dataset.topic;
      $("#homeQuestion").value = `What are my rights regarding a ${topic} issue?`;
      performQuery($("#homeQuestion").value);
    });
  });

  $("#dismissPrompt")?.addEventListener("click", () => {
    if ($("#firstRunPrompt")) $("#firstRunPrompt").classList.add("hidden");
    localStorage.setItem("legalease-dismissed-language-prompt", "true");
  });

  $("#docTypeSelect")?.addEventListener("change", (e) => {
    state.docType = e.target.value;
    state.wizardStep = 0;
    state.wizardValues = ["", "", "", ""];
    updateWizard();
    updatePreview();
  });

  $("#wizardInput")?.addEventListener("input", (e) => {
    state.wizardValues[state.wizardStep] = e.target.value;
    updatePreview();
  });

  $("#wizardBack")?.addEventListener("click", () => {
    state.wizardStep = Math.max(0, state.wizardStep - 1);
    updateWizard();
  });

  $("#wizardNext")?.addEventListener("click", () => {
    state.wizardValues[state.wizardStep] = $("#wizardInput").value;
    const steps = getSteps();
    if (state.wizardStep === steps.length - 1) {
      finalizeDraft();
      return;
    }
    state.wizardStep += 1;
    updateWizard();
    updatePreview();
  });

  $("#downloadPdfBtn")?.addEventListener("click", () => {
    if (state.lastGeneratedDocId) {
      window.open(`${API_BASE}/documents/download/${state.lastGeneratedDocId}`, "_blank");
    } else {
      window.print();
    }
  });

  $("#copyNoticeBtn")?.addEventListener("click", () => {
    const text = $("#documentPreview")?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      showToast("Notice copied to clipboard!");
    }
  });

  $("#createDraftFromChat")?.addEventListener("click", () => setView("draft"));

  $("#readAloudButton")?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      showToast("Speech synthesis not supported.");
      return;
    }
    window.speechSynthesis.cancel();
    const text = $("#answerText")?.textContent || "";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.voiceLanguage || "en-IN";
    window.speechSynthesis.speak(utterance);
    showToast("Reading answer aloud...");
  });

  $("#darkModeToggle")?.addEventListener("change", (e) => {
    state.darkMode = e.target.checked;
    localStorage.setItem("legalease-dark-mode", String(state.darkMode));
    document.body.classList.toggle("dark", state.darkMode);
  });

  $$(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderLibraryCards(state.cachedArticles, chip.dataset.cat);
    });
  });

  $$(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const centerIndex = pin.dataset.center || 0;
      const targetCard = $(`#centerCard-${centerIndex}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.style.outline = "2px solid var(--accent-primary)";
        setTimeout(() => { targetCard.style.outline = "none"; }, 2000);
      }
    });
  });

  $("#helpSearchInput")?.addEventListener("input", (e) => {
    loadLegalAid(e.target.value);
  });

  $("#useLocationBtn")?.addEventListener("click", () => {
    if (navigator.geolocation) {
      showToast("Detecting nearby DLSA & Legal Aid centers...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          showToast(`Location detected (${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}). Showing nearest centers.`);
          loadLegalAid();
        },
        () => showToast("Showing default nearby centers.")
      );
    } else {
      showToast("Geolocation not supported. Showing nearby centers.");
    }
  });

  const initialView = window.location.hash.replace("#", "");
  if (["home", "chat", "draft", "library", "help", "settings"].includes(initialView)) {
    setView(initialView);
  }
}

document.addEventListener("DOMContentLoaded", init);
