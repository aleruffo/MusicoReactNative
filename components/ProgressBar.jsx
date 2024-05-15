import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({ step, totalSteps }) => {
  const widthAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: parseInt((step / totalSteps) * 100),
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false, // Make sure to set this to false for React Native
    }).start();
  }, [step, totalSteps, widthAnimation]);

  if (step === 0) step = 0.2;
  return (
    <View className="h-3 w-full bg-secondary-opacity25 rounded-full mb-4">
      <Animated.View
        className={`h-3 bg-accent rounded-full `}
        style={{
          width: widthAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      >
        <LinearGradient
          colors={['#F42D78', '#6E31D8']}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 999,
          }}
        />
      </Animated.View>
      <Text className="text-text font-pregular text-base mb-2">{step}/5</Text>
    </View>
  );
};

export default ProgressBar;
