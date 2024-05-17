import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Icon } from 'react-native-elements';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  supportText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className={`space-y-1 ${otherStyles}`}>
        <Text className="font-pbold text-lg text-text">{title}</Text>
        <View className="w-full bg-secondary-opacity25 rounded-[15px] focus:border-2 focus:border-secondary-default justify-center">
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            placeholderTextColor="#A1A1A1"
            className="px-4 text-text font-pmedium text-base py-3"
            secureTextEntry={
              (title === 'Password' || title === 'Confirm Password') && !showPassword
            }
            autoCorrect={false}
            {...props}
          />

          {(title === 'Password' || title === 'Confirm Password') && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4"
            >
              {showPassword ? (
                <Icon name="visibility-off" color="#F0ECF7" />
              ) : (
                <Icon name="visibility" color="#F0ECF7" />
              )}
            </TouchableOpacity>
          )}
        </View>
        {supportText && <Text className="text-red-500 font-pregular text-sm">{supportText}</Text>}
      </View>
    </>
  );
};

export default FormField;
