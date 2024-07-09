import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const AutocompleteField = ({ data, placeholder, onChangeText, value }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (text) => {
    setQuery(text);
    setFilteredData(
      data.filter((item) => item.toLowerCase().includes(text.toLowerCase())).slice(0, 5)
    ); // Limit to 5 suggestions
    console.log(filteredData);
    onChangeText(text);
  };

  const handleItemPress = (item) => {
    setQuery(item);
    onChangeText(item);
    setFilteredData([]);
  };

  return (
    <View className="mb-4">
      <TextInput
        placeholder={placeholder}
        value={query}
        onChangeText={(text) => handleInputChange(text)}
        className="w-full bg-secondary-opacity25 px-4 py-3 rounded-[15px] font-pmedium text-base text-text"
        placeholderTextColor="#A1A1A1"
        autoCorrect={false}
      />
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-secondary-opacity25 rounded-[15px] mt-1"
              onPress={() => handleItemPress(item)}
            >
              <Text className="py-3 px-4 text-text font-psemibold">{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestions}
          keyboardShouldPersistTaps="handled"
          className="mt-1 rounded-[15px] shadow-md"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 20,
  },

  suggestions: {
    borderRadius: 5,
    zIndex: 1000,
  },
  item: {
    padding: 10,
  },
});

export default AutocompleteField;
