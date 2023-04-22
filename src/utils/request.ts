import axios from 'axios';
import { Action } from 'element-plus';

const request = axios.create({
  baseURL: __BaseURL__,
  timeout: 1000 * 60,
  withCredentials: true,
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
    ElMessageBox.alert('长时间未操作，请重新登录', '提示', {
      confirmButtonText: '确定',
      callback: (action: Action) => {
        localStorage.removeItem('token');
        location.hash = 'login';
        location.reload();
      }
    })
  }
  if (error.response.status === 410) {
    ElMessage.error(error.response.data.msg);
  }
  return Promise.reject(error);
});

export default request