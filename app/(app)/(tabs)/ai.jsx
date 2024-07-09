import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import osc from 'expo-osc';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StompJS from '@stomp/stompjs';
import { TextDecoder, TextEncoder } from 'text-encoding';
import AudioUpload from '../../../components/AudioUpload';
import { AuthContext } from '../../../context/authContext';

global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;

const Ai = () => {
  //const [stompClient, setStompClient] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const { state } = useContext(AuthContext);
  const [results, setResults] = useState(
    'Mood: happy\n' +
      'Danceability = high\n' +
      'BPM: 115\n' +
      'Key: G major\n' +
      'Tuning: A = 432 Hz'
  );

  const connect = async () => {
    const ws = new WebSocket('ws://204.216.223.231:8080/analysis', [], {
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    const client = new StompJS.Client({
      webSocketFactory: () => ws,
      debug: (msg) => {
        console.log(msg);
      },
      reconnectDelay: null,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.onConnect = function (frame) {
      //console.log('Connected: ' + frame);

      client.subscribe('/user/queue/analysis/result', function (message) {
        console.log('Received: ' + message.body);
        setResults(message.body);
      });
      //client.publish({ destination: '/test', body: 'Hello, STOMP' });
    };
    client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    client.onWebSocketClose = function (evt) {
      console.log('Websocket closed!');
      console.log(evt);
    };
    client.activate();
  };

  const portOut = 5005;
  const address = 'localhost';
  let clientId = '';

  useEffect(() => {
    osc.createClient(address, portOut);
  }, []);

  const sendStart = async () => {
    setIsRecording(true);
    let value = '';
    try {
      value = await AsyncStorage.getItem('clientId');
      if (value !== null) {
        const parts = value.split('/');
        clientId = parts[1];
        osc.sendMessage(`/${clientId}/`, [true]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendStop = () => {
    osc.sendMessage(`/${clientId}/`, [false]);
    setIsRecording(false);
  };

  return (
    <SafeAreaView className="p-4 bg-background-default h-full">
      <Text className="text-text text-3xl font-pbold">Music Insight </Text>

      {!isRecording ? (
        <TouchableOpacity
          onPress={sendStart}
          className="bg-secondary-opacity50 p-4 rounded-2xl my-4 flex-row justify-between items-center"
        >
          <Text className="text-white font-pmedium">Start Recording (SMART INSTRUMENT)</Text>
          <Icon name="radio-button-checked" type="material" color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={sendStop}
          className="bg-primary-default p-4 rounded-2xl my-4 flex-row justify-between items-center"
        >
          <Text className="text-white font-pmedium">Stop Recording (SMART INSTRUMENT)</Text>
          <Icon name="stop-circle" type="material" color="white" />
        </TouchableOpacity>
      )}

      <AudioUpload />
      {/* <V/.. */}
      <Text className="text-text text-lg font-pbold mt-4">Analysis results</Text>
      <View className="bg-secondary-opacity25 p-4 rounded-2xl mt-2">
        <Text className="text-text text-base font-pmedium">{results}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Ai;
