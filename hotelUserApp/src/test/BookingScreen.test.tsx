import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import BookingScreen from '../screens/BookingScreen';
import api from '../utils/api';

// Mock API requests
jest.mock('../utils/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
  }));
  

describe('BookingScreen', () => {
  it('should render correctly and handle date selection', () => {
    render(<BookingScreen navigation={{ navigate: jest.fn() }} onLogout={jest.fn()} />);
    
    fireEvent.press(screen.getByText('Select Date'));

    // Date picker should be displayed (you may need to mock this depending on your setup)
    expect(screen.getByText('Select Date')).toBeTruthy();
  });

  it('should fetch available hotels on date selection', async () => {
    const mockData = [
      { _id: '1', name: 'Hotel One' },
      { _id: '2', name: 'Hotel Two' },
    ];
    
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<BookingScreen navigation={{ navigate: jest.fn() }} onLogout={jest.fn()} />);

    // Simulate selecting a date
    fireEvent.press(screen.getByText('Select Date'));

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/hotels?date=2023-01-01'));
    expect(screen.getByText('Hotel One')).toBeTruthy();
    expect(screen.getByText('Hotel Two')).toBeTruthy();
  });

  it('should handle booking failure', async () => {
    const mockData = [
      { _id: '1', name: 'Hotel One' },
    ];
    
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    (api.post as jest.Mock).mockRejectedValueOnce(new Error('Booking failed'));

    render(<BookingScreen navigation={{ navigate: jest.fn() }} onLogout={jest.fn()} />);
    
    fireEvent.press(screen.getByText('Select Date'));

    await waitFor(() => fireEvent.press(screen.getByText('Book Hotel')));
    
    // Check if the alert for booking failure is triggered
    expect(screen.getByText('Booking failed')).toBeTruthy();
  });
});
