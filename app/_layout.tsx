// app/_layout.tsx
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./globals.css";
import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "@/components/DrawerContent";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    "Quicksand-Bold": require("@/assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("@/assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Medium": require("@/assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("@/assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Light": require("@/assets/fonts/Quicksand-Light.ttf"),
    "Kalam-Regular": require("@/assets/fonts/hindi/Kalam-Regular.ttf"),
    "Kalam-Bold": require("@/assets/fonts/hindi/Kalam-Bold.ttf"),
    "Kalam-Light": require("@/assets/fonts/hindi/Kalam-Light.ttf"),
  });

  const [languageLoaded, setLanguageLoaded] = useState(false);
  useEffect(() => {
    if (fontsError) throw fontsError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsError, fontsLoaded]);

  useEffect(() => {
    const loadLanguage = async () => {
      setLanguageLoaded(true);
      const done = await AsyncStorage.getItem("language_selected");
      if (done) {
        // Redirect to onboarding if language not selected
        router.push("/chapters");
      }
    };
    loadLanguage();
  }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  if (!languageLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <ThemeProvider>
         <LanguageProvider>
           <Drawer
             screenOptions={{
               headerShown: false,
               drawerType: "slide", // smooth slide
               swipeEdgeWidth: 40, // swipe from left
               overlayColor: "rgba(0,0,0,0.6)",
               drawerStyle: {
                 width: 300,
                 backgroundColor: "#111827",
               },
               
             }}
             drawerContent={() => <DrawerContent />}
             
           >
             <Drawer.Screen name="index" />
             <Drawer.Screen name="chapters" />
             <Drawer.Screen name="verses/[chapterId]" />
             <Drawer.Screen name="verse-detail/[verseId]" />
           </Drawer>
         </LanguageProvider>
       </ThemeProvider>
     </GestureHandlerRootView>
   );
}
