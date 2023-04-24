interface Category {
  id: number;
  coverImg: string;
  name: string;
  introduction: string;
  createTime: string;
  updateTime: string;
}
export interface CategoryList {
  count: number;
  list: Category[];
}