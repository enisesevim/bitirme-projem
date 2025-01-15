import React, { useState, useMemo } from 'react';
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,SafeAreaView,Dimensions,Modal,Switch,TextInput,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DiscountedServicesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: {
      min: '',
      max: '',
    },
    onlyDiscounted: true,
    minRating: 4,
  });
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  const discountedServices = [
    {
      id: '1',
      title: 'Ev Temizliği',
      category: 'Ev Temizliği',
      description: 'Profesyonel ev temizlik hizmetlerinde özel fırsat',
      discount: '20%',
      originalPrice: '400₺',
      discountedPrice: '320₺',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
      validUntil: '2024-12-31',
      conditions: '4 saat ve üzeri hizmetlerde geçerlidir',
      provider: 'Temiz Ev Hizmetleri',
      rating: 4.8,
      reviews: 156,
    },
    {
      id: '2',
      title: 'Boya Badana',
      category: 'Boyama',
      description: 'Tüm ev boyama işlemlerinde büyük indirim',
      discount: '15%',
      originalPrice: '2000₺',
      discountedPrice: '1700₺',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
      validUntil: '2024-12-25',
      conditions: 'Minimum 2 oda için geçerlidir',
      provider: 'Usta Boyacılar',
      rating: 4.6,
      reviews: 98,
    },
    {
      id: '3',
      title: 'Elektrik Bakım',
      category: 'Tamir',
      description: 'Elektrik tesisatı kontrolünde indirimli fırsat',
      discount: '25%',
      originalPrice: '300₺',
      discountedPrice: '225₺',
      image: 'https://images.unsplash.com/photo-1621905252507-c93c6f4c0936',
      validUntil: '2024-12-20',
      conditions: 'Yeni müşteriler için geçerlidir',
      provider: 'Güvenli Elektrik',
      rating: 4.9,
      reviews: 234,
    },
  ];

  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(discountedServices.map(service => service.category));
    return ['Tümü', ...Array.from(uniqueCategories)];
  }, [discountedServices]);

  
  const filteredServices = useMemo(() => {
    let filtered = [...discountedServices];

    
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(service => 
        selectedFilters.categories.includes(service.category)
      );
    }

  
    if (selectedFilters.priceRange.min) {
      filtered = filtered.filter(service => 
        parseFloat(service.discountedPrice) >= parseFloat(selectedFilters.priceRange.min)
      );
    }
    if (selectedFilters.priceRange.max) {
      filtered = filtered.filter(service => 
        parseFloat(service.discountedPrice) <= parseFloat(selectedFilters.priceRange.max)
      );
    }

    
    if (selectedFilters.minRating) {
      filtered = filtered.filter(service => service.rating >= selectedFilters.minRating);
    }

    return filtered;
  }, [selectedFilters, discountedServices]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterPress = () => {
    setTempFilters(selectedFilters);
    setFilterModalVisible(true);
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters);
    setFilterModalVisible(false);
  };

  const toggleCategoryFilter = (category) => {
    setTempFilters(prev => {
      const categories = [...prev.categories];
      const index = categories.indexOf(category);
      
      if (index > -1) {
        categories.splice(index, 1);
      } else {
        categories.push(category);
      }

      return {
        ...prev,
        categories,
      };
    });
  };

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtreler</Text>
            <TouchableOpacity 
              onPress={() => setFilterModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            


            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Kategoriler</Text>
              <View style={styles.categoriesGrid}>
                {categories.filter(cat => cat !== 'Tümü').map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      tempFilters.categories.includes(category) && styles.categoryChipSelected
                    ]}
                    onPress={() => toggleCategoryFilter(category)}
                  >
                    <Text 
                      style={[
                        styles.categoryChipText,
                        tempFilters.categories.includes(category) && styles.categoryChipTextSelected
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

           

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Fiyat Aralığı</Text>
              <View style={styles.priceRangeContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min ₺"
                  keyboardType="numeric"
                  value={tempFilters.priceRange.min}
                  onChangeText={(text) => 
                    setTempFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: text }
                    }))
                  }
                />
                <Text style={styles.priceSeparator}>-</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max ₺"
                  keyboardType="numeric"
                  value={tempFilters.priceRange.max}
                  onChangeText={(text) => 
                    setTempFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: text }
                    }))
                  }
                />
              </View>
            </View>

            

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Minimum Puan</Text>
              <View style={styles.ratingContainer}>
                {[4, 4.5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingChip,
                      tempFilters.minRating === rating && styles.ratingChipSelected
                    ]}
                    onPress={() => setTempFilters(prev => ({ ...prev, minRating: rating }))}
                  >
                    <Ionicons name="star" size={16} color={tempFilters.minRating === rating ? '#FFFFFF' : '#FFD700'} />
                    <Text 
                      style={[
                        styles.ratingChipText,
                        tempFilters.minRating === rating && styles.ratingChipTextSelected
                      ]}
                    >
                      {rating}+
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => setTempFilters({
                categories: [],
                priceRange: { min: '', max: '' },
                onlyDiscounted: true,
                minRating: 4,
              })}
            >
              <Text style={styles.resetButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Uygula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderFilterTags = () => (
    <View style={styles.filterTags}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterTag,
              selectedCategory === category && styles.activeTag,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.filterTagText,
                selectedCategory === category && styles.activeTagText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderServiceCard = (service) => (
    <TouchableOpacity 
      key={service.id}
      style={styles.card}
      onPress={() => navigation.navigate('ServiceDetail', { service })}
    >
      <Image source={{ uri: service.image }} style={styles.cardImage} />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{service.discount} İndirim</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{service.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
        </View>
        <Text style={styles.description}>{service.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{service.originalPrice}</Text>
          <Text style={styles.discountedPrice}>{service.discountedPrice}</Text>
        </View>
        <View style={styles.providerContainer}>
          <Text style={styles.providerName}>{service.provider}</Text>
          <Text style={styles.reviewCount}>{service.reviews} değerlendirme</Text>
        </View>
        <View style={styles.validityContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.validityText}>
            Son geçerlilik: {new Date(service.validUntil).toLocaleDateString('tr-TR')}
          </Text>
        </View>
        <Text style={styles.conditions}>{service.conditions}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İndirimli Hizmetler</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleFilterPress}>
          <Ionicons name="filter-outline" size={24} color="#333" />
          {(selectedFilters.categories.length > 0 || 
            selectedFilters.priceRange.min || 
            selectedFilters.priceRange.max || 
            selectedFilters.minRating > 4) && (
            <View style={styles.filterBadge} />
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderFilterTags()}
        {filteredServices.map(renderServiceCard)}
        
        {filteredServices.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="search-outline" size={48} color="#666" />
            <Text style={styles.emptyStateText}>
              Seçili filtrelere uygun hizmet bulunamadı.
            </Text>
          </View>
        )}
      </ScrollView>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  filterTags: {
    marginBottom: 16,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  activeTag: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterTagText: {
    color: '#666',
    fontSize: 14,
  },
  activeTagText: {
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 4,
  },
  categoryChipSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  categoryChipText: {
    color: '#666',
    fontSize: 14,
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  priceSeparator: {
    marginHorizontal: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 4,
  },
  ratingChipSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  ratingChipText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  ratingChipTextSelected: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  providerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  validityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  conditions: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});
export default DiscountedServicesScreen;
