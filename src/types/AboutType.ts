export interface AboutInfo {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
}

export interface About {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  aboutInfos: AboutInfo[];
}