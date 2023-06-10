import { AppDataSource } from '../mysql/db';
import { Comment } from './../entity/Comment';

const commentRepository = AppDataSource.getRepository(Comment);

export const commentService = {
  //获取留言列表
  getCommentList: async (limit: number, offset: number) => {
    const count = await commentRepository.count();
    const rows = await commentRepository.createQueryBuilder()
      .take(limit).skip(offset)
      .orderBy('id', 'DESC')
      .getMany();
    return { count, rows };
  },

  //添加留言
  addComment: async (username: string, content: string) => {
    const rows = await commentRepository.find({ where: { username } });
    const flag = rows.some(row => row.content === content);
    if (flag) {
      return null;
    }
    else {
      const comment = new Comment();
      comment.username = username;
      comment.content = content;
      const row = await commentRepository.save(comment);
      return row;
    }
  },

  //删除留言
  deleteComment: async (id: number) => {
    const row = await commentRepository.delete(id);
    return row;
  }
}