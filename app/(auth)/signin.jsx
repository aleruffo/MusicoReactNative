import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { React, useState } from 'react'
import Button from '../../components/Button'
import {Link} from 'expo-router'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = () => {
    console.log('Logging in...')
  }


  return (
    <>
    <ImageBackground source={require('../../assets/images/splashscreen.png')} className="h-full w-full">
    <TouchableWithoutFeedback className="h-full w-full" onPress={Keyboard.dismiss} >

      <SafeAreaView className="h-full bg-background">
        <View className="w-full h-full px-4 my-6 align-bottom">
          <Text className="text-4xl font-pbold text-text text-center ">Log in to {'\n'}Musico</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-6"
            placeholder={'Enter your email'}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-6"
            placeholder={'Enter your password'}
          />
          <Button
            title="Log in"
            containerStyles="mt-6 bg-accent mt-14"
            textStyles="text-xl font-pbold"
            handlePress={() => handleLogin()}
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-text font-psemibold text-lg">Don't have an account?</Text>
            <Link href="/signup" className="text-accent font-psemibold text-lg ml-2">Sign up</Link>
          </View>

        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback> 
    </ImageBackground>
    </>
  )
}

export default SignIn