import React, { useState, useEffect } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,KeyboardAvoidingView,Platform,Alert,ActivityIndicator,ScrollView,Animated,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const BusinessRegisterScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!businessName) newErrors.businessName = 'İşletme adı gerekli';
    if (!ownerName) newErrors.ownerName = 'İşletme sahibi adı gerekli';
    if (!email) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    if (!phone) newErrors.phone = 'Telefon numarası gerekli';
    if (!address) newErrors.address = 'Adres gerekli';
    if (!category) newErrors.category = 'Hizmet kategorisi gerekli';
    if (!password) {
      newErrors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Şifre tekrarı gerekli';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const existingUsers = await AsyncStorage.getItem('businessUsers');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      if (users.some(user => user.email === email)) {
        Alert.alert('Hata', 'Bu e-posta adresi zaten kayıtlı');
        return;
      }

      const newUser = { businessName, ownerName, email, phone, address, category, password, userType: 'business' };
      
      users.push(newUser);
      await AsyncStorage.setItem('businessUsers', JSON.stringify(users));

      Alert.alert(
        'Başarılı',
        'İşletme kaydınız tamamlandı',
        [{ text: 'Tamam', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Hata', 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4C66EF', '#3947B4', '#2C3A8C']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView>
            <Animated.View 
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={styles.headerSection}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF"/>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                  <MaterialCommunityIcons name="store" size={60} color="#FFF" />
                </View>
                <Text style={styles.appTitle}>İşletme Hesabı Oluştur</Text>
                <Text style={styles.appSubtitle}>Hizmetlerinizi müşterilerinizle buluşturun</Text>
              </View>

              <View style={styles.formSection}>
                <View style={[styles.inputContainer, errors.businessName && styles.inputError]}>
                  <MaterialCommunityIcons name="store-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="İşletme Adı"
                    placeholderTextColor="#A0A0A0"
                    value={businessName}
                    onChangeText={(text) => {
                      setBusinessName(text);
                      setErrors(prev => ({ ...prev, businessName: '' }));
                    }}
                  />
                </View>
                {errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}

                <View style={[styles.inputContainer, errors.ownerName && styles.inputError]}>
                  <MaterialCommunityIcons name="account-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="İşletme Sahibi Adı Soyadı"
                    placeholderTextColor="#A0A0A0"
                    value={ownerName}
                    onChangeText={(text) => {
                      setOwnerName(text);
                      setErrors(prev => ({ ...prev, ownerName: '' }));
                    }}
                  />
                </View>
                {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="E-posta"
                    placeholderTextColor="#A0A0A0"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                  <MaterialCommunityIcons name="phone-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Telefon Numarası"
                    placeholderTextColor="#A0A0A0"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    keyboardType="phone-pad"
                  />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                <View style={[styles.inputContainer, errors.address && styles.inputError]}>
                  <MaterialCommunityIcons name="map-marker-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="İşletme Adresi"
                    placeholderTextColor="#A0A0A0"
                    value={address}
                    onChangeText={(text) => {
                      setAddress(text);
                      setErrors(prev => ({ ...prev, address: '' }));
                    }}
                    multiline
                  />
                </View>
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <View style={[styles.inputContainer, errors.category && styles.inputError]}>
                  <MaterialCommunityIcons name="tag-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Hizmet Kategorisi"
                    placeholderTextColor="#A0A0A0"
                    value={category}
                    onChangeText={(text) => {
                      setCategory(text);
                      setErrors(prev => ({ ...prev, category: '' }));
                    }}
                  />
                </View>
                {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    placeholderTextColor="#A0A0A0"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#A0A0A0"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                  <MaterialCommunityIcons name="lock-check-outline" size={24} color="#A0A0A0" />
                  <TextInput
                    style={styles.input}
                    placeholder="Şifre Tekrar"
                    placeholderTextColor="#A0A0A0"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#A0A0A0"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#6C8EF5', '#4C66EF']}
                    style={styles.gradientButton}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.registerButtonText}>İşletme Hesabı Oluştur</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Zaten bir hesabınız var mı? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Giriş Yap</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    zIndex: 1,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formSection: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    minHeight: 55,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 5,
  },
  registerButton: {
    height: 55,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#4C66EF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BusinessRegisterScreen;