import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MessagesScreen = () => {
  const [activeTab, setActiveTab] = useState('Messages');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const dummyMessages = [
    { id: '1', name: 'Ahmet Usta', lastMessage: 'Yarın saat 14:00\'te geleceğim.', time: '10:30', unread: 2, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Sevda Hanım', lastMessage: 'İşlem tamamlandı, teşekkürler!', time: 'Dün', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '3', name: 'Mehmet Usta', lastMessage: 'Fiyat teklifini gönderiyorum.', time: 'Paz', unread: 1, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  const dummyAppointments = [
    { 
      id: '1', 
      provider: 'Ahmet Elektrik', 
      service: 'Elektrik Tesisatı', 
      date: '15 Haziran 2024', 
      time: '14:00', 
      status: 'Onaylandı',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    { 
      id: '2', 
      provider: 'Mehmet Usta', 
      service: 'Arıza Tespiti', 
      date: '20 Haziran 2024', 
      time: '10:00', 
      status: 'Bekliyor',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageItem} 
      activeOpacity={0.7} 
      onPress={() => navigation.navigate('Chat', { contact: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
    </TouchableOpacity>
  );

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageItem} 
      activeOpacity={0.7} 
      onPress={() => navigation.navigate('AppointmentDetail', { appointment: item })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={[
          styles.statusBadge, 
          item.status === 'Onaylandı' ? styles.approvedStatus : styles.pendingStatus
        ]}>
          <Text style={styles.statusText}>{item.status === 'Onaylandı' ? 'O' : 'B'}</Text>
        </View>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.provider}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.service} - {item.date}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
    </TouchableOpacity>
  );

  const filteredContent = activeTab === 'Messages' 
    ? dummyMessages.filter(message => 
        message.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dummyAppointments.filter(appointment => 
        appointment.provider.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const handleAddButton = () => {
        
        if (activeTab === 'Messages') {
          navigation.navigate('NewMessage');
        } else {
          navigation.navigate('NewAppointment');
        }
      };

      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>İletişim</Text>
            <TouchableOpacity 
              style={styles.headerIcon}
              onPress={handleAddButton}
            >
              <Ionicons name="add" size={24} color="#3B5998" />
            </TouchableOpacity>
          </View>
    
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'Messages' && styles.activeTab
              ]}
              onPress={() => setActiveTab('Messages')}
            >
              <Text style={[
                styles.tabText, 
                activeTab === 'Messages' && styles.activeTabText
              ]}>Mesajlar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tabButton, 
                activeTab === 'Appointments' && styles.activeTab
              ]}
              onPress={() => setActiveTab('Appointments')}
            >
              <Text style={[
                styles.tabText, 
                activeTab === 'Appointments' && styles.activeTabText
              ]}>Randevular</Text>
            </TouchableOpacity>
          </View>
          
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={`${activeTab === 'Messages' ? 'Mesajlarda' : 'Randevularda'} ara...`}
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredContent}
        renderItem={activeTab === 'Messages' ? renderMessageItem : renderAppointmentItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
  },
  headerIcon: {
    backgroundColor: '#F1F4F9',
    borderRadius: 50,
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4500',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    marginRight: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tabButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B5998',
  },
  tabText: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#3B5998',
  },
  statusBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  approvedStatus: {
    backgroundColor: '#4CAF50',
  },
  pendingStatus: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default MessagesScreen;