import { Request, Response } from 'express';
import { categoryService } from "../services/categoryService";
const moment = require('moment');
import { saveToUploads } from '../utils/saveToUploads';

export const categoryController = {
  //检查分类名
  check: async (name: string) => {
    const data = await categoryService.check(name);
    return data.length === 0;
  },

  //获取分类列表
  getCategoryList: async (req: Request, res: Response) => {
    if (req.query.limit && req.query.offset) {      //有参
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const { count, rows } = await categoryService.getCategoryList(limit, offset);
      const data = rows.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          coverImg: item.categoryInfo.coverImg,
          introduction: item.categoryInfo.introduction,
          createTime: moment(item.categoryInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
          updateTime: moment(item.categoryInfo.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
      res.send({ count: count, categoryList: data });
    } else {      //无参
      const { rows } = await categoryService.getCategoryList();
      const data = rows.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          coverImg: item.categoryInfo.coverImg,
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
      coverImg = await saveToUploads('category', file.path, req.body.name);
    }
    const form = {
      name: req.body.name,
      introduction: req.body.introduction,
      coverImg,
    }
    const result = await categoryController.check(form.name);
    if (result) {       //如果不存在
      const row = await categoryService.addCategory(form.name, form.coverImg, form.introduction);
      if (row) {
        res.send({ code: 200, msg: '添加成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '添加失败！' });
      }
    }
    else {
      res.status(410).send({ code: 410, msg: '该分类名已存在！' });
    }
  },

  //修改分类
  updateCategory: async (req: Request, res: Response) => {
    const file = req.body.coverImg;
    let coverImg = '';
    if (file && file instanceof Object) {
      coverImg = await saveToUploads('category', file.path, req.body.name);
    }
    const form = {
      id: Number(req.body.id),
      name: req.body.name,
      introduction: req.body.introduction,
      coverImg,
    }
    const { row1, row2 } = await categoryService.updateCategory(form.id, form.name, form.coverImg, form.introduction);
    if (row1 && row2) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.status(410).send({ code: 410, msg: '修改失败！' });
    }
  },

  //删除分类
  deleteCategory: async (req: Request, res: Response) => {
    if (req.params) {
      const row = await categoryService.deleteCategory(Number(req.params.id));
      if (row.affected && row.affected === 1) {
        res.send({ code: 200, msg: '删除成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '删除失败！' });
      }
    } else {
      res.status(410).send({ code: 410, msg: '删除失败！' });
    }
  },

  //搜索分类
  searchCategory: async (req: Request, res: Response) => {
    console.log(req.query);

    const name = String(req.query.name)
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await categoryService.searchCategory(name, limit, offset);
    const data = rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        coverImg: item.categoryInfo.coverImg,
        introduction: item.categoryInfo.introduction,
        createTime: moment(item.categoryInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(item.categoryInfo.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    })
    res.send({ count: count, categoryList: data });
  }
}
