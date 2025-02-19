import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../utils/api';
import axios, { AxiosError } from 'axios';  // Import axios and AxiosError
import RegistrationScreenStyle from './RegistrationScreenStyle';

const RegistrationScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]= useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      console.log('Sending data:', { username, password });
      const response = await api.post('/auth/register', { username, password });
      console.log('Response:', response.data);
      Alert.alert('Registration successful');
      navigation.navigate('Login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response?.data);
        Alert.alert('Registration failed', error.response?.data?.error || 'Something went wrong');
      } else {
        console.log('Unexpected error:', error);
        Alert.alert('Registration failed', 'An unexpected error occurred');
      }
    }
    finally{
      setLoading(false);
    }
  };
  

  return (
    <View style={RegistrationScreenStyle.container}>
      <TextInput
      style={RegistrationScreenStyle.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
      style={RegistrationScreenStyle.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={RegistrationScreenStyle.button} onPress={handleRegister}>
          <Text style={RegistrationScreenStyle.buttonText}>Register</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RegistrationScreen;
