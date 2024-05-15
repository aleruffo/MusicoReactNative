import { View, Text } from 'react-native';
import { React, useState } from 'react';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

const GenresSection = () => {
  const [genre, setGenre] = useState('');

  return (
    <View className="grow">
      <FormField
        title="Played Genres"
        value={genre}
        onChangeText={(e) =>
          setGenre({
            ...genre,
            genre: e,
          })
        }
        otherStyles="mt-2 mb-4"
        placeholder={'Rock, Pop, Jazz ...'}
      />
      <Button
        title="Add +"
        handlePress={() => console.log('Add instrument')}
        containerStyles="bg-secondary-default"
        textStyles="text-text font-psemibold text-lg"
      />
    </View>
  );
};

export default GenresSection;
