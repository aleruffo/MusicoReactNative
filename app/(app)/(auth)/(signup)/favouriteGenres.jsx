import { View, Text } from 'react-native';
import { React, useState, useEffect, useContext } from 'react';
import FormField from '../../../../components/FormField';
import Button from '../../../../components/Button';
import AutocompleteField from '../../../../components/AutocompleteField';
import GenreCard from '../../../../components/GenreCard';
import { AuthContext } from '../../../../context/authContext';

const GenresSection = ({ user, setUser }) => {
  const { state } = useContext(AuthContext);

  const [genre, setGenre] = useState('');
  const [genresList, setgenresList] = useState([]);

  const fetchgenres = async () => {
    try {
      const response = await fetch('http://204.216.223.231:8080/user/data/genres', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      const data = await response.json().then((data) => {
        console.log('FETCH genres: ', data);
        setgenresList(data);
        console.log('genres list: ', genresList);
      });
    } catch (e) {
      console.log('Error fetching genres: ', e);
    }
  };

  useEffect(() => {
    fetchgenres();
  }, []);

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
