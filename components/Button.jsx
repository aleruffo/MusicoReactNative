import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        className={`bg-background-opacity50 rounded-2xl min-h-[60px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={isLoading}
    >
        <Text className={`text-text font-psemibold text-xl ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default Button