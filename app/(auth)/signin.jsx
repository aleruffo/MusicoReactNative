import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { React, useState } from 'react';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    console.log('Logging in...');
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
              <View className="w-full h-full px-4 my-6 justify-between">
                <Text className="text-4xl font-pbold text-text text-center mt-16">
                  Log in to {'\n'}Musico
                </Text>
                <View className="mb-20">
                  <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    otherStyles=""
                    placeholder={'Enter your email'}
                    keyboardType="email-address"
                  />
                  <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    otherStyles="mt-2"
                    placeholder={'Enter your password'}
                  />
                  <Button
                    title="Log in"
                    containerStyles="bg-accent mt-12"
                    textStyles="text-xl font-pbold"
                    handlePress={() => handleLogin()}
                    isLoading={isSubmitting}
                  />
                  <View className="flex-row justify-center items-center mt-4">
                    <Text className="text-text font-psemibold text-lg">Don't have an account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.push('signup');
                      }}
                    >
                      <Text className="text-accent font-psemibold text-lg ml-2">Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
