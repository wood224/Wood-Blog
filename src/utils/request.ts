import axios from 'axios';

const request = axios.create({
  baseURL: __BaseURL__,
  timeout: 1000 * 60
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + token;
  return config;
}, error => {
  return Promise.reject(error);
});

request.interceptors.response.use(response => {
  const { authorization } = response.headers;
  authorization && localStorage.setItem('token', authorization);
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    location.hash = 'login';
    location.reload();
  }
  return Promise.reject(error);
});

export default request