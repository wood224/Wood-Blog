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
  type: number;   //1：笔记 2：分类 3：标签
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

interface AboutInfo {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
}
export class About {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  aboutInfos: AboutInfo[];
  constructor(id?: number, name?: string, createTime?: string, updateTime?: string, aboutInfos?: AboutInfo[]) {
    this.id = id ?? 0;
    this.name = name ?? '';
    this.createTime = createTime ?? '';
    this.updateTime = updateTime ?? '';
    this.aboutInfos = aboutInfos ?? [];
  }
}