import { categoryService } from "../services/categoryService";
const moment = require('moment');
const saveToUploads = require('../utils/saveToUploads');

export const categoryController = {
  //检查分类名
  check: async (name: string) => {
    const data = await categoryService.check(name);
    if (data.length !== 0) {
      return false;
    } else {
      return true;
    }
  },

  //获取分类列表
  getCategoryList: async (req: any, res: any) => {
    const rows = await categoryService.getCategoryList();
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
    res.send(data);
  },

  //新增分类
  addCategory: async (req: any, res: any) => {
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
        res.send({ code: 401, msg: '添加失败！' });
      }
    }
    else {
      res.send({ code: 401, msg: '该分类名已存在！' });
    }
  },

  //修改分类
  updateCategory: async (req: any, res: any) => {
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
      res.send({ code: 401, msg: '修改失败！' });
    }
  },

  //删除分类
  deleteCategory: async (req: any, res: any) => {
    const row = await categoryService.deleteCategory(req.params.id);
    console.log(row);

    if (row.affected && row.affected === 1) {
      res.send({ code: 200, msg: '删除成功！' });
    } else {
      res.send({ code: 401, msg: '删除失败！' });
    }
  },

  //搜索分类
  searchCategory: async (req: any, res: any) => {
    const rows = await categoryService.searchCategory(req.params.name);
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
    res.send(data);
  }
}
