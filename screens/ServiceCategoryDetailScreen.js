import React, { useState } from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,SafeAreaView,ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const subCategories = {
  'Elektrikçi': [ 'Elektrik Tesisatı', 'Aydınlatma', 'Arıza Tespiti', 'Priz Montajı' ],
  'Tesisatçı': [ 'Su Tesisatı', 'Kalorifer', 'Doğalgaz', 'Klima' ],
  'Temizlik': [ 'Ev Temizliği', 'Ofis Temizliği', 'Koltuk Temizliği', 'Cam Temizliği' ],
  'Boyacı': [ 'İç Mekan Boyama', 'Dış Mekan Boyama', 'Dekoratif Boyama', 'Seramik Boyama' ],
  'Marangoz': [ 'Mobilya Yapımı', 'Kapı ve Pencere Yapımı', 'Dolap Tasarımı', 'Ahşap Restorasyon' ],
  'Bahçıvan': [ 'Peyzaj Düzenleme', 'Çim Bakımı', 'Ağaç Budama', 'Sulama Sistemleri' ],
  'Nakliyat': [ 'Ev Taşıma', 'Ofis Taşıma', 'Paketleme Hizmetleri', 'Araç Kiralama' ],
  'Çilingir': [ 'Kapı Açma', 'Kilit Değişimi', 'Anahtar Kopyalama', 'Güvenlik Sistemleri Kurulumu' ],
  'Kameraman': [ 'Etkinlik Kameramanlığı', 'Video Prodüksiyon', 'Düğün Kameramanlığı', 'Kurumsal Video Çekimi' ],
  'Bakıcı': [ 'Yaşlı Bakımı', 'Çocuk Bakımı', 'Evde Sağlık Hizmetleri', 'Rehabilitasyon Destek' ],
  'Makine Bakımı': [ 'Endüstriyel Makine Bakımı', 'HVAC Sistemleri Bakımı', 'Montaj ve Demontaj', 'Preventif Bakım' ],
  'Bisiklet Tamiri': [ 'Lastik Değişimi', 'Vites Ayarı', 'Fren Bakımı', 'Genel Bakım ve Temizlik' ],
  'Montaj-Tamir': [ 'Mobilya Montajı', 'Ev Aletleri Tamiri', 'Elektronik Cihaz Tamiri', 'Ofis Ekipmanları Montajı' ],
  'Ev Taşıma Yardımı': [ 'Paketleme Hizmetleri', 'Yük Taşıma', 'Araç Sağlama', 'Montaj ve Demontaj' ],
  'Bilgisayar Teknik Servisi': [ 'Donanım Tamiri', 'Yazılım Kurulumu', 'Virüs Temizleme', 'Ağ Kurulumu' ],
  'Dış Cephe Temizliği': [ 'Cam Yıkama', 'Façade Temizliği', 'Graffiti Temizliği', 'Pencere Dış Temizliği' ],
  'Mimarlık Hizmetleri': [ 'İç Tasarım', 'Proje Yönetimi', 'Yapısal Tasarım', 'Yeşil Mimari' ],
  'Güvenlik Sistemleri': [ 'Alarm Sistemleri', 'Güvenlik Kameraları', 'Erişim Kontrol Sistemleri', 'Yangın Güvenliği' ],
  'Dekorasyon': [ 'İç Mekan Dekorasyonu', 'Ev Dekorasyonu', 'Ofis Dekorasyonu', 'Etkinlik Dekorasyonu' ],
  'Düğün Nişan Söz Organizasyonu': [ 'Mekan Dekorasyonu', 'Fotoğraf ve Video Hizmetleri', 'Davetli Yönetimi', 'Catering Hizmetleri' ],
  'Alçı ve Sıva': [ 'İç Alçı Uygulaması', 'Dış Sıva Uygulaması', 'Dekoratif Alçı İşleri', 'Isı Yalıtımı' ],
  'Tadilat ve Yenileme': [ 'Banyo Tadilatı', 'Mutfak Yenileme', 'Zemin Kaplama', 'Duvar Yenileme' ],
  'Havuz Bakımı': [ 'Temizlik Hizmetleri', 'Kimyasal Dengelenmesi', 'Filtre Bakımı', 'Onarım Hizmetleri' ],
  'Pencere Tamiri': [ 'Cam Değişimi', 'Çerçeve Onarımı', 'Sızdırmazlık İşlemleri', 'Mekanik Sistem Bakımı' ],
  'Evcil Hayvan Bakımı': [ 'Köpek Bakımı', 'Kedi Bakımı', 'Veteriner Hizmetleri', 'Pet Oteli' ],
  'Fotoğrafçı': [ 'Portre Çekimi', 'Düğün Fotoğrafçılığı', 'Ürün Fotoğrafçılığı', 'Etkinlik Fotoğrafçılığı' ],
  'Klima Tamiri': [ 'Soğutma Sistemleri Bakımı', 'Isıtma Sistemleri Bakımı', 'Klima Montajı', 'Klima Değişimi' ],
  'Mutfak Dolabı Yapımı': [ 'Özel Tasarım Dolaplar', 'Standart Dolap Üretimi', 'Dolap Montajı', 'Dolap Onarımı' ],
  'Güneş Enerjisi Kurulumu': [ 'Panel Montajı', 'Enerji Depolama Sistemleri', 'Bakım ve Onarım', 'Enerji Verimliliği Danışmanlığı' ],
  'Doğalgaz Tesisatı': [ 'Tesisat Kurulumu', 'Tesisat Onarımı', 'Cihaz Montajı', 'Güvenlik Kontrolleri' ],
  'Zemin Kaplama': [ 'Seramik Kaplama', 'Laminat Kaplama', 'Parke Döşeme', 'Vinil Kaplama' ],
  'Kapı ve Pencere Montajı': [ 'Kapı Montajı', 'Pencere Montajı', 'Otomatik Kapı Sistemleri', 'Kapı Onarımı' ],
  'Uydu Anten Kurulumu': [ 'Anten Montajı', 'Sinyal Ayarı', 'Kablo Yönetimi', 'Sistem Entegrasyonu' ],
  'Mobilya Montajı': [ 'Koltuk Montajı', 'Yatak Montajı', 'Dolap Montajı', 'Masa ve Sandalye Montajı' ],
  'Akvaryum Temizliği': [ 'Su Değişimi', 'Filtre Temizliği', 'Akvaryum Dekorasyonu', 'Balık Sağlığı Kontrolü' ],
  'Su Tesisatı Patlak Tamiri': [ 'Boruların Onarımı', 'Sızdırmazlık İşlemleri', 'Acil Su Kesintisi Çözümleri', 'Arıtma Sistemleri Bakımı' ],
  'Acil Elektrik Sorunu Çözümü': [ 'Acil Priz Onarımı', 'Kablo Kesintisi Tamiri', 'Faz Kayması Çözümleri', 'Elektrik Güvenliği Kontrolleri' ],
  'Araba Aküsü Değişimi': [ 'Akü Montajı', 'Eski Akü Geri Alımı', 'Akü Testi ve Bakımı', 'Araç Elektrik Sistemleri Kontrolü' ],
  'Doğalgaz Acil Bakımı': [ 'Acil Tesisat Onarımı', 'Kaçağı Kontrolü', 'Cihaz Güvenliği Kontrolleri', 'Acil Doğalgaz Kesintisi Çözümleri' ],
  'Acil Sağlık Yardımı': [ 'İlk Yardım Hizmetleri', 'Acil Tıbbi Nakil', 'Evde Sağlık Hizmetleri', 'Rehabilitasyon Destek' ],
  'Çatı Onarımı': [ 'Su Yalıtımı', 'Çatı Kaplama Değişimi', 'Çatı Yapısal Onarımı', 'Çatı Temizliği' ],
  'Kilit Değişimi': [ 'Kapı Kilidi Değişimi', 'Araç Kilidi Değişimi', 'Elektronik Kilit Sistemleri', 'Anahtar Kesimi' ],
  'Su Baskını Temizliği': [ 'Suda Kalan Eşyaların Kurtarılması', 'Kurutma Hizmetleri', 'Nem Giderme', 'Banyo ve Mutfak Temizliği' ],
  'Asansör Kurtarma Hizmeti': [ 'Asansör Arızası Çözümü', 'Acil Asansör Kurtarma', 'Asansör Bakımı', 'Yedek Parça Temini' ],
  'Çöp ve Atık Toplama': [ 'Evsel Atık Toplama', 'Endüstriyel Atık Toplama', 'Geri Dönüşüm Hizmetleri', 'Tehlikeli Atık Yönetimi' ],
  'Acil İnternet Kurulumu': [ 'Acil Wi-Fi Kurulumu', 'Modem ve Router Montajı', 'Kablolu İnternet Hizmetleri', 'Ağ Ayarları ve Optimizasyonu' ],
  'İlk Yardım Eğitimi': [ 'Temel İlk Yardım Kursları', 'İleri Düzey İlk Yardım', 'Kalp Masajı (CPR) Eğitimi', 'Acil Durum Yönetimi' ],
  'Sürgülü Kapı Tamiri': [ 'Kapı Rayı Onarımı', 'Kapı Panelleri Değişimi', 'Kilit Sistemleri Tamiri', 'Sızdırmazlık ve Yalıtım' ],
  'Klima Gaz Dolumu': [ 'Soğutucu Gaz Değişimi', 'Gaz Kaçağı Tespiti', 'Basınç Ayarları', 'Klima Performans Testi' ],
  'Arıtma': [ 'Su Arıtma', 'Atık Su Arıtma', 'Hava Arıtma', 'Endüstriyel Arıtma' ]
};


const serviceProviders = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    rating: 4.8,
    reviews: 127,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    experience: '8 yıl',
    price: '200₺/saat',
    availableToday: true,
    badges: ['Onaylı', 'Süper Hizmet'],
    completedJobs: 245,
  },
  {
    id: '2',
    name: 'Mehmet Kaya',
    rating: 4.6,
    reviews: 89,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    experience: '5 yıl',
    price: '180₺/saat',
    availableToday: false,
    badges: ['Onaylı'],
    completedJobs: 156,
  },
];

const ServiceCategoryDetail = ({ route, navigation }) => {
  const { categoryName } = route.params;
  const [selectedSubCategory, setSelectedSubCategory] = useState('Tümü');
  const [selectedFilter, setSelectedFilter] = useState('rating'); // rating, price, distance

  
  const renderSubCategories = () => {
    const categories = ['Tümü', ...(subCategories[categoryName] || [])];
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subCategoriesContainer}>
        {categories.map((subCategory, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subCategoryButton,
              selectedSubCategory === subCategory && styles.selectedSubCategory,
            ]}
            onPress={() => setSelectedSubCategory(subCategory)}
          >
            <Text
              style={[
                styles.subCategoryText,
                selectedSubCategory === subCategory && styles.selectedSubCategoryText,
              ]}
            >
              {subCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };


  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'rating' && styles.selectedFilter]}
        onPress={() => setSelectedFilter('rating')}
      >
        <Ionicons name="star" size={16} color={selectedFilter === 'rating' ? '#FF6B6B' : '#666'} />
        <Text style={[styles.filterText, selectedFilter === 'rating' && styles.selectedFilterText]}>
          En Yüksek Puan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'price' && styles.selectedFilter]}
        onPress={() => setSelectedFilter('price')}
      >
        <Ionicons name="cash-outline" size={16} color={selectedFilter === 'price' ? '#FF6B6B' : '#666'} />
        <Text style={[styles.filterText, selectedFilter === 'price' && styles.selectedFilterText]}>
          En Uygun Fiyat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'distance' && styles.selectedFilter]}
        onPress={() => setSelectedFilter('distance')}
      >
        <Ionicons name="location-outline" size={16} color={selectedFilter === 'distance' ? '#FF6B6B' : '#666'} />
        <Text style={[styles.filterText, selectedFilter === 'distance' && styles.selectedFilterText]}>
          En Yakın
        </Text>
      </TouchableOpacity>
    </View>
  );


  const renderServiceProvider = ({ item }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() => navigation.navigate('ServiceProviderDetail', { provider: item })}
    >
      <View style={styles.providerHeader}>
        <Image source={{ uri: item.image }} style={styles.providerImage} />
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews} yorum)</Text>
          </View>
          <View style={styles.badgeContainer}>
            {item.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.providerDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.experience} deneyim</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="checkmark-circle-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.completedJobs} iş tamamlandı</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.availabilityContainer}>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: item.availableToday ? '#4ECDC4' : '#FF6B6B' }
        ]}>
          <Text style={styles.availabilityText}>
            {item.availableToday ? 'Bugün Müsait' : 'Müsait Değil'}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Randevu Al</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

  
      {renderSubCategories()}

      {renderFilterButtons()}

      <FlatList
        data={serviceProviders}
        renderItem={renderServiceProvider}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.providerList}
        showsVerticalScrollIndicator={false}
      />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  subCategoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  subCategoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  selectedSubCategory: {
    backgroundColor: '#FF6B6B',
  },
  subCategoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedSubCategoryText: {
    color: '#FFFFFF',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  selectedFilter: {
    backgroundColor: '#FFE5E5',
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  selectedFilterText: {
    color: '#FF6B6B',
  },
  providerList: {
    padding: 16,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  providerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  providerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ServiceCategoryDetail;