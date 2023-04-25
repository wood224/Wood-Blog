import { Category } from './CategoryType';

export interface Note {
  id: number;
  coverImg: string;
  title: string;
  subtitle: string;
  createTime: string;
  updateTime: string;
  isDelete: number;
  category: Category;
}

export class NoteList {
  count: number;
  list: Note[];
  constructor(count?: number, list?: Note[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}