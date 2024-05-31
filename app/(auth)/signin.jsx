import React, { useState, useEffect } from 'react';
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
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ logout }) => {
  const [cookies, setCookies] = useState([]);

  const clearCookies = async () => {
    setCookies([]);
    AsyncStorage.removeItem('clientId');
    console.log('[CLEAR COOKIES] Cookies:', cookies);
    setLoadLogin(true);
  };

  if (logout) {
    clearCookies();
  }

  const [loadLogin, setLoadLogin] = useState(true);

  // Clear cookies when the component is mounted
  // useEffect(() => {
  //   clearCookies();
  // }, []);

  const onMessage = async (receivedCookies) => {
    try {
      setCookies(receivedCookies);
      await AsyncStorage.setItem('clientId', receivedCookies[0]);
    } catch (e) {
      // saving error
    }
    console.log('[ON MESSAGE] Received Cookies:', receivedCookies);
    if (receivedCookies != '') {
      setLoadLogin(false);
    }
  };

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
              <View className="w-full h-full justify-center">
                {loadLogin ? (
                  <>
                    <WebView
                      source={{
                        uri: 'http://204.216.223.231:8080/realms/musico-realm/account',
                      }}
                      onMessage={(event) => {
                        const receivedCookies = event.nativeEvent.data.split(';');
                        onMessage(receivedCookies);
                      }}
                      injectedJavaScript={`
                        window.ReactNativeWebView.postMessage(document.cookie);
                        true; 
                      `}
                      cacheEnabled={false}
                      incognito={true}
                    />
                  </>
                ) : (
                  <>
                    <Text className="text-center text-white text-2xl font-psemibold mb-8">
                      Entering Musico...
                    </Text>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text className="text-center text-white text-lg font-psemibold mt-8">
                      {cookies[0]}
                    </Text>
                    <TouchableOpacity
                      className="absolute bottom-0 right-0 p-4"
                      onPress={() => {
                        router.push('home');
                      }}
                    >
                      <Text className="text-white">Go Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="absolute bottom-0 left-32 p-4"
                      onPress={() => {
                        clearCookies();
                      }}
                    >
                      <Text className="text-white">CC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="absolute bottom-0 left-0 p-4"
                      onPress={() => router.push('signup')}
                    >
                      <Text className="text-white">Go register</Text>
                    </TouchableOpacity>
                  </>
                )}
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
