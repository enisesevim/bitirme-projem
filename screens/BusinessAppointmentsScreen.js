import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Platform, TextInput,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessAppointmentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Örnek randevu verileri
  const mockAppointments = [
    {
      id: '1',
      customerName: 'Ahmet Yılmaz',
      service: 'Saç Kesimi',
      date: '2024-12-26',
      time: '14:30',
      status: 'upcoming',
      price: '150₺',
      phoneNumber: '+90 555 123 4567',
      notes: 'Kısa kesim tercih ediyor',
    },
    {
      id: '2',
      customerName: 'Ayşe Demir',
      service: 'Saç Boyama',
      date: '2024-12-26',
      time: '16:00',
      status: 'confirmed',
      price: '350₺',
      phoneNumber: '+90 555 987 6543',
      notes: 'Açık kahve ton istiyor',
    },
  ];

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    // Sonra API'den yüklicem
    setAppointments(mockAppointments);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  const filterAppointments = () => {
    let filtered = [...mockAppointments];

    // Status filtreleme
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(app => app.status === selectedFilter);
    }

    // Arama filtreleme
    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#4CAF50';
      case 'confirmed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      case 'completed':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Yaklaşan';
      case 'confirmed':
        return 'Onaylandı';
      case 'cancelled':
        return 'İptal Edildi';
      case 'completed':
        return 'Tamamlandı';
      default:
        return status;
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Randevular</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('NewAppointment')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons name="magnify" size={24} color="#666" />
      <TextInput
        style={styles.searchInput}
        placeholder="Müşteri veya hizmet ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const renderFilters = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filtersContainer}
    >
      {['all', 'upcoming', 'confirmed', 'cancelled', 'completed'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.filterButtonActive
          ]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={[
            styles.filterButtonText,
            selectedFilter === filter && styles.filterButtonTextActive
          ]}>
            {filter === 'all' ? 'Tümü' : getStatusText(filter)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderAppointmentCard = (appointment) => (
    <TouchableOpacity 
      key={appointment.id}
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('AppointmentDetail', { appointment })}
    >
      <View style={styles.appointmentHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{appointment.customerName}</Text>
          <Text style={styles.serviceText}>{appointment.service}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(appointment.status) + '20' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(appointment.status) }
          ]}>
            {getStatusText(appointment.status)}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="currency-try" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.price}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="phone" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.phoneNumber}</Text>
        </View>
      </View>

      {appointment.notes && (
        <View style={styles.notesContainer}>
          <MaterialCommunityIcons name="note-text-outline" size={16} color="#666" />
          <Text style={styles.notesText} numberOfLines={2}>
            {appointment.notes}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderSearchBar()}
        {renderFilters()}
        <View style={styles.appointmentsList}>
          {filterAppointments().map(appointment => renderAppointmentCard(appointment))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4C66EF',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  filterButtonActive: {
    backgroundColor: '#4C66EF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  appointmentsList: {
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    padding: 10,
    borderRadius: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default BusinessAppointmentsScreen;