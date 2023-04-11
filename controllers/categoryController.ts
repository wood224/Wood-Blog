const categoryService = require('../services/categoryService');
const moment = require('moment');
const saveToUploads = require('../utils/saveToUploads');

const categoryController = {
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
    const data = await categoryService.getCategoryList();
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
      const { row1, row2 } = await categoryService.addCategory(form.name, form.coverImg, form.introduction);
      if (row1 === 1 && row2 === 1) {
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
    console.log(form);
    const { row1, row2 } = await categoryService.updateCategory(form.id, form.name, form.coverImg, form.introduction);
    if (row1 === 1 && row2 === 1) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.send({ code: 401, msg: '修改失败！' });
    }
  }
}

module.exports = categoryController;