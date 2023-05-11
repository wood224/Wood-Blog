import { AppDataSource } from '../mysql/db';
import { FriendLink } from '../entity/FriendLink';

const friendLinkRepository = AppDataSource.getRepository(FriendLink)

export const friendLinkService = {
  //根据id获取友链
  getIdFriendLink: async (id: number) => {
    const friendLink = await friendLinkRepository.findOne({ where: { id } });
    return friendLink;
  },

  //获取友链列表
  getFriendLinkList: async (limit: number, offset: number) => {
    const count = await friendLinkRepository.count();
    const rows = await friendLinkRepository.createQueryBuilder()
      .take(limit).skip(offset)
      .getMany();
    return {
      count,
      rows
    }
  },

  //添加友链
  addFriendLink: async (name: string, introduction: string, link: string, img: string) => {
    const friendLink = new FriendLink();
    friendLink.name = name;
    friendLink.introduction = introduction;
    friendLink.link = link;
    friendLink.img = img;

    const row = friendLinkRepository.save(friendLink);
    return row;
  },

  //修改友链
  updateFriendLink: async (id: number, name: string, introduction: string, link: string, img: string) => {
    const friendLink = await friendLinkService.getIdFriendLink(id);
    if (friendLink) {
      friendLink.name = name;
      friendLink.introduction = introduction;
      friendLink.link = link;
      friendLink.img = img;
      const row = friendLinkRepository.save(friendLink);
      return row;
    } else {
      return null;
    }
  },

  //删除友链
  deleteFriendLink: async (id: number) => {
    const row = friendLinkRepository.delete(id);
    return row;
  }
}