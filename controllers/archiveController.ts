import { Request, Response } from 'express';
import { archiveService } from '../services/archiveService';
import moment from 'moment';
import { ResSend } from '../utils/ResSend';

export const archiveController = {
  //获取归档列表
  getArchiveList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const { count, rows } = await archiveService.getArchiveList(limit, offset);
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        action: row.action === 1 ? '新增' : row.action === 2 ? '修改' : '删除',
        source: row.type === 1 ? '笔记' : row.type === 2 ? '分类' : '标签'
      }
    })
    res.send({
      count: count,
      archiveList: data
    });
  },

  //搜索归档
  searchArchive: async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const { count, rows } = await archiveService.searchArchive(name, limit, offset);
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        source: row.type === 1 ? '笔记' : row.type === 2 ? '分类' : '标签'
      }
    })
    res.send({
      count: count,
      archiveList: data
    });
  },

  //删除归档
  deleteArchive: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (id) {
      const row = await archiveService.deleteArchive(id);
      if (row) {
        ResSend(res, 200, '删除成功！');
      } else {
        ResSend(res, 410, '删除失败！');
      }
    } else {
      ResSend(res, 410, '删除失败！');
    }
  }
}