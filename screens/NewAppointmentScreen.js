import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SelectModal from '../components/SelectModal';
const NewAppointmentScreen = () => {
  const navigation = useNavigation();
  const [service, setService] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');


  // Modal görünürlük 
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [providerModalVisible, setProviderModalVisible] = useState(false);

  
  const serviceTypes = [
    { id: 1, name: 'Elektrik Tesisatı' },
    { id: 2, name: 'Sıhhi Tesisat' },
    { id: 3, name: 'Doğalgaz Montajı' },
    { id: 4, name: 'Klima Bakımı' },
    { id: 5, name: 'Tadilat ve Tamirat' }
  ];

  const providers = [
    { id: 1, name: 'Ahmet Elektrik' },
    { id: 2, name: 'Mehmet Usta' },
    { id: 3, name: 'Serkan Tesisatçı' },
    { id: 4, name: 'Hasan Klima Servisi' }
  ];
  const handleCreateAppointment = () => {
    // Burada randevu oluşturma mantığı eklicem
    // Örneğin, backend'e veri gönderme veya local storage'a kaydetme
    console.log('Randevu Bilgileri:', { 
      service, 
      provider, 
      date, 
      time, 
      description 
    });

    // Başarılı randevu oluşturma sonrası mesajlar ekranına dönmek için
    navigation.navigate('Messages');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3B5998" />
        </TouchableOpacity>
        <Text style={styles.title}>Yeni Randevu</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hizmet Türü</Text>
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => setServiceModalVisible(true)}
          >
            <Text style={service ? styles.selectedText : styles.placeholderText}>
              {service ? service.name : 'Hizmet türünü seçin'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hizmet Sağlayıcı</Text>
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => setProviderModalVisible(true)}
          >
            <Text style={provider ? styles.selectedText : styles.placeholderText}>
              {provider ? provider.name : 'Hizmet sağlayıcıyı seçin'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateAppointment}
        >
          <Text style={styles.createButtonText}>Randevu Oluştur</Text>
        </TouchableOpacity>
      </ScrollView>

      <SelectModal
        visible={serviceModalVisible}
        onClose={() => setServiceModalVisible(false)}
        onSelect={setService}
        items={serviceTypes}
        title="Hizmet Türünü Seçin"
      />

      <SelectModal
        visible={providerModalVisible}
        onClose={() => setProviderModalVisible(false)}
        onSelect={setProvider}
        items={providers}
        title="Hizmet Sağlayıcıyı Seçin"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginLeft: 15,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#3B5998',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  selectInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#A0A0A0',
  },
  selectedText: {
    color: '#333',
  }
});

export default NewAppointmentScreen;