import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationSelector from '../components/LocationSelector';
const { width } = Dimensions.get('window');


const categories = [
  { id: '1', name: 'Elektrikçi', icon: 'flash', color: '#FF6B6B' },
  { id: '2', name: 'Tesisatçı', icon: 'water', color: '#4ECDC4' },
  { id: '3', name: 'Boyacı', icon: 'color-palette', color: '#45B7D1' },
  { id: '4', name: 'Marangoz', icon: 'construct', color: '#9d6d49' },
  { id: '5', name: 'Bahçıvan', icon: 'leaf', color: '#88D8B0' },
  { id: '6', name: 'Temizlik', icon: 'sparkles', color: '#6C5CE7' },
  { id: '7', name: 'Nakliyat', icon: 'car', color: '#FDA7DF' },
  { id: '8', name: 'Çilingir', icon: 'key', color: '#cfc436' },
  { id: '9', name: 'Kameraman', icon: 'camera', color: '#575757' },
  { id: '10', name: 'Bakıcı', icon: 'bandage', color: '#d18080' },
  { id: '11', name: 'Makine Bakımı', icon: 'hammer', color: '#477bba' },
  { id: '12', name: 'Bisiklet Tamiri', icon: 'bicycle', color: '#9e1919' },
  { id: '13', name: 'Montaj-Tamir', icon: 'build-outline', color: '#c08457' },
  { id: '14', name: 'Ev Taşıma Yardımı', icon: 'home', color: '#F78FB3' },
  { id: '15', name: 'Bilgisayar Teknik Servisi', icon: 'desktop', color: '#00b894' },
  { id: '16', name: 'Dış Cephe Temizliği', icon: 'brush', color: '#fdcb6e' },
  { id: '17', name: 'Mimarlık Hizmetleri', icon: 'cube', color: '#ffb142' },
  { id: '18', name: 'Güvenlik Sistemleri', icon: 'shield', color: '#6ab04c' },
  { id: '19', name: 'Dekorasyon', icon: 'home-outline', color: '#e056fd' },
  { id: '20', name: 'Düğün Nişan Söz Organizasyonu', icon: 'heart', color: '#ff7979' },
  { id: '21', name: 'Alçı ve Sıva', icon: 'hammer-outline', color: '#9980FA' },
  { id: '22', name: 'Tadilat ve Yenileme', icon: 'construct', color: '#ff9f43' },
  { id: '23', name: 'Havuz Bakımı', icon: 'water', color: '#3498db' },
  { id: '24', name: 'Pencere Tamiri', icon: 'hammer', color: '#5f27cd' },
  { id: '25', name: 'Evcil Hayvan Bakımı', icon: 'paw', color: '#f3a683' },
  { id: '26', name: 'Fotoğrafçı', icon: 'images', color: '#8e44ad' },
  { id: '27', name: 'Klima Tamiri', icon: 'snow', color: '#60a3bc' },
  { id: '28', name: 'Mutfak Dolabı Yapımı', icon: 'build', color: '#ff6b81' },
  { id: '29', name: 'Güneş Enerjisi Kurulumu', icon: 'sunny', color: '#fbc531' },
  { id: '30', name: 'Doğalgaz Tesisatı', icon: 'flame', color: '#ff6348' },
  { id: '31', name: 'Zemin Kaplama', icon: 'layers', color: '#2ecc71' },
  { id: '32', name: 'Kapı ve Pencere Montajı', icon: 'hammer', color: '#f8a5c2' },
  { id: '33', name: 'Uydu Anten Kurulumu', icon: 'radio', color: '#192a56' },
  { id: '34', name: 'Mobilya Montajı', icon: 'bed', color: '#e1b12c' },
  { id: '35', name: 'Akvaryum Temizliği', icon: 'fish', color: '#0097e6' },
  { id: '36', name: 'Su Tesisatı Patlak Tamiri', icon: 'water', color: '#55efc4' },
  { id: '37', name: 'Acil Elektrik Sorunu Çözümü', icon: 'flash-outline', color: '#fdcb6e' },
  { id: '38', name: 'Araba Aküsü Değişimi', icon: 'car', color: '#c0392b' },
  { id: '39', name: 'Doğalgaz Acil Bakımı', icon: 'flame-outline', color: '#e17055' },
  { id: '40', name: 'Acil Sağlık Yardımı', icon: 'medkit', color: '#d63031' },
  { id: '50', name: 'Arıtma', icon: 'filter', color: '#3498db' }
  
];




const dummyServiceProviders = [
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
  }
];

const discountedServices = [
  {
    id: '1',
    title: 'Ev Temizliği',
    discount: '20%',
    originalPrice: '400₺',
    discountedPrice: '320₺',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
    provider: 'Temiz Ev Hizmetleri',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Boya Badana',
    discount: '15%',
    originalPrice: '2000₺',
    discountedPrice: '1700₺',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    provider: 'Usta Boyacılar',
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Elektrik Bakım',
    discount: '25%',
    originalPrice: '300₺',
    discountedPrice: '225₺',
    image: 'https://images.unsplash.com/photo-1621905252507-c93c6f4c0936',
    provider: 'Güvenli Elektrik',
    rating: 4.9,
  },
];

const HomeScreen = ({ navigation }) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('İstanbul, Kadıköy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
        { backgroundColor: item.color + '20' }
      ]} 
      onPress={() => {
        setSelectedCategory(item.id);
        navigation.navigate('ServiceCategoryDetail', { 
          categoryName: item.name 
        });
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderServiceProviderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.providerCard}
      onPress={() => navigation.navigate('ServiceProviderDetail', { provider: item })}
    >
      <Image source={{ uri: item.image }} style={styles.providerImage} />
      <View style={[styles.providerBadge, { backgroundColor: item.available ? '#4ECDC4' : '#FF6B6B' }]}>
        <Ionicons name={item.available ? 'checkmark-circle' : 'time'} size={16} color="#FFF" />
      </View>
      <View style={styles.providerContent}>
        <View style={styles.providerHeader}>
          <Text style={styles.providerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.providerType}>{item.type}</Text>
        <View style={styles.providerDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.price}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDiscountCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.discountCard}
      onPress={() => navigation.navigate('DiscountedServices')}
    >
      <Image source={{ uri: item.image }} style={styles.discountImage} />
      <View style={styles.discountBadge}>
        <Text style={styles.discountBadgeText}>{item.discount} İndirim</Text>
      </View>
      <View style={styles.discountContent}>
        <Text style={styles.discountTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.discountPriceRow}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
        </View>
        <View style={styles.providerRow}>
          <Text style={styles.providerName} numberOfLines={1}>{item.provider}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLocation}>Konum</Text>
          <TouchableOpacity 
            style={styles.locationContainer}
            onPress={() => setLocationModalVisible(true)}
          >
            <Ionicons name="location" size={18} color="#FF6B6B" />
            <Text style={styles.headerTitle}>{currentLocation}</Text>
            <Ionicons name="chevron-down" size={18} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
  style={styles.profileButton}
  onPress={() => navigation.jumpTo('Profil')}
>
  <Image
    source={require('../assets/enise.jpg')} // Yerel resim dosyasını kullanmak için güncellendi
    style={styles.profileImage}
  />
</TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.discountSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>İndirimli Hizmetler</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscountedServices')}>
              <Text style={styles.seeAllButton}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={discountedServices}
            renderItem={renderDiscountCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.discountList}
          />
        </View>

        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />

        <View style={styles.providersHeader}>
          <Text style={styles.sectionTitle}>Yakınızdaki Uzmanlar</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NearbyExperts')}>
            <Text style={styles.seeAllButton}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyServiceProviders}
          renderItem={renderServiceProviderItem}
          keyExtractor={(item) => item.id}
          style={styles.providersList}
          scrollEnabled={false}
        />

        <LocationSelector
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSelectLocation={(location) => {
            setCurrentLocation(location);
            setLocationModalVisible(false);
          }}
        />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLocation: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  featureImage: {
    width: '100%',
    height: 150,
  },
  featureContent: {
    padding: 15,
  },
  featureBadge: {
    position: 'absolute',
    top: -130,
    left: 15,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  categoriesList: {
    paddingLeft: 20,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 15,
    marginRight: 12,
    width: width * 0.25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  providersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  providersList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    padding: 15,
  },
  providerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  providerBadge: {
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
  providerContent: {
    flex: 1,
    marginLeft: 15,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  providerName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
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
  providerType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  providerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  discountSection: {
    marginTop: 20,
    paddingBottom: 10,
  },
  
  discountCard: {
    width: width * 0.7, 
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden', 
  },
  
  discountImage: {
    width: '100%',
    height: 140, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  discountContent: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  
  discountTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    width: '100%', 
  },
  
  discountPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  providerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  discountList: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});

export default HomeScreen;
