import React, { useState, useContext } from 'react';
import { View, Button, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { color } from 'react-native-elements/dist/helpers';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/authContext';

const AudioUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const { state } = useContext(AuthContext);

  const pickAudioFile = async () => {
    console.log('Picking audio file...');
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.assets) {
        const { uri, name, size } = result.assets[0];
        console.log('Audio file details: ', uri, name, size);
        const fileType = name.split('.').pop();

        const formData = new FormData();
        formData.append('file', {
          uri,
          name,
          type: `audio/${fileType}`,
        });

        await uploadAudio(formData);
      }
    } catch (error) {
      console.log('Error picking audio file: ', error);
    }
  };

  const uploadAudio = async (formData) => {
    setUploading(true);

    console.log('Uploading audio file...');
    try {
      const response = await axios.post(
        'http://204.216.223.231:8080/audio/audio_analysis',
        //'http://204.216.223.231:8080/user/profile/audio',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${state.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus('File uploaded successfully!');
        console.log('File uploaded successfully!');
      } else {
        setUploadStatus('File upload failed!');
        console.log('File upload failed!');
      }
    } catch (error) {
      console.log('Error uploading audio file: ', error);
      setUploadStatus('File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="">
      {!uploading ? (
        <TouchableOpacity
          onPress={pickAudioFile}
          className="w-full p-4 rounded-2xl flex-row justify-between items-center bg-secondary-opacity50"
        >
          <Text className="text-text font-pmedium ">Upload file to analyze</Text>
          <Icon name="upload" type="material" color="white" />
        </TouchableOpacity>
      ) : (
        <View className="flex-row justify-between items-center w-full p-4 rounded-2xl bg-primary-default">
          <Text className="text-text font-pmedium">Uploading...</Text>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      )}
      {uploadStatus ? (console.log(uploadStatus), setUploadStatus('')) : null}
    </View>
  );
};

export default AudioUpload;
