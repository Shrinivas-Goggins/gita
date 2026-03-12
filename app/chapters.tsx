// app/chapters.tsx
import { CHAPTERS } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function ChaptersScreen() {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const router = useRouter();

  const colors = THEME_COLORS[theme];

  const { top, bottom } = useSafeAreaInsets();

  const navigation = useNavigation();

  const getChapterTitle = (chapter: (typeof CHAPTERS)[0]) => {
    if (language === "hi") {
      return chapter.title_hi || chapter.name;
    }
    return chapter.title_en || chapter.name;
  };

  const getChapterSummary = (chapter: (typeof CHAPTERS)[0]) => {
    if (language === "hi") {
      return chapter.summary_hi || "";
    }
    return chapter.summary_en || "";
  };

  const renderContent = () => (
    <>
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
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="p-2"
            android_ripple={{ color: "#ffffff22" }}
          >
            <Text className={`text-3xl font-qs-bold ${colors.headerText}`}>
              ☰
            </Text>
          </Pressable>

          <Text className={`text-3xl font-qs-bold ${colors.headerText}`}>
            {t("chapters.title")}
          </Text>

          <View className="w-10" />
        </View>
      </ImageBackground>

      {/* Chapters List */}
      <FlatList
        data={CHAPTERS}
        renderItem={({ item }) => (
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 12,
              elevation: 5, // ANDROID
              borderRadius: 12,
              overflow: "hidden",
            }}
            className="mx-4 my-2 rounded-xl p-2"
          >
            <Pressable
              onPress={() => router.push(`/verses/${item.id}`)}
              className="rounded-xl  active:opacity-95"
              android_ripple={{ color: "#fcd34d" }}
              style={{ borderRadius: 12, overflow: "hidden" }}
            >
              <ImageBackground
                source={require("@/assets/images/board2.png")}
                resizeMode="cover"
                className="p-4"
              >
                <View className="relative" style={{ minHeight: 130 }}>
                  <View className="flex-row items-center justify-between  gap-4 relative ">
                    <View className="h-full">
                      <Text
                        className={`text-3xl font-kalam-bold leading-10 ${colors.cardText}`}
                      >
                        {item.id}.
                      </Text>
                    </View>
                    <Text
                      className={`text-3xl font-kalam-bold flex-1 leading-10 ${colors.cardText} mb-1`}
                    >
                      {getChapterTitle(item)}
                    </Text>
                  </View>

                  <View>
                    <Text
                      numberOfLines={1}
                      className={`text-2xl font-kalam-bold mb-1 ml-8  ${colors.cardText}`}
                    >
                      {item.verses}
                    </Text>
                  </View>
                  <View className="w-full px-8 items-center">
                    <Text className={`font-kalam-bold ${colors.cardText}`}>
                      {getChapterSummary(item)}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
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
            className="flex-1"
            style={{ paddingTop: top, paddingBottom: bottom }}
          >
            <View className="w-full h-16 bg-yellow-700 flex items-center justify-center">
              {/* Advertisment */}
              <Text className="text-sm opacity-70">Adsvertisement</Text>
            </View>
            <View className={`flex-1 ${colors.overlay}`}>
              {renderContent()}
            </View>
          </View>
        </ImageBackground>
      ) : (
        <>
          <View className="w-full h-16 bg-yellow-700 flex items-center justify-center">
            {/* Advertisment */}
            <Text className="text-sm opacity-70">Adsvertisement</Text>
          </View>
          <View
            className={`flex-1 ${colors.overlay}`}
            style={{ paddingTop: top, paddingBottom: bottom }}
          >
            {renderContent()}
          </View>
        </>
      )}
    </View>
  );
}
