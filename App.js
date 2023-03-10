import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './pages/Account';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Tracking from './pages/Tracking';
import Settings from './pages/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const bottomTab = createBottomTabNavigator();
const settingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return(
    <settingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <settingsStack.Screen name="SettingsScreen" component={Settings} />
      <settingsStack.Screen name="Account" component={Account} />
      <settingsStack.Screen name="Notifications" component={Notifications} />
      
    </settingsStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <bottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Tracking') {
              iconName = focused ? 'ios-sunny' : 'ios-sunny-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-cog' : 'ios-cog';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'teal',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <bottomTab.Screen name="Home" component={Home} />
        <bottomTab.Screen name="Tracking" component={Tracking} />
        <bottomTab.Screen name="Settings" component={SettingsStackScreen} />
      </bottomTab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
