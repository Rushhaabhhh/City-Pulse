import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_NEWS_API_BASE_URL || 'https://gnews.io/api/v4';

if (!API_KEY) {
  console.warn('EXPO_PUBLIC_NEWS_API_KEY is not set in .env');
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }
    config.params.apikey = API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || `API Error: ${error.response.status}`;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error('Network error: No response from server'));
    }
    return Promise.reject(new Error(error.message));
  }
);

export { api };
