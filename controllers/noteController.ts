import { Request, Response } from 'express'
import { noteService } from '../services/noteService'
const moment = require('moment');
import { saveToUploads } from '../utils/saveToUploads';

export const noteController = {
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
  }

  //
}