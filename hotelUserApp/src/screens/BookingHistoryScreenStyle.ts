import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d3d3d3', // Grey background
  },
  bookingItem: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff', // White card background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  goToBookingButton: {
    backgroundColor: '#D1A843', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
