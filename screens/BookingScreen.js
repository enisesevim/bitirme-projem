import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = ({ route, navigation }) => {
  const { provider } = route.params;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const services = [
    { id: '1', name: 'Elektrik Tesisatı', price: 200, duration: '1 saat' },
    { id: '2', name: 'Aydınlatma', price: 180, duration: '1 saat' },
    { id: '3', name: 'Arıza Tespiti', price: 150, duration: '1 saat' },
  ];

  const handleBookAppointment = () => {
    if (selectedService && selectedDate && selectedTime) {
      setIsConfirmationVisible(true);
      setTimeout(() => {
        setIsConfirmationVisible(false);
        navigation.navigate('Mesajlar', { 
          screen: 'MessagesScreen', 
          params: { 
            initialTab: 'Appointments',
            newAppointment: {
              id: String(Date.now()),
              provider: provider,
              service: selectedService.name,
              date: selectedDate.toLocaleDateString(),
              time: selectedTime,
              status: 'Bekliyor',
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
            }
          } 
        });
      }, 2000);
    } else {
      alert('Lütfen tüm bilgileri seçiniz');
    }
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = (event, date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = (event, time) => {
    setIsTimePickerVisible(false);
    if (time) {
      setSelectedTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Randevu Oluştur</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hizmet Seçimi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hizmet Seçiniz</Text>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={[
                styles.serviceItem, 
                selectedService?.id === service.id && styles.selectedServiceItem
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.serviceDetails}>
                <Text style={styles.servicePrice}>{service.price}₺</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tarih Seçimi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tarih Seçiniz</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={hideDatePicker}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Saat Seçimi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Saat Seçiniz</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={styles.timeText}>
              {selectedTime || 'Saat seçiniz'}
            </Text>
          </TouchableOpacity>
          {isTimePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={hideTimePicker}
            />
          )}
        </View>
      </ScrollView>

      {/* Randevu Al Butonu */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Randevu Oluştur</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Popup */}
      <Modal
        transparent={true}
        visible={isConfirmationVisible}
        animationType="fade"
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Randevunuz Oluşturuldu!</Text>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedServiceItem: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  serviceDetails: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  popupText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BookingScreen;