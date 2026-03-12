// app/verse-detail/[verseId].tsx
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface VerseData {
  ID: string;
  Chapter: number;
  Verse: number;
  Shloka: string;
  Transliteration: string;
  HinMeaning: string;
  EngMeaning: string;
  WordMeaning: string;
}

const THEME_COLORS = {
  ancient: {
    background: require("@/assets/images/bg-wood.png"),
    overlay: "bg-black/10",
    header: "bg-yellow-200",
    headerText: "text-amber-50",
    headerBorder: "border-yellow-950",
    cardBg: "bg-amber-50",
    cardBorder: "border-yellow-200",
    cardText: "text-amber-950",
    buttonBg: "bg-yellow-200",
    buttonText: "text-amber-50",
    textPrimary: "text-amber-200",
  },
  light: {
    background: undefined,
    overlay: "bg-white",
    header: "bg-blue-500",
    headerText: "text-white",
    headerBorder: "border-blue-500",
    cardBg: "bg-white",
    cardBorder: "border-gray-300",
    cardText: "text-gray-900",
    buttonBg: "bg-blue-500",
    buttonText: "text-white",
    textPrimary: "text-gray-900",
  },
  dark: {
    background: undefined,
    overlay: "bg-gray-900",
    header: "bg-gray-800",
    headerText: "text-white",
    headerBorder: "border-gray-700",
    cardBg: "bg-gray-800",
    cardBorder: "border-gray-600",
    cardText: "text-white",
    buttonBg: "bg-gray-700",
    buttonText: "text-white",
    textPrimary: "text-gray-100",
  },
};

export default function VerseDetailScreen() {
  const { verseId } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);



  const { top, bottom } = useSafeAreaInsets();
  const colors = THEME_COLORS[theme];

  useEffect(() => {
    loadVerse();
  }, [verseId]);

  const loadVerse = async () => {
    try {
      const data = require("@/assets/data/Bhagwad_Gita.json");
      const [chapter, verseNum] = (verseId as string).split("-");
      const foundVerse = data.find(
        (v: VerseData) =>
          v.Chapter === parseInt(chapter) && v.Verse === parseInt(verseNum),
      );

      const foundVerses = data.filter(
        (v: VerseData) =>
          v.Chapter === parseInt(chapter),
      );
      console.log(foundVerses)

      setVerse(foundVerse);
    } catch (error) {
      console.error("Error loading verse:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingContent = () => (
    <View className="flex-1 justify-center items-center">
      <Text className={`${colors.cardText} font-kalam-bold`}>
        Loading verse...
      </Text>
    </View>
  );


  const renderErrorContent = () => (
    <View className="flex-1 justify-center items-center">
      <Text className={`${colors.cardText} font-kalam-bold`}>
        Verse not found
      </Text>
    </View>
  );

  const renderVerseContent = () => (
    <>
      {/* Header */}
      <ImageBackground
        source={require("@/assets/images/chapter-heading.png")}
        resizeMode="cover"
        className={`relative border-b-4 ${colors.headerBorder}`}
      >
        <View
          className={`px-6 py-4 flex-row items-center justify-between relative`}
        >
          <View
            pointerEvents="none"
            className="absolute left-0 right-0 top-20 h-12 bg-gradient-to-b from-black/60 to-transparent"
          />
          <Pressable
            onPress={() => router.replace(`/verses/${verse!.Chapter}`)}
            className="p-2"
            android_ripple={{ color: colors.headerText }}
          >
            <Text className={`text-3xl font-kalam-bold ${colors.headerText}`}>
              ←
            </Text>
          </Pressable>
          <Text
            className={`text-3xl font-kalam-bold ${colors.headerText} flex-1 text-center`}
          >
            {verse!.Chapter}.{verse!.Verse}
          </Text>
          <View className="w-10" />
        </View>
      </ImageBackground>

      {/* Verse Content */}
      <ImageBackground
        source={require("@/assets/images/page.png")}
        resizeMode="cover"
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6 relative">
          {/* Shloka (Sanskrit) */}
          <View className="mb-6 p-4">
            <Text className="mb-4 font-kalam-bold text-2xl leading-10 text-amber-950  decoration-amber-800/60">
              {verse!.Shloka}
            </Text>
          </View>

          {/* Transliteration */}
          <View className="mb-6 p-4">
            <Text className={`text-sm font-kalam-bold ${colors.cardText} mb-2`}>
              Transliteration
            </Text>
            <Text
              className={`text-base font-kalam-bold ${colors.cardText} leading-relaxed`}
            >
              {verse!.Transliteration}
            </Text>
          </View>

          {/* Meaning */}
          <View className="mb-6 p-4">
            <Text className={`text-sm font-kalam-bold ${colors.cardText} mb-2`}>
              {language === "hi" ? "अर्थ (Meaning)" : "Meaning"}
            </Text>
            <Text
              className={`text-base font-kalam-bold ${colors.cardText} leading-relaxed`}
            >
              {language === "hi" ? verse!.HinMeaning : verse!.EngMeaning}
            </Text>
          </View>

          {/* Word Meaning */}
          <View className="mb-6 p-4">
            <Text className={`text-sm font-kalam-bold ${colors.cardText} mb-2`}>
              {language === "hi" ? "शब्दार्थ (Word Meaning)" : "Word Meaning"}
            </Text>
            <Text
              className={`text-sm font-kalam-bold ${colors.cardText} leading-relaxed`}
            >
              {verse!.WordMeaning}
            </Text>
          </View>

          
        </ScrollView>
      </ImageBackground>
    </>
  );

  const renderContent = () => {
    if (loading) return renderLoadingContent();
    if (!verse) return renderErrorContent();
    return renderVerseContent();
  };

  return (
    <View className="flex-1">
      {colors.background ? (
        <ImageBackground
          source={colors.background}
          className="flex-1"
          resizeMode="cover"
        >
          <View
            className={`flex-1 ${colors.overlay}`}
            style={{ paddingTop: top, paddingBottom: bottom }}
          >
            {renderContent()}
          </View>
        </ImageBackground>
      ) : (
        <View
          className={`flex-1 ${colors.overlay}`}
          style={{ paddingTop: top, paddingBottom: bottom }}
        >
          {renderContent()}
        </View>
      )}
    </View>
  );
}
