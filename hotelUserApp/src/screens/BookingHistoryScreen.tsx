import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import api from '../utils/api';
import axios from 'axios';

const BookingHistoryScreen = ({ navigation }: any) => {
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      try {
        const response = await api.get('/bookings/history');
        setBookingHistory(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          Alert.alert('Failed to fetch booking history', error.response?.data?.error || 'Something went wrong');
        } else {
          Alert.alert('Failed to fetch booking history', 'An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const renderBookingItem = ({ item }: any) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingText}>Hotel: {item.hotel.name}</Text>
      <Text style={styles.bookingText}>Location: {item.hotel.location}</Text>
      <Text style={styles.bookingText}>Booking Date: {new Date(item.bookingDate).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={bookingHistory}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
        />
      )}
      <Button title="Go to Booking" onPress={() => navigation.navigate('Booking')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingItem: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BookingHistoryScreen;
