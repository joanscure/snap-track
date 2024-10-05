import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LoadingProvider } from "@/core/contexts/loading-context/loading-context";
import LoadingOverlay from "@/core/contexts/loading-context/loading-overlay";
import ToastOverlay from "@/core/contexts/loading-context/toast";
import { AuthProvider } from "@/core/contexts/AuthContext";
import { MainNavigation } from "@/components/MainNavigation";
import { UserProvider } from "@/core/contexts/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
    <SafeAreaProvider>
      <UserProvider>
        <AuthProvider>
          <LoadingProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <MainNavigation fontsLoaded={fontsLoaded} />
            </ThemeProvider>
            <LoadingOverlay />
            <ToastOverlay />
          </LoadingProvider>
        </AuthProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
