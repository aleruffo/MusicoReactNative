import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import FileButton from '../../../../components/FileButton';
import AudioCard from '../../../../components/AudioCard';
import AudioUpload from '../../../../components/AudioUpload';

const UploadMusicSection = ({ user, setUser }) => {
  const handleDeleteAudio = (index) => {
    // Remove the audio file from the user's personalMusic array
    setUser((prevUser) => ({
      ...prevUser,
      personalMusic: prevUser.personalMusic.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <View className="grow">
        <Text className="font-pbold text-lg text-text mt-2 mb-2">Your music</Text>
        <AudioUpload />
        {/* <FileButton user={user} setUser={setUser} /> */}
        {/* {user.personalMusic.length > 0 ? (
          <ScrollView className="mt-2 rounded-2xl">
            {user.personalMusic.map(
              (song) => (
                console.log(song),
                (
                  <AudioCard
                    key={song.file}
                    title={song.title}
                    duration={song.duration}
                    onDelete={() => handleDeleteAudio(1)}
                  />
                )
              )
            )}
          </ScrollView>
        ) : null} */}
      </View>
    </>
  );
};

export default UploadMusicSection;
