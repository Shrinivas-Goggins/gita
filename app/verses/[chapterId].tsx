// app/verses/[chapterId].tsx
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
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

export default function VersesScreen() {
  const { chapterId } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [verses, setVerses] = useState<VerseData[]>([]);
  const [loading, setLoading] = useState(true);

  const { top, bottom } = useSafeAreaInsets();
  const colors = THEME_COLORS[theme];

  useEffect(() => {
    loadVerses();
  }, [chapterId]);

  const loadVerses = async () => {
    try {
      const data = require("@/assets/data/Bhagwad_Gita.json");
      const chapterVerses = data.filter(
        (verse: VerseData) => verse.Chapter === parseInt(chapterId as string),
      );
      setVerses(chapterVerses);
    } catch (error) {
      console.error("Error loading verses:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => (
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
            onPress={() => router.push("/chapters")}
            className="p-2"
            android_ripple={{ color: colors.headerText }}
          >
            <Text className={`text-3xl font-qs-bold ${colors.headerText}`}>
              ←
            </Text>
          </Pressable>
          <Text
            className={`text-3xl font-qs-bold ${colors.headerText} flex-1 text-center`}
          >
            Chapter {chapterId}
          </Text>
          <View className="w-10" />
        </View>
      </ImageBackground>

      {/* Verses List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className={`${colors.cardText} font-qs-regular`}>
            Loading verses...
          </Text>
        </View>
      ) : (
        <FlatList
          data={verses}
          renderItem={({ item }) => (
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 1,
                shadowRadius: 12,
                elevation: 5,
                borderRadius: 12,
                overflow: "hidden",
              }}
              className="mx-4 my-2 rounded-xl p-2"
            >
              <Pressable
                onPress={() =>
                  router.push(`/verse-detail/${item.Chapter}-${item.Verse}`)
                }
                className="rounded-xl active:opacity-95"
                android_ripple={{ color: colors.cardBorder }}
                style={{ borderRadius: 12, overflow: "hidden" }}
              >
                <ImageBackground
                  source={require("@/assets/images/board2.png")}
                  resizeMode="cover"
                  className="p-4"
                >
                  <View className="relative" style={{ minHeight: 80 }}>
                    <View className="flex-row items-center justify-between gap-4 relative">
                      <View
                        className={`${colors.buttonBg} w-12 h-12 rounded-lg justify-center items-center`}
                      >
                        <Text
                          className={`${colors.buttonText} font-qs-bold text-lg`}
                        >
                          {item.Verse}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={2}
                        className={`text-base font-qs-regular flex-1 ${colors.cardText}`}
                      >
                        {item.Shloka}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.ID}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </>
  );

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
