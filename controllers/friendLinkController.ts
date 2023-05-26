import { Request, Response } from "express";
import { friendLinkService } from "../services/friendLinkService";
import moment from "moment";
import { saveToUploads } from "../utils/saveToUploads";
import { ResSend } from "../utils/ResSend";

export const friendLinkController = {
  //获取友链列表
  getFriendLinkList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const { count, rows } = await friendLinkService.getFriendLinkList(limit, offset);
    const data = rows.filter(row => {
      row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
      return true;
    })
    res.send({
      count: count,
      friendLinkList: data
    })
  },

  //添加友链
  addFriendLink: async (req: Request, res: Response) => {
    const file = req.body.img;
    let img = '';
    if (file && typeof (file) === 'string') {
      img = file;
    } else if (file) {
      img = await saveToUploads('friendLink', file.path, req.body.name);
    }
    const form = {
      name: req.body.name,
      introduction: req.body.introduction,
      link: req.body.link,
      img,
    }
    if (form.name && form.link) {
      const row = await friendLinkService.addFriendLink(form.name, form.introduction, form.link, form.img);
      if (row) {
        ResSend(res, 200, '添加成功！');
      } else {
        ResSend(res, 410, '添加失败！');
      }
    } else {
      ResSend(res, 410, '请检查数据格式！');
    }
  },

  //修改友链
  updateFriendLink: async (req: Request, res: Response) => {
    const file = req.body.img;
    let img = '';
    if (file && typeof (file) === 'string') {
      img = file;
    } else if (file) {
      img = await saveToUploads('friendLink', file.path, req.body.name);
    }
    const form = {
      id: req.body.id,
      name: req.body.name,
      introduction: req.body.introduction,
      link: req.body.link,
      img,
    }
    if (form.name && form.link) {
      const row = await friendLinkService.updateFriendLink(form.id, form.name, form.introduction, form.link, form.img);
      if (row) {
        ResSend(res, 200, '修改成功！');
      } else {
        ResSend(res, 410, '修改失败！');
      }
    } else {
      ResSend(res, 410, '请检查数据格式！');
    }
  },

  //删除友链
  deleteFriendLink: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const row = await friendLinkService.deleteFriendLink(id);
    if (row) {
      ResSend(res, 200, '删除成功！');
    } else {
      ResSend(res, 410, '删除失败！');
    }
  }
}