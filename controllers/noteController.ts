import { Request, Response } from 'express'
import { noteService } from '../services/noteService'

export const noteController = {
  //获取笔记列表
  getNoteList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const { count, rows } = await noteService.getNoteList(limit, offset);
    console.log({
      count,
      rows,
    });

    res.send({ ok: 1 });
  }
}