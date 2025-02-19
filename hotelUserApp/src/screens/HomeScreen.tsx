import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeScreenStyles from './HomeScreenStyles';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={HomeScreenStyles.container}>
      <TouchableOpacity
        style={HomeScreenStyles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={HomeScreenStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeScreenStyles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={HomeScreenStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
