import request from '../utils/request';

//管理员登录
export const adminLogin = (data: object) => {
  return request.post('/admin/login', data);
}

//获取菜单列表（弃用）
export const getMenuList = () => {
  return request.get('/menu');
}

//获取首页信息
export const getHomeInfo = () => {
  return request.get('/home');
}

//获取分类
export const getCategory = () => {
  return request.get('/category');
}

//新增分类
export const addCategory = (data: object) => {
  return request.post('/category', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

//更新分类
export const updateCategory = (data: object) => {
  return request.put('/category', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}
