import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import BottomTabNavigator from './components/BottomTabNavigator';
import BusinessBottomTabNavigator from './components/BusinessBottomTabNavigator';
import ServiceProviderDetail from './screens/ServiceProviderDetail';
import DiscountedServicesScreen from './screens/DiscountedServicesScreen';
import NearbyExpertsScreen from './screens/NearbyExpertsScreen';
import ChatScreen from './screens/ChatScreen';
import MessagesScreen from './screens/MessagesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import BookingScreen from './screens/BookingScreen';
import AppointmentDetailScreen from './screens/AppointmentDetailScreen';
import NewAppointmentScreen from './screens/NewAppointmentScreen';
import NewMessageScreen from './screens/NewMessageScreen';
import SelectModal from './components/SelectModal';
import FavoritesScreen from './screens/FavoritesScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BusinessRegisterScreen from './screens/BusinessRegisterScreen';
import BusinessHomeScreen from './screens/BusinessHomeScreen';
import BusinessAppointmentsScreen from './screens/BusinessAppointmentsScreen';
import BusinessProfileScreen from './screens/BusinessProfileScreen';
import BusinessServicesScreen from './screens/BusinessServicesScreen';
import BusinessMessagesScreen from './screens/BusinessMessagesScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BusinessRegister" component={BusinessRegisterScreen} />
        <Stack.Screen name="BusinessHome" component={BusinessHomeScreen} />
        <Stack.Screen name="BusinessAppointments" component={BusinessAppointmentsScreen} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
        <Stack.Screen name="BusinessServices" component={BusinessServicesScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BusinessMain" component={BusinessBottomTabNavigator} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="ServiceProviderDetail" component={ServiceProviderDetail} />
        <Stack.Screen name="DiscountedServices" component={DiscountedServicesScreen} />
        <Stack.Screen name="NearbyExperts" component={NearbyExpertsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
        <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} />
        <Stack.Screen name="NewMessage" component={NewMessageScreen} />
        <Stack.Screen name="SelectModal" component={SelectModal} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="BusinessMessages" component={BusinessMessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;