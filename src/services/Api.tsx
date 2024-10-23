import { defaultAxiosInstance, tokenAxiosInstance } from './axiosInstance';
import { toast } from 'react-toastify';

// Function to handle Google Sign-In
export const googleLogin = async (token: string) => {
  try {
    // Sending request to your Google sign-in API
    const response = await tokenAxiosInstance.get(`/Auth/signin-google?token=${token}`);
    if (response.data.token) {
      // Store the received token in localStorage
      localStorage.setItem('token', response.data.token);
      toast.success('Google login successful');
    }
    return response;
  } catch (error) {
    toast.error('Google login failed');
    return error;
  }
};

// Function to handle Auth redirect (if needed)
export const authRedirect = async () => {
  try {
    // Sending request to /Auth/redirect API
    const response = await tokenAxiosInstance.get(`/Auth/redirect`);
    if (response) {
      toast.success('Redirect handled successfully');
    }
    return response;
  } catch (error) {
    toast.error('Failed to fetch redirect');
    return error;
  }
};
export const fetchReadersList = async () => {
    try {
      const response = await defaultAxiosInstance.get('/api/ReaderWeb/readers-list');
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching readers list', error);
      throw error; // Throw error to handle it in the component
    }
  };