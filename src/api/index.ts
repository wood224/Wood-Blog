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

//---------------------------------------------------------------------------//

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
  return request.get('/category/search', { params: data });
}

//获取各分类下笔记数量
export const getCategoryNoteCountApi = () => {
  return request.get('/category/count');
}

//---------------------------------------------------------------------------//

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
  return request.get(`/note/info/${id}`);
}

//修改笔记
export const updateNoteApi = (id: number, data: object) => {
  return request.put(`/note/${id}`, data);
}

//删除笔记
export const deleteNoteApi = (id: number) => {
  return request.delete(`/note/${id}`);
}

//搜索笔记
export const searchNoteApi = (data: object) => {
  return request.get('/note/search', { params: data });
}

//获取5日内新增笔记
export const newNotesApi = () => {
  return request.get('/note/new');
}

//---------------------------------------------------------------------------//

//获取标签列表
export const getTagListApi = (data?: object) => {
  return request.get('/tag', { params: data ?? {} });
}

//添加标签
export const addTagApi = (data: object) => {
  return request.post('/tag', data);
}

//修改标签
export const updateTagApi = (data: object) => {
  return request.put('/tag', data);
}

//删除标签
export const deleteTagApi = (id: number) => {
  return request.delete(`/tag/${id}`);
}

//搜索标签
export const searchTagApi = (data: object) => {
  return request.get('/tag/search', { params: data });
}

//获取标签排行
export const getTagTopApi = () => {
  return request.get('/tag/top');
}

//---------------------------------------------------------------------------//

//获取归档列表
export const getArchiveListApi = (data?: object) => {
  return request.get('/archive', { params: data ?? {} });
}

//搜索归档
export const searchArchiveApi = (data: object) => {
  return request.get('/archive/search/', { params: data });
}

//删除归档
export const deleteArchiveApi = (id: number) => {
  return request.delete(`/archive/${id}`);
}

//---------------------------------------------------------------------------//

//获取友链列表
export const getFriendListApi = (data?: object) => {
  return request.get('/friendLink', { params: data ?? {} });
}

//添加友链
export const addFriendApi = (data: object) => {
  return request.post('/friendLink', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

//修改友链
export const updateFriendApi = (data: object) => {
  return request.put('/friendLink', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

//删除友链
export const deleteFriendApi = (id: number) => {
  return request.delete(`/friendLink/${id}`);
}