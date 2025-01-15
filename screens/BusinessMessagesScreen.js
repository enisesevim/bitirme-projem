import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Platform, TextInput, Image, Animated,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const BusinessMessagesScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [Platform.OS === 'ios' ? 120 : 100, Platform.OS === 'ios' ? 80 : 60],
    extrapolate: 'clamp',
  });

  const mockMessages = [
    {
      id: '1',
      customerName: 'Ahmet Yılmaz',
      lastMessage: 'Randevumu 15 dakika gecikebilirim',
      time: '14:30',
      unread: true,
      avatar: null,
      status: 'online',
    },
    {
      id: '2',
      customerName: 'Ayşe Demir',
      lastMessage: 'Teşekkür ederim, görüşmek üzere',
      time: '12:45',
      unread: false,
      avatar: null,
      status: 'offline',
    },
  ];

  const mockAppointments = [
    {
      id: '1',
      customerName: 'Ahmet Yılmaz',
      service: 'Saç Kesimi',
      date: '2024-12-26',
      time: '14:30',
      status: 'upcoming',
      price: '150₺',
      notes: 'Özel istekler var',
    },
    {
      id: '2',
      customerName: 'Ayşe Demir',
      service: 'Saç Boyama',
      date: '2024-12-26',
      time: '16:00',
      status: 'confirmed',
      price: '350₺',
    },
  ];

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <BlurView intensity={100} style={styles.blur}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mesajlar</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('NewMessage')}
            >
              <MaterialCommunityIcons name="message-plus" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchWrapper}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder={selectedTab === 'messages' ? "Mesajlarda ara..." : "Randevularda ara..."}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderMessageItem = (message) => (
    <TouchableOpacity
      key={message.id}
      style={styles.messageItem}
      onPress={() => navigation.navigate('ChatDetail', { customerId: message.id })}
    >
      <View style={styles.avatarContainer}>
        {message.avatar ? (
          <Image source={{ uri: message.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {message.customerName.charAt(0)}
            </Text>
          </View>
        )}
        <View style={[styles.statusDot, 
          { backgroundColor: message.status === 'online' ? '#4CAF50' : '#bbb' }]} />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.customerName}>{message.customerName}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={[styles.lastMessage, message.unread && styles.unreadMessage]} 
            numberOfLines={1}>
            {message.lastMessage}
          </Text>
          {message.unread && <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>1</Text>
          </View>}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAppointmentItem = (appointment) => (
    <TouchableOpacity
      key={appointment.id}
      style={styles.appointmentItem}
      onPress={() => navigation.navigate('AppointmentDetail', { appointment })}
    >
      <View style={styles.appointmentContent}>
        <View style={styles.appointmentHeader}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.customerName}>{appointment.customerName}</Text>
            <Text style={styles.serviceText}>{appointment.service}</Text>
          </View>
          <View style={[styles.statusBadge, 
            { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
            <View style={[styles.statusDot, 
              { backgroundColor: getStatusColor(appointment.status) }]} />
            <Text style={[styles.statusText, 
              { color: getStatusColor(appointment.status) }]}>
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
            <MaterialCommunityIcons name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>{appointment.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="currency-try" size={16} color="#666" />
            <Text style={styles.detailText}>{appointment.price}</Text>
          </View>
        </View>
        {appointment.notes && (
          <View style={styles.notesContainer}>
            <MaterialCommunityIcons name="note-text-outline" size={16} color="#666" />
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#4C66EF']} 
            tintColor="#4C66EF" 
          />
        }
      >
        {renderSearchBar()}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'messages' && styles.activeTab]}
            onPress={() => setSelectedTab('messages')}
          >
            <MaterialCommunityIcons 
              name="message-text" 
              size={24} 
              color={selectedTab === 'messages' ? '#4C66EF' : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'messages' && styles.activeTabText]}>
              Mesajlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'appointments' && styles.activeTab]}
            onPress={() => setSelectedTab('appointments')}
          >
            <MaterialCommunityIcons 
              name="calendar-clock" 
              size={24} 
              color={selectedTab === 'appointments' ? '#4C66EF' : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'appointments' && styles.activeTabText]}>
              Randevular
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {selectedTab === 'messages' ? (
            mockMessages.map(message => renderMessageItem(message))
          ) : (
            mockAppointments.map(appointment => renderAppointmentItem(appointment))
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    backgroundColor: '#4C66EF',
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    borderWidth: 2,
    borderColor: '#4C66EF',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchWrapper: {
    padding: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
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
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 6,
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
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#F0F3FF',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#4C66EF',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  messageItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4C66EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  customerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  messageTime: {
    fontSize: 13,
    color: '#666',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 15,
    color: '#666',
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '500',
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4C66EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
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
  appointmentContent: {
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appointmentInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceText: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

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

export default BusinessMessagesScreen;