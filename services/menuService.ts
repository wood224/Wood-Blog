import connect from '../mysql/db';

const menuService = {
  //获取菜单列表
  getMenuList: async () => {
    const rows = await connect.query('select * from menu');
    return rows[0];
  },

  //获取二级菜单列表
  getMenuSecond: async (pid: number) => {
    const rows = await connect.query('select * from menu_second where pid=? and pid in (select id from menu where children=1)', [pid]);
    return rows[0];
  }
}

module.exports = menuService;