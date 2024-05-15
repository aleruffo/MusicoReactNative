import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

const AudioCard = ({ title, duration, onDelete }) => {
  return (
    <View className="bg-secondary-opacity25 rounded-2xl mt-2 p-4">
      <TextInput
        value={title}
        className="text-text font-psemibold text-base bg-secondary-opacity25 h-10 rounded-xl px-4 mb-2"
      />
      <View className="flex-row items-center">
        <TouchableOpacity className="mr-3">
          <Icon name="play-arrow" type="material" color="rgb(240 236 247)" />
        </TouchableOpacity>
        <View className="flex-1 h-1 bg-text rounded-lg mr-3" />
        <Text className="text-text mr-3">{duration || '25 s'}</Text>
        <TouchableOpacity className="p-1" onPress={onDelete}>
          <Icon name="delete" type="material" color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioCard;
