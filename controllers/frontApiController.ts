import { Request, Response } from 'express';
import { adminController } from '../controllers/adminController';
import { categoryController } from '../controllers/categoryController';
import { noteController } from '../controllers/noteController';
import { tagController } from './tagController';

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
  }
}