// 定义默认值常量
const DEFAULT_VALUES = {
  string: '',
  number: -1,
  array: [] as const,
  aboutInfoArray: [] as AboutInfo[],
  archiveAction: '新增',
};

// Word 类
export class Word {
  text: string;
  author: string;
  title: string;
  type: string;

  constructor(data: Partial<Word> = {}) {
    this.text = data.text ?? DEFAULT_VALUES.string;
    this.author = data.author ?? DEFAULT_VALUES.string;
    this.title = data.title ?? DEFAULT_VALUES.string;
    this.type = data.type ?? DEFAULT_VALUES.string;
  }
}

// Archive 类
export class Archive {
  createTime: string;
  id: number;
  name: string;
  pid: number;
  source: string;
  type: number;   // 1：笔记 2：分类 3：标签
  action: string;

  constructor(data: Partial<Archive> = {}) {
    this.createTime = data.createTime ?? DEFAULT_VALUES.string;
    this.id = data.id ?? DEFAULT_VALUES.number;
    this.name = data.name ?? DEFAULT_VALUES.string;
    this.pid = data.pid ?? DEFAULT_VALUES.number;
    this.source = data.source ?? DEFAULT_VALUES.string;
    this.type = data.type ?? DEFAULT_VALUES.number;
    this.action = data.action ?? DEFAULT_VALUES.archiveAction;
  }
}

// AboutInfo 接口
interface AboutInfo {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
}

// About 类
export class About {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  aboutInfos: AboutInfo[];

  constructor(data: Partial<About> = {}) {
    this.id = data.id ?? DEFAULT_VALUES.number;
    this.name = data.name ?? DEFAULT_VALUES.string;
    this.createTime = data.createTime ?? DEFAULT_VALUES.string;
    this.updateTime = data.updateTime ?? DEFAULT_VALUES.string;
    this.aboutInfos = data.aboutInfos ?? DEFAULT_VALUES.aboutInfoArray;
  }
}

// FriendLink 类
export class FriendLink {
  id: number;
  name: string;
  introduction: string;
  link: string;
  img: string;
  createTime: string;

  constructor(data: Partial<FriendLink> = {}) {
    this.id = data.id ?? DEFAULT_VALUES.number;
    this.name = data.name ?? DEFAULT_VALUES.string;
    this.introduction = data.introduction ?? DEFAULT_VALUES.string;
    this.link = data.link ?? DEFAULT_VALUES.string;
    this.img = data.img ?? DEFAULT_VALUES.string;
    this.createTime = data.createTime ?? DEFAULT_VALUES.string;
  }
}