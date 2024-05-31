import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';
import TextandIconChip from '../../components/TextandIconChip';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import ProfileAudioCard from '../../components/ProfileAudioCard';
import { router } from 'expo-router';

const profileImage = 'https://i.pravatar.cc/';
const username = 'andres_rossetti';
const location = 'Verona';
const description =
  'I like post-punk and alternative rock music. I’ve been playing the electric guitar for 15 years.';
const initialGenres = ['Alternative rock', 'Post-punk', 'World music'];
const initialInstruments = ['Goblet Drum', 'Drums', 'Acoustic guitar'];
const initialAuditionTracks = [
  { title: 'Song title', duration: '3:30' },
  { title: 'Song title', duration: '4:00' },
];

const Profile = () => {
  const [genres, setGenres] = useState(initialGenres);
  const [instruments, setInstruments] = useState(initialInstruments);

  const handleDeleteTrack = (index) => {
    setAuditionTracks((prevTracks) => prevTracks.filter((_, i) => i !== index));
  };

  const initialAuditionTrack = {
    id: '1',
    title: 'Song Title',
    artist: 'Artist Name',
    artwork: 'https://picsum.photos/300',
    url: '../../assets/audio.mp3',
  };

  const [auditionTracks, setAuditionTracks] = useState(initialAuditionTracks);

  const logout = () => {
    router.push('/signin?logout=true');
  };

  return (
    <ScrollView className="bg-background-default">
      <SafeAreaView className=" bg-background-default">
        <View className="relative">
          <Image source={{ uri: profileImage }} className="w-full h-56 rounded-[30px]" />

          <TouchableOpacity className="absolute top-2 right-2 ">
            <BlurView
              intensity={100}
              className="p-4 rounded-full overflow-hidden bg-grayopacity50"
              experimentalBlurMethod="true"
            >
              <Icon name="edit" type="material" color="#F0ECF7" />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity className="absolute bottom-2 right-2">
            <BlurView
              intensity={100}
              className="p-4 rounded-full overflow-hidden bg-grayopacity50"
              experimentalBlurMethod="true"
            >
              <Icon name="flip-camera-ios" type="material" color="#F0ECF7" />
            </BlurView>
          </TouchableOpacity>
          <BlurView
            intensity={100}
            className="absolute p-4 rounded-full overflow-hidden bottom-2 left-2"
            experimentalBlurMethod="true"
          >
            <Text className="text-text font-psemibold">@{username}</Text>
          </BlurView>
        </View>
        <View className="p-4 ">
          <View className="flex-row justify-between items-center mb-2 ">
            <Text className="text-text text-3xl font-pbold mr-2">Andres, 27</Text>
            <View className="flex-row items-center">
              <Icon name="location-on" type="material" color="#fff" />
              <Text className="text-text text-base font-psemibold ml-1">{location}</Text>
            </View>
          </View>
          <Text className="text-text text-xl font-pbold mb-1">Description</Text>
          <Text className="text-text mb-4 text-base font-pregular">{description}</Text>
          <Text className="text-text font-pbold text-xl mb-2">Played genres</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="flex-row mb-4 overflow-visible"
          >
            {genres.map((genre, index) => (
              <TextandIconChip key={index} text={genre} textStyle={'font-pregular text-base'} />
            ))}
          </ScrollView>
          <Text className="text-text text-xl font-pbold mb-2">Played instruments</Text>
          <ScrollView
            className="flex-row mb-4 overflow-visible"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {instruments.map((instrument, index) => (
              <TextandIconChip
                key={index}
                text={instrument}
                textStyle={'font-pregular text-base'}
              />
            ))}
          </ScrollView>
          <Text className="text-text text-xl font-pbold mb-2">Audition tracks</Text>
          <ScrollView
            className="flex-row overflow-visible"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row flex-wrap bg-secondary-opacity50 p-3 rounded-3xl mr-2">
              <Image
                source={{ uri: initialAuditionTrack.artwork }}
                className="w-16 h-16 rounded-xl mr-2"
              />
              <View className="flex-col min-w-[180px]">
                <Text className="text-text text-lg mb-2 ml-1 font-psemibold">Song title</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity>
                    <Icon name="play-arrow" type="material" color="#fff" />
                  </TouchableOpacity>
                  <View className="mx-2 flex-1 bg-secondary-opacity50 h-2 rounded-full">
                    <View
                      className="absolute top-0 left-0 h-full bg-accent rounded-full"
                      style={{ width: '50%' }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* <ProfileAudioCard track={initialAuditionTrack} onDelete={handleDeleteTrack} /> */}
          </ScrollView>
          <Text className="text-text text-xl font-pbold mb-2 mt-4">Other platforms</Text>
          <View className="flex-row mb-4">
            <TouchableOpacity className="mr-2">
              <Image
                source={require('../../assets/images/platformIcons/spotify.png')}
                className="w-14 h-14 rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity className="mr-2">
              <Image
                source={require('../../assets/images/platformIcons/soundcloud.png')}
                className="w-14 h-14 rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/platformIcons/youtube.png')}
                className="w-14 h-14 rounded-full"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-gray-400 py-3 rounded-full flex-row justify-center items-center mt-4">
            <Text className="text-white font-pbold mr-2">Edit profile</Text>
            <Icon name="edit" type="material" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-700 py-3 rounded-full mt-4 flex-row justify-center items-center"
            onPress={() => {
              logout();
            }}
          >
            <Text className="text-white font-pbold mr-2">Log out</Text>
            <Icon name="logout" type="material" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default styled(Profile);
