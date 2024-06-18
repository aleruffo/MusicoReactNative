import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import osc from 'react-native-osc';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StompJS from '@stomp/stompjs';
import { TextDecoder, TextEncoder } from 'text-encoding';
import AudioUpload from '../../components/AudioUpload';

global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;

const Ai = () => {
  //const [stompClient, setStompClient] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const connect = async () => {
    const keycloak_cookie = await AsyncStorage.getItem('clientId');
    const ws = new WebSocket('http://204.216.223.231:9095/analysis', [], {
      headers: {
        Cookie: sessionCookie,
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
      console.log('Connected: ' + frame);

      client.subscribe('/user/topic/result', function (message) {
        console.log(message.body);
      });
      client.publish({ destination: '/test', body: 'Hello, STOMP' });
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

  // const [stompClient, setStompClient] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);

  // const connect = async () => {
  //   const url = 'http://204.216.223.231:9095/analysis';
  //   const keycloak_cookie = await AsyncStorage.getItem('clientId');

  //   if (!keycloak_cookie) {
  //     return;
  //   }

  //   const headers = {
  //     Cookie: keycloak_cookie,
  //   };

  //   const client = new Client({
  //     brokerURL: url,
  //     connectHeaders: headers,
  //     debug: (str) => {
  //       console.log(new Date(), str);
  //     },
  //     reconnectDelay: null,
  //     onConnect: () => {
  //       onConnected();
  //     },
  //     onStompError: (frame) => {
  //       console.error('Broker reported error: ' + frame.headers['message']);
  //       console.error('Additional details: ' + frame.body);
  //       onError(frame);
  //     },
  //     onWebSocketError: (error) => {
  //       console.error('WebSocket error: ' + error.message);
  //       onError(error);
  //     },
  //   });

  //   client.activate();
  //   setStompClient(client);
  // };

  // const onConnected = () => {
  //   setIsConnected(true);
  //   console.log('onConnected');
  //   stompClient.subscribe('/user/topic/result', onMessageReceived);
  // };

  // const onMessageReceived = (message) => {
  //   console.log('onMessageReceived');
  //   const payload = message.body;
  //   console.log(payload);
  // };

  // const onError = (error) => {
  //   console.error('STOMP error:', error);
  // };

  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.deactivate();
  //     setStompClient(null);
  //     setIsConnected(false);
  //     Alert.alert('Disconnected');
  //   }
  // };

  // const connect = async () => {
  //   const url = 'http://204.216.223.231:9095/analysis';
  //   const keycloak_cookie = await AsyncStorage.getItem('clientId');
  //   //const parts = keycloak_cookie.split('/');
  //   //const clientId = parts[1];
  //   const headers = {
  //     Cookie: keycloak_cookie,
  //   };

  //   const client = Stomp.client(url);
  //   client.connect(headers, onConnected, onError);
  //   setStompClient(client);
  // };

  // const onConnected = () => {
  //   alert('Connected');
  //   console.log('onConnected');
  //   stompClient.subscribe('/user/topic/result', onMessageReceived);
  //   stompClient.publish({
  //     destination: '/test',
  //     body: 'Hello World',
  //   });
  // };

  // const onMessageReceived = (payload) => {
  //   console.log('onMessageReceived');
  //   const message = payload.body;
  //   console.log(message);
  // };

  // const onError = (error) => {
  //   alert('Error');
  //   console.log('STOMP error:', error);
  // };

  // const disconnect = () => {
  //   if (stompClient) {
  //     stompClient.disconnect();
  //     setStompClient(null);
  //   }
  //   alert('Disconnected');
  // };

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
      <Text className="text-text text-3xl font-pbold">AI</Text>

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
      <View className="flex-row gap-4 mt-0">
        <TouchableOpacity
          onPress={connect}
          className="bg-secondary-opacity50 p-4 rounded-2xl flex-row justify-between items-center flex-1 border-dashed border-2 border-accent"
        >
          <Text className="text-white font-pmedium">Connect</Text>
          <Icon name="auto-awesome" type="material" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={null}
          className="bg-secondary-opacity50 p-4 rounded-2xl flex-row justify-between items-center flex-1 border-dashed border-2 border-accent"
        >
          <Text className="text-white font-pmedium">Disconnect</Text>
          <Icon name="auto-awesome" type="material" color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ai;
