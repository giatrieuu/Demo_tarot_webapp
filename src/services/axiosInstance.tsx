import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import config from '../config/config';
import { handleHttpErrors } from '../consts/errorHandler';

interface ErrorResponse {
  message?: string;
  errors?: { message?: string }[];
}

let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (loadingHandler: (loading: boolean) => void) => {
  setLoading = loadingHandler;
};

const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
  },
  timeout: 300000,
  timeoutErrorMessage: 'Connection timeout exceeded'
});

defaultAxiosInstance.interceptors.request.use(
  (config) => {
    setLoading(true);
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

defaultAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setLoading(false);
    return response.data;
  },
  (err: AxiosError<ErrorResponse>) => {
    setLoading(false);
    const { response } = err;
    if (response) {
      handleErrorByToast(err);
      handleHttpErrors(response.status);
    }
    return Promise.reject(err);
  }
);

const tokenAxiosInstance: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
  },
  timeout: 300000,
  timeoutErrorMessage: 'Connection timeout exceeded'
});

tokenAxiosInstance.interceptors.request.use(
  (config) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

tokenAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    setLoading(false);
    return response.data;
  },
  (err: AxiosError<ErrorResponse>) => {
    setLoading(false);
    const { response } = err;
    if (response) {
      handleErrorByToast(err);
      
      if (response.data.message !== 'Token is expired') {
        handleHttpErrors(response.status);
      } else {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

const handleErrorByToast = (errors: AxiosError<ErrorResponse>) => {
  const data = errors.response?.data as ErrorResponse | undefined;
  let message: string | undefined = data?.message ?? errors.message ?? 'An error occurred';

  if (!data?.message && data?.errors?.length) {
    const errorMessages = data.errors.map(error => error.message).filter(Boolean);
    if (errorMessages.length) {
      message = errorMessages.join(', ');
    }
  }
  toast.error(message);
  return Promise.reject(data?.errors ?? { message });
};

export { defaultAxiosInstance, tokenAxiosInstance };