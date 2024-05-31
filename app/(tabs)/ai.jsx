import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import osc from 'react-native-osc';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ai = () => {
  var portOut = 5005;
  var address = 'localhost';
  var clientId = '';

  //create the client only once in componentDidMount
  useEffect(() => {
    //create the client only once when the component mounts
    osc.createClient(address, portOut);
  }, []);

  async function sendStart() {
    let value = '';
    try {
      value = await AsyncStorage.getItem('clientId');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
    let parts = value.split('/');
    clientId = parts[1];

    //send a message to the server
    osc.sendMessage('/' + clientId + '/', [true]);
  }

  function sendStop() {
    //send a message to the server
    osc.sendMessage('/' + clientId + '/', [false]);
  }

  return (
    <SafeAreaView className="p-4 bg-background-default h-full">
      <Text className="text-text text-3xl font-pbold">AI</Text>
      <TouchableOpacity
        onPress={() => {
          sendStart();
        }}
        className="bg-secondary-opacity50 p-4 rounded-2xl mt-4 flex-row justify-between items-center"
      >
        <Text className="text-white font-pmedium">Start Recording (SMART INSTRUMENT)</Text>
        <Icon name="graphic-eq" type="material" color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          sendStop();
        }}
        className="bg-secondary-opacity50 p-4 rounded-2xl mt-4 flex-row justify-between items-center"
      >
        <Text className="text-white font-pmedium">Stop Recording (SMART INSTRUMENT)</Text>
        <Icon name="stop" type="material" color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Ai;
