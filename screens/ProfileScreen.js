import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, Platform, StatusBar, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const userInfo = {
    name: 'Enise Sevim',
    email: 'ens.svm.124@gmail.com',
    phone: '+90 545 443 01 85',
    address: 'Tekirdağ/Çorlu',
    avatar: require('../assets/enise.jpg'),
    membershipType: 'Premium Üye',
    joinDate: 'Ocak 2024'
  };

  const [editedUser, setEditedUser] = useState({ ...userInfo });

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const handleSaveChanges = () => {
    toggleEditModal();
  };

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinize emin misiniz?",
      [
        {
          text: "Vazgeç",
          style: "cancel"
        },
        { 
          text: "Çıkış Yap",
          onPress: () => navigation.replace('Login'),
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  const renderProfileInfoRow = (icon, label, value, onPress = null) => (
    <TouchableOpacity style={styles.profileInfoRow} onPress={onPress}>
      <View style={styles.profileInfoIconContainer}>
        <Ionicons name={icon} size={22} color="#3B5998" />
      </View>
      <View style={styles.profileInfoTextContainer}>
        <Text style={styles.profileInfoLabel}>{label}</Text>
        <Text style={styles.profileInfoValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C0C0C0" />
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={userInfo.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{userInfo.name}</Text>
          <View style={styles.membershipBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.membershipText}>{userInfo.membershipType}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={toggleEditModal}>
            <Ionicons name="create-outline" size={16} color="#FFFFFF" />
            <Text style={styles.editProfileButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>

      
        <View style={styles.profileInfoCard}>
          <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
          <View style={styles.profileInfoSection}>
            {renderProfileInfoRow('mail', 'E-posta', userInfo.email)}
            {renderProfileInfoRow('call', 'Telefon', userInfo.phone)}
            {renderProfileInfoRow('location', 'Adres', userInfo.address)}
            {renderProfileInfoRow('calendar', 'Üyelik Tarihi', userInfo.joinDate)}
          </View>
        </View>

      
        <View style={styles.actionsGrid}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <View style={styles.gridContainer}>
            {[
              { icon: 'heart', title: 'Favorilerim', color: '#FF6B6B', onPress: () => navigation.navigate('Favorites') },
              { icon: 'notifications', title: 'Bildirimler', color: '#4ECDC4', onPress: null },
              { icon: 'settings', title: 'Ayarlar', color: '#45B7D1', onPress: null },
              { icon: 'help-circle', title: 'Yardım', color: '#96C', onPress: null }
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gridItem}
                onPress={item.onPress}
              >
                <View style={[styles.gridIconContainer, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.gridItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF4500" />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditModalVisible}
          onRequestClose={toggleEditModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Profili Düzenle</Text>
                <TouchableOpacity 
                  onPress={toggleEditModal}
                  style={styles.modalCloseButton}
                >
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScrollView}>
                <View style={styles.modalAvatarSection}>
                  <Image source={userInfo.avatar} style={styles.modalAvatar} />
                  <TouchableOpacity style={styles.modalChangeAvatarButton}>
                    <Ionicons name="camera" size={20} color="#3B5998" />
                    <Text style={styles.modalChangeAvatarText}>Fotoğrafı Değiştir</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Ad Soyad</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editedUser.name}
                    onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                    placeholder="Ad Soyad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>E-posta</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editedUser.email}
                    onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                    placeholder="E-posta"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Telefon</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editedUser.phone}
                    onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
                    placeholder="Telefon"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Adres</Text>
                  <TextInput
                    style={[styles.modalInput, styles.multilineInput]}
                    value={editedUser.address}
                    onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
                    placeholder="Adres"
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.modalCancelButton} 
                  onPress={toggleEditModal}
                >
                  <Text style={styles.modalCancelButtonText}>Vazgeç</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalSaveButton} 
                  onPress={handleSaveChanges}
                >
                  <Text style={styles.modalSaveButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContainer: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#3B5998',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B5998',
    borderRadius: 20,
    padding: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  membershipText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  profileInfoCard: {
    marginTop: 25,
  },
  profileInfoSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileInfoIconContainer: {
    backgroundColor: '#F1F4F9',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
  },
  profileInfoTextContainer: {
    flex: 1,
  },
  profileInfoLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  profileInfoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  actionsGrid: {
    marginTop: 25,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },
  gridItem: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    margin: 5,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridIconContainer: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
  },
  gridItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F0',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF4500',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalScrollView: {
    padding: 20,
  },
  modalAvatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalChangeAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F1F4F9',
    borderRadius: 20,
  },
  modalChangeAvatarText: {
    marginLeft: 8,
    color: '#3B5998',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
  },
  modalInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  modalCancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#F1F4F9',
    marginRight: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSaveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#3B5998',
    alignItems: 'center',
  },
  modalSaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;