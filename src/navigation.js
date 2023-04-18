import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home.js";
import Login from "./screens/Login.js";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons.js";
import Tracking from "./screens/Tracking.js";
import Settings from "./screens/Settings.js";
import Device from "./screens/Device.js";
import Notifications from "./screens/Notifications.js";
import Signup from "./screens/Signup.js";

// initialize stack navigators
const Stack = createNativeStackNavigator();
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
      <settingsStack.Screen name="Device" component={Device} />
      <settingsStack.Screen name="Notifications" component={Notifications} />
      
    </settingsStack.Navigator>
  )
}

function HomeStack() {
  return (
    <bottomTab.Navigator
      // provides design for bottom tab navigators and their icons
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
      {/* These are the various screens that are within the root component */}
      <bottomTab.Screen name="Home" component={Home} />
      <bottomTab.Screen name="Tracking" component={Tracking} />
      <bottomTab.Screen name="Settings" component={SettingsStackScreen} />
      
    </bottomTab.Navigator>
  );
}

const AuthStack = (loggedIn) => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Root"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={Signup}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
    
  </NavigationContainer>
);
const NavigationProvider = () => {
  const state = useSelector((state) => state);
  console.log(state.isLoggedIn)
  return <AuthStack loggedIn={state.isLoggedIn} />;
};
export default NavigationProvider;
