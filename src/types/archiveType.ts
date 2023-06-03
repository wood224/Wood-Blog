export interface Archive {
  id: number;
  name: string;
  type: number;
  createTime: string;
  action: number;
  pid: number;
}

export class ArchiveList {
  count: number;
  list: Archive[];
  constructor(count?: number, list?: Archive[]) {
    this.count = count ?? 0;
    this.list = list ?? [];
  }
}