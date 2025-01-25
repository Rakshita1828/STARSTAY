import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from '../utils/api';
import axios, { AxiosError } from 'axios';  // Import axios and AxiosError

const RegistrationScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
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
  };
  

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;
