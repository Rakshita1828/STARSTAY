import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import api from '../utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './BookingScreenStyle';

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
      setSelectedHotel(null); 
    } catch (error) {
      Alert.alert('Booking failed', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Select Date"
        onPress={() => setShowDatePicker(true)}
        color="#D1A843"
      />
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
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedHotel?._id === item._id && styles.selectedButton,
                ]}
                onPress={() => setSelectedHotel(item)}
              >
                <Text style={styles.buttonText}>Select Room</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Book Hotel"
          onPress={handleBooking}
          color="#D1A843"
        />
        <View style={{ marginVertical: 10 }} />
        <Button
          title="Booking History"
          onPress={() => navigation.navigate('BookingHistory')}
          color="#D1A843"
        />
        <View style={{ marginVertical: 10 }} />
        <Button
          title="Logout"
          onPress={() => onLogout(navigation)}
          color="#D1A843"
        />
      </View>
    </View>
  );
};
export default BookingScreen;