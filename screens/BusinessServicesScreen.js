import React, { useState, useRef } from 'react';
import {  View,  Text,  StyleSheet,  ScrollView,  TouchableOpacity, Platform, Animated, Dimensions, SafeAreaView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_PADDING = 12;
const CARD_WIDTH = width - (CARD_PADDING * 2);

const COLORS = {
  primary: '#7E57C2',
  secondary: '#5E35B1',
  accent: '#B39DDB',
  background: '#F8F9FA',
  text: '#2C3E50',
  lightText: '#5D7285',
  success: '#66BB6A',
  warning: '#FFA726',
  error: '#FF5252',
  cardBg: '#FFFFFF',
  categoryBg: '#F5F0FF',
};

const BusinessServicesScreen = () => {
  const [services] = useState([
    {
      id: 1,
      name: 'Rutin Sağlık Kontrolü',
      price: '350₺',
      duration: '30',
      isActive: true,
      appointmentCount: 127,
      description: 'Kapsamlı fiziksel muayene ve genel sağlık değerlendirmesi',
      category: 'Kontrol',
      discount: '15% İndirim',
      dailyCapacity: 8,
      todayAppointments: 3
    },
    {
      id: 2,
      name: 'Aşılama',
      price: '280₺',
      duration: '20',
      isActive: true,
      appointmentCount: 84,
      description: 'Temel aşılar ve koruyucu sağlık hizmetleri',
      category: 'Koruyucu',
      dailyCapacity: 12,
      todayAppointments: 5
    },
  ]);

  const categories = [
    { id: 'all', name: 'Tümü', icon: 'paw' },
    { id: 'checkup', name: 'Kontrol', icon: 'stethoscope' },
    { id: 'vaccine', name: 'Aşılar', icon: 'needle' },
    { id: 'dental', name: 'Diş', icon: 'tooth' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollY = useRef(new Animated.Value(0)).current;

  const ServiceCard = ({ service }) => (
    <View style={styles.serviceCard}>
      <View style={styles.cardHeader}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: service.isActive ? COLORS.success : COLORS.lightText }
        ]}>
          <MaterialCommunityIcons 
            name={service.isActive ? "check-circle" : "clock-outline"} 
            size={12} 
            color="#FFF" 
          />
          <Text style={styles.statusText}>
            {service.isActive ? 'Aktif' : 'Pasif'}
          </Text>
        </View>
        {service.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{service.discount}</Text>
          </View>
        )}
        <View style={styles.durationBadge}>
          <MaterialCommunityIcons name="clock-outline" size={14} color="#FFF" />
          <Text style={styles.durationText}>{service.duration} dk</Text>
        </View>
      </View>

      <View style={styles.cardIcon}>
        <MaterialCommunityIcons name="medical-bag" size={32} color={COLORS.primary} />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{service.price}</Text>
            {service.discount && (
              <Text style={styles.originalPrice}>400₺</Text>
            )}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="calendar-check" size={16} color={COLORS.primary} />
            <Text style={styles.statText}>{service.appointmentCount} Randevu</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="clock-time-four" size={16} color={COLORS.warning} />
            <Text style={styles.statText}>{service.todayAppointments}/{service.dailyCapacity} Bugün</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        <View style={styles.serviceFooter}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="pencil" size={16} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons 
              name={service.isActive ? "eye-off" : "eye"} 
              size={16} 
              color={COLORS.primary} 
            />
            <Text style={styles.actionButtonText}>
              {service.isActive ? 'Gizle' : 'Göster'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <MaterialCommunityIcons name="delete" size={16} color={COLORS.error} />
            <Text style={[styles.actionButtonText, { color: COLORS.error }]}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Hizmet Yönetimi</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="magnify" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <MaterialCommunityIcons name="plus" size={18} color="#FFF" />
            <Text style={styles.addButtonText}>Hizmet Ekle</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialCommunityIcons 
              name={category.icon} 
              size={18} 
              color={selectedCategory === category.id ? '#FFF' : COLORS.primary} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  categoryContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  categoryContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingTop: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.categoryBg,
    marginRight: 8,
    gap: 4,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  servicesContainer: {
    padding: CARD_PADDING,
    paddingTop: 8,
    backgroundColor: '#FFF',
  },
  serviceCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  durationText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.categoryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardContent: {
    gap: 8,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: 13,
    color: COLORS.lightText,
    textDecorationLine: 'line-through',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  description: {
    color: COLORS.lightText,
    fontSize: 13,
    lineHeight: 18,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.categoryBg,
    gap: 4,
  },
  actionButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
});

export default BusinessServicesScreen;