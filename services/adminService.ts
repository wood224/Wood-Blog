import { AppDataSource } from '../mysql/db';
import { Admin } from '../entity/Admin';
import { AdminInfo } from '../entity/AdminInfo';
import { userInfo } from 'os';

export const adminService = {
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
    const row = await AppDataSource.manager.findOne(Admin, { where: { username }, select: ['password'] });
    return row;
  },

  //获取个人信息
  getInfo: async (id: number) => {
    const row = await AppDataSource.manager.findOne(AdminInfo, { where: { admin: { id } }, relations: ['admin'] });
    return row;
  },

  //修改个人信息
  updateInfo: async (form: any) => {
    const adminInfo = await AppDataSource.manager.findOne(AdminInfo, { where: { admin: { id: form.id } }, relations: ['admin'] });
    if (adminInfo) {
      if (form.avatar) {
        adminInfo.avatar = form.avatar;
      }
      adminInfo.name = form.name;
      adminInfo.signature = form.signature;
      adminInfo.technology = form.technology;
    }
    const row = AppDataSource.manager.save(adminInfo);
    return row;
  }

  // //管理员注册
  // register: async (username: string, password: string) => {
  //   // const rows = await connect.query('insert into admin (username, password) values (?, ?)', [username, password]);
  //   const admin = new Admin();
  //   admin.username = username;
  //   admin.password = password;
  //   const row = await AppDataSource.manager.save(admin);
  //   return row;
  // }
}