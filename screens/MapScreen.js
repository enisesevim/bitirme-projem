import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 41.0082,  // Şimdilik İstanbul'un koordinatları
    longitude: 28.9784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = () => {
    navigation.navigate('SearchResults', { query: searchQuery });
  };

  const suggestions = [
    { icon: 'construct', text: 'Tesisatçı', color: '#2980b9' },
    { icon: 'brush', text: 'Temizlikçi', color: '#27ae60' },
    { icon: 'flash', text: 'Elektrikçi', color: '#e67e22' },
    { icon: 'car', text: 'Araç Bakım', color: '#8e44ad' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Google Maps */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          apiKey="AIzaSyDRFAUfns66-3hWj7azwrGNj3lkAhULHBA"
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Buradasınız"
          />
        </MapView>
      </View>

      
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#7c573b"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Hangi hizmeti almak istersiniz?"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      
      <View style={styles.suggestionContainer}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.suggestionButton]}
            onPress={() => {}}
          >
            <View style={[styles.iconContainer, { backgroundColor: suggestion.color + '15' }]}>
              <Ionicons
                name={suggestion.icon}
                size={28}
                color={suggestion.color}
              />
            </View>
            <Text style={[styles.suggestionText, { color: suggestion.color }]}>
              {suggestion.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingLeft: 45,
    paddingRight: 15,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
  },
  suggestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  suggestionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
export default MapScreen;