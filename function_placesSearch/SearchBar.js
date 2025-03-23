import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { geminiAPI } from './GeminiAPISearch';

const SearchBar = () => {
  const [text, onChangeText] = useState('');
  const [geminiResponse, setGeminiResponse] = useState([]);

  async function fetchInput() {
    if (text.trim() !== '') {
      const response = await geminiAPI(text);

      // Extracting the restaurant names
      const restaurantNames = response.map(restaurant => restaurant.RestaurantName);

      // Setting the state with the array of restaurant names
      setGeminiResponse(restaurantNames);
      onChangeText('');
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Enter a place"
          onChangeText={onChangeText}
          value={text}
        />
        <Button title="Save Input" onPress={fetchInput} />

        <ScrollView>
          {geminiResponse.map((restaurant, index) => (
            <Text key={index} style={styles.restaurantText}>{restaurant}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  restaurantText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SearchBar;
