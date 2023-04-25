export interface Category {
  id: number;
  coverImg: string;
  name: string;
  introduction: string;
  createTime: string;
  updateTime: string;
}
export class CategoryList {
  count: number;
  list: Category[];
  constructor(count?: number, list?: Category[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}