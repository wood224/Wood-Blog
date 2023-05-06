import { Category } from './CategoryType';
import { Tag } from './TagType';
export interface Note {
  id: number;
  title: string;
  subtitle: string;
  createTime: string;
  updateTime: string;
  isDelete: number;
  category: Category;
  tags: Tag[];
}

export class NoteList {
  count: number;
  list: Note[];
  constructor(count?: number, list?: Note[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}