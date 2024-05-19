import { View, Text } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const TextandIconChip = ({ text, icon, chipStyle, textStyle }) => {
  return (
    <View className={`${chipStyle} rounded-full bg-secondary-opacity50 py-2 px-4 mr-2`}>
      <Text className={`${textStyle} text-text`}>{text}</Text>
      {icon && <Icon name={icon} />}
    </View>
  );
};

export default TextandIconChip;
