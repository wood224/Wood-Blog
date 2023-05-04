import request from '../utils/request';

//获取登录界面验证码
export const getCaptchaApi = () => {
  return request.get('/admin/captcha');
}

//管理员登录
export const adminLoginApi = (data: object) => {
  return request.post('/admin/login', data);
}

//获取个人信息
export const getInfoApi = () => {
  return request.get('/admin/info');
}

//修改个人信息
export const updateInfoApi = (data: object) => {
  return request.put('/admin/info', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

// //获取菜单列表（弃用）
// // export const getMenuListApi = () => {
// //   return request.get('/menu');
// // }

//获取首页信息
export const getHomeInfoApi = () => {
  return request.get('/home');
}

//获取分类(分页)
export const getCategoryApi = (data: object) => {
  return request.get('/category', { params: data });
}

//获取分类(所有)
export const getCategoryAllApi = () => {
  return request.get('/category',);
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
export const searchCategoryApi = (data: object) => {
  return request.get('/category/search/', { params: data });
}

//获取笔记
export const getNoteListApi = (data: object) => {
  return request.get('/note', { params: data });
}

//新增笔记
export const addNoteApi = (data: object) => {
  return request.post('/note', data);
}

//获取笔记内容
export const getNoteInfoApi = (id: number) => {
  return request.get(`/note/${id}`);
}

//修改笔记
export const updateNoteApi = (id: number, data: object) => {
  return request.put(`/note/${id}`, data);
}

//删除笔记
export const deleteNoteApi = (id: number) => {
  return request.delete(`/note/${id}`);
}