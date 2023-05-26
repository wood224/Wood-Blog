import { Request, Response } from 'express';
import { tagService } from '../services/tagService';
import { ResSend } from '../utils/ResSend';
const moment = require('moment');

export const tagController = {
  //检查标签
  check: async (name: string) => {
    const data = await tagService.check(name);
    return data;
  },

  //获取标签数量
  getTagCount: async () => {
    const count = await tagService.getTagCount();
    return count;
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
    const rows = await tagController.check(form.name);
    const result = rows.length === 0;
    if (result) {       //如果不存在
      const row = await tagService.addTag(form.name);
      if (row) {
        ResSend(res, 200, '添加成功！');
      } else {
        ResSend(res, 410, '添加失败！');
      }
    }
    else if (rows[0].isDelete === 1) {
      const row1 = await tagService.updateTag(rows[0].id, form.name);
      const row2 = await tagService.restoreTag(rows[0].id);
      if (row1 && row2) {
        ResSend(res, 200, '添加成功！');
      } else {
        ResSend(res, 410, '添加失败！');
      }
    }
    else {
      ResSend(res, 410, '该标签名已存在！');
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
      ResSend(res, 200, '修改成功！');
    } else {
      ResSend(res, 410, '修改失败！');
    }
  },

  //删除标签
  deleteTag: async (req: Request, res: Response) => {
    if (req.params) {
      const row = await tagService.deleteTag(Number(req.params.id));
      if (row) {
        ResSend(res, 200, '删除成功！');
      } else {
        ResSend(res, 410, '删除失败！');
      }
    } else {
      ResSend(res, 410, '删除失败！');
    }
  },

  //搜索标签
  searchTag: async (req: Request, res: Response) => {
    const name = String(req.query.name)
    const searchStr = `%${name.split('').join('%')}%`    //模糊搜索字符串
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await tagService.searchTag(searchStr, limit, offset);
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      }
    });
    res.send({ count: count, tagList: data });
  },

  //获取标签排行榜
  getTagTop: async (req: Request, res: Response) => {
    const rows = await tagService.getTagTop();
    const data = rows.map(row => {
      return {
        ...row,
        count: Number(row.count)
      }
    });
    res.send(data)
  }
}