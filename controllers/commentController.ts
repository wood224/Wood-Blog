import { Request, Response } from "express";
import { commentService } from "../services/commentService";
import { ResSend } from "../utils/ResSend";
import moment from "moment";

export const commentController = {
  //获取留言列表
  getCommentList: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    if (limit >= 0 && offset >= 0) {
      const { count, rows } = await commentService.getCommentList(limit, offset);
      const data = rows.map(row => {
        return {
          ...row,
          createTime: moment(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
      res.send({
        count: count,
        commentList: data
      });
    } else {
      ResSend(res, 410, '出错了，请重试！');
    }
  },

  //添加留言
  addComment: async (req: Request, res: Response) => {
    const username = req.body.username;
    const content = req.body.content;
    if (username && content) {
      const row = await commentService.addComment(username, content);
      if (row) {
        ResSend(res, 200, '发表留言成功！');
      } else {
        ResSend(res, 410, '你已经发表过该留言了！');
      }
    } else {
      ResSend(res, 410, '出错了，请重试！');
    }
  },

  //删除留言
  deleteComment: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id) {
      const row = await commentService.deleteComment(id);
      if (row) {
        ResSend(res, 410, '删除留言成功！');
      } else {
        ResSend(res, 410, '删除留言失败！');
      }
    } else {
      ResSend(res, 410, '出错了，请重试！');
    }
  }
}