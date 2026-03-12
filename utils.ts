export const GITA_NAVIGATION = {
  // Total verses per chapter
  chapterVerses: {
    1: 47,  // Chapter 1: 47 verses
    2: 72,  // Chapter 2: 72 verses
    3: 43,  // Chapter 3: 43 verses
    4: 42,  // Chapter 4: 42 verses
    5: 29,  // Chapter 5: 29 verses
    6: 47,  // Chapter 6: 47 verses
    7: 30,  // Chapter 7: 30 verses
    8: 28,  // Chapter 8: 28 verses
    9: 34,  // Chapter 9: 34 verses
    10: 42, // Chapter 10: 42 verses
    11: 55, // Chapter 11: 55 verses
    12: 20, // Chapter 12: 20 verses
    13: 35, // Chapter 13: 35 verses
    14: 27, // Chapter 14: 27 verses
    15: 20, // Chapter 15: 20 verses
    16: 24, // Chapter 16: 24 verses
    17: 28, // Chapter 17: 28 verses
    18: 78, // Chapter 18: 78 verses
  },

  // Get total verses count
  getTotalVerses() {
    return Object.values(this.chapterVerses).reduce((sum, count) => sum + count, 0);
  },

  // Validate if verse exists
  isValidVerse(chapter: number, verse: number): boolean {
    const maxVerses = this.chapterVerses[chapter as keyof typeof this.chapterVerses];
    return maxVerses ? verse >= 1 && verse <= maxVerses : false;
  },

  // Get next verse
  getNextVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
    const maxVerses = this.chapterVerses[chapter as keyof typeof this.chapterVerses];
    
    if (verse < maxVerses) {
      // Next verse in same chapter
      return { chapter, verse: verse + 1 };
    } else if (chapter < 18) {
      // First verse of next chapter
      return { chapter: chapter + 1, verse: 1 };
    }
    
    // Last verse of Gita
    return null;
  },

  // Get previous verse
  getPreviousVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
    if (verse > 1) {
      // Previous verse in same chapter
      return { chapter, verse: verse - 1 };
    } else if (chapter > 1) {
      // Last verse of previous chapter
      const prevChapterMax = this.chapterVerses[(chapter - 1) as keyof typeof this.chapterVerses];
      return { chapter: chapter - 1, verse: prevChapterMax };
    }
    
    // First verse of Gita
    return null;
  },

  // Get verse position (1-700)
  getVersePosition(chapter: number, verse: number): number {
    let position = 0;
    for (let i = 1; i < chapter; i++) {
      position += this.chapterVerses[i as keyof typeof this.chapterVerses];
    }
    return position + verse;
  },

  // Get verse from position (1-700)
  getVerseFromPosition(position: number): { chapter: number; verse: number } | null {
    if (position < 1 || position > this.getTotalVerses()) return null;
    
    let remaining = position;
    for (let chapter = 1; chapter <= 18; chapter++) {
      const versesInChapter = this.chapterVerses[chapter as keyof typeof this.chapterVerses];
      if (remaining <= versesInChapter) {
        return { chapter, verse: remaining };
      }
      remaining -= versesInChapter;
    }
    return null;
  }
};

const getReadingProgress = (chapter: number, verse: number): number => {
  const position = GITA_NAVIGATION.getVersePosition(chapter, verse);
  const total = GITA_NAVIGATION.getTotalVerses();
  return (position / total) * 100;
};

// Optional: Get chapter name in Sanskrit/English
const getChapterName = (chapter: number, language: 'en' | 'sa' = 'en'): string => {
  const chapterNames = {
    en: [
      "Arjuna Vishada Yoga",
      "Sankhya Yoga",
      "Karma Yoga",
      "Jnana Yoga",
      "Karma Sanyasa Yoga",
      "Dhyana Yoga",
      "Jnana Vijnana Yoga",
      "Aksara Brahma Yoga",
      "Raja Vidya Raja Guhya Yoga",
      "Vibhuti Yoga",
      "Visvarupa Darsana Yoga",
      "Bhakti Yoga",
      "Kshetra Kshetrajna Vibhaga Yoga",
      "Gunatraya Vibhaga Yoga",
      "Purushottama Yoga",
      "Daivasura Sampad Vibhaga Yoga",
      "Sraddhatraya Vibhaga Yoga",
      "Moksha Sanyasa Yoga"
    ],
    sa: [
      "अर्जुनविषादयोग",
      "सांख्ययोग",
      "कर्मयोग",
      "ज्ञानयोग",
      "कर्मसंन्यासयोग",
      "ध्यानयोग",
      "ज्ञानविज्ञानयोग",
      "अक्षरब्रह्मयोग",
      "राजविद्याराजगुह्ययोग",
      "विभूतियोग",
      "विश्वरूपदर्शनयोग",
      "भक्तियोग",
      "क्षेत्रक्षेत्रज्ञविभागयोग",
      "गुणत्रयविभागयोग",
      "पुरुषोत्तमयोग",
      "दैवासुरसंपद्विभागयोग",
      "श्रद्धात्रयविभागयोग",
      "मोक्षसंन्यासयोग"
    ]
  };
  
  return chapterNames[language][chapter - 1];
};
