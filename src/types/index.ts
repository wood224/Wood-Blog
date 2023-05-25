export class Word {
  text: string;
  author: string;
  title: string
  type: string;
  constructor(text?: string, author?: string, title?: string, type?: string) {
    this.text = text ?? '';
    this.author = author ?? '';
    this.title = title ?? '';
    this.type = type ?? '';
  }
}

export class Archive {
  createTime: string;
  id: number;
  name: string;
  pid: number;
  source: string;
  type: number;
  update: boolean;
  constructor(createTime?: string, id?: number, name?: string, pid?: number, source?: string, type?: number, update?: boolean) {
    this.createTime = createTime ?? '';
    this.id = id ?? -1;
    this.name = name ?? '';
    this.pid = pid ?? -1;
    this.source = source ?? '';
    this.type = type ?? -1;
    this.update = update ?? false;
  }
}