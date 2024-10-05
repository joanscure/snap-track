import { AuthContext } from "@/core/contexts/AuthContext";

import { router, Slot, SplashScreen, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();
export const MainNavigation = ({ fontsLoaded }: { fontsLoaded: boolean }) => {
  const { userToken, loading } = useContext(AuthContext);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded && !loading) {
      setIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  useEffect(() => {
    if (!isReady) return;
    const url = userToken ? "/(tabs)" : "/(auth)";
    router.replace(url);
  }, [isReady, userToken]);

  if (!isReady) {
    return <Slot />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
