import { View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { React, useState } from 'react';
import FormField from '../../../../components/FormField';
import CheckBox from '@react-native-community/checkbox';

const AccountInfoSection = ({ user, setUser }) => {
  const [checked, setChecked] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const passwordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
    } else {
      setUser({
        ...user,
        accountInfo: {
          ...user.accountInfo,
          password: password,
        },
      });
      setErrorText('');
      console.log('Password match');
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="grow">
          <FormField
            title="Location"
            value={user.location}
            onChangeText={(e) =>
              setUser({
                ...user,
                location: e,
              })
            }
            otherStyles="mt-2"
            placeholder={'Berlin, Germany'}
          />
          <FormField
            title="Description"
            value={user.description}
            onChangeText={(e) =>
              setUser({
                ...user,
                description: e,
              })
            }
            otherStyles="mt-2 mb-4"
            placeholder={'I am a musician...'}
            multiline={true}
          />
          {/* <FormField
            title="Email"
            placeholder="Enter your email"
            otherStyles="mt-2"
            onChangeText={(e) =>
              setUser({
                ...user,
                accountInfo: {
                  ...user.accountInfo,
                  email: e,
                },
              })
            }
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            otherStyles="mt-2"
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
          <FormField
            title="Confirm Password"
            placeholder="Confirm your password"
            otherStyles="mt-2"
            onChangeText={(e) => {
              setConfirmPassword(e);
              passwordMatch(password, e);
            }}
            value={confirmPassword}
            supportText={errorText}
          /> */}
          <View className="flex-row pt-4 gap-3 items-center w-full">
            <CheckBox
              value={checked}
              onValueChange={setChecked}
              tintColors={{ true: '#F42D78', false: '#F0ECF7' }}
              tintColor="rgb(156 163 175)"
              onCheckColor="#F42D78"
              onTintColor="#F42D78"
              animationDuration={0.3}
            />
            <Text className="text-gray-400 text-sm font-pregular">
              I confirm that I have read, consent and agree to Musico’s{' '}
              <Text className="text-accent">Terms of Service</Text> and{' '}
              <Text className="text-accent">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AccountInfoSection;
