import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { AuthContext } from '../../context/authContext';
import AnimatedLoader from 'react-native-animated-loader';

const SignIn = () => {
  const { state } = useContext(AuthContext);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (state.isSignedIn) {
      setVisible(false);
      router.push('home');
    }
  }, [state.isSignedIn]);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashscreen.png')}
        className="h-full w-full"
      >
        <TouchableWithoutFeedback className="h-full w-full" onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <SafeAreaView className="h-full bg-background">
              <AnimatedLoader
                visible={visible}
                style={{ color: '#fff' }}
                source={require('../../assets/load_animation.json')}
                animationStyle={{ width: 100, height: 100 }}
                speed={1}
              ></AnimatedLoader>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>

      <StatusBar style="light" />
    </>
  );
};

export default SignIn;
