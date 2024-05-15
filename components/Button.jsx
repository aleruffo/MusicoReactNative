import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const Button = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  haveSubtext,
  subtext,
  hasIcon,
  icon,
}) => {
  return (
    <TouchableOpacity
      className={`bg-background-opacity50 rounded-2xl py-3 justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <View className="flex-row">
        {hasIcon ? <Icon name={icon} size={24} color="#F0ECF7" className="mr-2" /> : null}
        <Text className={`text-text font-psemibold text-xl ${textStyles}`}>{title}</Text>
      </View>
      {haveSubtext ? (
        <Text className="text-text font-pregular text-sm text-center mt-2">{subtext}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
