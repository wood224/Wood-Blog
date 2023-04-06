import request from '../utils/request';

//获取菜单列表
export const getMenuList = () => {
  return request.get('/menu');
}