import request from '../utils/request';

//管理员登录
export const adminLogin = (data: object) => {
  return request.post('/admin/login', data);
}

//获取菜单列表
export const getMenuList = () => {
  return request.get('/menu');
}

//获取分类
export const getCategory = () => {
  return request.get('/category');
}
