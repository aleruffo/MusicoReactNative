import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'


const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
        <View className={`space-y-1 ${otherStyles}`}>
            <Text className="font-pbold text-lg text-text">{title}</Text>
            <View className="w-full h-14 bg-secondary-opacity25 rounded-[15px] focus:border-2 focus:border-secondary-default justify-center">
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    placeholderTextColor="#A1A1A1"
                    className="px-4 text-text font-pmedium text-lg h-full"
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4">
                        <Text className="font-pmedium text-lg text-text">{showPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
        </>
    )
}

export default FormField