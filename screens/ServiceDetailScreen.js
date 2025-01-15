import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const renderDetailSection = (icon, title, content) => (
    <View style={styles.detailSection}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={24} color="#FF6B6B" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hizmet Detayları</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
  
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: service.image }} 
            style={styles.serviceImage} 
          />
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>
              {service.discount} İndirim
            </Text>
          </View>
        </View>

        
        <View style={styles.titleSection}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>
              {service.rating} ({service.reviews} değerlendirme)
            </Text>
          </View>
        </View>

    
        <View style={styles.pricingSection}>
          <Text style={styles.originalPrice}>{service.originalPrice}</Text>
          <Text style={styles.discountedPrice}>{service.discountedPrice}</Text>
        </View>

    
        {renderDetailSection(
          'information-circle-outline', 
          'Hizmet Açıklaması', 
          service.description
        )}

        {renderDetailSection(
          'time-outline', 
          'Geçerlilik Süresi', 
          `Son geçerlilik: ${new Date(service.validUntil).toLocaleDateString('tr-TR')}`
        )}

        {renderDetailSection(
          'document-text-outline', 
          'Kullanım Koşulları', 
          service.conditions
        )}

        {renderDetailSection(
          'business-outline', 
          'Hizmet Sağlayıcı', 
          service.provider
        )}

      
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => navigation.navigate('Chat', { providerId: service.providerId })}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#FF6B6B" />
            <Text style={styles.contactButtonText}>İletişime Geç</Text>
          </TouchableOpacity>
         
        </View>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  pricingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  detailSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
 
});

export default ServiceDetailScreen;