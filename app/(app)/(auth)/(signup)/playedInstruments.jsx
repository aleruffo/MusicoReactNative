import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { React, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import FormField from '../../../../components/FormField';
import Button from '../../../../components/Button';
import AutocompleteField from '../../../../components/AutocompleteField';
import InstrumentCard from '../../../../components/InstrumentCard';
import { AuthContext } from '../../../../context/authContext';

const PlayedInstrumentsSection = ({ user, setUser }) => {
  const { state } = useContext(AuthContext);
  const navigation = useNavigation();
  const [instrument, setinstrument] = useState('');
  const [instrumentsList, setinstrumentsList] = useState([]);

  const fetchInstruments = async () => {
    try {
      const response = await fetch('http://204.216.223.231:8080/user/data/instruments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      const data = await response.json().then((data) => {
        console.log('FETCH INSTRUMENTS: ', data);
        setinstrumentsList(data);
        console.log('Instruments list: ', instrumentsList);
      });
    } catch (e) {
      console.log('Error fetching instruments: ', e);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, []);

  const handleAddInstrument = () => {
    if (instrument.trim() !== '') {
      setUser((user) => ({
        ...user,
        instruments: [...user.instruments, instrument],
      }));
      setinstrument('');
    }
  };

  const handleDeleteInstrument = (instrument) => {
    setUser((user) => ({
      ...user,
      instruments: user.instruments.filter((g) => g !== instrument),
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
          {user.instruments.map((instrument, index) => (
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
