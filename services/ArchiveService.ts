import { AppDataSource } from '../mysql/db';
import { Archive } from '../entity/Archive';
import { Like } from 'typeorm';

const archiveRepository = AppDataSource.getRepository(Archive);

export const archiveService = {
  //获取归档列表
  getArchiveList: async (limit?: number, offset?: number) => {
    const count = await archiveRepository.count();
    const rows = await archiveRepository.createQueryBuilder()
      .take(limit).skip(offset)
      .orderBy('id', 'DESC')
      .getMany();
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
  },

  //搜索归档
  searchArchive: async (name: string, limit: number, offset: number) => {
    const count = await archiveRepository.count({ where: { name: Like(`%${name}%`) } })
    const rows = await archiveRepository.createQueryBuilder()
      .where({ name: Like(`%${name}%`) })
      .orderBy("archive.id")
      .take(limit).skip(offset)
      .getMany();
    return {
      count,
      rows
    };
  },

  //删除归档
  deleteArchive: async (id: number) => {
    const row = await archiveRepository.delete(id);
    return row;
  }
}