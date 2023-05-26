import { AppDataSource } from '../mysql/db';
import { About } from '../entity/About';
import { AboutInfo } from '../entity/AboutInfo';
import { Like } from 'typeorm';

const aboutRepository = AppDataSource.getRepository(About);
const aboutInfoRepository = AppDataSource.getRepository(AboutInfo);

export const aboutService = {
  //检查版块名
  checkName: async (name: string) => {
    const rows = await aboutRepository.find({ where: { name } });
    return rows;
  },

  //根据Id获取版块
  getIdAbout: async (id: number) => {
    const about = await aboutRepository.findOne({ where: { id } });
    return about;
  },

  //获取关于列表
  getAboutList: async (limit?: number, offset?: number) => {
    const rows = await aboutRepository.createQueryBuilder('about')
      .leftJoinAndSelect('about.aboutInfos', 'aboutInfos')
      .take(limit).skip(offset)
      .getMany();
    return rows;
  },

  //添加版块
  addAbout: async (name: string) => {
    const about = new About();
    about.name = name;
    const row = await aboutRepository.save(about);
    return row;
  },

  //添加内容
  addAboutInfo: async (title: string, content: string, AId: number) => {
    const about = await aboutService.getIdAbout(AId);
    if (about) {
      const aboutInfo = new AboutInfo();
      aboutInfo.title = title;
      aboutInfo.content = content;
      aboutInfo.about = about;
      const row = await aboutInfoRepository.save(aboutInfo);
      return row;
    } else {
      return null;
    }
  },

  //修改版块
  updateAbout: async (id: number, name: string) => {
    const about = await aboutService.getIdAbout(id);
    if (about) {
      about.name = name;
      const row = await aboutRepository.save(about);
      return row;
    } else {
      return null;
    }
  },

  //修改内容
  updateAboutInfo: async (AId: number, id: number, title: string, content: string) => {
    const aboutInfo = await aboutInfoRepository.findOne({ where: { id }, relations: { about: true, }, });
    if (aboutInfo && aboutInfo.about.id === AId) {
      aboutInfo.title = title;
      aboutInfo.content = content;
      const row = await aboutInfoRepository.save(aboutInfo);
      return row;
    } else {
      return null;
    }
  },

  //删除版块
  deleteAbout: async (id: number) => {
    const row = await aboutRepository.delete(id);
    return row;
  },

  //删除内容
  deleteAboutInfo: async (id: number) => {
    const row = await aboutInfoRepository.delete(id);
    return row;
  },

  //搜索关于
  searchAbout: async (name: string, limit?: number, offset?: number) => {
    const rows = await aboutRepository.createQueryBuilder()
      .leftJoinAndSelect('about.aboutInfos', 'aboutInfos')
      .where({ name: Like(name) })
      .take(limit).skip(offset)
      .getMany();
    return rows;
  }
}