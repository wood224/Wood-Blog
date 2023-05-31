import { Request, Response } from 'express';
import { categoryService } from "../services/categoryService";
const moment = require('moment');
import { saveToUploads } from '../utils/saveToUploads';
import { ResSend } from '../utils/ResSend';

export const categoryController = {
  //检查分类名
  check: async (name: string) => {
    const data = await categoryService.check(name);
    return data;
  },

  //获取分类详情
  getCategoryInfo: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await categoryService.getCategoryInfo(id);
    if (category) {
      const data = {
        id: category.id,
        coverImg: category.categoryInfo.coverImg,
        name: category.name,
        introduction: category.categoryInfo.introduction,
        createTime: moment(category.categoryInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
      res.send(data);
    } else {
      ResSend(res, 410, '该分类不存在！');
    }
  },

  //获取分类数量
  getCategoryCount: async () => {
    const count = await categoryService.getCategoryCount();
    return count;
  },

  //获取分类列表
  getCategoryList: async (req: Request, res: Response) => {
    if (req.query.limit && req.query.offset) {      //有参
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const { count, rows } = await categoryService.getCategoryList(limit, offset);
      const data = rows.map(row => {
        return {
          id: row.id,
          name: row.name,
          coverImg: row.categoryInfo.coverImg,
          introduction: row.categoryInfo.introduction,
          createTime: moment(row.categoryInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
          updateTime: moment(row.categoryInfo.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
      res.send({ count: count, categoryList: data });
    } else {      //无参
      const { rows } = await categoryService.getCategoryList();
      const data = rows.map(row => {
        return {
          id: row.id,
          name: row.name,
          coverImg: row.categoryInfo.coverImg,
        }
      })
      res.send(data);
    }
  },

  //新增分类
  addCategory: async (req: Request, res: Response) => {
    const file = req.body.coverImg;
    let coverImg = '';
    if (file) {
      coverImg = await saveToUploads('category', file.path);
    }
    const form = {
      name: req.body.name,
      introduction: req.body.introduction,
      coverImg,
    }
    const rows = await categoryController.check(form.name);
    const result = rows.length === 0;
    if (result) {       //如果不存在
      const row = await categoryService.addCategory(form.name, form.coverImg, form.introduction);
      if (row) {
        ResSend(res, 200, '添加成功！');
      } else {
        ResSend(res, 410, '添加失败！');
      }
    }
    else if (rows[0].isDelete === 1) {
      const row1 = await categoryService.updateCategory(rows[0].id, form.name, form.coverImg, form.introduction);
      const row2 = await categoryService.restoreCategory(rows[0].id);
      if (row1 && row2) {
        ResSend(res, 200, '添加成功！');
      } else {
        ResSend(res, 410, '添加失败！');
      }
    }
    else {
      ResSend(res, 410, '该分类名已存在！');
    }
  },

  //修改分类
  updateCategory: async (req: Request, res: Response) => {
    const file = req.body.coverImg;
    let coverImg = '';
    if (file && file instanceof Object) {
      coverImg = await saveToUploads('category', file.path);
    }
    const form = {
      id: Number(req.body.id),
      name: req.body.name,
      introduction: req.body.introduction,
      coverImg,
    }
    const { row1, row2 } = await categoryService.updateCategory(form.id, form.name, form.coverImg, form.introduction);
    if (row1 && row2) {
      ResSend(res, 200, '修改成功！');
    } else {
      ResSend(res, 410, '修改失败！');
    }
  },

  //删除分类
  deleteCategory: async (req: Request, res: Response) => {
    if (req.params) {
      const { row1, row2 } = await categoryService.deleteCategory(Number(req.params.id));
      if (row1.affected === 1) {
        ResSend(res, 200, '删除成功！');
      } else {
        ResSend(res, 410, '删除失败！');
      }
    } else {
      ResSend(res, 410, '删除失败！');
    }
  },

  //搜索分类
  searchCategory: async (req: Request, res: Response) => {
    const name = String(req.query.name);
    const searchStr = `%${name.split('').join('%')}%`;    //模糊搜索字符串
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await categoryService.searchCategory(searchStr, limit, offset);
    const data = rows.map(row => {
      return {
        id: row.id,
        name: row.name,
        coverImg: row.categoryInfo.coverImg,
        introduction: row.categoryInfo.introduction,
        createTime: moment(row.categoryInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(row.categoryInfo.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    });
    res.send({ count: count, categoryList: data });
  },

  //获取各分类下笔记数量
  getCategoryNoteCount: async (req: Request, res: Response) => {
    const rows = await categoryService.getCategoryNoteCount();
    const data = rows.filter(row => {
      row.count = Number(row.count);
      return true
    });
    res.send(data);

  }
}
