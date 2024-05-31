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

const SignIn = () => {
  const [cookies, setCookies] = useState([]);

  const clearCookies = () => {
    setCookies([]);
  };

  // Clear cookies when the component is mounted
  useEffect(() => {
    clearCookies();
    console.log('len', cookies.length);
  }, []);

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
                {cookies.length < 2 ? (
                  <>
                    <WebView
                      source={{
                        uri: 'http://204.216.223.231:8080/realms/musico-realm/account',
                      }}
                      onMessage={(event) => {
                        const receivedCookies = event.nativeEvent.data.split(';');
                        setCookies(receivedCookies);
                        console.log(receivedCookies);
                      }}
                      injectedJavaScript={`
                        window.ReactNativeWebView.postMessage(document.cookie);
                        true; 
                      `}
                    />
                  </>
                ) : (
                  <>
                    <Text className="text-center text-white text-2xl font-psemibold mb-8">
                      Entering Musico...
                    </Text>
                    <ActivityIndicator size="large" color="#fff" />
                    <TouchableOpacity
                      className="absolute bottom-0 right-0 p-4"
                      onPress={() => router.push('home')}
                    >
                      <Text className="text-white">Go Home</Text>
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
