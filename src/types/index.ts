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
  action: string;
  constructor(createTime?: string, id?: number, name?: string, pid?: number, source?: string, type?: number, action?: string) {
    this.createTime = createTime ?? '';
    this.id = id ?? -1;
    this.name = name ?? '';
    this.pid = pid ?? -1;
    this.source = source ?? '';
    this.type = type ?? -1;
    this.action = action ?? '新增';
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

export class FriendLink {
  id: number;
  name: string;
  introduction: string;
  link: string;
  img: string;
  createTime: string;
  constructor(id: number, name: string, introduction: string, link: string, img: string, createTime: string) {
    this.id = id ?? '';
    this.name = name ?? '';
    this.introduction = introduction ?? '';
    this.link = link ?? '';
    this.img = img ?? '';
    this.createTime = createTime ?? '';
  }
}