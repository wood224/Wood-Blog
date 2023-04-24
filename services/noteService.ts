import { AppDataSource } from "../mysql/db";
import { Note } from "../entity/Note";
import { NoteInfo } from "../entity/NoteInfo";

const noteRepository = AppDataSource.getRepository(Note);
const noteInfoRepository = AppDataSource.getRepository(NoteInfo);

export const noteService = {
  //获取笔记列表
  getNoteList: async (limit: number, offset: number) => {
    const count = await noteRepository.count();
    const rows = await noteRepository.createQueryBuilder('note')
      .orderBy('note.id').limit(limit).offset(offset).getMany();
    return {
      count,
      rows,
    };
  }
}