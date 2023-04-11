import { AppDataSource } from '../mysql/db';
import { Admin } from '../entity/Admin';

const adminService = {
  //根据账号查询管理员
  check: async (username: string) => {
    const row = await AppDataSource.manager.findOne(Admin, { where: { username } });
    return row;
  },

  //获取密码密文
  getCiphertext: async (username: string) => {
    const row = await AppDataSource.manager.findOne(Admin, { where: { username }, select: ['password'] });
    return row;
  },

  //管理员登录
  login: async (username: string) => {
    // const rows = await connect.query('select id, username from admin where username=?', [username]);
    const row = await AppDataSource.manager.findOne(Admin, { where: { username }, select: ['password'] });
    return row;
  },

  //管理员注册
  register: async (username: string, password: string) => {
    // const rows = await connect.query('insert into admin (username, password) values (?, ?)', [username, password]);
    const admin = new Admin();
    admin.username = username;
    admin.password = password;
    const row = await AppDataSource.manager.save(admin);
    return row;
  }
}

module.exports = adminService;