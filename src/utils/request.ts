import axios from 'axios';

const request = axios.create({
  baseURL: __BaseURL__,
  timeout: 1000 * 60
})

request.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

request.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

export default request