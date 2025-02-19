import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoginScreenStyle from './LoginScreenStyle';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem('token', token);
        Alert.alert('Login successful');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Booking' }],
        });
      } else {
        Alert.alert('Login failed', 'No token received');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Login failed', error.response?.data?.error || 'Invalid credentials');
      } else {
        Alert.alert('Login failed', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      <TextInput
        style={LoginScreenStyle.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={LoginScreenStyle.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={LoginScreenStyle.button} onPress={handleLogin}>
          <Text style={LoginScreenStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginScreen;
