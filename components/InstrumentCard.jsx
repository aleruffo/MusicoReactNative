import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';

const InstrumentCard = ({ instrument, onDelete }) => {
  function generateRandomDarkColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

  return (
    <View
      className="flex-row justify-between items-center rounded-[15px] p-4 mb-2 bg-secondary-opacity25"
      //style={{ backgroundColor: generateRandomDarkColor() }}
    >
      <Icon name="music-note" type="material" color="#fff" />
      <Text className="text-text font-psemibold text-lg">{instrument}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="delete" type="material" color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

export default styled(InstrumentCard);
