// app/verse-detail/[verseId].tsx
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { GITA_NAVIGATION } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, Share2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface VerseData {
  translation: string;
  short_explanation: string;
  key_takeaways: string;
  detailed_explanation: string;
  life_application: string;
}

interface CommonVerseData {
  ID: string;
  Shloka: string;
  Transliteration: string;

}

const THEME_COLORS = {
  ancient: {
    background: require("@/assets/images/page.png"),
    overlay: "bg-black/10",
    header: "bg-transparent",
    headerText: "text-amber-50",
    cardBg: "bg-transparent",
    cardText: "text-amber-950",
    buttonBg: "bg-amber-900",
    buttonText: "text-amber-50",
    iconColor: "#f2f2f2"
  },
  light: {
    background: undefined,
    overlay: "bg-white",
    header: "bg-blue-500",
    headerText: "text-white",
    cardBg: "bg-white",
    cardText: "text-gray-900",
    buttonBg: "bg-blue-500",
    buttonText: "text-white",
    iconColor: "#f2f2f2"
  },
  dark: {
    background: undefined,
    overlay: "bg-gray-900",
    header: "bg-gray-800",
    headerText: "text-white",
    cardBg: "bg-gray-800",
    cardText: "text-white",
    buttonBg: "bg-gray-700",
    buttonText: "text-white",
    iconColor: "#f2f2f2"
  },
};

export default function VerseDetail() {
  const { verseId } = useLocalSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [commonData, setCommonData] = useState({
    Shloka: "",
    Transliteration: "",
  });

  const verseKey = `${verseId.toString().split("-").join(".")}`;
  const chapterNumber = verseId.toString().split("-")[0];
  const verseNumber = verseId.toString().split("-")[1];

  const { top, bottom } = useSafeAreaInsets();
  const colors = THEME_COLORS[theme];


// Your navigation functions using the object
const onPrevious = () => {
  if (verseNumber && chapterNumber) {
    const currentChapter = parseInt(chapterNumber);
    const currentVerse = parseInt(verseNumber);
    
    const prevVerse = GITA_NAVIGATION.getPreviousVerse(currentChapter, currentVerse);
    
    if (prevVerse) {
      const prevVerseId = `${prevVerse.chapter}-${prevVerse.verse}`;
      router.push(`/verse-detail/${prevVerseId}`);
    }
    // If null, we're at the first verse - optionally show a toast or do nothing
  }
};

const onNext = () => {
  if (verseNumber && chapterNumber) {
    const currentChapter = parseInt(chapterNumber);
    const currentVerse = parseInt(verseNumber);
    
    const nextVerse = GITA_NAVIGATION.getNextVerse(currentChapter, currentVerse);
    
    if (nextVerse) {
      const nextVerseId = `${nextVerse.chapter}-${nextVerse.verse}`;
      router.push(`/verse-detail/${nextVerseId}`);
    }
    // If null, we're at the last verse - optionally show a toast or do nothing
  }
};

// Optional: Add progress tracking

  useEffect(() => {
    loadVerse();
    loadShlok();
  }, [verseId]);

  const loadShlok = async () => {
    try {
      const data = require("@/assets/data/Bhagwad_Gita.json");
      const dataId = `BG${verseKey}`;
      const foundVerse = data.find((v: CommonVerseData) => v.ID === dataId);
      setCommonData({
        Shloka: foundVerse?.Shloka || "",
        Transliteration: foundVerse?.Transliteration || "",
      });
    } catch (error) {
      console.error("Error loading verse:", error);
    }
  };

  const loadVerse = async () => {
    try {
      const data = require("@/assets/data/english.json");
      const dataId = `${verseKey}`;
      const foundVerse = data[dataId];
      setVerse(foundVerse);

      console.log("Found verse:", foundVerse);
    } catch (error) {
      console.error("Error loading verse:", error);
    }
  };


  const handleShare = async () => {
    if (!verse) return;
    try {
      await Share.share({
        message: `${commonData.Shloka}\n\n${verse.translation}`,
        title: `Bhagavad Gita ${chapterNumber}.${verseNumber}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!verse && !commonData.Shloka) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("loading")}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={colors.background}
      className="flex-1"
      resizeMode="cover"
    >
      <View
        className={`flex-1 ${colors.overlay}`}
        style={{ paddingTop: top, paddingBottom: bottom }}
      >
        {/* Advertisement Container */}
        <View className={`h-20 ${colors.buttonBg} flex items-center justify-center border-b border-gray-400`}>
          <Text className={`${colors.buttonText} text-xs font-qs-bold`}>
            Advertisement Space
          </Text>
        </View>

        {/* Header */}
            <ImageBackground
        source={require("@/assets/images/chapter-heading.png")}
        resizeMode="cover"
        className={`relative border-b-4 `}
      >
        <View
          className={`px-6 py-4 flex-row items-center justify-between relative`}
        >
          <View
            pointerEvents="none"
            className="sticky left-0 right-0 top-20 h-12 bg-gradient-to-b from-black/60 to-transparent"
          />
          <Pressable
            onPress={() => router.push(`/verses/${parseInt(chapterNumber as string)}`)}
            className="p-2"
            android_ripple={{ color: colors.headerText }}
          >
         <ArrowLeft size={24} color={colors.iconColor} />
          </Pressable>
          <Text
            className={`text-3xl font-qs-bold ${colors.headerText} flex-1 text-center`}
          >
            Shloka {verseNumber ? `${chapterNumber}.${verseNumber}` : verseId}
          </Text>

           <View className={`flex-row items-center justify-between gap-3`}>
          {/* <Pressable
            onPress={() => setIsBookmarked(!isBookmarked)}
            className={`p-2`}
          >
            <Bookmark
              size={24}
              color={isBookmarked ? colors.iconColor : colors.iconColor}
              fill={isBookmarked ? colors.iconColor : "none"}
            />
          </Pressable> */}
          <Pressable
            onPress={handleShare}
            className={`p-2`}
          >
            <Share2
              size={24}
              color={colors.iconColor}
              className=""
            />
          </Pressable>
        </View>
        </View>
      </ImageBackground>

        <ScrollView className="flex-1 px-2 py-6 mt-4">
          {/* Sanskrit Shloka */}
          <View className={`${colors.cardBg} rounded-lg p-2 mb-6`}>
            <Text className={`${colors.cardText} font-kalam-bold text-2xl text-center mb-6`}>
              {commonData.Shloka}
            </Text>
            <Text className={`${colors.cardText} font-qs-bold  text-center text-md`}>
              {commonData.Transliteration}
            </Text>
          </View>

          {/* Meaning */}
          <View className={`${colors.cardBg} rounded-lg p-4 `}>
            <Text className={`${colors.cardText} font-kalam-bold text-base mb-1 opacity-80`}>
              Translation:
            </Text>
            <Text className={`${colors.cardText} text-lg tracking-tighter leading-relaxed font-kalam-bold`}>
              {verse?.translation ?? t("meaning.notAvailable")}
            </Text>
          </View>

          {/* short explanation */}
          {verse?.short_explanation && (
            <View className={`${colors.cardBg} rounded-lg p-4 `}>
              <Text className={`${colors.cardText} font-kalam-bold text-base mb-1 opacity-70`}>
                Short Explanation:
              </Text>
              <Text className={`${colors.cardText} text-lg tracking-tighter leading-relaxed font-kalam-bold`}>
                {verse.short_explanation}
              </Text>
            </View>
          )}

          {/* key takeaways */}
          {verse?.key_takeaways && (<View className={`${colors.cardBg} rounded-lg p-4 `}>
            <Text className={`${colors.cardText} font-kalam-bold text-base mb-1 opacity-70`}>
              Key Takeaways:
            </Text>
            <Text className={`${colors.cardText} text-lg tracking-tighter leading-relaxed font-kalam-bold`}>
              {verse?.key_takeaways ?? t("meaning.notAvailable")}
            </Text>
          </View>)}

          {/* detailed explanation */}
          {verse?.detailed_explanation && (<View className={`${colors.cardBg} rounded-lg p-4 `}>
            <Text className={`${colors.cardText} font-kalam-bold text-base mb-1 opacity-70`}>
              Detailed Explanation:
            </Text>
            <Text className={`${colors.cardText} text-lg tracking-tighter leading-relaxed font-kalam-bold`}>
              {verse?.detailed_explanation ?? t("meaning.notAvailable")}
            </Text>
          </View>)}

          {/* life application */}
          {verse?.life_application && (
            <View className={`${colors.cardBg} rounded-lg p-4 mb-6`}>
              <Text className={`${colors.cardText} font-kalam-bold text-base mb-1 opacity-70`}>
                Life Application:
              </Text>
              <Text className={`${colors.cardText} text-lg tracking-tighter leading-relaxed font-kalam-bold`}>
                {verse?.life_application ?? t("meaning.notAvailable")}
              </Text>
            </View>)
          }


        </ScrollView>

        {/* Navigation Buttons */}
<View className="px-6 py-4 border-t border-gray-300 flex-row gap-3 justify-between items-center">
  <Pressable
    onPress={onPrevious}
    className={`${colors.buttonBg} w-1/3 rounded-lg py-3 px-4 flex-row justify-start items-center gap-2`}
  >
    <ChevronLeft size={20} color={colors.iconColor} />
    <Text className={`${colors.buttonText} font-qs-bold`}>
      {t("Previous")}
    </Text>
  </Pressable>
  
  <Pressable
    onPress={onNext}
    className={`${colors.buttonBg} w-1/3  rounded-lg py-3 px-4 flex-row justify-end items-center gap-2`}
  >
    <Text className={`${colors.buttonText} font-qs-bold`}>
      {t("Next")}
    </Text>
    <ChevronRight size={20} color={colors.iconColor} />
  </Pressable>
</View>
      </View>
    </ImageBackground>
  );
}
