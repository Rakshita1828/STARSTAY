import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import BookingScreen from '../screens/BookingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigation = useNavigation<any>(); // Move useNavigation inside the component

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);  // Reset authentication state
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],  // Reset stack to Login screen
    });
  };

  return (
    
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Booking' : 'Home'}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Booking">
              {(props) => <BookingScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
          </>
        )}
      </Stack.Navigator>

  );
};

export default StackNavigator;
