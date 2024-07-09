import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  WebBrowser.maybeCompleteAuthSession();
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashscreen.png')}
        className="h-full w-full"
      >
        <SafeAreaView className="h-full bg-background">
          <View className="w-full h-full justify-end items-center px-4 pb-[69px]">
            <Text className="text-4xl font-pbold text-text text-center">
              Discover a new dimension for music collaboration.
            </Text>
            <Button
              title="Enter MusicoNet"
              handlePress={() => {
                router.replace('signin');
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
