import axios from 'axios';
import { transformId } from '../utils/transform-response';
import { getAuthToken, setAuthToken } from '../utils/tokenUtils';

const headers = {};
const apiClient = axios.create({
  baseURL: 'https://stg.api.brahm.dev/v1/',
  timeout: 30000,
  headers,
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const authToken = await getAuthToken();
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  } catch (error) {
    console.error('Error setting authorization header:', error);
    return config;
  }
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data !== null) {
      const authToken = transformId(response?.data?.token);
      setAuthToken(authToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
