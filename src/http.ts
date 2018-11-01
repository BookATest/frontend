import axios, { AxiosInstance } from 'axios';
import router from '@/router';

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 403:
        alert('You are not authorised to perform this action.');
        break;
      case 401:
        router.push({ name: 'logout' });
        break;
      default:
        return Promise.reject(error);
    }
  },
);

export default http;
