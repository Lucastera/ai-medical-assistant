import axios from 'axios';
import { serverConfig } from './config';

// Create axios instance
const request = axios.create({
  baseURL: serverConfig.baseURL, // Base request URL
  timeout: 100000, // Request timeout
  withCredentials: false // Whether to include cookies in cross-domain requests
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    if (!config.headers['content-type']) {
      config.headers['content-type'] = 'application/json'; // Default type
    }
    console.log('Request configuration', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (res) => {
    const data = res.data;
    // Handle your business logic here, e.g., check if token is expired
    if (data.code !== '200') {
      // Handle the error based on the code
      const errorMessage = data?.message || 'Unexpected error occurred';
      return Promise.reject(new Error(errorMessage));
    }
    return data.data;
  },
  (error) => {
    console.log(error?.response, 'error');
    return Promise.reject(error?.message);
  }
);

export default request;
