export interface Tag {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  isDelete: number;
}

export class TagList {
  count: number;
  list: Tag[];
  constructor(count?: number, list?: Tag[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}