import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage and API requests
jest.mock('../utils/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
  }));
  
jest.mock('@react-native-async-storage/async-storage');

describe('LoginScreen', () => {
  it('should render login form', () => {
    render(<LoginScreen navigation={{ navigate: jest.fn(), reset: jest.fn() }} />);
    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should handle successful login', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { token: 'mockToken' },
    });

    render(<LoginScreen navigation={{ navigate: jest.fn(), reset: jest.fn() }} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testUser');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'mockToken'));
    expect(screen.getByText('Login successful')).toBeTruthy();
  });

  it('should handle login failure', async () => {
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { error: 'Invalid credentials' } },
    });

    render(<LoginScreen navigation={{ navigate: jest.fn(), reset: jest.fn() }} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'invalidUser');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'wrongPassword');
    
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Login failed')).toBeTruthy());
  });

  it('should show loading indicator while logging in', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { token: 'mockToken' },
    });

    render(<LoginScreen navigation={{ navigate: jest.fn(), reset: jest.fn() }} />);

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testUser');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    
    fireEvent.press(screen.getByText('Login'));

    expect(screen.getByTestId('loadingIndicator')).toBeTruthy();
  });
});
