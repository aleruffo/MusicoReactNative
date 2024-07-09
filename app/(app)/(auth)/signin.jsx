import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../../context/authContext';
import AnimatedLoader from 'react-native-animated-loader';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const { signIn, checkUserProfile, state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      console.log('Starting sign-in process...');
      const signInResult = await signIn();
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckUserProfile = async () => {
    const { exists } = await checkUserProfile();
    console.log('User profile exists:', exists);

    if (exists) {
      console.log('Navigating to home...');
      router.replace('home');
    } else {
      console.log('Navigating to signup...');
      router.replace('signup');
    }
  };

  useEffect(() => {
    console.log('Checking user profile...');
    if (state.isSignedIn) handleCheckUserProfile();
  }, [state.isSignedIn]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AnimatedLoader
          visible={true}
          source={require('../../../assets/load_animation.json')}
          animationStyle={{ width: 300, height: 300 }}
          speed={0.5}
        >
          <Text className="text-text font-semibold text-lg">Loading...</Text>
        </AnimatedLoader>
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/splashscreen.png')}
        className="h-full w-full"
      >
        <TouchableWithoutFeedback className="h-full w-full" onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <SafeAreaView className="h-full bg-background">
              <View className="flex-1 justify-center items-center">
                <TouchableOpacity
                  onPress={handleSignIn}
                  className="bg-primary py-3 px-6 rounded-full"
                >
                  <Text className="text-white font-semibold text-lg">Sign In</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <StatusBar style="light" />
    </>
  );
};

export default SignIn;
