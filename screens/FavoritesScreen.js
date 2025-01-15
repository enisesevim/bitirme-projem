import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Ayşe Yılmaz',
      profession: 'Saç Tasarımı',
      rating: 4.8,
      reviews: 127,
      image: require('../assets/stylist1.jpg'),
      location: 'Çorlu, Tekirdağ',
      completedJobs: 150,
      experience: '5 Yıl',
      badges: ['Uzman Stilist', 'En İyi Hizmet'],
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      profession: 'Cilt Bakımı Uzmanı',
      rating: 4.9,
      reviews: 89,
      image: require('../assets/stylist2.jpg'),
      location: 'Çorlu, Tekirdağ',
      completedJobs: 120,
      experience: '3 Yıl',
      badges: ['Sertifikalı Uzman', 'Müşteri Memnuniyeti'],
    },
  ]);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favoriteCard}
      onPress={() => navigation.navigate('ServiceProviderDetail', { provider: item })}
    >
      <Image source={item.image} style={styles.providerImage} />
      <View style={styles.providerInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.providerName}>{item.name}</Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => {
              setFavorites(favorites.filter(fav => fav.id !== item.id));
            }}
          >
            <Ionicons name="heart" size={24} color="#FF4081" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profession}>{item.profession}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} değerlendirme)</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Henüz favori eklenmemiş</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Hizmetlere Göz At</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  listContainer: {
    padding: 15,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  favoriteButton: {
    padding: 5,
  },
  profession: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#3B5998',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;