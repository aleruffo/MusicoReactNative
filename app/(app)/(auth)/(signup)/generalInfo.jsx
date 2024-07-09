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
import FormField from '../../../../components/FormField';
import DatePicker from 'react-native-date-picker';

const GeneralInfoSection = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  var [isDateSelected, setIsDateSelected] = useState(false);

  const handlePress = () => {
    setOpen(true);
    setIsDateSelected(true);
  };

  return (
    <View className="bg-background-default grow">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* <Text className="font-pbold text-lg text-text mt-2  mb-1">Birth date</Text>
          <TouchableOpacity
            className="w-full bg-secondary-opacity25 h-14 rounded-[15px]"
            title="Select Birth Date"
            onPress={() => handlePress()}
          >
            <Text
              className={`font-pmedium text-lg px-4 pt-4 focus:text-text`}
              style={isDateSelected ? { color: '#F0ECF7' } : { color: '#A1A1A1' }}
            >
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
          /> */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GeneralInfoSection;
