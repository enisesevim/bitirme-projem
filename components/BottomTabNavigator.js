import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ServiceCategoryDetailScreen from '../screens/ServiceCategoryDetailScreen';
import MapScreen from '../screens/MapScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="ServiceCategoryDetail" 
        component={ServiceCategoryDetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.categoryName || 'Detaylar',
          headerShown: false 
        })} 
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Ana Sayfa': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Harita': iconName = focused ? 'map' : 'map-outline'; break;
            case 'Mesajlar': iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; break;
            case 'Profil': iconName = focused ? 'person' : 'person-outline'; break;
            default: iconName = 'alert-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#9d6d49',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
        headerShown: false
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeStack} />
      <Tab.Screen name="Harita" component={MapScreen} />
      <Tab.Screen name="Mesajlar" component={MessagesScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
