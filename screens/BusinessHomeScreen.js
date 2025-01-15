import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BusinessHomeScreen = ({ navigation }) => {
  const [businessData, setBusinessData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: '1',
      customerName: 'Ahmet Yılmaz',
      service: 'Saç Kesimi',
      time: '14:30',
      status: 'upcoming',
      price: '120 TL',
      avatar: 'AY'
    },
    {
      id: '2',
      customerName: 'Ayşe Demir',
      service: 'Saç Boyama',
      time: '16:00',
      status: 'confirmed',
      price: '350 TL',
      avatar: 'AD'
    }
  ];

  const loadBusinessData = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        setBusinessData(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading business data:', error);
    }
  };

  useEffect(() => {
    loadBusinessData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBusinessData();
    setRefreshing(false);
  };

  const getStatusInfo = (status) => {
    const statusConfigs = {
      upcoming: {
        color: '#818CF8',
        bgColor: '#EEF2FF',
        text: 'Yaklaşan'
      },
      confirmed: {
        color: '#34D399',
        bgColor: '#ECFDF5',
        text: 'Onaylandı'
      },
      cancelled: {
        color: '#F87171',
        bgColor: '#FEF2F2',
        text: 'İptal'
      }
    };
    return statusConfigs[status] || statusConfigs.upcoming;
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Hoş Geldiniz 👋</Text>
          <Text style={styles.businessName}>{businessData?.businessName || 'İşletme Adı'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialCommunityIcons name="account" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerStats}>
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>₺1,250</Text>
          <Text style={styles.headerStatLabel}>Bugünkü Kazanç</Text>
        </View>
        <View style={styles.headerStatDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>8</Text>
          <Text style={styles.headerStatLabel}>Randevu</Text>
        </View>
        <View style={styles.headerStatDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>%85</Text>
          <Text style={styles.headerStatLabel}>Doluluk</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('NewAppointment')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#EEF2FF' }]}>
            <MaterialCommunityIcons name="calendar-plus" size={24} color="#4F46E5" />
          </View>
          <Text style={styles.actionText}>Yeni{'\n'}Randevu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Services')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FDF2F8' }]}>
            <MaterialCommunityIcons name="format-list-checks" size={24} color="#DB2777" />
          </View>
          <Text style={styles.actionText}>Hizmet{'\n'}Listesi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Analytics')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F0F9FF' }]}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#0EA5E9" />
          </View>
          <Text style={styles.actionText}>Analiz{'\n'}Raporu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F5F3FF' }]}>
            <MaterialCommunityIcons name="cog" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.actionText}>Hesap{'\n'}Ayarları</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDateSelector = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateSelector}
        contentContainerStyle={styles.dateSelectorContent}
      >
        {dates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateItem, isSelected && styles.selectedDateItem]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
                {date.toLocaleDateString('tr-TR', { weekday: 'short' })}
              </Text>
              <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderAppointmentItem = (appointment) => {
    const statusInfo = getStatusInfo(appointment.status);
    return (
      <TouchableOpacity 
        key={appointment.id}
        style={styles.appointmentItem}
        onPress={() => navigation.navigate('AppointmentDetail', { appointment })}
      >
        <View style={styles.appointmentLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{appointment.avatar}</Text>
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.customerName}>{appointment.customerName}</Text>
            <Text style={styles.serviceText}>{appointment.service}</Text>
            <View style={styles.timeContainer}>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#6B7280" />
              <Text style={styles.timeText}>{appointment.time}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.appointmentRight}>
          <Text style={styles.priceText}>{appointment.price}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAppointments = () => (
    <View style={styles.appointmentsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Randevularım</Text>
        <TouchableOpacity 
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('Appointments')}
        >
          <Text style={styles.seeAllText}>Tümünü Gör</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
      {renderDateSelector()}
      <View style={styles.appointmentsList}>
        {appointments.map(appointment => renderAppointmentItem(appointment))}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {renderHeader()}
      {renderQuickActions()}
      {renderAppointments()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  headerStat: {
    flex: 1,
    alignItems: 'center',
  },
  headerStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerStatLabel: {
    fontSize: 12,
    color: '#E0E7FF',
  },
  headerStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  quickActions: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: (width - 80) / 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 16,
  },
  dateSelector: {
    marginVertical: 16,
  },
  dateSelectorContent: {
    paddingHorizontal: 16,
  },
  dateItem: {
    width: 54,
    height: 70,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedDateItem: {
    backgroundColor: '#4F46E5',
  },
  dateDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  appointmentsSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  appointmentsList: {
    paddingHorizontal: 20,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  appointmentInfo: {
    flex: 1,
    gap: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  serviceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  appointmentRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BusinessHomeScreen;