// utils/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000/api', // Update this with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the token to the Authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token'); // Clear invalid/expired token
      // Optionally redirect user to login page
      console.warn('Token is invalid or expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

// Function to clear the token from AsyncStorage (used during logout)
export const clearToken = async () => {
  await AsyncStorage.removeItem('token');
};

export default api;
