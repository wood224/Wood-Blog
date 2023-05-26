import { Request, Response } from 'express';
import { aboutService } from '../services/aboutService';
import moment from 'moment';
import { ResSend } from '../utils/ResSend';

export const aboutController = {
  //检查版块名
  checkName: async (name: string) => {
    const rows = await aboutService.checkName(name);
    return rows.length === 0;
  },

  //获取关于列表
  getAboutList: async (req: Request, res: Response) => {
    const rows = await aboutService.getAboutList();
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        aboutInfos: row.aboutInfos.map(info => {
          return {
            ...info,
            createTime: moment(info.createTime).format('YYYY-MM-DD HH:mm:ss'),
            updateTime: moment(info.updateTime).format('YYYY-MM-DD HH:mm:ss'),
          }
        })
      }
    })
    res.send(data);
  },

  //添加版块
  addAbout: async (req: Request, res: Response) => {
    const name = req.body.name;
    if (name) {
      const result = await aboutController.checkName(name);
      if (result) {
        const flag = await aboutController.checkName(name);
        if (!flag) {
          ResSend(res, 410, '该版块名已存在！');
        }
        else {
          const row = await aboutService.addAbout(name);
          if (row) {
            ResSend(res, 200, '添加成功！');
          } else {
            ResSend(res, 410, '添加失败！');
          }
        }
      }
    } else {
      ResSend(res, 410, '版块名不能为空！');
    }
  },

  //添加内容
  addAboutInfo: async (req: Request, res: Response) => {
    const AId = Number(req.body.AId);
    const title = req.body.title;
    const content = req.body.content;

    const row = await aboutService.addAboutInfo(title, content, AId);
    if (row) {
      ResSend(res, 200, '添加成功！');
    } else {
      ResSend(res, 410, '添加失败！');
    }
  },

  //修改版块
  updateAbout: async (req: Request, res: Response) => {
    const id = Number(req.body.id);
    const name = req.body.name;

    const row = await aboutService.updateAbout(id, name);
    if (row) {
      ResSend(res, 200, '修改成功！');
    } else {
      ResSend(res, 410, '修改失败！');
    }
  },

  //修改内容
  updateAboutInfo: async (req: Request, res: Response) => {
    const id = Number(req.body.id);
    const AId = Number(req.body.AId);
    const title = req.body.title;
    const content = req.body.content;

    const row = await aboutService.updateAboutInfo(AId, id, title, content);
    if (row) {
      ResSend(res, 200, '修改成功！');
    } else {
      ResSend(res, 410, '修改失败！');
    }
  },

  //删除关于
  deleteAbout: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (id) {
      const row = await aboutService.deleteAbout(id);
      if (row) {
        ResSend(res, 200, '删除成功！');
      } else {
        ResSend(res, 410, '删除失败！');
      }
    } else {
      ResSend(res, 410, '删除失败！');
    }
  },

  //删除内容
  deleteAboutInfo: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (id) {
      const row = await aboutService.deleteAboutInfo(id);
      if (row) {
        ResSend(res, 200, '删除成功！');
      } else {
        ResSend(res, 410, '删除失败！');
      }
    } else {
      ResSend(res, 410, '删除失败！');
    }
  },

  //搜索关于
  searchAbout: async (req: Request, res: Response) => {
    const name = String(req.query.name);
    const searchStr = `%${name.split('').join('%')}%`;    //模糊搜索字符串
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const rows = await aboutService.searchAbout(searchStr, limit, offset);
    const data = rows.map(row => {
      return {
        ...row,
        createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        aboutInfos: row.aboutInfos.map(info => {
          return {
            ...info,
            createTime: moment(info.createTime).format('YYYY-MM-DD HH:mm:ss'),
            updateTime: moment(info.updateTime).format('YYYY-MM-DD HH:mm:ss'),
          }
        })
      }
    })
    return data;
  }
}