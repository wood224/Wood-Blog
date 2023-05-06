import { AppDataSource } from "../mysql/db";
import { Tag } from "../entity/Tag";
import { In, Like } from "typeorm";

const tagRepository = AppDataSource.getRepository(Tag);

export const tagService = {
  //检查标签
  check: async (name: string) => {
    const rows = await tagRepository.find({ where: { name: name } });
    return rows;
  },

  //根据 id 数组批量查询标签
  getTags: async (ids: number[]) => {
    const tags = await tagRepository.find({ where: { id: In(ids) } })
    return tags;
  },

  //获取标签列表
  getTagList: async (limit?: number, offset?: number) => {
    const count = await tagRepository.count({ where: { isDelete: 0 } });
    const rows = await tagRepository.createQueryBuilder('tag')
      .where('tag.is_delete=:isDelete', { isDelete: 0 })
      .orderBy('tag.id').limit(limit).offset(offset)
      .getMany();
    return {
      count,
      rows,
    };
  },

  //添加标签
  addTag: async (name: string) => {
    const row = await tagRepository.save({ name: name });
    return row;
  },

  //修改标签
  updateTag: async (id: number, name: string) => {
    const row = await tagRepository.update(id, { name: name });
    return row;
  },

  //删除标签
  deleteTag: async (id: number) => {
    const row = await tagRepository.update(id, { isDelete: 1 });
    return row;
  },

  //搜索标签
  searchTag: async (name: string, limit: number, offset: number) => {
    const count = await tagRepository.count({ where: { name: Like(`%${name}%`), isDelete: 0 } });
    const rows = await tagRepository.createQueryBuilder('tag')
      .where({ name: Like(`%${name}%`), isDelete: 0 })
      .orderBy("tag.id").limit(limit).offset(offset).getMany();
    return { count, rows };
  }
}