import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import UserCard from '../../../components/UserCard';

const users = [
  {
    name: 'Christina Joe',
    username: 'christina.joe',
    profilePicture: 'https://i.pravatar.cc/150?u=christina.joe',
    location: 'New York',
    age: 25,
    mainInstrument: 'piano',
  },
  {
    name: 'Angela Rossi',
    username: 'angyrossi76',
    profilePicture: 'https://i.pravatar.cc/150?u=angyrossi76',
    location: 'Los Angeles',
    age: 48,
    mainInstrument: 'headphones',
  },
  {
    name: 'Luke Ferris',
    username: 'ferris97',
    profilePicture: 'https://i.pravatar.cc/150?u=ferris97',
    location: 'Chicago',
    age: 27,
    mainInstrument: 'mic-external-on',
  },
];

const Home = () => {
  return (
    <SafeAreaView className="bg-background-default px-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-text text-3xl font-pbold">Feed</Text>
        <TouchableOpacity>
          <Icon name="search" type="material" color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="mt-4">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
