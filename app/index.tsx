// app/index.tsx
import { LANGUAGES } from "@/constants";
import type { Language } from "@/context/LanguageContext";
import { useLanguage } from "@/context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const currentLanguage = LANGUAGES.find((lang) => lang.code === language);

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/ancient-texture.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <View
          className="flex-1 bg-black/10 justify-center px-6"
          style={{ paddingTop: top, paddingBottom: bottom }}
        >
          <View className="flex-1 justify-center items-center px-6">
            {/* App Title */}
            <View className="mb-12 items-center">
              <Text className="text-6xl font-qs-bold text-yellow-700 mb-2">
                {t("app.title")}
              </Text>
              <Text className="text-2xl text-amber-800 font-qs-medium">
                {t("app.subtitle")}
              </Text>
            </View>

            {/* Description */}
            <Text className="text-center text-amber-900 font-qs-regular text-base mb-12 leading-relaxed">
              {t("home.description")}
            </Text>

            {/* Language Selection Dropdown */}
            <View className="w-full mb-8">
              <Text className="text-xl font-qs-bold text-amber-900 mb-4 text-center">
                {t("language.select")}
              </Text>

              <Pressable
                onPress={() => setShowLanguageDropdown(true)}
                className="w-full bg-amber-50 border-3 border-yellow-700 rounded-xl p-4 flex-row items-center justify-between active:bg-yellow-100"
                android_ripple={{ color: "#fcd34d" }}
              >
                <View>
                  <Text className="text-lg font-qs-bold text-amber-900">
                    {currentLanguage?.nativeName}
                  </Text>
                  <Text className="text-sm font-qs-regular text-amber-700">
                    {currentLanguage?.name}
                  </Text>
                </View>
                <Text className="text-yellow-700 text-2xl font-qs-bold">▼</Text>
              </Pressable>
            </View>

            {/* Explore Button */}
            <Pressable
              onPress={() => router.push("/chapters")}
              className="w-full bg-yellow-700 py-4 rounded-xl active:bg-amber-900"
              android_ripple={{ color: "#fcd34d" }}
            >
              <Text className="text-amber-50 text-lg font-qs-bold text-center">
                {t("chapters.title")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      {/* Language Dropdown Modal */}
      <Modal
        visible={showLanguageDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageDropdown(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center items-center"
          onPress={() => setShowLanguageDropdown(false)}
        >
          <View
            className="bg-amber-50 rounded-2xl w-4/5 max-h-96 border-3 border-yellow-700"
            onStartShouldSetResponder={() => true}
            onTouchEndCapture={() => {}}
          >
            <View className="border-b-3 border-yellow-700 p-4 bg-yellow-700">
              <Text className="text-xl font-qs-bold text-amber-50 text-center">
                {t("language.select")}
              </Text>
            </View>

            <FlatList
              data={LANGUAGES}
              renderItem={({ item }) => {
                const isSelected = language === (item.code as Language);
                return (
                  <Pressable
                    onPress={async () => {
                      await AsyncStorage.setItem("language_selected", "true");
                      await AsyncStorage.setItem("language", item.code);
                      setLanguage(item.code as Language);
                      setShowLanguageDropdown(false);
                    }}
                    className={`px-4 py-3 border-b border-yellow-200 flex-row items-center justify-between ${
                      isSelected ? "bg-yellow-100" : "bg-amber-50"
                    }`}
                    android_ripple={{
                      color: "#fef3c7",
                    }}
                  >
                    <View className="flex-1">
                      <Text
                        className={`font-qs-bold ${
                          isSelected ? "text-yellow-700" : "text-amber-900"
                        }`}
                      >
                        {item.nativeName}
                      </Text>
                      <Text className="text-xs font-qs-regular text-amber-700">
                        {item.name}
                      </Text>
                    </View>
                    {isSelected && (
                      <View className="w-5 h-5 bg-yellow-700 rounded-full ml-2" />
                    )}
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.code}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
