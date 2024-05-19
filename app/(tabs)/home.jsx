import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserCard from '../../components/UserCard';

const user = [
  {
    name: 'John Doe',
    username: 'johndoe',
    profilePicture: 'https://i.pravatar.cc/',
    location: 'New York',
    age: 25,
    mainInstrument: 'piano',
  },
  {
    name: 'Jane Doe',
    username: 'janedoe',
    profilePicture: 'https://i.pravatar.cc/',
    location: 'Los Angeles',
    age: 22,
    mainInstrument: 'headphones',
  },
  {
    name: 'Alice Doe',
    username: 'alicedoe',
    profilePicture: 'https://i.pravatar.cc/',
    location: 'Chicago',
    age: 27,
    mainInstrument: 'mic-external-on',
  },
];

const Home = () => {
  return (
    <ScrollView className="bg-background-default">
      <SafeAreaView className="p-4 bg-background-default h-full">
        <Text className="text-text text-3xl font-pbold">Feed</Text>
        <View className="mt-4">
          <UserCard user={user[0]} />
          <UserCard user={user[1]} />
          <UserCard user={user[2]} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
