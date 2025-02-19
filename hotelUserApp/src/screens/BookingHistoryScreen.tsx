import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import api from '../utils/api';
import axios from 'axios';
import styles from './BookingHistoryScreenStyle';

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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={bookingHistory}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
        />
      )}
     
    </View>
  );
};

export default BookingHistoryScreen;
