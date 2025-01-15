import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppointmentDetailScreen = ({ route, navigation }) => {
  const { appointment } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Randevu Detayları</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.providerSection}>
          <Image 
            source={{ uri: appointment.avatar }} 
            style={styles.providerAvatar} 
          />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{appointment.provider}</Text>
            <Text style={styles.serviceText}>{appointment.service}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={24} color="#3B5998" />
            <Text style={styles.detailText}>{appointment.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={24} color="#3B5998" />
            <Text style={styles.detailText}>{appointment.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="information-circle" size={24} color="#3B5998" />
            <Text style={[
              styles.statusText, 
              appointment.status === 'Onaylandı' ? styles.approvedStatus : styles.pendingStatus
            ]}>
              {appointment.status}
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => {
              // Navigate to chat or contact provider
              navigation.navigate('Chat', { contact: { 
                name: appointment.provider, 
                avatar: appointment.avatar 
              }});
            }}
          >
            <Ionicons name="chatbubble" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Mesaj Gönder</Text>
          </TouchableOpacity>
          {appointment.status === 'Bekliyor' && (
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => {
                navigation.navigate('Booking', { provider: appointment.provider });
              }}
            >
              <Text style={styles.secondaryButtonText}>Randevuyu Düzenle</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  providerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  serviceText: {
    fontSize: 16,
    color: '#666',
  },
  detailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  statusText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  approvedStatus: {
    color: '#4CAF50',
  },
  pendingStatus: {
    color: '#FF9800',
  },
  actionContainer: {
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#3B5998',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3B5998',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#3B5998',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppointmentDetailScreen;