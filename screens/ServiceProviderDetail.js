import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Şimdilik örnek yorumlar verisi
const reviews = [
  {
    id: '1',
    user: 'Ayşe Y.',
    rating: 5,
    date: '15 Mart 2024',
    comment: 'Çok profesyonel ve işinin ehli. Zamanında geldi ve işini kusursuz yaptı.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    user: 'Mehmet K.',
    rating: 4,
    date: '10 Mart 2024',
    comment: 'İşini iyi yapıyor fakat biraz geç kaldı.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },

];

// Şimdilik örnek çalışma fotoğrafları
const workPhotos = [
  { id: '1', url: 'https://picsum.photos/400/300' },
  { id: '2', url: 'https://picsum.photos/400/301' },
  { id: '3', url: 'https://picsum.photos/400/302' },
  { id: '4', url: 'https://picsum.photos/400/303' },
];

const ServiceProviderDetail = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState('about'); 
  const { provider } = route.params;
  const [favorite, setFavorite] = useState(false); 


  const toggleFavorite = () => {
    setFavorite(!favorite);
  };
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#FFD700"
      />
    ));
  };

  // Hizmetler listesi
  const renderServices = () => (
    <View style={styles.servicesContainer}>
      <Text style={styles.sectionTitle}>Verilen Hizmetler</Text>
      <View style={styles.servicesList}>
        <View style={styles.serviceItem}>
          <Ionicons name="flash" size={24} color="#FF6B6B" />
          <Text style={styles.serviceText}>Elektrik Tesisatı</Text>
          <Text style={styles.servicePrice}>200₺/saat</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons name="bulb" size={24} color="#FF6B6B" />
          <Text style={styles.serviceText}>Aydınlatma</Text>
          <Text style={styles.servicePrice}>180₺/saat</Text>
        </View>
        <View style={styles.serviceItem}>
          <Ionicons name="warning" size={24} color="#FF6B6B" />
          <Text style={styles.serviceText}>Arıza Tespiti</Text>
          <Text style={styles.servicePrice}>150₺/saat</Text>
        </View>
      </View>
    </View>
  );

  // İş fotoğrafları
  const renderPhotos = () => (
    <FlatList
      data={workPhotos}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.photoItem}>
          <Image source={{ uri: item.url }} style={styles.workPhoto} />
        </TouchableOpacity>
      )}
    />
  );

  // Yorumlar listesi
  const renderReviews = () => (
    <View style={styles.reviewsContainer}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.image }} style={styles.reviewerImage} />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewerName}>{review.user}</Text>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );

  // Çalışma saatleri
  const renderWorkingHours = () => (
    <View style={styles.workingHoursContainer}>
      <Text style={styles.sectionTitle}>Çalışma Saatleri</Text>
      <View style={styles.workingHoursList}>
        {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map((day, index) => (
          <View key={day} style={styles.workingHourItem}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.hoursText}>
              {index < 6 ? '09:00 - 18:00' : 'Kapalı'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite} 
      >
        <Ionicons 
          name={favorite ? "heart" : "heart-outline"} 
          size={24} 
          color={favorite ? "#FF6B6B" : "#333"}
        />
      </TouchableOpacity>
    </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      
        <View style={styles.profileContainer}>
          <Image source={{ uri: provider.image }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(provider.rating)}
              <Text style={styles.ratingText}>{provider.rating}</Text>
              <Text style={styles.reviewCount}>({provider.reviews} yorum)</Text>
            </View>
            <View style={styles.badgeContainer}>
              {provider.badges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

    
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{provider.completedJobs}</Text>
            <Text style={styles.statLabel}>Tamamlanan İş</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{provider.experience}</Text>
            <Text style={styles.statLabel}>Deneyim</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>%98</Text>
            <Text style={styles.statLabel}>Memnuniyet</Text>
          </View>
        </View>


        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'about' && styles.selectedTab]}
            onPress={() => setSelectedTab('about')}
          >
            <Text style={[styles.tabText, selectedTab === 'about' && styles.selectedTabText]}>
              Hakkında
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'reviews' && styles.selectedTab]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={[styles.tabText, selectedTab === 'reviews' && styles.selectedTabText]}>
              Yorumlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'photos' && styles.selectedTab]}
            onPress={() => setSelectedTab('photos')}
          >
            <Text style={[styles.tabText, selectedTab === 'photos' && styles.selectedTabText]}>
              Fotoğraflar
            </Text>
          </TouchableOpacity>
        </View>

        
        {selectedTab === 'about' && (
          <View style={styles.tabContent}>
            {renderServices()}
            {renderWorkingHours()}
          </View>
        )}
        {selectedTab === 'reviews' && (
          <View style={styles.tabContent}>
            {renderReviews()}
          </View>
        )}
        {selectedTab === 'photos' && (
          <View style={styles.tabContent}>
            {renderPhotos()}
          </View>
        )}
      </ScrollView>

      
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => navigation.navigate('Chat', { 
            contact: {
              id: provider.id,
              name: provider.name,
              avatar: provider.image,
              rating: provider.rating,
            } 
          })}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#FF6B6B" />
          <Text style={styles.messageButtonText}>Mesaj Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { provider })}
        >
          <Text style={styles.bookButtonText}>Randevu Al</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  providerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTabText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  servicesContainer: {
    marginBottom: 24,
  },
  servicesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  serviceText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  workingHoursContainer: {
    marginBottom: 24,
  },
  workingHoursList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  workingHourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
  },
  reviewsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  reviewItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  photoItem: {
    marginRight: 12,
  },
  workPhoto: {
    width: width * 0.7,
    height: 200,
    borderRadius: 12,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  messageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServiceProviderDetail;
