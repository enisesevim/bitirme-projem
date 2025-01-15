import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BusinessHomeScreen from '../screens/BusinessHomeScreen';
import BusinessMessagesScreen from '../screens/BusinessMessagesScreen';
import BusinessServicesScreen from '../screens/BusinessServicesScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';

const Tab = createBottomTabNavigator();

const BusinessBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0EA5E9', 
        tabBarInactiveTintColor: '#9CA3AF', 
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let iconColor = color;

          if (route.name === 'BusinessHome') {
            iconName = 'home';
            iconColor = focused ? '#0EA5E9' : '#9CA3AF';
          } else if (route.name === 'BusinessMessages') {
            iconName = 'message-text';
            iconColor = focused ? '#0EA5E9' : '#9CA3AF';
          } else if (route.name === 'BusinessServices') {
            iconName = 'store-settings';
            iconColor = focused ? '#0EA5E9' : '#9CA3AF';
          } else if (route.name === 'BusinessProfile') {
            iconName = 'account';
            iconColor = focused ? '#0EA5E9' : '#9CA3AF';
          }

          return (
            <MaterialCommunityIcons 
              name={iconName} 
              size={size} 
              color={iconColor}
              style={{
                marginTop: 4,
              }}
            />
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="BusinessHome"
        component={BusinessHomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
        }}
      />
      <Tab.Screen
        name="BusinessMessages"
        component={BusinessMessagesScreen}
        options={{
          tabBarLabel: 'Mesajlar',
        }}
      />
      <Tab.Screen
        name="BusinessServices"
        component={BusinessServicesScreen}
        options={{
          tabBarLabel: 'Hizmetler',
        }}
      />
      <Tab.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default BusinessBottomTabNavigator;