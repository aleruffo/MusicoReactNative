import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import FormField from '../../../components/FormField';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const GeneralInfoSection = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="bg-background-default grow">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <FormField
            title="Full Name"
            value={user.generalInfo.fullname}
            onChangeText={(e) =>
              setUser({
                ...user,
                generalInfo: {
                  ...user.generalInfo,
                  fullname: e,
                },
              })
            }
            otherStyles="mt-2"
            placeholder={'John Doe'}
          />

          <FormField
            title="Username"
            value={user.generalInfo.username}
            onChangeText={(e) =>
              setUser({
                ...user,
                generalInfo: {
                  ...user.generalInfo,
                  username: e,
                },
              })
            }
            otherStyles="mt-2"
            placeholder={'john_doe'}
          />
          <Text className="font-pbold text-lg text-text mt-2  mb-1">Birth date</Text>
          <TouchableOpacity
            className="w-full bg-secondary-opacity25 h-14 rounded-[15px]"
            title="Select Birth Date"
            onPress={() => setOpen(true)}
          >
            <Text className={`font-pmedium text-lg px-4 pt-4 focus:text-text text-[#A1A1A1]`}>
              {user.generalInfo.birthDate.toDateString()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            date={user.generalInfo.birthDate}
            open={open}
            onConfirm={(date) => {
              setUser({
                ...user,
                generalInfo: {
                  ...user.generalInfo,
                  birthDate: date,
                },
              });
              setOpen(false);
              isDateSelected = true;
            }}
            onCancel={() => setOpen(false)}
            mode="date"
            theme="dark"
            modal
            maximumDate={new Date()}
          />
          <FormField
            title="Location"
            value={user.generalInfo.location}
            onChangeText={(e) =>
              setUser({
                ...user,
                generalInfo: {
                  ...user.generalInfo,
                  location: e,
                },
              })
            }
            otherStyles="mt-2"
            placeholder={'Berlin, Germany'}
          />
          <FormField
            title="Description"
            value={user.generalInfo.description}
            onChangeText={(e) =>
              setUser({
                ...user,
                generalInfo: {
                  ...user.generalInfo,
                  description: e,
                },
              })
            }
            otherStyles="mt-2 mb-4"
            placeholder={'I am a musician...'}
            multiline={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GeneralInfoSection;
