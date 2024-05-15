import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const Rootlayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Goldplay-Regular': require('../assets/fonts/Goldplay-Regular.ttf'),
    'Goldplay-Thin': require('../assets/fonts/Goldplay-Thin.ttf'),
    'Goldplay-Light': require('../assets/fonts/Goldplay-Light.ttf'),
    'Goldplay-Medium': require('../assets/fonts/Goldplay-Medium.ttf'),
    'Goldplay-SemiBold': require('../assets/fonts/Goldplay-SemiBold.ttf'),
    'Goldplay-Bold': require('../assets/fonts/Goldplay-Bold.ttf'),
    'Goldplay-Black': require('../assets/fonts/Goldplay-Black.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="light" />
    </>
  );
};

export default Rootlayout;
