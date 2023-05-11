export interface Friend {
  id: number;
  name: string;
  introduction: string;
  link: string;
  img: string;
  createTime: string;
}

export class FriendList {
  count: number;
  list: Friend[];
  constructor(count?: number, list?: Friend[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}