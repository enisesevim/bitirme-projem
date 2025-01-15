import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';


const NearbyExpertsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('distance');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 1000,
    maxDistance: 10,
    expertTypes: []
  });

  const experts = [
    {
      id: '1',
      name: 'Ahmet Usta',
      type: 'Elektrikçi',
      rating: 4.8,
      jobs: 124,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      available: true,
      price: '150₺/saat',
      distance: '2.5 km',
      reviews: 45,
      completedJobs: 124,
      experience: '5 yıl',
      badges: ['Onaylı Uzman', 'Hızlı Hizmet'],
    },
    {
      id: '2',
      name: 'Sevda Hanım',
      type: 'Temizlik',
      rating: 4.6,
      jobs: 98,
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      available: false,
      price: '120₺/saat',
      distance: '3.1 km',
      reviews: 38,
      completedJobs: 98,
      experience: '3 yıl',
      badges: ['Güvenilir', 'Ekonomik'],
    },
    {
      id: '3',
      name: 'Mehmet Usta',
      type: 'Boyacı',
      rating: 4.9,
      jobs: 156,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      available: true,
      price: '180₺/saat',
      distance: '1.8 km',
      reviews: 52,
      completedJobs: 156,
      experience: '7 yıl',
      badges: ['En İyi Performans', 'Uzman'],
    },
    {
      id: '4',
      name: 'Ayşe Hanım',
      type: 'Bahçıvan',
      rating: 4.7,
      jobs: 85,
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      available: true,
      price: '140₺/saat',
      distance: '4.2 km',
      reviews: 32,
      completedJobs: 85,
      experience: '4 yıl',
      badges: ['Çevre Dostu', 'Profesyonel'],
    },
    {
      id: '5',
      name: 'Can Bey',
      type: 'Tesisatçı',
      rating: 4.9,
      jobs: 210,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      available: true,
      price: '170₺/saat',
      distance: '2.9 km',
      reviews: 67,
      completedJobs: 210,
      experience: '8 yıl',
      badges: ['VIP Uzman', 'En Çok Tercih Edilen'],
    },
  ];

  const expertTypeOptions = [
    'Elektrikçi', 'Temizlik', 'Boyacı', 'Bahçıvan', 'Tesisatçı'
  ];

  
  const filteredExperts = useMemo(() => {
    return experts.filter(expert => {
    
      const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             expert.type.toLowerCase().includes(searchQuery.toLowerCase());

    
      const matchesType = filters.expertTypes.length === 0 || 
                          filters.expertTypes.includes(expert.type);

      
      const matchesRating = expert.rating >= filters.minRating;


      const price = parseFloat(expert.price.replace('₺/saat', ''));
      const matchesPrice = price <= filters.maxPrice;


      const distance = parseFloat(expert.distance.replace('km', ''));
      const matchesDistance = distance <= filters.maxDistance;

      return matchesSearch && matchesType && matchesRating && matchesPrice && matchesDistance;
    }).sort((a, b) => {
      
      switch(selectedFilter) {
        case 'distance':
          return parseFloat(a.distance.replace('km', '')) - parseFloat(b.distance.replace('km', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseFloat(a.price.replace('₺/saat', '')) - parseFloat(b.price.replace('₺/saat', ''));
        default:
          return 0;
      }
    });
  }, [searchQuery, filters, selectedFilter]);

  
  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Gelişmiş Filtreler</Text>

          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Minimum Puan</Text>
            <View style={styles.ratingButtonContainer}>
              {[1, 2, 3, 4, 5].map(rating => (
                <TouchableOpacity 
                  key={rating}
                  style={[
                    styles.ratingButton, 
                    filters.minRating === rating && styles.selectedRatingButton
                  ]}
                  onPress={() => setFilters(prev => ({...prev, minRating: rating}))}
                >
                  <Text style={[
                    styles.ratingButtonText,
                    filters.minRating === rating && styles.selectedRatingButtonText
                  ]}>{rating}+</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

      
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Uzmanlık Alanları</Text>
            <View style={styles.expertTypeContainer}>
              {expertTypeOptions.map(type => (
                <TouchableOpacity 
                  key={type}
                  style={[
                    styles.expertTypeButton, 
                    filters.expertTypes.includes(type) && styles.selectedExpertTypeButton
                  ]}
                  onPress={() => setFilters(prev => ({
                    ...prev, 
                    expertTypes: prev.expertTypes.includes(type)
                      ? prev.expertTypes.filter(t => t !== type)
                      : [...prev.expertTypes, type]
                  }))}
                >
                  <Text style={[
                    styles.expertTypeButtonText,
                    filters.expertTypes.includes(type) && styles.selectedExpertTypeButtonText
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Maksimum Fiyat (₺/saat)</Text>
            <View style={styles.sliderContainer}>
              <Ionicons name="cash-outline" size={20} color="#666" />
              <Text style={styles.sliderValue}>{filters.maxPrice}₺</Text>
            </View>
            <View style={styles.priceSliderContainer}>
              <Text style={styles.priceSliderText}>0</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={300}
                step={10}
                value={filters.maxPrice}
                onValueChange={(value) => setFilters(prev => ({...prev, maxPrice: value}))}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#FF6B6B"
              />
              <Text style={styles.priceSliderText}>300</Text>
            </View>

            
            <Text style={styles.filterSectionTitle}>Maksimum Mesafe (km)</Text>
            <View style={styles.sliderContainer}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.sliderValue}>{filters.maxDistance} km</Text>
            </View>
            <View style={styles.priceSliderContainer}>
              <Text style={styles.priceSliderText}>0</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={20}
                step={1}
                value={filters.maxDistance}
                onValueChange={(value) => setFilters(prev => ({...prev, maxDistance: value}))}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#FF6B6B"
              />
              <Text style={styles.priceSliderText}>20</Text>
            </View>
          </View>

        
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => {
                setFilters({
                  minRating: 0,
                  maxPrice: 1000,
                  maxDistance: 10,
                  expertTypes: []
                });
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={styles.modalCancelButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalApplyButton}
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Text style={styles.modalApplyButtonText}>Uygula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderExpertItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.expertCard}
      onPress={() => navigation.navigate('ServiceProviderDetail', { provider: item })}
    >
      <Image source={{ uri: item.image }} style={styles.expertImage} />
      <View style={[styles.availabilityBadge, { 
        backgroundColor: item.available ? '#4ECDC4' : '#FF6B6B' 
      }]}>
        <Ionicons 
          name={item.available ? 'checkmark-circle' : 'time'} 
          size={16} 
          color="#FFF" 
        />
      </View>
      
      <View style={styles.expertInfo}>
        <View style={styles.expertHeader}>
          <Text style={styles.expertName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.expertType}>{item.type}</Text>
        
        <View style={styles.expertStats}>
          <View style={styles.statItem}>
            <Ionicons name="briefcase-outline" size={14} color="#666" />
            <Text style={styles.statText}>{item.completedJobs} İş</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.statText}>{item.experience}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Ionicons name="cash-outline" size={14} color="#666" />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
        </View>

        <View style={styles.badgeContainer}>
          {item.badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (title, value) => (
    <TouchableOpacity 
      style={[
        styles.filterButton,
        selectedFilter === value && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === value && styles.filterButtonTextActive
      ]}>{title}</Text>
    </TouchableOpacity>
  );

   return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yakınımdaki Uzmanlar</Text>
        <TouchableOpacity 
          style={styles.filterIcon}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Uzman ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('Mesafe', 'distance')}
        {renderFilterButton('Puan', 'rating')}
        {renderFilterButton('Fiyat', 'price')}
      </View>

      <FlatList
        data={filteredExperts}
        renderItem={renderExpertItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>Hiçbir uzman bulunamadı.</Text>
          </View>
        }
      />
      {renderFilterModal()}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterIcon: {
    padding: 5,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 15,
  },
  expertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expertImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  availabilityBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  expertInfo: {
    flex: 1,
    marginLeft: 15,
  },
  expertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  expertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  expertType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expertStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 5,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  ratingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectedRatingButton: {
    backgroundColor: '#FF6B6B',
  },
  ratingButtonText: {
    color: '#666',
  },
  selectedRatingButtonText: {
    color: '#FFFFFF',
  },
  expertTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expertTypeButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5,
  },
  selectedExpertTypeButton: {
    backgroundColor: '#FF6B6B',
  },
  expertTypeButtonText: {
    color: '#666',
  },
  selectedExpertTypeButtonText: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderValue: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  priceSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceSliderText: {
    color: '#666',
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  modalApplyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalApplyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
  },
});

export default NearbyExpertsScreen;