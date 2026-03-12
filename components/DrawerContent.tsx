import { useLanguage } from "@/context/LanguageContext";
import { useTheme, type ThemeMode } from "@/context/ThemeContext";
import { router } from "expo-router";
import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import {
  Animated,
  ImageBackground,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Theme colors matching chapters page
const THEME_COLORS = {
  ancient: {
    background: require("@/assets/images/bg-sidebar.png"),
    backgroundButton: require("@/assets/images/bg-sidebar-button.png"),
    overlay: "bg-transparent",
    header: "bg-yellow-700",
    headerText: "text-white",
    headerBorder: "border-yellow-700",
    cardBg: "bg-transparent",
    cardBorder: "#c3ad8e",
    cardText: "text-yellow-900",
    buttonBg: "bg-yellow-700",
    buttonText: "text-amber-50",
    sectionHeaderBg: "bg-yellow-700/20",
    sectionHeaderText: "text-amber-900",
    dropdownBg: "bg-amber-100",
    dropdownBorder: "border-yellow-700",
  },
  light: {
    background: undefined,
    backgroundButton: undefined,
    overlay: "bg-white",
    header: "bg-blue-500",
    headerText: "text-white",
    headerBorder: "border-blue-500",
    cardBg: "bg-white",
    cardBorder: "border-gray-300",
    cardText: "text-gray-900",
    buttonBg: "bg-blue-500",
    buttonText: "text-white",
    sectionHeaderBg: "bg-blue-100",
    sectionHeaderText: "text-blue-900",
    dropdownBg: "bg-blue-50",
    dropdownBorder: "border-blue-300",
  },
  dark: {
    background: undefined,
    backgroundButton: undefined,
    overlay: "bg-gray-900",
    header: "bg-gray-800",
    headerText: "text-white",
    headerBorder: "border-gray-700",
    cardBg: "bg-gray-800",
    cardBorder: "border-gray-600",
    cardText: "text-white",
    buttonBg: "bg-gray-700",
    buttonText: "text-white",
    sectionHeaderBg: "bg-gray-700",
    sectionHeaderText: "text-gray-100",
    dropdownBg: "bg-gray-700",
    dropdownBorder: "border-gray-600",
  },
};

const LANGUAGES = [
  { code: "en", labelKey: "language.english" },
  { code: "hi", labelKey: "language.hindi" },
  { code: "es", labelKey: "language.spanish" },
  { code: "fr", labelKey: "language.french" },
];

const THEMES: ThemeMode[] = ["ancient", "light", "dark"];

// Structured drawer menu data
const DRAWER_STRUCTURE = {
  navigation: [
    {
      id: "chapters",
      labelKey: "drawer.chapters",
      descriptionKey: "drawer.chapters_desc",
      route: "/chapters",
    },
    // {
    //   id: "favorites",
    //   labelKey: "drawer.favorites",
    //   descriptionKey: "drawer.favorites_desc",
    //   route: "/favorites",
    // },
  ],
  preferences: [
    { id: "language", labelKey: "drawer.language" },
    { id: "theme", labelKey: "drawer.theme" },
  ],
  support: [
    { id: "share", labelKey: "drawer.share", route: "/share" },
    { id: "rate", labelKey: "drawer.rate", route: "/rate" },
    { id: "contact", labelKey: "drawer.contact", route: "/contact" },
  ],
  about: [{ id: "about", labelKey: "drawer.about", route: "/about" }],
};

export function DrawerContent() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  const colors = THEME_COLORS[theme];

  const toggleDropdown = (type: "lang" | "theme") => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === "lang") {
      setLangOpen(!langOpen);
    } else {
      setThemeOpen(!themeOpen);
    }
  };

  const renderContent = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Navigation Section */}
      <View className="px-4 py-4">
        <Text
          className={`text- font-kalam-bold ${colors.headerText} px-2 mb-3 opacity-50`}
        >
          {t("drawer.navigation")}
        </Text>
        {DRAWER_STRUCTURE.navigation.map((item) => (
          <NavigationItem
            key={item.id}
            label={t(item.labelKey)}
            description={t(item.descriptionKey)}
            onPress={() => router.push(item.route as any)}
            colors={colors}
          />
        ))}
      </View>

      {/* Preferences Section */}
      <View
        className="px-4 py-4 "
        style={{ borderTopColor: colors.cardBorder }}
      >
        {/* <Text
          className={`text font-kalam-bold ${colors.headerText} px-2 mb-3 opacity-50`}
        >
          {t("drawer.preferences")}
        </Text> */}

        {/* Language Dropdown */}
        {/* <View className="mb-4">
          <Text
            className={`text font-kalam-bold ${colors.headerText} mb-2 px-2 opacity-60`}
          >
            {t("drawer.language")}
          </Text>
          <DropdownButton
            label={t(`language.${language}`)}
            isOpen={langOpen}
            onPress={() => toggleDropdown("lang")}
            colors={colors}
          />
          {langOpen && (
            <View
              className={`mt-2 ${colors.dropdownBg} rounded-lg border ${colors.dropdownBorder} overflow-hidden`}
            >
              {LANGUAGES.map((l) => (
                <DropdownItem
                  key={l.code}
                  active={language === l.code}
                  label={t(l.labelKey)}
                  onPress={() => {
                    setLanguage(l.code as any);
                    setLangOpen(false);
                  }}
                  colors={colors}
                />
              ))}
            </View>
          )}
        </View> */}

        {/* Theme Dropdown */}
        <View>
          <Text
            className={`text font-kalam-bold ${colors.headerText} mb-2 px-2 opacity-60`}
          >
            {t("drawer.theme")}
          </Text>
          <DropdownButton
            label={t(`theme.${theme}`)}
            isOpen={themeOpen}
            onPress={() => toggleDropdown("theme")}
            colors={colors}
          />
          {themeOpen && (
            <View
              className={`mt-2 ${colors.dropdownBg} rounded-lg border ${colors.dropdownBorder} overflow-hidden`}
            >
              {THEMES.map((mode) => (
                <DropdownItem
                  key={mode}
                  active={theme === mode}
                  label={t(`theme.${mode}`)}
                  onPress={() => {
                    setTheme(mode);
                    setThemeOpen(false);
                  }}
                  colors={colors}
                />
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Support Section */}
      <View
        className="px-4 py-4 "
        style={{ borderTopColor: colors.cardBorder }}
      >
        <Text
          className={`text font-kalam-bold ${colors.headerText} px-2 mb-3 opacity-60`}
        >
          {t("drawer.support")}
        </Text>
        {DRAWER_STRUCTURE.support.map((item) => (
          <ActionButton
            key={item.id}
            label={t(item.labelKey)}
            onPress={() => router.push(item.route as any)}
            colors={colors}
          />
        ))}
      </View>

      {/* About Section */}
      <View
        className="px-4 py-4"
        style={{ borderTopColor: colors.cardBorder }}
      >
        <Text
          className={`font-kalam-bold ${colors.headerText} px-2 mb-3 opacity-60`}
        >
          {t("drawer.about")}
        </Text>
        {DRAWER_STRUCTURE.about.map((item) => (
          <ActionButton
            key={item.id}
            label={t(item.labelKey)}
            onPress={() => router.push(item.route as any)}
            colors={colors}
          />
        ))}
        
      </View>
    </ScrollView>
  );

  return (
    <View className="flex-1 font-kalam-bold">
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
          className={`flex-1 ${colors.overlay} font-kalam-bold`}
          style={{ paddingTop: top, paddingBottom: bottom }}
        >
          {renderContent()}
        </View>
      )}
    </View>
  );
}

// Helper component for navigation items
function NavigationItem({ label, description, onPress, colors }: any) {
  const content = (
    <Pressable
      onPress={onPress}
      className={`mb-3 p-4 rounded-lg ${colors.cardBg} `}
      android_ripple={{ color: colors.cardBorder }}
    >
      <Text className={`text-xl font-kalam-bold  ${colors.cardText}`}>
        {label}
      </Text>
      {description && (
        <Text
          className={`text font-kalam-bold ${colors.cardText} opacity-70 mt-1`}
        >
          {description}
        </Text>
      )}
    </Pressable>
  );

  return colors.backgroundButton ? (
    <View className="w-full rounded-lg overflow-hidden h-20 mb-3 shadow-lg shadow-black">
      <ImageBackground
        source={colors.backgroundButton}
        resizeMode="cover"
      >
        {content}
      </ImageBackground>
    </View>
  ) : (
    content
  );
}

// Helper component for dropdown button
function DropdownButton({ label, isOpen, onPress, colors }: any) {
  const content = (
    <Pressable
      onPress={onPress}
      className={`p-4 rounded-lg ${colors.cardBg} border ${colors.cardBorder} flex-row items-center justify-between`}
      android_ripple={{ color: colors.cardBorder }}
    >
      <Text className={`font-kalam-bold text-xl ${colors.cardText}`}>{label}</Text>
      <Animated.View
        style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
      >
        <ChevronDown
          size={18}
          color={
            colors.cardText === "text-amber-900"
              ? "#b45309"
              : colors.cardText === "text-gray-900"
                ? "#111827"
                : "#ffffff"
          }
        />
      </Animated.View>
    </Pressable>
  );

  return colors.backgroundButton ? (
    <ImageBackground
      source={colors.backgroundButton}
      className="rounded-lg overflow-hidden"
      resizeMode="cover"
    >
      {content}
    </ImageBackground>
  ) : (
    content
  );
}

// Helper component for dropdown items
function DropdownItem({ label, active, onPress, colors }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`py-3 px-4 flex-row items-center justify-between border-b border-opacity-10 ${active ? colors.cardBorder : ""}`}
      style={
        active
          ? { backgroundColor: colors.cardBorder }
          : { backgroundColor: colors.cardBorder, opacity: 0.8 }
      }
    >
      <Text
        className={`font-kalam-bold text-xl ${active ? colors.cardText : "opacity-70 " + colors.cardText}`}
      >
        {label}
      </Text>
      {active && (
        <Check
          size={18}
          color={
            colors.cardText === "text-amber-900"
              ? "#b45309"
              : colors.cardText === "text-gray-900"
                ? "#111827"
                : "#ffffff"
          }
        />
      )}
    </TouchableOpacity>
  );
}

// Helper component for action buttons
function ActionButton({ label, onPress, colors }: any) {
  const content = (
    <Pressable
      onPress={onPress}
      className={`p-4 rounded-lg ${colors.cardBg} border ${colors.cardBorder}`}
      android_ripple={{ color: colors.cardBorder }}
    >
      <Text className={`font-kalam-bold text-xl ${colors.cardText}`}>{label}</Text>
    </Pressable>
  );

  return colors.backgroundButton ? (
    <ImageBackground
      source={colors.backgroundButton}
      className="mb-2 rounded-lg overflow-hidden "
      resizeMode="cover"
    >
      {content}
    </ImageBackground>
  ) : (
    content
  );
}
