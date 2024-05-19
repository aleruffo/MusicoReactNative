import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

const ProfileAudioCard = ({ track, onDelete }) => {
  async function setup() {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
  }

  setup();

  TrackPlayer.add(track);

  const handlePlayPause = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.add(track.url);
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <>
      <View className="flex-row flex-wrap bg-secondary-opacity50 p-3 rounded-3xl">
        <Image source={{ uri: track.artwork }} className="w-16 h-16 rounded-xl mr-2" />
        <View className="flex-col min-w-[180px]">
          <Text className="text-text text-lg mb-2 ml-1 font-psemibold">{track.title}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handlePlayPause}>
              <Icon name={'play-arrow'} type="material" color="#fff" />
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

      <StatusBar style="light" />
    </>
  );
};

export default styled(ProfileAudioCard);
