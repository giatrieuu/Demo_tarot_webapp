import { defaultAxiosInstance, tokenAxiosInstance } from './axiosInstance';
import { toast } from 'react-toastify';

export const googleLogin = async (token: string) => {
  const response = await tokenAxiosInstance.get(`/Auth/signin-google?token=${token}`);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    toast.success('Google login successful');
  }
  return response;
};

export const authRedirect = async () => {
  const response = await tokenAxiosInstance.get(`/Auth/redirect`);
  toast.success('Redirect handled successfully');
  return response;
};

export const fetchReadersList = async () => {
  const response = await defaultAxiosInstance.get('/api/ReaderWeb/readers-list');
  return response;
};

export const getReaderDetail = async (readerId: string) => {
  const response = await defaultAxiosInstance.get(`/api/ReaderWeb/reader-with-images/${readerId}`);
  return response;
};

