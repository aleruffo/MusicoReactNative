import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, ScrollView } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView  } from 'react-native-safe-area-context';
import Button from '../components/Button';

export default function App() {
  return (
    <>
    <ImageBackground source={require('../assets/images/splashscreen.png')} className="h-full w-full">
    <SafeAreaView className="h-full bg-background">

        <View className="w-full h-full justify-end items-center px-4 pb-[69px]">
            <Text className="text-4xl font-pbold text-text text-center">Discover a new dimension for music collaboration.</Text>
            <Button 
              title="Let's get started"
              handlePress={() => {router.push('/signin')}}
              containerStyles="mt-32 w-full bg-opacity-30"
            />
        </View>
      <StatusBar style="light " />

    </SafeAreaView>
      </ImageBackground>
    </>
  );
}