import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import FormField from '../../../components/FormField';

const AccountInfoSection = () => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="grow">
          <FormField title="Email" placeholder="Enter your email" otherStyles="mt-2" />
          <FormField title="Password" placeholder="Enter your password" otherStyles="mt-2" />
          <FormField
            title="Confirm Password"
            placeholder="Confirm your password"
            otherStyles="mt-2"
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AccountInfoSection;
