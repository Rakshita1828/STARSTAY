import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
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
           <Stack.Screen 
  name="Home" 
  component={HomeScreen} 
  options={{
    headerTitle: () => (
      <Image
        source={require('../assets/logo.jpg')} // Adjust the path to your logo
        style={{ width: 90, height: 90 ,resizeMode: 'contain'}}
      />
    ),
  }}
/>
<Stack.Screen 
  name="Login" 
  component={LoginScreen} 
  options={{
    headerTitle: 'LOGIN',  // Centered title
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#D1A843',   // Title color
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image 
        source={require('../assets/logo.jpg')} // Path to your logo
        style={{ width: 90, height: 90, marginLeft: 10, resizeMode: 'contain' }} 
      />
      </TouchableOpacity>
    ),
  }}
/>
<Stack.Screen 
  name="Register" 
  component={RegistrationScreen} 
  options={{
    headerTitle: 'REGISTER',  // Centered title
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#D1A843',   // Title color
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image 
        source={require('../assets/logo.jpg')} // Path to your logo
        style={{ width: 90, height: 90, marginLeft: 10, resizeMode: 'contain' }} 
      />
      </TouchableOpacity>
    ),
  }}
/>
          </>
        ) : (
          <>
        <Stack.Screen 
  name="Booking"
  options={{
    headerTitle: 'REGISTER',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#D1A843',
      fontSize: 22,
      fontWeight: 'bold',
    },
  }}
>
  {props => <BookingScreen {...props} onLogout={handleLogout} />}
</Stack.Screen>

<Stack.Screen 
  name="BookingHistory" 
  component={BookingHistoryScreen} 
  options={{
    headerTitle: 'BOOKING HISTORY',  // Centered title
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#D1A843',   // Title color
      fontSize: 22,
      fontWeight: 'bold',
    },  headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
      <Image 
        source={require('../assets/logo.jpg')} // Path to your logo
        style={{ width: 90, height: 90, marginLeft: 10, resizeMode: 'contain' }} 
      />
      </TouchableOpacity>
    ),
  
  }}
/>
          </>
        )}
      </Stack.Navigator>

  );
};

export default StackNavigator;
