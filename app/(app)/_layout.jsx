import { Slot, Stack, useRouter } from 'expo-router';
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppLayout = () => {
  const { refreshToken } = useContext(AuthContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            router.replace('home');
            setIsLoggedIn(true);
          } else {
            router.replace('signin');
            setIsLoggedIn(false);
          }
        } else {
          router.replace('signin');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.warn('Error in auth check:', error);
        router.replace('signin');
        setIsLoggedIn(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   {isLoggedIn ? (
    //     <>
    //       <Stack.Screen name="(tabs)" />
    //     </>
    //   ) : (
    //     <>
    //       <Stack.Screen name="index" />
    //       <Stack.Screen name="(auth)" />
    //     </>
    //   )}
    // </Stack>
    <Slot />
  );
};

export default AppLayout;
