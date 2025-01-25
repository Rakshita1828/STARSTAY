import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')} // Navigate to LoginScreen
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Registration')} // Navigate to RegistrationScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
