import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon, Image } from 'react-native-elements';
import { BlurView } from 'expo-blur';

const UserCard = ({ user }) => {
  return (
    <TouchableOpacity className="rounded-3xl bg-secondary-opacity50 mb-4">
      <View className="relative ">
        <Image source={{ uri: user.profilePicture }} className="w-full h-48 rounded-3xl" />

        <BlurView className="absolute bottom-2 left-2 p-4 rounded-full overflow-hidden bg-background-opacity50">
          <Text className="text-text font-psemibold">@{user.username}</Text>
        </BlurView>
        <TouchableOpacity className="absolute bottom-2 right-2 ">
          <BlurView className="p-4 rounded-full overflow-hidden bg-background-opacity50">
            <Icon name="chat-bubble" type="material" color="#F0ECF7" />
          </BlurView>
        </TouchableOpacity>
      </View>
      <View className="p-4 flex-row justify-between">
        <View className="flex-row items-center">
          <View className="p-1 rounded-full overflow-hidden bg-primary-opacity50 mr-2">
            <Icon name={user.mainInstrument} type="material" color={'#F0ECF7'} />
          </View>
          <Text className="text-text text-xl font-pbold">
            {user.name}, {user.age}
          </Text>
        </View>

        <View className="flex-row items-center ">
          <Icon name="location-on" type="material" color="#fff" />
          <Text className="text-text text-base font-psemibold ml-1">{user.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
