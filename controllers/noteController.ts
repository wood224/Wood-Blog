import { Request, Response } from 'express'
import { noteService } from '../services/noteService'
const moment = require('moment');

export const noteController = {
  //检查标题
  check: async (title: string) => {
    const rows = await noteService.check(title);
    return rows.length === 0;
  },

  //获取笔记列表
  getNoteList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await noteService.getNoteList(limit, offset);
    const data = rows.filter(row => {
      row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
      row.updateTime = moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss');
      return row.isDelete === 0;
    });
    res.send({ count: count, noteList: data });
  },

  //新增笔记
  addNote: async (req: Request, res: Response) => {
    const form = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      text: req.body.text,
      categoryId: req.body.categoryId
    }
    const result = await noteController.check(form.title);
    if (result) {       //如果不存在
      const row = await noteService.addNote(form.title, form.subtitle, form.categoryId, form.text);
      if (row) {
        res.send({ code: 200, msg: '添加成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '添加失败！' });
      }
    }
    else {
      res.status(410).send({ code: 410, msg: '该标题已存在！' });
    }
  },

  //获取笔记内容
  getInfo: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id) {
      const row = await noteService.getInfo(id);
      res.send(row);
    } else {
      res.status(410).send({ code: 410, msg: '出错了！' });
    }
  },

  //修改笔记
  updateNote: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body = req.body;
    const row = await noteService.updateNote(id, body.title, body.subtitle, body.categoryId, body.text);
    if (row) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.status(410).send({ code: 410, msg: '修改失败！' });
    }
  }
}