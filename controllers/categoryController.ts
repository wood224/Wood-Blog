const categoryService = require('../services/categoryService');
const moment = require('moment');

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
  addCategory: async (req: any, res: any, form: any) => {
    console.log(form.coverImg);
    const result = await categoryController.check(form.name);
    if (result) {
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
  }
}

module.exports = categoryController;