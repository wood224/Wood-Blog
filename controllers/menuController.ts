const menuService = require('../services/menuService');

interface menuList {
  id: number,
  icon: string,
  name: string,
  children: number,
  second: Array<object>
}

const menuController = {
  //获取一级菜单列表
  getMenuList: async function (req: any, res: any) {
    const data = await menuService.getMenuList();
    let list: Array<menuList> = [];
    for (const item of data) {
      if (item.children === 1) {
        item.second = await this.getMenuSecond(item.id);
      }
      list.push(item);
    }

    res.send(list);
  },

  //获取二级菜单列表
  getMenuSecond: async function (pid: number) {
    const data = await menuService.getMenuSecond(pid);
    return data;

  }
}

module.exports = menuController;