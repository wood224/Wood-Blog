import { AppDataSource } from '../mysql/db';
import { Archive } from './../entity/Archive';
import { noteService } from './noteService';
import { categoryService } from './categoryService';
import { tagService } from './tagService';

import { Note } from '../entity/Note';
import { Category } from '../entity/Category';
import { Tag } from '../entity/Tag';

const archiveRepository = AppDataSource.getRepository(Archive);

export const ArchiveService = {
  //获取归档列表
  getArchiveList: async (limit?: number, offset?: number) => {
    const count = await archiveRepository.count();
    const rows = await archiveRepository.find();
    return {
      count,
      rows
    }
  },

  //增加归档
  addArchive: async (name: string, type: number, pid: number, update?: boolean) => {
    const archive = new Archive();
    archive.name = name;
    archive.type = type;    //1：笔记 2：分类 3：标签
    archive.pid = pid;
    archive.update = update ?? false;
    const row = await archiveRepository.save(archive);
    return row;
  }
}