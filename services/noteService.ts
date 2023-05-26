import { AppDataSource } from "../mysql/db";
import { Note } from "../entity/Note";
import { NoteInfo } from "../entity/NoteInfo";
import { Between, In, Like } from "typeorm";
import { categoryService } from "./categoryService";
import { tagService } from "./tagService";
import { archiveService } from "./archiveService";

const noteRepository = AppDataSource.getRepository(Note);
const noteInfoRepository = AppDataSource.getRepository(NoteInfo);

const archiveType = 1;   //所属归档 type

export const noteService = {
  //检查标题
  check: async (title: string) => {
    const rows = await noteRepository.find({ where: { title: title } });
    return rows;
  },

  //根据 id 获取笔记
  getIdNote: async (id: number) => {
    const note = await noteRepository.findOne({ where: { id: id } });
    return note;
  },

  //获取笔记数量
  getNoteCount: async () => {
    const count = await noteRepository.count({ where: { isDelete: 0 } });
    return count;
  },

  //获取笔记列表
  getNoteList: async (limit: number, offset: number) => {
    const count = await noteRepository.count({ where: { isDelete: 0 } });
    const rows = await noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .leftJoinAndSelect('note.tags', 'tag')
      .leftJoinAndSelect('category.categoryInfo', 'categoryInfo')
      .where({ isDelete: 0 })
      .andWhere('(tag.is_delete = :isDelete OR tag.id IS NULL)', { isDelete: 0 })
      .andWhere('category.is_delete = :isDelete', { isDelete: 0 })
      .orderBy('note.id').take(limit).skip(offset).getMany();
    return {
      count,
      rows,
    };
  },

  //添加笔记
  addNote: async (title: string, subtitle: string, categoryId: number, tagIds: number[], text: string) => {
    const row = await AppDataSource.transaction(async transactionalEntityManager => {
      const category = await categoryService.getIdCategory(categoryId);
      if (category !== null) {
        const tags = await tagService.getTags(tagIds);
        const note = new Note();
        note.title = title;
        note.subtitle = subtitle;
        note.category = category;
        note.tags = tags;
        const saveNoteData = await transactionalEntityManager.save(note);

        const noteInfo = new NoteInfo();
        noteInfo.noteText = text;
        noteInfo.note = saveNoteData;
        const row = await transactionalEntityManager.save(noteInfo);

        const archiveRow = await archiveService.addArchive(saveNoteData.title, archiveType, saveNoteData.id);

        return row;
      }
      return null;
    })

    return row;
  },

  //获取笔记内容
  getInfo: async (id: number) => {
    const row = await noteRepository.createQueryBuilder('note')
      .innerJoinAndSelect('note.noteInfo', 'noteInfo')
      .innerJoinAndSelect('note.category', 'category')
      .leftJoinAndSelect('note.tags', 'tag')
      .where('note.id = :id', { id })
      .andWhere('(tag.is_delete = :isDelete OR tag.id IS NULL)', { isDelete: 0 })
      .getOne();
    return row;
  },

  //修改笔记
  updateNote: async (id: number, title: string, subtitle: string, categoryId: number, tagIds: number[], text: string) => {
    const row = await AppDataSource.transaction(async transactionalEntityManager => {
      const note = await transactionalEntityManager.findOne(Note, { where: { id }, relations: ['category', 'noteInfo'] });
      if (note) {
        const tags = await tagService.getTags(tagIds);
        note.title = title;
        note.subtitle = subtitle;
        note.category.id = categoryId;
        note.noteInfo.noteText = text;
        note.tags = tags;
        note.updateTime = new Date();
        const row = await transactionalEntityManager.save(note);

        const archiveRow = await archiveService.addArchive(row.title, archiveType, row.id, true);

        return row;
      }
      return null;
    })
    return row;
  },

  //删除笔记
  deleteNote: async (id: number) => {
    const row = await noteRepository.update(id, { isDelete: 1 });
    return row;
  },

  //恢复删除的笔记
  restoreNote: async (id: number) => {
    const row = await noteRepository.update(id, { isDelete: 0 });
    return row;
  },

  //删除分类下的所有笔记
  deleteCategoryNote: async (categoryId: number) => {
    const row = await noteInfoRepository.createQueryBuilder()
      .update(Note)
      .set({ isDelete: 1 })
      .where('category_id = :id', { id: categoryId })
      .execute()
    return row;
  },

  //搜索笔记
  searchNote: async (title: string, limit: number, offset: number, categoryId?: number, tagIds?: number[]) => {
    const queryBuilder = noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .leftJoinAndSelect('note.tags', 'tag')
      .leftJoinAndSelect('category.categoryInfo', 'categoryInfo')
      .where({ isDelete: 0 })
    if (title !== '') {
      queryBuilder.andWhere({ title: Like(title) })
    }
    if (categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId })
    }
    if (tagIds && tagIds.length > 0) {
      queryBuilder.andWhere('tag.id In (:tagIds)', { tagIds })
    }
    const count = await queryBuilder.getCount()
    const rows = await queryBuilder.orderBy('note.id').take(limit).skip(offset).getMany();
    return {
      count,
      rows
    };
  },

  //5日内新增笔记数量
  newNotes: async (startDate: Date, endDate: Date) => {
    const rows = await noteRepository.createQueryBuilder('note')
      .where({ createTime: Between(startDate, endDate) })
      .andWhere({ isDelete: 0 })
      .select(['DATE_FORMAT(createtime, "%Y-%m-%d") AS date', 'COUNT(*) AS count'])
      .groupBy('date')
      .orderBy("date")
      .getRawMany();
    return rows;
  },

  //给笔记添加标签
  noteAddTags: async (id: number, tagIds: number[]) => {
    const note = await noteRepository.findOne({ where: { id } });
    const tags = await tagService.getTags(tagIds);
    if (note) {
      note.tags = tags;
      const row = await noteRepository.save(note);
      return row;
    } else {
      return null;
    }
  }
}