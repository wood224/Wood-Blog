import { Request, Response } from 'express'
import { noteService } from '../services/noteService'
const moment = require('moment');

export const noteController = {
  //检查标题
  check: async (title: string) => {
    const rows = await noteService.check(title);
    return rows;
  },

  //获取笔记数量
  getNoteCount: async () => {
    const count = await noteService.getNoteCount();
    return count;
  },

  //获取笔记列表
  getNoteList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    if ((limit && offset) || (limit && offset === 0)) {
      const { count, rows } = await noteService.getNoteList(limit, offset);
      const data = rows.filter(row => {
        row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
        row.updateTime = moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss');
        return true;
      });
      res.send({ count: count, noteList: data });
    } else {
      res.status(410).send(({ code: 410, msg: '出错了！' }));
    }
  },

  //新增笔记
  addNote: async (req: Request, res: Response) => {
    if (req.body.text === '') {
      return res.status(410).send({ code: 410, msg: '文本内容不能为空！' });
    }
    const form = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      categoryId: req.body.categoryId,
      tagIds: req.body.tagIds,
      text: req.body.text
    }
    const rows = await noteController.check(form.title);
    const result = rows.length === 0;
    if (result) {       //如果不存在
      const row = await noteService.addNote(form.title, form.subtitle, form.categoryId, form.tagIds, form.text);
      if (row) {
        res.send({ code: 200, msg: '添加成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '添加失败！' });
      }
    }
    else if (rows[0].isDelete === 1) {
      const row1 = await noteService.updateNote(rows[0].id, form.title, form.subtitle, form.categoryId, form.tagIds, form.text);
      const row2 = await noteService.restoreNote(rows[0].id);
      if (row1 && row2) {
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
      res.status(410).send({ code: 410, msg: '获取笔记内容出错了！' });
    }
  },

  //修改笔记
  updateNote: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body = req.body;
    const row = await noteService.updateNote(id, body.title, body.subtitle, body.categoryId, body.tagIds, body.text);
    if (row) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.status(410).send({ code: 410, msg: '修改失败！' });
    }
  },

  //删除笔记
  deleteNote: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id) {
      const row = await noteService.deleteNote(id);
      if (row.affected === 1) {
        res.send({ code: 200, msg: '删除成功！' });
      } else {
        res.status(410).send({ code: 410, msg: '删除失败！' });
      }
    } else {
      res.status(410).send({ code: 410, msg: '删除笔记出错了！' });
    }
  },

  //搜素笔记
  searchNote: async (req: Request, res: Response) => {
    const title = String(req.query.title);
    const searchStr = title ? `%${title.split('').join('%')}%` : '';    //模糊搜索字符串
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const categoryId = Number(req.query.categoryId);
    const tempIds = req.query.tagIds as string[]
    const tagIds = tempIds?.map(Number);

    const { count, rows } = await noteService.searchNote(searchStr, limit, offset, categoryId, tagIds);
    const data = rows.filter(row => {
      row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
      row.updateTime = moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss');
      return true;
    });
    res.send({ count: count, noteList: data });
  },

  //5日内新增笔记数量
  newNotes: async (req: Request, res: Response) => {
    const withinDays = 5;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - withinDays);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    const rows = await noteService.newNotes(startDate, endDate);

    const data = Array.from({ length: withinDays }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (withinDays - i));
      const dateStr = date.toISOString().slice(0, 10);
      return rows.find(item => item.date === dateStr) || { date: dateStr, count: '0' };
    })

    res.send(data);
  },
}