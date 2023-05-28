import axios from "axios";
import { request } from "../util/request";
import { rollConfig } from '../config/index';

//每日一言
export const getDailyWordApi = () => {
  return axios.get('/hitokoto');
}

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

//获取笔记信息
export const getNoteInfoApi = (id: number) => {
  return request.get(`/note/${id}`);
}

//搜索笔记列表
export const searchNoteListApi = (data: object) => {
  return request.get('/searchNote', { params: data });
}

//获取归档列表
export const getArchiveListApi = (data: object) => {
  return request.get('/archiveList', { params: data });
}

//获取分类详情
export const getCategoryInfoApi = (id: number) => {
  return request.get(`/category/${id}`);
}

//获取关于列表
export const getAboutListApi = () => {
  return request.get('/aboutList');
}

//获取友链列表
export const getLinkListApi = (data: object) => {
  return request.get('/linkList', { params: data });
}

//获取标签列表
export const getTagListApi = () => {
  return request.get('/tagList');
}