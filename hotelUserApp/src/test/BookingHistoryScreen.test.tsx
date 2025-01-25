import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import axios from 'axios';
import api from '../utils/api';

// Mock axios and API calls
jest.mock('../utils/api', () => ({
    get: jest.fn(),
  }));
  


describe('BookingHistoryScreen', () => {
  it('should display loading text initially', () => {
    render(<BookingHistoryScreen navigation={{ navigate: jest.fn() }} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should display booking history once data is fetched', async () => {
    const mockData = [
      {
        _id: '1',
        hotel: { name: 'Hotel One', location: 'Location One' },
        bookingDate: '2023-01-01',
      },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<BookingHistoryScreen navigation={{ navigate: jest.fn() }} />);

    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    expect(screen.getByText('Hotel: Hotel One')).toBeTruthy();
    expect(screen.getByText('Location: Location One')).toBeTruthy();
    expect(screen.getByText('Booking Date: 01/01/2023')).toBeTruthy();
  });

  it('should handle error when fetching data fails', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<BookingHistoryScreen navigation={{ navigate: jest.fn() }} />);

    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    // Check if alert was called
    expect(axios.isAxiosError).toHaveBeenCalled();
  });
});
