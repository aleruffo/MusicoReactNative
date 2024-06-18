import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const Events = () => {
  return (
    <SafeAreaView className="p-4 bg-background-default h-full">
      <View className="flex-row justify-between items-center">
        <Text className="text-text text-3xl font-pbold">Events</Text>
        <TouchableOpacity>
          <Icon name="library-add" type="material" color="#fff" />
        </TouchableOpacity>
      </View>
      <Text className="text-text text-xl font-psemibold mt-4">My events</Text>
      <View className="flex-row justify-between items-center bg-secondary-opacity50 p-4 rounded-2xl mt-4"></View>
      <Text className="text-text text-xl font-psemibold mt-4">Public events</Text>
      <View className="flex-row justify-between items-center bg-secondary-opacity50 p-4 rounded-2xl mt-4"></View>
      <Text className="text-text text-xl font-psemibold mt-4">"Looking for" events</Text>
      <View className="flex-row justify-between items-center bg-secondary-opacity50 p-4 rounded-2xl mt-4"></View>
    </SafeAreaView>
  );
};

export default Events;
