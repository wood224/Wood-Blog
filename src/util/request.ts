import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60,
})

request.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

request.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});