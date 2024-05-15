import { View, Text } from 'react-native';
import { pick, types } from 'react-native-document-picker';
import React from 'react';
import Button from './Button';

const FileButton = ({ user, setUser }) => {
  return (
    <>
      <View className="">
        <Button
          title="Upload your music (max 30s)"
          handlePress={async () => {
            try {
              const res = await pick({
                allowMultiSelection: true,
                type: [types.audio],
              });
              console.log(res);
              setUser((prevUser) => ({
                ...prevUser,
                personalMusic: res.map((file) => ({
                  file: file.uri,
                  title: file.name,
                })),
              }));
            } catch (err) {
              console.log(err);
            }
          }}
          containerStyles="bg-secondary-default p-4 "
          textStyles="text-text font-psemibold text-base"
          haveSubtext={true}
          subtext="Upload some of your audition tracks. Let other musicians get to know you better. Make sure to not upload anything with copyright or you will be banned from the app."
          hasIcon={true}
          icon="upload"
        />
      </View>
    </>
  );
};

export default FileButton;
