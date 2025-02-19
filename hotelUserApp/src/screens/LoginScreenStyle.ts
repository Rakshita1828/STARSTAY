import { StyleSheet } from 'react-native';

const LoginScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20, // Margin from both sides of the screen
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey', // Grey border for input fields
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#D1A843', // Background color for LOGIN button
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreenStyle;
