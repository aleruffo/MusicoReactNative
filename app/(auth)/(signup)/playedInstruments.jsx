import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

const PlayedInstrumentsSection = () => {
  const navigation = useNavigation();
  const [instrument, setinstrument] = useState('');

  return (
    <>
      <View className="grow">
        <FormField
          title="Played Instruments"
          value={instrument}
          onChangeText={(e) =>
            setinstrument({
              ...instrument,
              instrument: e,
            })
          }
          otherStyles="mb-4 mt-2"
          placeholder={'Guitar, Piano, Drums ...'}
        />
        <Button
          title="Add +"
          handlePress={() => console.log('Add instrument')}
          containerStyles="bg-secondary-default"
          textStyles="text-text font-psemibold text-lg"
        />
      </View>
    </>
  );
};

export default PlayedInstrumentsSection;
