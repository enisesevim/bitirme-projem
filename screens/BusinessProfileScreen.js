import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, StyleSheet, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const BusinessProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Genel Bakış');
  const scrollY = new Animated.Value(0);

  const stats = [
    { value: '₺1,250', label: 'Bugünkü Kazanç', icon: 'cash' },
    { value: '8', label: 'Randevu', icon: 'calendar-check' },
    { value: '%85', label: 'Doluluk', icon: 'chart-arc' },
  ];

  const quickActions = [
    { icon: 'calendar-plus', title: 'Yeni\nRandevu' },
    { icon: 'format-list-bulleted', title: 'Hizmet\nListesi' },
    { icon: 'chart-bar', title: 'Analiz\nRaporu' },
    { icon: 'cog', title: 'Hesap\nAyarları' },
  ];

  const menuItems = [
    { icon: 'calendar-clock', title: 'Çalışma Saatleri', badge: 'Düzenle' },
    { icon: 'bell-outline', title: 'Bildirimler', badge: '3' },
    { icon: 'wallet', title: 'Ödeme Yöntemleri', badge: '2 Aktif' },
    { icon: 'shield-check', title: 'Güvenlik' },
    { icon: 'cog', title: 'Ayarlar' },
    { icon: 'help-circle', title: 'Yardım' },
    { icon: 'share-variant', title: 'Paylaş' },
    { 
      icon: 'logout', 
      title: 'Çıkış Yap', 
      onPress: () => handleLogout(),
      textColor: '#FF6B6B'
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Çıkış Yap", onPress: () => navigation.navigate('Login'), style: "destructive" }
      ]
    );
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#7E57C2', '#5E35B1']}
      style={styles.headerGradient}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          <Text style={styles.welcomeText}>Hoş Geldiniz 👋</Text>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.businessName}>Çerez Veteriner Kliniği</Text>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <MaterialCommunityIcons name={stat.icon} size={24} color="#7E57C2" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name={action.icon} size={24} color="#7E57C2" />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {renderHeader()}
        
        <View style={styles.content}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={[
                  styles.iconContainer, 
                  { backgroundColor: item.icon === 'logout' ? '#FFF5F5' : '#F5F0FF' }
                ]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={22}
                    color={item.icon === 'logout' ? '#FF6B6B' : '#7E57C2'}
                  />
                </View>
                <Text style={[
                  styles.menuItemTitle,
                  item.textColor && { color: item.textColor }
                ]}>
                  {item.title}
                </Text>
              </View>
              {item.badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
  content: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  badgeContainer: {
    backgroundColor: '#F5F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#7E57C2',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BusinessProfileScreen;