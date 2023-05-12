import { request } from "../util/request";

//获取个人信息
export const getInfoApi = () => {
  return request.get('/info', { params: { type: 'front' } });
}

//获取分类列表
export const getCategoryListApi = () => {
  return request.get('/categoryList')
}

//获取笔记列表
export const getNoteListApi = (data: object) => {
  return request.get('/noteList', { params: data });
}

//获取 笔记、分类、标签 的总数
export const getAllCountApi = () => {
  return request.get('/allCount');
}