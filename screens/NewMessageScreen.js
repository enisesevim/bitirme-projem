import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SelectModal from '../components/SelectModal';
const NewMessageScreen = () => {
  const navigation = useNavigation();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

 
 const [recipientModalVisible, setRecipientModalVisible] = useState(false);

 
 const recipients = [
   { id: 1, name: 'Ahmet Usta' },
   { id: 2, name: 'Mehmet Usta' },
   { id: 3, name: 'Sevda Hanım' },
   { id: 4, name: 'Serkan Tesisatçı' }
 ];  const handleSendMessage = () => {
    
    console.log('Mesaj Bilgileri:', { 
      recipient, 
      message 
    });

    navigation.navigate('Messages');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3B5998" />
        </TouchableOpacity>
        <Text style={styles.title}>Yeni Mesaj</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alıcı</Text>
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => setRecipientModalVisible(true)}
          >
            <Text style={recipient ? styles.selectedText : styles.placeholderText}>
              {recipient ? recipient.name : 'Alıcıyı seçin'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mesaj</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mesajınızı yazın"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={6}
          />
        </View>

        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.sendButtonText}>Mesaj Gönder</Text>
        </TouchableOpacity>
      </ScrollView>

    
      <SelectModal
        visible={recipientModalVisible}
        onClose={() => setRecipientModalVisible(false)}
        onSelect={setRecipient}
        items={recipients}
        title="Alıcıyı Seçin"
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
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#3B5998',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  }
});

export default NewMessageScreen;