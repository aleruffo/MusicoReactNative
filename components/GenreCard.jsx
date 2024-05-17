import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';

const GenreCard = ({ genre, onDelete }) => {
  function generateRandomDarkColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

  console.log(generateRandomDarkColor());
  return (
    <View
      className="flex-row justify-between items-center rounded-[15px] p-4 mb-2"
      style={{ backgroundColor: generateRandomDarkColor() }}
    >
      <Text className="text-white font-psemibold text-lg">{genre}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Icon name="delete" type="material" color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

export default styled(GenreCard);
