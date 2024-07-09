import { router, Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../context/authContext';
import 'react-native-reanimated';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
