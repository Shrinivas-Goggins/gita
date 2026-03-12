import React, { createContext, ReactNode, useContext, useState } from "react";

export type Language =
  | "en"
  | "hi"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "ja"
  | "ko"
  | "zh"
  | "ar"
  | "bn"
  | "pa"
  | "te"
  | "mr"
  | "gu"
  | "kn"
  | "ml"
  | "ta"
  | "ur"
  | "th"
  | "vi"
  | "id"
  | "tl"
  | "pl"
  | "uk"
  | "tr"
  | "el"
  | "he"
  | "fa"
  | "af"
  | "sq"
  | "hy"
  | "az"
  | "be"
  | "bs"
  | "bg"
  | "ca"
  | "ceb"
  | "ny"
  | "zh-tw"
  | "co"
  | "hr"
  | "cs"
  | "da"
  | "et"
  | "fi"
  | "fy";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "Bhagavat Gita",
    "app.subtitle": "The Song of God",
    "language.select": "Select Language",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.spanish": "Español",
    "language.french": "Français",
    "chapters.title": "Chapters",
    "verses.title": "Verses",
    "home.description":
      "Explore the timeless wisdom of the Bhagavat Gita in your preferred language",
    "drawer.navigation": "Navigation",
    "drawer.chapters": "Chapters",
    "drawer.chapters_desc": "Explore all chapters",
    "drawer.favorites": "Favorites",
    "drawer.favorites_desc": "Your saved verses",
    "drawer.preferences": "Preferences",
    "drawer.language": "Language",
    "drawer.theme": "Theme",
    "drawer.support": "Support",
    "drawer.share": "Share App",
    "drawer.rate": "Rate App",
    "drawer.contact": "Contact Us",
    "drawer.about": "About",
    "drawer.description":
      "An ancient scripture guide with multi-language support",
    "theme.ancient": "Ancient",
    "theme.light": "Light",
    "theme.dark": "Dark",
  },
  hi: {
    "app.title": "भगवद् गीता",
    "app.subtitle": "भगवान का गीत",
    "language.select": "भाषा चुनें",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.spanish": "Español",
    "language.french": "Français",
    "chapters.title": "अध्याय",
    "verses.title": "श्लोक",
    "home.description":
      "अपनी पसंदीदा भाषा में भगवद् गीता के कालजयी ज्ञान का अन्वेषण करें",
    "drawer.navigation": "नेविगेशन",
    "drawer.chapters": "अध्याय",
    "drawer.chapters_desc": "सभी अध्यायों की खोज करें",
    "drawer.favorites": "पसंदीदा",
    "drawer.favorites_desc": "आपकी सहेजी गई श्लोक",
    "drawer.preferences": "प्राथमिकताएं",
    "drawer.language": "भाषा",
    "drawer.theme": "थीम",
    "drawer.support": "सहायता",
    "drawer.share": "ऐप साझा करें",
    "drawer.rate": "ऐप रेट करें",
    "drawer.contact": "हमसे संपर्क करें",
    "drawer.about": "परिचय",
    "drawer.description": "बहुभाषी समर्थन के साथ एक प्राचीन धर्मग्रंथ गाइड",
    "theme.ancient": "प्राचीन",
    "theme.light": "हल्का",
    "theme.dark": "गहरा",
  },
  es: {
    "app.title": "Bhagavat Gita",
    "app.subtitle": "La Canción de Dios",
    "language.select": "Seleccionar idioma",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.spanish": "Español",
    "language.french": "Français",
    "chapters.title": "Capítulos",
    "verses.title": "Versos",
    "home.description":
      "Explora la sabiduría eterna de la Bhagavat Gita en tu idioma preferido",
    "drawer.navigation": "Navegación",
    "drawer.chapters": "Capítulos",
    "drawer.chapters_desc": "Explorar todos los capítulos",
    "drawer.favorites": "Favoritos",
    "drawer.favorites_desc": "Tus versos guardados",
    "drawer.preferences": "Preferencias",
    "drawer.language": "Idioma",
    "drawer.theme": "Tema",
    "drawer.support": "Soporte",
    "drawer.share": "Compartir aplicación",
    "drawer.rate": "Calificar aplicación",
    "drawer.contact": "Contáctenos",
    "drawer.about": "Acerca de",
    "drawer.description":
      "Una guía de escrituras antiguas con soporte multilingüe",
    "theme.ancient": "Antiguo",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
  },
  fr: {
    "app.title": "Bhagavat Gita",
    "app.subtitle": "La Chanson de Dieu",
    "language.select": "Sélectionner la langue",
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.spanish": "Español",
    "language.french": "Français",
    "chapters.title": "Chapitres",
    "verses.title": "Versets",
    "home.description":
      "Explorez la sagesse éternelle de la Bhagavat Gita dans votre langue préférée",
    "drawer.navigation": "Navigation",
    "drawer.chapters": "Chapitres",
    "drawer.chapters_desc": "Explorer tous les chapitres",
    "drawer.favorites": "Favoris",
    "drawer.favorites_desc": "Vos versets enregistrés",
    "drawer.preferences": "Préférences",
    "drawer.language": "Langue",
    "drawer.theme": "Thème",
    "drawer.support": "Support",
    "drawer.share": "Partager l'application",
    "drawer.rate": "Évaluer l'application",
    "drawer.contact": "Nous contacter",
    "drawer.about": "À propos",
    "drawer.description":
      "Un guide des écritures anciennes avec support multilingue",
    "theme.ancient": "Ancien",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
  },
  de: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Das Lied Gottes",
    "language.select": "Sprache wählen",
    "chapters.title": "Kapitel",
    "verses.title": "Verse",
    "home.description":
      "Erkunden Sie die zeitlose Weisheit der Bhagavad Gita in Ihrer bevorzugten Sprache",
  },
  it: {
    "app.title": "Bhagavat Gita",
    "app.subtitle": "Il Canto di Dio",
    "language.select": "Seleziona lingua",
    "chapters.title": "Capitoli",
    "verses.title": "Versi",
    "home.description":
      "Esplora la saggezza eterna della Bhagavat Gita nella tua lingua preferita",
  },
  pt: {
    "app.title": "Bhagavat Gita",
    "app.subtitle": "A Canção de Deus",
    "language.select": "Selecione Idioma",
    "chapters.title": "Capítulos",
    "verses.title": "Versos",
    "home.description":
      "Explore a sabedoria eterna da Bhagavat Gita em seu idioma preferido",
  },
  ru: {
    "app.title": "Бхагавад-Гита",
    "app.subtitle": "Песнь Бога",
    "language.select": "Выберите язык",
    "chapters.title": "Главы",
    "verses.title": "Стихи",
    "home.description":
      "Исследуйте вечную мудрость Бхагавад-Гиты на предпочитаемом вами языке",
  },
  ja: {
    "app.title": "バガヴァッド・ギーター",
    "app.subtitle": "神の歌",
    "language.select": "言語を選択",
    "chapters.title": "章",
    "verses.title": "詩節",
    "home.description":
      "お好みの言語でバガヴァッド・ギーターの永遠の知恵を探索してください",
  },
  ko: {
    "app.title": "바가바드 기타",
    "app.subtitle": "신의 노래",
    "language.select": "언어 선택",
    "chapters.title": "장",
    "verses.title": "절",
    "home.description":
      "선호하는 언어로 바가바드 기타의 영원한 지혜를 탐색하세요",
  },
  zh: {
    "app.title": "薄伽梵歌",
    "app.subtitle": "上帝之歌",
    "language.select": "选择语言",
    "chapters.title": "章节",
    "verses.title": "诗句",
    "home.description": "用您偏好的语言探索薄伽梵歌的永恒智慧",
  },
  ar: {
    "app.title": "بهاجافاد جيتا",
    "app.subtitle": "أغنية الإله",
    "language.select": "اختر اللغة",
    "chapters.title": "الفصول",
    "verses.title": "الآيات",
    "home.description": "استكشف الحكمة الأبدية لبهاجافاد جيتا بلغتك المفضلة",
  },
  bn: {
    "app.title": "ভগবদ্গীতা",
    "app.subtitle": "ঈশ্বরের গান",
    "language.select": "ভাষা নির্বাচন করুন",
    "chapters.title": "অধ্যায়",
    "verses.title": "শ্লোক",
    "home.description":
      "আপনার পছন্দের ভাষায় ভগবদ্গীতার চিরন্তন জ্ঞান অন্বেষণ করুন",
  },
  pa: {
    "app.title": "ਭਗਵਦ ਗੀਤਾ",
    "app.subtitle": "ਪਰਮਾਤਮਾ ਦਾ ਗੀਤ",
    "language.select": "ਭਾਸ਼ਾ ਚੁਣੋ",
    "chapters.title": "ਅਧਿਆਏ",
    "verses.title": "ਸ਼ਲੋਕ",
    "home.description":
      "ਆਪਣੀ ਪਸੰਦ ਦੀ ਭਾਸ਼ਾ ਵਿੱਚ ਭਗਵਦ ਗੀਤਾ ਦੀ ਅਮਰ ਬੁੱਧੀ ਦੀ ਖੋਜ ਕਰੋ",
  },
  te: {
    "app.title": "భగవద్‌గీత",
    "app.subtitle": "భగవంతుని పాట",
    "language.select": "భాష ఎంచుకోండి",
    "chapters.title": "అధ్యాయాలు",
    "verses.title": "శ్లోకాలు",
    "home.description":
      "మీ ఇష్ట భాషలో భగవద్‌గీత యొక్క నిత్య జ్ఞానాన్ని అన్వేషించండి",
  },
  mr: {
    "app.title": "भगवद् गीता",
    "app.subtitle": "देवाचे गीत",
    "language.select": "भाषा निवडा",
    "chapters.title": "अध्याय",
    "verses.title": "श्लोक",
    "home.description": "आपल्या पसंतीच्या भाषेत भगवद् गीताचे नিरंतर ज्ञान शोधा",
  },
  gu: {
    "app.title": "ભગવદ્ ગીતા",
    "app.subtitle": "ઈશ્વરનું ગીત",
    "language.select": "ભાષા પસંદ કરો",
    "chapters.title": "અધ્યાય",
    "verses.title": "શ્લોક",
    "home.description": "તમારી પસંદનીય ભાષામાં ભગવદ્ ગીતાનું શાશ્વત જ્ઞાન શોધો",
  },
  kn: {
    "app.title": "ಭಗವದ್ಗೀತೆ",
    "app.subtitle": "ದೇವರ ಗೀತೆ",
    "language.select": "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    "chapters.title": "ಅಧ್ಯಾಯ",
    "verses.title": "ಶ್ಲೋಕ",
    "home.description":
      "ನಿಮ್ಮ ಮೆಚ್ಚುವ ಭಾಷೆಯಲ್ಲಿ ಭಗವದ್ಗೀತೆಯ ನಿತ್ಯ ಜ್ಞಾನವನ್ನು ಅನ್ವೇಷಿಸಿ",
  },
  ml: {
    "app.title": "ഭഗവദ്ഗീത",
    "app.subtitle": "ദൈവത്തിന്റെ പാട്ട്",
    "language.select": "ഭാഷ തിരഞ്ഞെടുക്കുക",
    "chapters.title": "അധ്യായങ്ങൾ",
    "verses.title": "ശ്ലോകങ്ങൾ",
    "home.description":
      "നിങ്ങളുടെ ഇഷ്ടമുള്ള ഭാഷയിൽ ഭഗവദ്ഗീതയുടെ നിത്യ ജ്ഞാനം പര്യവേക്ഷണം ചെയ്യുക",
  },
  ta: {
    "app.title": "பகவத் கீதை",
    "app.subtitle": "கடவுளின் பாடல்",
    "language.select": "மொழி தேர்ந்தெடுக்கவும்",
    "chapters.title": "அத்தியாயங்கள்",
    "verses.title": "ச்லோகங்கள்",
    "home.description":
      "உங்கள் விருப்பமான மொழியில் பகவத் கீதையின் நித்திய ஞ்ஞானத்தை ஆராயுங்கள்",
  },
  ur: {
    "app.title": "بھگودگیتا",
    "app.subtitle": "خدا کا گیت",
    "language.select": "زبان منتخب کریں",
    "chapters.title": "ابواب",
    "verses.title": "اشعار",
    "home.description":
      "اپنی پسندیدہ زبان میں بھگودگیتا کی ابدی حکمت کی تلاش کریں",
  },
  th: {
    "app.title": "ภควัตคีตา",
    "app.subtitle": "บทเพลงของพระเจ้า",
    "language.select": "เลือกภาษา",
    "chapters.title": "บท",
    "verses.title": "โลกา",
    "home.description": "สำรวจปัญญาอันสืบไป ของภควัตคีตาในภาษาที่คุณชื่นชอบ",
  },
  vi: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Bài hát của Thiên Chúa",
    "language.select": "Chọn ngôn ngữ",
    "chapters.title": "Chương",
    "verses.title": "Câu",
    "home.description":
      "Khám phá hiện thực vĩnh hằng của Bhagavad Gita bằng ngôn ngữ ưa thích của bạn",
  },
  id: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Nyanyian Tuhan",
    "language.select": "Pilih Bahasa",
    "chapters.title": "Bab",
    "verses.title": "Mantra",
    "home.description":
      "Jelajahi kebijaksanaan abadi Bhagavad Gita dalam bahasa pilihan Anda",
  },
  tl: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Awit ng Diyos",
    "language.select": "Pumili ng Wika",
    "chapters.title": "Kabanata",
    "verses.title": "Talata",
    "home.description":
      "Tuklasin ang walang hanggang karunungan ng Bhagavad Gita sa iyong piniling wika",
  },
  pl: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Pieśń Boga",
    "language.select": "Wybierz język",
    "chapters.title": "Rozdziały",
    "verses.title": "Wersety",
    "home.description":
      "Odkrywaj wieczną mądrość Bhagavad Gity w wybranym przez ciebie języku",
  },
  uk: {
    "app.title": "Бхагавад-Гіта",
    "app.subtitle": "Пісня Бога",
    "language.select": "Виберіть мову",
    "chapters.title": "Розділи",
    "verses.title": "Вірші",
    "home.description":
      "Досліджуйте вічну мудрість Бхагавад-Гіти обраною вами мовою",
  },
  tr: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Tanrı'nın Şarkısı",
    "language.select": "Dil Seçin",
    "chapters.title": "Bölümler",
    "verses.title": "Ayetler",
    "home.description":
      "Bhagavad Gita'nın sonsuz bilgeliğini tercih ettiğiniz dilde keşfedin",
  },
  el: {
    "app.title": "Μπαγκαβάντ Γκίτα",
    "app.subtitle": "Το Τραγούδι του Θεού",
    "language.select": "Επιλέξτε Γλώσσα",
    "chapters.title": "Κεφάλαια",
    "verses.title": "Στίχοι",
    "home.description":
      "Εξερευνήστε την αιώνια σοφία της Μπαγκαβάντ Γκίτα στη γλώσσα που προτιμάτε",
  },
  he: {
    "app.title": "בגבגד גיתה",
    "app.subtitle": "שיר האלוהים",
    "language.select": "בחר שפה",
    "chapters.title": "פרקים",
    "verses.title": "פסוקים",
    "home.description": "חקור את החוכמה הנצחית של בגבגד גיתה בשפה המועדפת עליך",
  },
  fa: {
    "app.title": "بهاگاوادگیتا",
    "app.subtitle": "سرود خدا",
    "language.select": "انتخاب زبان",
    "chapters.title": "فصول",
    "verses.title": "سرود‌ها",
    "home.description":
      "از حکمت ابدی بهاگاوادگیتا به زبان دلخواه خود بهره برداری کنید",
  },
  af: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "God se Lied",
    "language.select": "Kies Taal",
    "chapters.title": "Hoofstukke",
    "verses.title": "Verse",
    "home.description":
      "Verken die ewige wysheid van die Bhagavad Gita in jou voorkeurige taal",
  },
  sq: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Kënga e Perëndisë",
    "language.select": "Zgjidhni Gjuhën",
    "chapters.title": "Peatëse",
    "verses.title": "Vargje",
    "home.description":
      "Zbuloni sofizminë amtare të Bhagavad Gitës në gjuhën tuaj të zgjedhur",
  },
  hy: {
    "app.title": "Բհագավադ Գիտա",
    "app.subtitle": "Աստծու երգ",
    "language.select": "Ընտրեք լեզու",
    "chapters.title": "Գլուխ",
    "verses.title": "Հատվածներ",
    "home.description":
      "Բացեք Բհագավադ Գիտայի հավերժական իմաստությունը ձեր նախընտրած լեզվով",
  },
  az: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Tanrının Mahnısı",
    "language.select": "Dil Seçin",
    "chapters.title": "Fəsillər",
    "verses.title": "Ayələr",
    "home.description":
      "Bhagavad Gitanın abadı hikmətini seçdiyiniz dildə kəşf edin",
  },
  be: {
    "app.title": "Бхагавад-Гіта",
    "app.subtitle": "Песня Бога",
    "language.select": "Выберыце мову",
    "chapters.title": "Раздзелы",
    "verses.title": "Вершы",
    "home.description":
      "Даследуйце вечную мудрасць Бхагавад-Гіты у выбранай вамі мове",
  },
  bs: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Pjesma Boga",
    "language.select": "Odaberite jezik",
    "chapters.title": "Poglavlja",
    "verses.title": "Stihovi",
    "home.description":
      "Istrazite večnu mudrost Bhagavad Gite na jeziku koji ste odabrali",
  },
  bg: {
    "app.title": "Бхагавад Гита",
    "app.subtitle": "Песен на Бога",
    "language.select": "Изберете език",
    "chapters.title": "Глави",
    "verses.title": "Стихове",
    "home.description":
      "Открийте вечната мъдрост на Бхагавад Гита на избрания от вас език",
  },
  ca: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "La Cançó de Déu",
    "language.select": "Selecciona Idioma",
    "chapters.title": "Capítols",
    "verses.title": "Versos",
    "home.description":
      "Exploreu la saviesa eterna de la Bhagavad Gita en el vostre idioma preferit",
  },
  ceb: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Ang Kanta ng Dios",
    "language.select": "Pumili ng Wika",
    "chapters.title": "Kabanata",
    "verses.title": "Mga Talata",
    "home.description":
      "Tuklasin ang walang hanggang karunungan ng Bhagavad Gita sa iyong piniling wika",
  },
  ny: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Nyimbo ya Mulungu",
    "language.select": "Sankhani Chilangu",
    "chapters.title": "Miyeso",
    "verses.title": "Masanza",
    "home.description":
      "Peza nzeru yosakaniza ya Bhagavad Gita m'chilangu chanu chokonda",
  },
  "zh-tw": {
    "app.title": "薄伽梵歌",
    "app.subtitle": "上帝之歌",
    "language.select": "選擇語言",
    "chapters.title": "章節",
    "verses.title": "詩句",
    "home.description": "用您偏好的語言探索薄伽梵歌的永恆智慧",
  },
  co: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "U Cantu di Diu",
    "language.select": "Sceglite a Lingua",
    "chapters.title": "Capituli",
    "verses.title": "Versetti",
    "home.description":
      "Scoprite a saggezza eterna di a Bhagavad Gita in a vostra lingua preferita",
  },
  hr: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Pjesma Boga",
    "language.select": "Odaberite jezik",
    "chapters.title": "Poglavlja",
    "verses.title": "Stihovi",
    "home.description":
      "Istražite vječnu mudrost Bhagavad Gite na jeziku koji ste odabrali",
  },
  cs: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Píseň Boha",
    "language.select": "Vyberte jazyk",
    "chapters.title": "Kapitoly",
    "verses.title": "Verše",
    "home.description":
      "Prozkoumejte věčnou moudrost Bhagavad Gity ve vašem preferovaném jazyce",
  },
  da: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Guds sang",
    "language.select": "Vælg sprog",
    "chapters.title": "Kapitler",
    "verses.title": "Vers",
    "home.description":
      "Udforsk den evige visdom i Bhagavad Gita på dit foretrukne sprog",
  },
  et: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Jumala laul",
    "language.select": "Valige keel",
    "chapters.title": "Peatükid",
    "verses.title": "Salmid",
    "home.description":
      "Avastage Bhagavad Gita igavest tarkust oma eelistatud keeles",
  },
  fi: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "Jumalan laulu",
    "language.select": "Valitse kieli",
    "chapters.title": "Luvut",
    "verses.title": "Jäädyt",
    "home.description":
      "Tutki Bhagavad Gitan ikuista viisautta valitsemassasi kielessä",
  },
  fy: {
    "app.title": "Bhagavad Gita",
    "app.subtitle": "It sân fan God",
    "language.select": "Kies taal",
    "chapters.title": "Haadstikken",
    "verses.title": "Ferzen",
    "home.description":
      "Ferken de ieuige wiiheid fan Bhagavad Gita yn jo foar keazen taal",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
