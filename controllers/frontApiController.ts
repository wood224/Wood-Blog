import { Request, Response } from 'express';
import { adminController } from '../controllers/adminController';
import { categoryController } from '../controllers/categoryController';
import { noteController } from '../controllers/noteController';
import { tagController } from './tagController';
import { archiveController } from './archiveController';
import { aboutController } from './aboutController';
import { friendLinkController } from './friendLinkController';
import { ResSend } from '../utils/ResSend';

const request = require('request');

export const frontApiController = {
  //获取个人信息
  getInfo: async (req: Request, res: Response) => {
    adminController.getInfo(req, res);
  },

  //获取分类列表
  getCategoryList: async (req: Request, res: Response) => {
    categoryController.getCategoryList(req, res);
  },

  //获取笔记列表
  getNoteList: async (req: Request, res: Response) => {
    noteController.getNoteList(req, res);
  },

  //获取 笔记、分类、标签 的总数
  getAllCount: async (req: Request, res: Response) => {
    const noteCount = await noteController.getNoteCount();
    const categoryCount = await categoryController.getCategoryCount();
    const tagCount = await tagController.getTagCount();
    res.send([
      { name: '笔记', count: noteCount },
      { name: '分类', count: categoryCount },
      { name: '标签', count: tagCount }
    ])
  },

  //获取笔记信息
  getNoteInfo: async (req: Request, res: Response) => {
    await noteController.getInfo(req, res);
  },

  //搜索笔记
  searchNote: async (req: Request, res: Response) => {
    await noteController.searchNote(req, res);
  },

  //获取归档列表
  getArchiveList: async (req: Request, res: Response) => {
    await archiveController.getArchiveList(req, res);
  },

  //获取分类详情
  getCategoryInfo: async (req: Request, res: Response) => {
    await categoryController.getCategoryInfo(req, res);
  },

  //获取关于列表
  getAboutList: async (req: Request, res: Response) => {
    await aboutController.getAboutList(req, res);
  },

  //获取友链列表
  getLinkList: async (req: Request, res: Response) => {
    await friendLinkController.getFriendLinkList(req, res);
  },

  //获取标签列表
  getTagList: async (req: Request, res: Response) => {
    await tagController.getTagList(req, res);
  },

  //每日一言
  getDailyWord: async (req: Request, res: Response) => {
    request('https://v1.hitokoto.cn/', (err: Error, response: Request, body: string) => {
      if (!err && response.statusCode === 200) {
        res.send(body);
      } else {
        ResSend(res, 410, '出错啦！');
      }
    })
  },
}