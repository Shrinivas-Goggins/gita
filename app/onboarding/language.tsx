import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function LanguageScreen() {
  const selectLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    await AsyncStorage.setItem("onboarding_done", "true");

    router.replace("/");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Select Language</Text>

      <Button title="English" onPress={() => selectLanguage("en")} />
      <Button title="Hindi" onPress={() => selectLanguage("hi")} />
    </View>
  );
}
