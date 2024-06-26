import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { AuthProvider, AuthContext } from '../context/authContext';
import { useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const { state, signIn, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (state.isSignedIn) {
      console.log(state);
      router.push('home');
    }
  }, [state.isSignedIn]); // Questo useEffect si attiva solo quando state.isSignedIn cambia

  WebBrowser.maybeCompleteAuthSession();
  return (
    <>
      <ImageBackground
        source={require('../assets/images/splashscreen.png')}
        className="h-full w-full"
      >
        <SafeAreaView className="h-full bg-background">
          <View className="w-full h-full justify-end items-center px-4 pb-[69px]">
            <Text className="text-4xl font-pbold text-text text-center">
              Discover a new dimension for music collaboration.
            </Text>
            <Button
              title="Let's get started"
              handlePress={() => {
                signIn();
                router.push('signin');
              }}
              containerStyles="mt-32 w-full bg-opacity-30"
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
      <StatusBar style="light " />
    </>
  );
}
