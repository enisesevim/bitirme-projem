import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, Modal, SafeAreaView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
  const contact = route.params?.contact;

  if (!contact) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Kışi bilgisi alınamadı.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'text',
      content: 'Merhaba, size nasıl yardımcı olabilirim?',
      sender: 'provider',
      time: '10:30',
    },
    {
      id: '2',
      type: 'offer',
      content: {
        title: 'Elektrik Tesisatı Teklifi',
        description: 'Komple daire elektrik tesisatı yenileme',
        price: '2500₺',
        duration: '2 gün',
      },
      sender: 'provider',
      time: '10:31',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offer, setOffer] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
  });

  const flatListRef = useRef(null);

  const renderMessage = ({ item }) => {
    const isProvider = item.sender === 'provider';

    if (item.type === 'offer') {
      return (
        <View style={styles.offerContainer}>
          <View style={[
            styles.offerContentWhiteBackground,
            !isProvider && styles.userOfferContent
          ]}>
            <Text style={styles.offerTitle}>{item.content.title}</Text>
            <Text style={styles.offerDescription}>{item.content.description}</Text>
            <View style={styles.offerDetails}>
              <View style={styles.offerDetail}>
                <Ionicons name="cash-outline" size={20} color="#FF6B6B" />
                <Text style={styles.offerDetailText}>{item.content.price} ₺</Text>
              </View>
              <View style={styles.offerDetail}>
                <Ionicons name="time-outline" size={20} color="#FF6B6B" />
                <Text style={styles.offerDetailText}>{item.content.duration} gün</Text>
              </View>
            </View>
            <View style={styles.offerActions}>
              <TouchableOpacity style={styles.acceptButton}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.acceptButtonText}>Kabul Et</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton}>
                <Ionicons name="close-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.rejectButtonText}>Reddet</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.messageContainer,
        isProvider ? styles.providerMessage : styles.userMessage
      ]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'text',
        content: inputText.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString().slice(0, 5),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd();
      }, 100);
    }
  };

  const sendOffer = () => {
    const trimmedTitle = offer.title.trim();
    const trimmedPrice = offer.price.trim();
    const trimmedDuration = offer.duration.trim();

    if (trimmedTitle && trimmedPrice) {
      const newOffer = {
        id: Date.now().toString(),
        type: 'offer',
        content: {
          title: trimmedTitle,
          description: offer.description.trim(),
          price: trimmedPrice,
          duration: trimmedDuration || 'Süre belirtilmedi',
        },
        sender: 'user',
        time: new Date().toLocaleTimeString().slice(0, 5),
      };

      setMessages(prev => [...prev, newOffer]);
      setShowOfferModal(false);
      setOffer({ title: '', description: '', price: '', duration: '' });
      setTimeout(() => {
        flatListRef.current?.scrollToEnd();
      }, 100);
    } else {
      Alert.alert(
        'Eksik Bilgi',
        'Teklif başlığı ve fiyatı zorunludur!',
        [{ text: 'Tamam', style: 'cancel' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerProfile}>
          <Image
            source={{ uri: contact.avatar }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{contact.name}</Text>
            <Text style={styles.headerStatus}>Çevrimiçi</Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={() => setShowOfferModal(true)}
          >
            <Ionicons name="pricetag-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Mesajınızı yazın..."
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Ionicons name="send" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showOfferModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowOfferModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Teklif Oluştur</Text>
              <TouchableOpacity onPress={() => setShowOfferModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Teklif Başlığı"
              value={offer.title}
              onChangeText={(text) => setOffer(prev => ({ ...prev, title: text }))}
            />
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Teklif Açıklaması"
              value={offer.description}
              onChangeText={(text) => setOffer(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Fiyat (₺)"
              value={offer.price}
              onChangeText={(text) => setOffer(prev => ({ ...prev, price: text }))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Süre (\u00f6rn: 2 g\u00fcn)"
              value={offer.duration}
              onChangeText={(text) => setOffer(prev => ({ ...prev, duration: text }))}
            />

            <TouchableOpacity
              style={styles.sendOfferButton}
              onPress={sendOffer}
            >
              <Text style={styles.sendOfferButtonText}>Teklifi Gönder</Text>
            </TouchableOpacity>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    marginBottom: 16,
  },
  goBackButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  headerStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  providerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  offerContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    borderRadius: 16,
  },
  offerContentWhiteBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 4,
  },
  userOfferContent: {
    
    
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  offerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  offerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  offerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalTextArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  sendOfferButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sendOfferButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
