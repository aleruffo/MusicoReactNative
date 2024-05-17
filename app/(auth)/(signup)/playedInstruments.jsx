import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import AutocompleteField from '../../../components/AutocompleteField';
import InstrumentCard from '../../../components/InstrumentCard';

const PlayedInstrumentsSection = ({ user, setUser }) => {
  const navigation = useNavigation();
  const [instrument, setinstrument] = useState('');

  const instrumentsList = [
    'Guitar',
    'Piano',
    'Violin',
    'Drums',
    'Bass',
    'Saxophone',
    'Trumpet',
    'Flute',
    'Cello',
    'Clarinet',
    'Harp',
    'Mandolin',
    'Banjo',
    'Accordion',
    'Ukulele',
    'Trombone',
    'Oboe',
    'Synthesizer',
  ];

  const handleAddInstrument = () => {
    if (instrument.trim() !== '') {
      setUser((user) => ({
        ...user,
        playedInstruments: [...user.playedInstruments, instrument],
      }));
      setinstrument('');
    }
  };

  const handleDeleteInstrument = (instrument) => {
    setUser((user) => ({
      ...user,
      playedInstruments: user.playedInstruments.filter((g) => g !== instrument),
    }));
  };

  return (
    <>
      <View className="grow">
        <Text className="text-text font-pbold text-lg mt-2 mb-1">Played Instruments</Text>
        <AutocompleteField
          data={instrumentsList}
          placeholder="Guitar, Piano, Violin, etc."
          onChangeText={(text) => setinstrument(text)}
          value={instrument}
        />
        <Button
          title="Add +"
          handlePress={() => handleAddInstrument()}
          containerStyles="bg-secondary-default"
          textStyles="text-text font-psemibold text-lg"
        />
        <View className="mt-5">
          {user.playedInstruments.map((instrument, index) => (
            <InstrumentCard
              key={index}
              instrument={instrument}
              onDelete={() => handleDeleteInstrument(instrument)}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default PlayedInstrumentsSection;
