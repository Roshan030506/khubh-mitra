// LegalEase AI - Indian Legal Knowledge Base & RAG Retrieval Engine Corpus
// Version: 3.0 - Multilingual Native Grounded Output (HI, TA, BN, MR, TE, KN, ML, EN)

const legalCorpus = [
  {
    id: "labor-001",
    category: "Labor",
    title: "Non-Payment or Withholding of Salary by Employer",
    act: "Payment of Wages Act, 1936 / Industrial Disputes Act, 1947",
    section: "Section 5 & 15 / Section 33C",
    jurisdiction: "Central & State Labor Laws",
    summary: {
      en: "Under Section 5 of the Payment of Wages Act, wages must be paid before the expiry of the 7th or 10th day after the wage period. Withholding salary without statutory cause is illegal.",
      hi: "पेमेंट ऑफ वेज एक्ट की धारा 5 के तहत, वेतन अवधि समाप्त होने के 7 या 10 दिनों के भीतर वेतन का भुगतान किया जाना अनिवार्य है। बिना किसी कानूनी कारण के वेतन रोकना अवैध है।",
      ta: "ஊதியக் கொடுப்பனவுச் சட்டத்தின் பிரிவு 5 இன் கீழ், ஊதியக் காலம் முடிந்த 7 அல்லது 10 நாட்களுக்குள் ஊதியம் வழங்கப்பட வேண்டும். ஊதியத்தைப் பிடித்து வைப்பது சட்டவிரோதமானது.",
      bn: "পেমেন্ট অফ ওয়েজেস অ্যাক্টের ধারা ৫ অনুসারে, মজুরি শেষ হওয়ার ৭ বা ১০ দিনের মধ্যে বেতন দিতে হবে। আইনি কারণ ছাড়া বেতন আটকে রাখা বেআইনি।",
      mr: "वेतन भरणा कायद्याच्या कलम ५ नुसार, वेतन कालावधी संपल्यानंतर ७ किंवा १० दिवसांच्या आत वेतन देणे बंधनकारक आहे. वेतन रोखून ठेवणे बेकायदेशीर आहे.",
      te: "వేతన చెల్లింపు చట్టం సెక్షన్ 5 ప్రకారం, వేతన కాలం పూర్తయిన 7 లేదా 10 రోజులలోపు జీతం చెల్లించాలి. చట్టబద్ధమైన కారణం లేకుండా జీతం ఆపడం చట్టవిరుద్ధం.",
      kn: "ವೇತನ ಪಾವತಿ ಕಾಯಿದೆಯ ಸೆಕ್ಷನ್ 5 ರ ಅಡಿಯಲ್ಲಿ, ವೇತನ ಅವಧಿ ಮುಗಿದ 7 ಅಥವಾ 10 ದಿನಗಳ ಒಳಗೆ ವೇತನವನ್ನು ಪಾವತಿಸಬೇಕು. ವೇತನ ತಡೆಹಿಡಿಯುವುದು ಕಾನೂನುಬಾಹಿರ.",
      ml: "വേതന വിതരണ നിയമത്തിലെ സെക്ഷൻ 5 അനുസരിച്ച്, വേതന കാലാവധി കഴിഞ്ഞ് 7 അല്ലെങ്കിൽ 10 ദിവസത്തിനകം ശമ്പളം നൽകണം. ശമ്പളം തടഞ്ഞുവെക്കുന്നത് നിയമവിരുദ്ധമാണ്."
    },
    actionable_steps: {
      en: [
        "Send a formal written Legal Demand Notice to the employer requesting payment within 15 days.",
        "File a complaint before the Labor Commissioner under Section 15 of Payment of Wages Act.",
        "Preserve salary slips, bank statements, appointment letter, and emails."
      ],
      hi: [
        "नियोक्ता को 15 दिनों के भीतर भुगतान का अनुरोध करते हुए एक औपचारिक लिखित कानूनी मांग नोटिस भेजें।",
        "वेतन भुगतान अधिनियम की धारा 15 के तहत श्रम आयुक्त के समक्ष शिकायत दर्ज करें।",
        "वेतन पर्ची, बैंक विवरण, नियुक्ति पत्र और आधिकारिक ईमेल सुरक्षित रखें।"
      ],
      ta: [
        "15 நாட்களுக்குள் ஊதியம் வழங்குமாறு நிறுவனத்திற்கு சட்டப்பூர்வ அறிவிப்பு அனுப்பவும்.",
        "தொழிலாளர் ஆணையரிடம் பிரிவு 15 இன் கீழ் புகார் அளிக்கவும்.",
        "சம்பளப் பட்டியல், வங்கி கணக்கு விவரங்கள் மற்றும் மின்னஞ்சல்களைச் சேமிக்கவும்."
      ],
      bn: [
        "১৫ দিনের মধ্যে বকেয়া বেতনের দাবি জানিয়ে নিয়োগকর্তাকে আইনি নোটিশ পাঠান।",
        "লেবার কমিশনারের কাছে ধারা ১৫ এর অধীনে অভিযোগ দায়ের করুন।",
        "পে স্লিপ, ব্যাংক স্টেটমেন্ট এবং নিয়োগপত্র সংরক্ষণ করুন।"
      ],
      mr: [
        "१५ दिवसांच्या आत पगार देण्याची मागणी करणारी कायदेशीर नोटीस मालकाला पाठवा.",
        "कामगार आयुक्तांकडे कलम १५ खाली तक्रार नोंदवा.",
        "पगार स्लिप, बँक स्टेटमेंट आणि ईमेल पुरावे जतन करा."
      ],
      te: [
        "15 రోజుల్లోపు బకాయిలు చెల్లించాలని యాజమాన్యానికి లీగల్ నోటీసు పంపండి.",
        "లేబర్ కమిషనర్‌కు సెక్షన్ 15 కింద ఫిర్యాదు చేయండి.",
        "జీతం స్లిప్పులు, బ్యాంక్ స్టేట్‌మెంట్లు భద్రపరచండి."
      ],
      kn: [
        "15 ದಿನಗಳಲ್ಲಿ ವೇತನ ಪಾವತಿಸಲು ಮಾಲೀಕರಿಗೆ ಲಿಖಿತ ಕಾನೂನು ನೋಟಿಸ್ ಕಳುಹಿಸಿ.",
        "ಕಾರ್ಮಿಕ ಆಯುಕ್ತರಿಗೆ ಸೆಕ್ಷನ್ 15 ರ ಅಡಿಯಲ್ಲಿ ದೂರು ನೀಡಿ.",
        "ವೇತನದ ಸ್ಲಿಪ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ದಾಖಲೆಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ."
      ],
      ml: [
        "15 ദിവസത്തിനകം ശമ്പളം നൽകാൻ ആവശ്യപ്പെട്ട് തൊഴിലുടമയ്ക്ക് ലീഗൽ നോട്ടീസ് അയക്കുക.",
        "ലേബർ കമ്മീഷണർക്ക് സെക്ഷൻ 15 പ്രകാരം പരാതി നൽകുക.",
        "ശമ്പള സ്ലിപ്പുകളും ബാങ്ക് രേഖകളും സൂക്ഷിക്കുക."
      ]
    },
    confidence: 0.95,
    draft_type: "salary_notice",
    keywords: ["salary", "employer", "unpaid", "wages", "withhold", "labor", "job", "paycheck", "company", "boss", "pay", "money", "वेतन", "पगार", "சம்பளம்", "বেতন", "జీతం", "ವೇತನ", "ശമ്പളം"]
  },
  {
    id: "consumer-001",
    category: "Consumer",
    title: "Refusal of Refund or Replacement for Defective Product / Service",
    act: "Consumer Protection Act, 2019",
    section: "Section 2(7), Section 35",
    jurisdiction: "Central Consumer Protection Authority",
    summary: {
      en: "Sellers and service providers are legally bound to deliver goods free of defects. Refusing a refund for defective goods constitutes an 'Unfair Trade Practice' under Consumer Protection Act 2019.",
      hi: "विक्रेता दोषमुक्त सामान देने के लिए कानूनी रूप से बाध्य हैं। खराब सामान के लिए रिफंड से इंकार करना उपभोक्ता संरक्षण अधिनियम 2019 के तहत 'अनुचित व्यापार व्यवहार' है।",
      ta: "பழுதடைந்த பொருட்களுக்கு பணத்தைத் திரும்பத் தர மறுப்பது நுகர்வோர் பாதுகாப்புச் சட்டத்தின் கீழ் சட்டவிரோதமானது.",
      bn: "ত্রুটিপূর্ণ পণ্যের জন্য রিফান্ড দিতে অস্বীকার করা ভোক্তা অধিকার সংরক্ষণ আইন ২০১৯ এর অধীনে বেআইনি।",
      mr: "दोषयुक्त वस्तूंचा परतावा (रिंफंड) नाकारणे हे ग्राहक संरक्षण कायदा २०१९ नुसार बेकायदेशीर आहे.",
      te: "లోపభూయిష్ట వస్తువులకు రీఫండ్ నిరాకరించడం వినియోగదారుల రక్షణ చట్టం 2019 ప్రకారం నేరం.",
      kn: "ದೋಷಪೂರಿತ ವಸ್ತುವಿಗೆ ಹಣ ಮರುಪಾವತಿಸಲು ನಿರಾಕರಿಸುವುದು ಗ್ರಾಹಕರ ರಕ್ಷಣೆ ಕಾಯಿದೆಯಡಿ ಅಪರಾಧ.",
      ml: "തകരാറുള്ള ഉൽപ്പന്നങ്ങൾക്ക് റീഫണ്ട് നൽകാതിരിക്കുന്നത് ഉപഭോക്തൃ സംരക്ഷണ നിയമപ്രകാരം കുറ്റകരമാണ്."
    },
    actionable_steps: {
      en: [
        "Send a written notice to the seller demanding replacement or full refund.",
        "File a grievance on National Consumer Helpline (NCH) at 1915 or consumeraffairs.nic.in.",
        "Submit an e-daakhil complaint before the District Consumer Commission."
      ],
      hi: [
        "बदलाव या पूर्ण रिफंड की मांग करते हुए विक्रेता को लिखित नोटिस भेजें।",
        "राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) 1915 पर या ऑनलाइन शिकायत दर्ज करें।",
        "जिला उपभोक्ता आयोग के समक्ष ई-दाखिल शिकायत दर्ज करें।"
      ],
      ta: [
        "பணத்தைத் திரும்பப்பெற விற்பனையாளருக்கு எழுத்துப்பூர்வ அறிவிப்பு அனுப்பவும்.",
        "தேசிய நுகர்வோர் உதவி எண் 1915 இல் புகார் பதிவு செய்யவும்."
      ],
      bn: [
        "পণ্য পরিবর্তন বা রিফান্ডের জন্য বিক্রেতাকে লিখিত নোটিশ পাঠান।",
        "জাতীয় ভোক্তা হেল্পলাইন ১৯১৫-এ অভিযোগ দায়ের করুন।"
      ],
      mr: [
        "वस्तू बदलून मिळण्यासाठी किंवा रिफंडसाठी विक्रेत्याला नोटीस पाठवा.",
        "राष्ट्रीय ग्राहक हेल्पलाइन १९१५ वर तक्रार नोंदवा."
      ],
      te: [
        "రీఫండ్ కోసం విక్రేతకు రాతపూర్వక నోటీసు పంపండి.",
        "జాతీయ వినియోగదారుల హెల్ప్‌లైన్ 1915లో ఫిర్యాదు చేయండి."
      ],
      kn: [
        "ಹಣ ಮರುಪಾವತಿಗೆ ಮಾರಾಟಗಾರರಿಗೆ ನೋಟಿಸ್ ಕಳುಹಿಸಿ.",
        "ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕ ಸಹಾಯವಾಣಿ 1915 ರಲ್ಲಿ ದೂರು ನೀಡಿ."
      ],
      ml: [
        "റീഫണ്ടിനായി വ്യാപാരിക്ക് രേഖാമൂലം നോട്ടീസ് നൽകുക.",
        "ദേശീയ ഉപഭോക്തൃ ഹെൽപ്പ് ലൈനിൽ (1915) പരാതിപ്പെടുക."
      ]
    },
    confidence: 0.96,
    draft_type: "consumer_complaint",
    keywords: ["refund", "seller", "defective", "product", "replacement", "warranty", "consumer", "shopping", "online order", " store", "रिफंड", "उपभोक्ता", "பொருள்", "ফেরত"]
  },
  {
    id: "tenancy-001",
    category: "Tenancy",
    title: "Arbitrary Eviction & Sudden Lockout by Landlord",
    act: "Model Tenancy Act, 2021",
    section: "Section 21 & Section 19",
    jurisdiction: "State Rent Authority / Rent Tribunal",
    summary: {
      en: "A landlord cannot evict a tenant during tenancy without an order from the Rent Authority. Cutting off essential services (water, electricity) is punishable by law.",
      hi: "मकान मालिक बिना किराया प्राधिकरण के आदेश के किरायेदार को बेदखल नहीं कर सकता। बिजली-पानी जैसी आवश्यक सेवाएं काटना गैरकानूनी है।",
      ta: "வாடகை அதிகார அமைப்பின் உத்தரவு இன்றி வீட்டு உரிமையாளர் வாடகைாதாரரை வெளியேற்ற முடியாது. குடிநீர், மின்சாரத்தை துண்டிப்பது குற்றமாகும்.",
      bn: "রেন্ট অথরিটির আদেশ ছাড়া বাড়িওয়ালা ভাড়াটিয়াকে উচ্ছেদ করতে পারেন না। বিদ্যুৎ-জল সংযোগ বিচ্ছিন্ন করা বেআইনি।",
      mr: "भाडे प्राधिकरणाच्या आदेशाशिवाय घरमालक भाडेकरूला बाहेर काढू शकत नाही. पाणी व वीज पुरवठा खंडित करणे गुन्हा आहे.",
      te: "రెంట్ అథారిటీ ఉత్తర్వులు లేకుండా ఇంటి యజమాని అద్దెదారుని ఖాళీ చేయించకూడదు. విద్యుత్, నీటి సరఫరా నిలిపివేయడం నేరం.",
      kn: "ಬಾಡಿಗೆ ಪ್ರಾಧಿಕಾರದ ಆದೇಶವಿಲ್ಲದೆ ಮನೆ ಮಾಲೀಕರು ಬಾಡಿಗೆದಾರರನ್ನು ಖಾಲಿ ಮಾಡಿಸುವಂತಿಲ್ಲ.",
      ml: "റെന്റ് അതോറിറ്റിയുടെ ഉത്തരവില്ലാതെ ഉടമയ്ക്ക് വാടകക്കാരനെ ഒഴിപ്പിക്കാനാവില്ല. വൈദ്യുതി, കുടിവെള്ളം തടയുന്നത് കുറ്റകരമാണ്."
    },
    actionable_steps: {
      en: [
        "Keep rent payment receipts, lease agreement, and utility bills.",
        "Issue a legal notice citing statutory tenant protections against arbitrary eviction.",
        "Approach the Rent Authority / Magistrate immediately if utilities are disconnected."
      ],
      hi: [
        "किराया रसीद, किराया समझौता और बिल सुरक्षित रखें।",
        "अवैध बेदखली के खिलाफ कानूनी नोटिस भेजें।",
        "सेवाएं कटने पर रेंट अथॉरिटी/मैजिस्ट्रेट के समक्ष आवेदन करें।"
      ],
      ta: [
        "வாடகை ரசீதுகள் மற்றும் ஒப்பந்தப் பத்திரத்தை பத்திரமாக வைக்கவும்.",
        "சட்டப்பூர்வ அறிவிப்பை உரிமையாளருக்கு அனுப்பவும்."
      ],
      bn: [
        "ভাড়ার রসিদ ও চুক্তিপত্র সংরক্ষণ করুন।",
        "আইনি নোটিশ পাঠাইয়া বেআইনি উচ্ছেদ রোধ করুন।"
      ],
      mr: [
        "भाडे पावती व करारनामा जतन करा.",
        "बेकायदेशीर हकालपट्टीविरोधात नोटीस पाठवा."
      ],
      te: [
        "అద్దె రశీదులు, అగ్రిమెంట్ పత్రాలు భద్రపరచండి.",
        "చట్టపరమైన నోటీసు పంపండి."
      ],
      kn: [
        "ಬಾಡಿಗೆ ರಸೀದಿಗಳನ್ನು ಭದ್ರಪಡಿಸಿಕೊಳ್ಳಿ.",
        "ಮಾಲೀಕರಿಗೆ ಕಾನೂನು ನೋಟಿಸ್ ನೀಡಿ."
      ],
      ml: [
        "വാടക രസീതുകളും കരാറും സൂക്ഷിക്കുക.",
        "അനധികൃത ഒഴിപ്പിക്കലിനെതിരെ ലീഗൽ നോട്ടീസ് അയക്കുക."
      ]
    },
    confidence: 0.93,
    draft_type: "tenant_notice",
    keywords: ["eviction", "landlord", "rent", "tenant", "evict", "house", "flat", "rent control", "deposit", "किराया", "मकान मालिक", "வாடகை"]
  },
  {
    id: "rti-001",
    category: "RTI",
    title: "Filing a Right to Information (RTI) Application",
    act: "Right to Information Act, 2005",
    section: "Section 6(1) & Section 7(1)",
    jurisdiction: "Public Information Officers (PIO)",
    summary: {
      en: "Any Indian citizen can request public government records. The Public Information Officer (PIO) must respond within 30 days.",
      hi: "भारत का कोई भी नागरिक सरकारी रिकॉर्ड मांग सकता है। जन सूचना अधिकारी (PIO) को 30 दिनों के भीतर जवाब देना अनिवार्य है।",
      ta: "இந்தியக் குடிமகன் எவரும் அரசு ஆவணங்களைக் கோரலாம். 30 நாட்களுக்குள் தகவல் வழங்கப்பட வேண்டும்.",
      bn: "যেকোনো ভারতীয় নাগরিক সরকারি তথ্যের আবেদন করতে পারেন। ৩০ দিনের মধ্যে উত্তর দেওয়া বাধ্যতামূলক।",
      mr: "कोणताही भारतीय नागरिक सरकारी माहिती मागवू शकतो. माहिती अधिकाऱ्याने ३० दिवसांत माहिती देणे बंधनकारक आहे.",
      te: "ఏ భారతీయ పౌరుడైనా ప్రభుత్వ సమాచారాన్ని కోరవచ్చు. 30 రోజుల్లో సమాధానం ఇవ్వాలి.",
      kn: "ಯಾವುದೇ ಭಾರತೀಯ ಪ್ರಜೆ ಸರ್ಕಾರಿ ಮಾಹಿತಿಯನ್ನು ಕೋರಬಹುದು. 30 ದಿನಗಳಲ್ಲಿ ಮಾಹಿತಿ ನೀಡಬೇಕು.",
      ml: "ഏതൊരു ഇന്ത്യൻ പൗരനും സർക്കാർ രേഖകൾ ആവശ്യപ്പെടാം. 30 ദിവസത്തിനുള്ളിൽ മറുപടി നൽകണം."
    },
    actionable_steps: {
      en: [
        "Draft a focused RTI application specifying exact records sought.",
        "Submit online at rtionline.gov.in or pay ₹10 fee stamp.",
        "If unaddressed within 30 days, file First Appeal under Section 19(1)."
      ],
      hi: [
        "स्पष्ट RTI आवेदन तैयार करें।",
        "rtionline.gov.in पर ऑनलाइन जमा करें या ₹10 शुल्क दें।",
        "30 दिनों में जवाब न मिलने पर प्रथम अपील दर्ज करें।"
      ],
      ta: [
        "தெளிவான தகவல் அறியும் உரிமை விண்ணப்பத்தை எழுதவும்.",
        "30 நாட்களில் தகவல் வராவிட்டால் மேல்முறையீடு செய்யவும்."
      ],
      bn: [
        "নির্দিষ্ট তথ্যের আবেদন প্রস্তুত করুন।",
        "৩০ দিনে উত্তর না পেলে প্রথম আপিল করুন।"
      ],
      mr: [
        "आरटीआय अर्ज तयार करून जमा करा.",
        "३० दिवसांत माहिती न मिळाल्यास प्रथम अपील करा."
      ],
      te: [
        "సమాచార హక్కు దరఖాస్తును తయారు చేసి సమర్పించండి.",
        "30 రోజుల్లో రాకపోతే మొదటి అప్పీల్ చేయండి."
      ],
      kn: [
        "ಆರ್‌ಟಿಐ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.",
        "30 ದಿನದಲ್ಲಿ ಮಾಹಿತಿ ಬಾರದಿದ್ದರೆ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿ."
      ],
      ml: [
        "വിവരകാശ അപേക്ഷ സമർപ്പിക്കുക.",
        "30 ദിവസത്തിനുള്ളിൽ മറുപടി ലഭിച്ചില്ലെങ്കിൽ അപ്പീൽ നൽകുക."
      ]
    },
    confidence: 0.97,
    draft_type: "rti_application",
    keywords: ["rti", "right to information", "government", "pio", "file rti", "public officer", "scheme", "pension", "आरटीआई", "தகவல் உரிமை"]
  },
  {
    id: "safety-001",
    category: "Safety",
    title: "Insult to Modesty of a Woman / Harassment & Intimidation",
    act: "Bharatiya Nyaya Sanhita (BNS), 2023",
    section: "BNS Section 79 (IPC 509)",
    jurisdiction: "Police Station / Magistrate Court",
    summary: {
      en: "Intending to insult the modesty of any woman by words, gestures, or intruding upon privacy is a cognizable criminal offense under BNS Section 79.",
      hi: "शब्दों, इशारों या व्यवहार से किसी महिला की गरिमा को ठेस पहुंचाना BNS धारा 79 के तहत संज्ञेय अपराध है।",
      ta: "ஒரு பெண்ணின் மரியாதையைக் கெடுக்கும் வகையில் பேசுவது அல்லது செயல்படுவது BNS பிரிவு 79 இன் கீழ் குற்றமாகும்.",
      bn: "কোনো নারীর শালীনতাহানি করা ভারতীয় দণ্ডবিধি (BNS ধারা ৭৯) অনুসারে শাস্তিযোগ্য অপরাধ।",
      mr: "महिलांच्या आदराला ठेच पोहोचवणारे वर्तन BNS कलम ७९ अंतर्गत दखलपात्र गुन्हा आहे.",
      te: "మహిళల గౌరవానికి భంగం కలిగించడం BNS సెక్షన్ 79 కింద శిక్షార్హమైన నేరం.",
      kn: "ಮಹಿಳೆಯರ ಗೌರವಕ್ಕೆ ಧಕ್ಕೆ ತರುವುದು BNS ಸೆಕ್ಷನ್ 79 ರ ಅಡಿಯಲ್ಲಿ ಅಪರಾಧ.",
      ml: "സ്ത്രീകളുടെ ആത്മാഭിമാനത്തെ ചോദ്യം ചെയ്യുന്നത് BNS സെക്ഷൻ 79 പ്രകാരം കുറ്റകരമാണ്."
    },
    actionable_steps: {
      en: [
        "Record audio/video proof or preserve digital messages.",
        "File a complaint at nearest police station or file a Zero FIR.",
        "Call National Women Helpline 1091 or Cybercrime Helpline 1930."
      ],
      hi: [
        "ऑडियो/वीडियो या संदेश सुरक्षित रखें।",
        "नजदीकी पुलिस स्टेशन में शिकायत या जीरो FIR दर्ज कराएं।",
        "महिला हेल्पलाइन 1091 या साइबर अपराध 1930 पर कॉल करें।"
      ],
      ta: [
        "ஆதாரங்களைச் சேமித்து காவல் நிலையத்தில் புகார் அளிக்கவும்.",
        "பெண்கள் உதவி எண் 1091 ஐ அழைக்கவும்."
      ],
      bn: [
        "প্রমাণ সংরক্ষণ করে থানায় লিখিত অভিযোগ জানান।",
        "মহিলা হেল্পলাইন ১০৯১-এ কল করুন।"
      ],
      mr: [
        "पुरावे जतन करून पोलीस ठाण्यात तक्रार नोंदवा.",
        "महिला हेल्पलाइन १०९१ वर कॉल करा."
      ],
      te: [
        "ఆధారాలు భద్రపరచి పోలీసులకు ఫిర్యాదు చేయండి.",
        "మహిళా హెల్ప్‌లైన్ 1091 కు కాల్ చేయండి."
      ],
      kn: [
        "ಸಾಕ್ಷ್ಯಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ದೂರು ನೀಡಿ.",
        "ಮಹಿಳಾ ಸಹಾಯವಾಣಿ 1091 ಕ್ಕೆ ಕರೆ ಮಾಡಿ."
      ],
      ml: [
        "തെളിവുകൾ സൂക്ഷിച്ച് പോലീസിൽ പരാതി നൽകുക.",
        "വനിതാ ഹെൽപ്പ് ലൈനിൽ (1091) വിളിക്കുക."
      ]
    },
    confidence: 0.96,
    draft_type: "general_notice",
    keywords: ["modesty", "harassment", "woman", "safety", "ipc 509", "bns 79", "stalking", "police", "complaint", "fir", "महिला", "सुरक्षा", "பெண்கள்"]
  }
];

const langCodes = ["en", "hi", "ta", "bn", "mr", "te", "kn", "ml"];

function allLanguages(textByLanguage) {
  return Object.fromEntries(langCodes.map((code) => [code, textByLanguage[code] || textByLanguage.en]));
}

function allLanguageSteps(stepsByLanguage) {
  return Object.fromEntries(langCodes.map((code) => [code, stepsByLanguage[code] || stepsByLanguage.en]));
}

legalCorpus.push(
  {
    id: "labor-002",
    category: "Labor",
    title: "Maternity Benefit, Pregnancy Leave, and Job Protection",
    act: "Maternity Benefit Act, 1961",
    section: "Sections 5, 11, 12",
    jurisdiction: "Central & State Labor Authorities",
    summary: allLanguages({
      en: "Eligible women employees are entitled to paid maternity benefit and protection from dismissal because of pregnancy. Employers must not deny lawful maternity leave or related benefits.",
      hi: "योग्य महिला कर्मचारियों को सवेतन मातृत्व लाभ और गर्भावस्था के कारण नौकरी से निकाले जाने से संरक्षण मिलता है।",
      ta: "தகுதியுள்ள பெண் பணியாளர்களுக்கு சம்பளத்துடன் மகப்பேறு நன்மையும் வேலை பாதுகாப்பும் கிடைக்கும்.",
      bn: "যোগ্য মহিলা কর্মীরা মাতৃত্বকালীন বেতনসহ ছুটি এবং চাকরি সুরক্ষার অধিকারী।",
      mr: "पात्र महिला कर्मचाऱ्यांना सवेतन प्रसूती लाभ आणि नोकरीचे संरक्षण मिळते.",
      te: "అర్హులైన మహిళా ఉద్యోగులకు చెల్లింపు ప్రసూతి ప్రయోజనం మరియు ఉద్యోగ రక్షణ ఉంటుంది.",
      kn: "ಅರ್ಹ ಮಹಿಳಾ ಉದ್ಯೋಗಿಗಳಿಗೆ ವೇತನসহಿತ ಮಾತೃತ್ವ ಲಾಭ ಮತ್ತು ಉದ್ಯೋಗ ರಕ್ಷಣೆ ಇದೆ.",
      ml: "അർഹരായ വനിതാ ജീവനക്കാർക്ക് ശമ്പളത്തോടെയുള്ള പ്രസവാനുകൂല്യവും ജോലി സംരക്ഷണവും ലഭിക്കും."
    }),
    actionable_steps: allLanguageSteps({
      en: ["Send a written request for maternity benefit with medical proof.", "Preserve appointment records, salary slips, and denial messages.", "Approach the labor department if benefits are refused."],
      hi: ["चिकित्सा प्रमाण के साथ लिखित आवेदन दें।", "नियुक्ति पत्र, वेतन पर्ची और इनकार के संदेश सुरक्षित रखें।", "लाभ न मिलने पर श्रम विभाग से संपर्क करें।"]
    }),
    confidence: 0.9,
    draft_type: "general_notice",
    keywords: ["maternity", "pregnancy", "pregnant", "leave", "dismissal", "woman employee", "benefit", "गर्भावस्था", "मातृत्व"]
  },
  {
    id: "labor-003",
    category: "Labor",
    title: "Provident Fund, Gratuity, and Full-and-Final Settlement Delay",
    act: "Employees Provident Funds Act, 1952 / Payment of Gratuity Act, 1972",
    section: "EPF claims / Gratuity Section 7",
    jurisdiction: "EPFO / Controlling Authority under Gratuity Act",
    summary: allLanguages({
      en: "Employees may claim provident fund dues and gratuity when eligibility conditions are met. Delayed settlement can be challenged before EPFO or the gratuity controlling authority.",
      hi: "योग्यता पूरी होने पर कर्मचारी PF और ग्रेच्युटी का दावा कर सकते हैं। देरी होने पर EPFO या नियंत्रक प्राधिकारी से शिकायत की जा सकती है."
    }),
    actionable_steps: allLanguageSteps({
      en: ["Check UAN/EPFO records and employer contributions.", "Send a written settlement request to HR/payroll.", "Escalate to EPFO grievance portal or gratuity controlling authority."],
      hi: ["UAN/EPFO रिकॉर्ड और योगदान जांचें।", "HR/Payroll को लिखित अनुरोध भेजें।", "EPFO grievance portal या ग्रेच्युटी प्राधिकारी से शिकायत करें।"]
    }),
    confidence: 0.88,
    draft_type: "general_notice",
    keywords: ["pf", "provident fund", "epfo", "gratuity", "full and final", "settlement", "uan", "contribution", "retirement", "पीएफ", "ग्रेच्युटी"]
  },
  {
    id: "consumer-002",
    category: "Consumer",
    title: "Online Scam, Digital Payment Fraud, or Unauthorized Transaction",
    act: "Information Technology Act, 2000 / RBI Customer Protection Directions",
    section: "Cybercrime reporting and bank fraud dispute process",
    jurisdiction: "Cybercrime Portal / Bank Nodal Officer",
    summary: allLanguages({
      en: "For unauthorized digital transactions or online fraud, quick reporting to the bank and cybercrime helpline can improve recovery chances. Keep transaction IDs and screenshots.",
      hi: "अनधिकृत डिजिटल लेनदेन या ऑनलाइन धोखाधड़ी में बैंक और साइबर हेल्पलाइन को तुरंत रिपोर्ट करना जरूरी है।"
    }),
    actionable_steps: allLanguageSteps({
      en: ["Call 1930 or report at cybercrime.gov.in immediately.", "Inform the bank and block the account/card/UPI if needed.", "Preserve screenshots, transaction IDs, and complaint acknowledgement."],
      hi: ["तुरंत 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट करें।", "बैंक को सूचित करें और जरूरत हो तो खाता/कार्ड/UPI ब्लॉक करें।", "स्क्रीनशॉट और लेनदेन ID सुरक्षित रखें।"]
    }),
    confidence: 0.87,
    draft_type: "general_notice",
    keywords: ["cyber", "fraud", "upi", "unauthorized transaction", "scam", "bank", "digital payment", "1930", "phishing", "otp fraud", "धोखाधड़ी"]
  },
  {
    id: "safety-002",
    category: "Safety",
    title: "Domestic Violence, Protection Order, and Shelter Support",
    act: "Protection of Women from Domestic Violence Act, 2005",
    section: "Sections 12, 18, 19, 20",
    jurisdiction: "Protection Officer / Magistrate Court",
    summary: allLanguages({
      en: "Domestic violence law can provide protection orders, residence orders, monetary relief, and shelter support. Urgent safety risks should be reported immediately.",
      hi: "घरेलू हिंसा कानून सुरक्षा आदेश, निवास आदेश, आर्थिक राहत और आश्रय सहायता प्रदान कर सकता है।"
    }),
    actionable_steps: allLanguageSteps({
      en: ["Call emergency services if there is immediate danger.", "Contact a Protection Officer, police station, or women's helpline.", "Keep medical records, messages, photos, and witness details."],
      hi: ["तत्काल खतरे में आपात सेवा से संपर्क करें।", "Protection Officer, पुलिस या महिला हेल्पलाइन से संपर्क करें।", "मेडिकल रिकॉर्ड, संदेश और फोटो सुरक्षित रखें।"]
    }),
    confidence: 0.9,
    draft_type: "general_notice",
    keywords: ["domestic violence", "abuse", "husband", "protection order", "shelter", "women helpline", "violence", "घरेलू हिंसा"]
  },
  {
    id: "legal-aid-001",
    category: "Legal Aid",
    title: "Eligibility for Free Legal Aid",
    act: "Legal Services Authorities Act, 1987",
    section: "Section 12",
    jurisdiction: "NALSA / SLSA / DLSA",
    summary: allLanguages({
      en: "Certain groups, including women, children, SC/ST persons, victims of trafficking, persons in custody, and low-income persons, may be eligible for free legal services.",
      hi: "महिलाएं, बच्चे, SC/ST व्यक्ति, तस्करी पीड़ित, हिरासत में व्यक्ति और कम आय वाले लोग मुफ्त कानूनी सहायता के पात्र हो सकते हैं।"
    }),
    actionable_steps: allLanguageSteps({
      en: ["Call 15100 or visit the nearest DLSA office.", "Carry identity proof and documents related to the dispute.", "Ask for a legal aid application and diary/acknowledgement number."],
      hi: ["15100 पर कॉल करें या नजदीकी DLSA कार्यालय जाएं।", "पहचान पत्र और विवाद से जुड़े दस्तावेज ले जाएं।", "कानूनी सहायता आवेदन और पावती नंबर मांगें।"]
    }),
    confidence: 0.92,
    draft_type: "general_notice",
    keywords: ["free legal aid", "dlsa", "nalsa", "slsa", "15100", "lawyer", "legal services", "गरीब", "मुफ्त कानूनी सहायता"]
  }
);

const languageNames = {
  en: "English",
  hi: "Hindi (हिन्दी)",
  ta: "Tamil (தமிழ்)",
  bn: "Bengali (বাংলা)",
  mr: "Marathi (मराठी)",
  te: "Telugu (తెలుగు)",
  kn: "Kannada (ಕನ್ನಡ)",
  ml: "Malayalam (മലയാളം)"
};

const synonymMap = {
  "harassed": "harassment",
  "stalked": "stalking",
  "fired": "termination",
  "sacked": "termination",
  "layoff": "retrenchment",
  "boss": "employer",
  "company": "employer",
  "money": "salary",
  "paycheck": "wages",
  "rent": "tenancy",
  "owner": "landlord",
  "deposit": "security deposit",
  "scam": "fraud",
  "fake": "fraud",
  "defective": "defect"
};

function normalizeQueryText(text) {
  if (!text) return "";
  let clean = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
  let words = clean.split(/\s+/).filter((w) => w.length > 1);
  let normalizedWords = words.map((w) => synonymMap[w] || w);
  return normalizedWords.join(" ");
}

function clampConfidence(value) {
  return Math.max(0.35, Math.min(0.97, Number(value.toFixed(2))));
}

function retrieveLegalKnowledge(queryText, topK = 3) {
  if (!queryText || typeof queryText !== "string" || queryText.trim().length < 2) {
    return {
      matches: [],
      queryIntent: "no_match",
      isUncertain: true
    };
  }

  const normalized = normalizeQueryText(queryText);
  const words = normalized.split(/\s+/).filter((w) => w.length > 1);
  const uniqueWords = new Set(words);

  const scored = legalCorpus.map((entry) => {
    let score = 0;
    const textBlob = `${entry.title} ${JSON.stringify(entry.summary)} ${entry.act} ${entry.keywords.join(" ")}`.toLowerCase();

    entry.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeQueryText(keyword);
      if (!normalizedKeyword) return;
      if (normalized === normalizedKeyword || normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 12 : 8;
      }
    });

    uniqueWords.forEach((w) => {
      if (entry.keywords.some((k) => {
        const keyword = normalizeQueryText(k);
        return keyword === w || keyword.includes(w) || w.includes(keyword);
      })) score += 6;
      if (textBlob.includes(w)) score += 2;
    });

    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topScore = scored[0]?.score || 0;

  if (topScore === 0) {
    return {
      matches: [],
      queryIntent: "uncertain",
      isUncertain: true,
      topMatch: null
    };
  }

  const bestMatches = scored.filter((s) => s.score > 0).map((s) => s.entry);
  const topMatch = bestMatches[0];
  const secondScore = scored[1]?.score || 0;
  const coverage = Math.min(1, topScore / Math.max(words.length * 8, 1));
  const margin = topScore > 0 ? (topScore - secondScore) / topScore : 0;
  const confidence = clampConfidence(0.42 + (coverage * 0.38) + (margin * 0.17));
  const isUncertain = confidence < 0.52;

  let intent = "info";
  if (normalized.includes("draft") || normalized.includes("notice") || normalized.includes("letter") || normalized.includes("application")) {
    intent = "draft";
  } else if (normalized.includes("help") || normalized.includes("lawyer") || normalized.includes("ngo") || normalized.includes("near me") || normalized.includes("helpline")) {
    intent = "escalate";
  }

  return {
    matches: bestMatches.slice(0, topK),
    queryIntent: intent,
    isUncertain,
    confidence,
    topMatch: isUncertain ? null : topMatch
  };
}

module.exports = {
  legalCorpus,
  languageNames,
  retrieveLegalKnowledge
};
