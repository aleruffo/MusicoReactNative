import { View, Text } from 'react-native';
import { React, useState } from 'react';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import AutocompleteField from '../../../components/AutocompleteField';
import GenreCard from '../../../components/GenreCard';

const GenresSection = ({ user, setUser }) => {
  const [genre, setGenre] = useState('');

  const genresList = [
    'Rock',
    'Pop',
    'Jazz',
    'Classical',
    'Hip Hop',
    'Country',
    'Blues',
    'Reggae',
    'Electronic',
    'Folk',
    'R&B',
    'Soul',
    'Metal',
    'Punk',
    'Disco',
    'Funk',
    'Gospel',
    'Latin',
  ];

  const handleAddGenre = () => {
    if (genre.trim() !== '') {
      setUser((user) => ({
        ...user,
        genres: [...user.genres, genre],
      }));
      setGenre('');
    }
  };

  const handleDeleteGenre = (genre) => {
    setUser((user) => ({
      ...user,
      genres: user.genres.filter((g) => g !== genre),
    }));
  };

  return (
    <View className="grow">
      <Text className="text-text font-pbold text-lg mt-2 mb-1">Played genres</Text>
      <AutocompleteField
        data={genresList}
        placeholder="Rock, Pop, Jazz, etc."
        onChangeText={(text) => setGenre(text)}
        value={genre}
      />
      <Button
        title="Add +"
        handlePress={() => handleAddGenre()}
        containerStyles="bg-secondary-default"
        textStyles="text-text font-psemibold text-lg"
      />
      <View className="mt-5">
        {user.genres.map((genre, index) => (
          <GenreCard key={index} genre={genre} onDelete={() => handleDeleteGenre(genre)} />
        ))}
      </View>
    </View>
  );
};

export default GenresSection;
