import request from '../utils/request';

//管理员登录
export const adminLoginApi = (data: object) => {
  return request.post('/admin/login', data);
}

//获取菜单列表（弃用）
export const getMenuListApi = () => {
  return request.get('/menu');
}

//获取首页信息
export const getHomeInfoApi = () => {
  return request.get('/home');
}

//获取分类
export const getCategoryApi = () => {
  return request.get('/category');
}

//新增分类
export const addCategoryApi = (data: object) => {
  return request.post('/category', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

//更新分类
export const updateCategoryApi = (data: object) => {
  return request.put('/category', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

//删除分类
export const deleteCategoryApi = (id: number) => {
  return request.delete(`/category/${id}`);
}

//搜索分类
export const searchCategoryApi = (name: string) => {
  return request.get(`/category/search/${name}`);
}
