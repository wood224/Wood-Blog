import { Request, Response } from 'express';
import { tagService } from '../services/tagService';
const moment = require('moment');

export const tagController = {
  //检查标签
  check: async (name: string) => {
    const data = await tagService.check(name);
    return data.length === 0;
  },

  //获取标签列表
  getTagList: async (req: Request, res: Response) => {
    if (req.query.limit && req.query.offset) {      //有参
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const { count, rows } = await tagService.getTagList(limit, offset);
      const data = rows.filter(row => {
        row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
        row.updateTime = moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss');
        return true;
      });
      res.send({ count: count, tagList: data });
    } else {      //无参
      const { rows } = await tagService.getTagList();
      const data = rows.map(row => {
        return {
          id: row.id,
          name: row.name,
        }
      })
      res.send(data);
    }
  },

  //新增标签
  addTag: async (req: Request, res: Response) => {
    const form = {
      name: req.body.name,
    }
    const result = await tagController.check(form.name);
    if (result) {       //如果不存在
      const row = await tagService.addTag(form.name);
      if (row) {
        res.send({ code: 200, msg: '添加成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '添加失败！' });
      }
    }
    else {
      res.status(410).send({ code: 410, msg: '该标签名已存在！' });
    }
  },

  //修改标签
  updateTag: async (req: Request, res: Response) => {
    const form = {
      id: Number(req.body.id),
      name: req.body.name,
    }
    const row = await tagService.updateTag(form.id, form.name);
    if (row) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.status(410).send({ code: 410, msg: '修改失败！' });
    }
  },

  //删除标签
  deleteTag: async (req: Request, res: Response) => {
    if (req.params) {
      const row = await tagService.deleteTag(Number(req.params.id));
      if (row) {
        res.send({ code: 200, msg: '删除成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '删除失败！' });
      }
    } else {
      res.status(410).send({ code: 410, msg: '删除失败！' });
    }
  },

  //搜索标签
  searchTag: async (req: Request, res: Response) => {
    const name = String(req.query.name)
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await tagService.searchTag(name, limit, offset);
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    });
    res.send({ count: count, tagList: data });
  },
}