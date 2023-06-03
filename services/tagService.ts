import { AppDataSource } from "../mysql/db";
import { Tag } from "../entity/Tag";
import { NoteTag } from "../entity/NoteTag";
import { In, Like } from "typeorm";
import { archiveService } from "./archiveService";

const tagRepository = AppDataSource.getRepository(Tag);

const archiveType = 3;   //所属归档 type

export const tagService = {
  //检查标签
  check: async (name: string) => {
    const rows = await tagRepository.find({ where: { name: name } });
    return rows;
  },

  //根据 id 获取标签
  getIdTag: async (id: number) => {
    const tag = await tagRepository.findOne({ where: { id: id } });
    return tag;
  },

  //根据 id 数组批量查询标签
  getTags: async (ids: number[]) => {
    const tags = await tagRepository.find({ where: { id: In(ids) } })
    return tags;
  },

  //获取标签数量
  getTagCount: async () => {
    const count = tagRepository.count({ where: { isDelete: 0 } });
    return count;
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

    const archiveRow = await archiveService.addArchive(row.name, archiveType, row.id);

    return row;
  },

  //修改标签
  updateTag: async (id: number, name: string) => {
    const row = await tagRepository.update(id, { name: name });

    const tag = await tagRepository.findOne({ where: { id } });
    if (tag) {
      const archiveRow = await archiveService.addArchive(tag.name, archiveType, tag.id, 2);
    }

    return row;
  },

  //删除标签
  deleteTag: async (id: number) => {
    const row = await tagRepository.update(id, { isDelete: 1 });
    return row;
  },

  //恢复删除的标签
  restoreTag: async (id: number) => {
    const row = await tagRepository.update(id, { isDelete: 0 });
    return row;
  },

  //搜索标签
  searchTag: async (name: string, limit: number, offset: number) => {
    const count = await tagRepository.count({ where: { name: Like(`%${name}%`), isDelete: 0 } });
    const rows = await tagRepository.createQueryBuilder('tag')
      .where({ name: Like(`%${name}%`), isDelete: 0 })
      .orderBy("tag.id")
      .limit(limit).offset(offset)
      .getMany();
    return { count, rows };
  },

  //获取标签排行榜
  getTagTop: async () => {
    const rows = await AppDataSource.createQueryBuilder()
      .select(['COUNT(*) AS count', 'tid', 'tag.name AS name'])
      .from(NoteTag, 'note_tag')
      .innerJoin(Tag, 'tag', 'tag.id = note_tag.tid')
      .where('tag.is_delete = :isDelete', { isDelete: 0 })
      .groupBy('tid')
      .limit(5)
      .orderBy('count', 'DESC')
      .getRawMany()
    return rows;
  }
}