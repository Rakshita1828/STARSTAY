import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1A843', // HomeScreen background color
  },
  button: {
    backgroundColor: '#D1A843',
    fontFamily: 'Itim',
    borderRadius: 5,
    marginVertical: 10,
    alignItems:'center'
  },
  buttonText: {
    color: '#fff', 
    fontSize: 20,// Button text color
    fontWeight: 'bold'
  },
});

export default HomeScreenStyles;
