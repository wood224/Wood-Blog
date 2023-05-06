import { AppDataSource } from "../mysql/db";
import { Note } from "../entity/Note";
import { NoteInfo } from "../entity/NoteInfo";
import { Category } from "../entity/Category";
import { Between, Like } from "typeorm";

const categoryRepository = AppDataSource.getRepository(Category)
const noteRepository = AppDataSource.getRepository(Note);
const noteInfoRepository = AppDataSource.getRepository(NoteInfo);

export const noteService = {
  //检查标题
  check: async (title: string) => {
    const rows = await noteRepository.find({ where: { title: title } });
    return rows;
  },

  //获取笔记列表
  getNoteList: async (limit: number, offset: number) => {
    const count = await noteRepository.count({ where: { isDelete: 0 } });
    const rows = await noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .where('note.is_delete=0')
      .andWhere('category.is_delete=0')
      .orderBy('note.id').limit(limit).offset(offset).getMany();
    return {
      count,
      rows,
    };
  },

  //添加笔记
  addNote: async (title: string, subtitle: string, categoryId: number, text: string) => {
    const row = await AppDataSource.transaction(async transactionalEntityManager => {
      const category = await categoryRepository.findOne({ where: { id: categoryId } });
      if (category !== null) {
        const note = new Note();
        note.title = title;
        note.subtitle = subtitle;
        note.category = category;
        const saveNoteData = await transactionalEntityManager.save(note);

        const noteInfo = new NoteInfo();
        noteInfo.noteText = text;
        noteInfo.note = saveNoteData;
        const row = await transactionalEntityManager.save(noteInfo);

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
      .where('note.id = :id', { id }).getOne();
    return row;
  },

  //修改笔记
  updateNote: async (id: number, title: string, subtitle: string, categoryId: number, text: string) => {
    const row = await AppDataSource.transaction(async transactionalEntityManager => {
      const note = await transactionalEntityManager.findOne(Note, { where: { id }, relations: ['category', 'noteInfo'] });
      if (note) {
        note.title = title;
        note.subtitle = subtitle;
        note.category.id = categoryId;
        note.noteInfo.noteText = text;
        /**
         * 修改其它字段
         */
        note.updateTime = new Date();
        const row = await transactionalEntityManager.save(note);
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
  searchNote: async (title: string, limit: number, offset: number) => {
    const count = await noteRepository.count({ where: { title: Like(`%${title}%`), isDelete: 0 } })
    const rows = await noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .where({ isDelete: 0 })
      .andWhere('category.isDelete = :isDelete', { isDelete: 0 })
      .andWhere('note.title LIKE :title', { title: `%${title}%` })
      .orderBy("note.id").limit(limit).offset(offset).getMany();
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
  }
}