import { View, Text } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Image } from 'react-native-elements';

import youtubeIcon from '../../../../assets/images/platformIcons/youtube.png';
import spotifyIcon from '../../../../assets/images/platformIcons/spotify.png';
import appleMusicIcon from '../../../../assets/images/platformIcons/applemusic.jpg';
import tidalIcon from '../../../../assets/images/platformIcons/tidal.jpeg';
import soundcloudIcon from '../../../../assets/images/platformIcons/soundcloud.png';
import amazonMusicIcon from '../../../../assets/images/platformIcons/amazonmusic.png';

const OtherPlatformsSection = ({ user, setUser }) => {
  const platformData = [
    { name: 'SoundCloud', color: 'rgba(255, 84, 25', icon: soundcloudIcon, varName: 'soundcloud' },
    { name: 'YouTube', color: 'rgba(255, 0, 0', icon: youtubeIcon, varName: 'youtube' },
    { name: 'Spotify', color: 'rgba(29, 208, 93', icon: spotifyIcon, varName: 'spotify' },
    { name: 'Apple Music', color: 'rgba(251, 74, 98', icon: appleMusicIcon, varName: 'appleMusic' },
    { name: 'Tidal', color: 'rgba(255, 255, 255', icon: tidalIcon, varName: 'tidal' },
    {
      name: 'Amazon Music',
      color: 'rgba(37, 209, 218',
      icon: amazonMusicIcon,
      varName: 'amazonMusic',
    },
  ];

  return (
    <View className="grow">
      <Text className="text-text text-lg font-psemibold mb-4 mt-2">Link other platforms</Text>
      {platformData.map((platform) => (
        <View key={platform.name} className="flex-row items-center mb-4">
          <Image
            source={platform.icon}
            className="w-12 h-12 mr-2 rounded-2xl"
            style={{
              opacity: user[platform.varName] ? 1 : 0.5,
            }}
          />
          <TextInput
            placeholder={`Add ${platform.name} link`}
            placeholderTextColor="#b0b0b0"
            value={user[platform.varName]}
            autoCorrect={false}
            onChangeText={(text) => {
              setUser({
                ...user,
                [platform.varName]: text,
              });
            }}
            className={`flex-1 px-4 h-12 rounded-2xl text-text font-pmedium focus:border-2`}
            style={{
              borderColor: user[platform.varName]
                ? platform.color + ', 1)'
                : 'rgba(70, 42, 122, 0.50)',
              backgroundColor:
                user[platform.varName].length > 0
                  ? platform.color + ', 0.35)'
                  : 'rgba(70, 42, 122, 0.25)',
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default OtherPlatformsSection;
