import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Ai = () => {
  return (
    <SafeAreaView className="p-4 bg-background-default h-full">
      <Text className="text-text text-3xl font-pbold">AI</Text>
    </SafeAreaView>
  );
};

export default Ai;
