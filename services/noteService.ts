import { AppDataSource } from "../mysql/db";
import { Note } from "../entity/Note";
import { NoteInfo } from "../entity/NoteInfo";
import { Category } from "../entity/Category";

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
    const count = await noteRepository.count();
    const rows = await noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category').orderBy('note.id')
      .limit(limit).offset(offset).getMany();
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
  }

}