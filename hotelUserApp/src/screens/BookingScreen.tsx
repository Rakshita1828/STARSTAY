import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = ({ navigation, onLogout }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableHotels, setAvailableHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      
      fetchAvailableHotels(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableHotels = async (date: Date) => {
    setLoading(true);
    try {
      const formattedDate = date.toLocaleDateString('en-CA');
      console.log(formattedDate);
      const response = await api.get(`/hotels?date=${formattedDate}`);
      setAvailableHotels(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch available hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      Alert.alert('Please select a date');
      return;
    }

    if (!selectedHotel) {
      Alert.alert('Please select a hotel');
      return;
    }

    try {
      await api.post('/bookings', {
        hotelId: selectedHotel._id,
        bookingDate: selectedDate.toLocaleDateString('en-CA'),
      });

      Alert.alert('Booking successful');
      fetchAvailableHotels(selectedDate);
      setSelectedHotel(null); // Refresh available hotels after booking
    } catch (error) {
      Alert.alert('Booking failed', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Screen</Text>

      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={availableHotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text>{item.location}</Text>
              <Text>Price: ${item.pricePerNight}</Text>
              <Button
                title="Select Hotel"
                onPress={() => setSelectedHotel(item)}
                color={selectedHotel?._id === item._id ? '#FF6347' : '#0000ff'}
              />
            </View>
          )}
        />
      )}

      <Button title="Book Hotel" onPress={handleBooking} disabled={loading} />
      <Button title="Booking History" onPress={() => navigation.navigate('BookingHistory')} />
      <Button title="Logout" onPress={() => onLogout(navigation)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
