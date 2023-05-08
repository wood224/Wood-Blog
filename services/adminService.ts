import { AppDataSource } from '../mysql/db';
import { Admin } from '../entity/Admin';
import { AdminInfo } from '../entity/AdminInfo';

const adminRepository = AppDataSource.getRepository(Admin);
const adminInfoRepository = AppDataSource.getRepository(AdminInfo);

export const adminService = {
  //根据账号查询管理员
  check: async (username: string) => {
    const row = await adminRepository.findOne({ where: { username } });
    return row;
  },

  //获取密码密文
  getCiphertext: async (username: string) => {
    const row = await adminRepository.findOne({ where: { username }, select: ['password'] });
    return row;
  },

  //管理员登录
  login: async (username: string) => {
    const row = await adminRepository.findOne({ where: { username }, select: ['password'] });
    return row;
  },

  //获取个人信息
  getInfo: async (id?: number) => {
    if (id) {
      const row = await adminInfoRepository.findOne({ where: { admin: { id } }, relations: ['admin'] });
      return row;
    } else {
      const rows = await adminInfoRepository.find()
      return rows[0];   //获取第一条数据
    }
  },

  //修改个人信息
  updateInfo: async (form: any) => {
    const adminInfo = await adminInfoRepository.findOne({ where: { admin: { id: form.id } }, relations: ['admin'] });
    if (adminInfo !== null) {
      if (adminInfo) {
        if (form.avatar) {
          adminInfo.avatar = form.avatar;
        }
        adminInfo.name = form.name;
        adminInfo.signature = form.signature;
        adminInfo.technology = form.technology;
        adminInfo.email = form.email;
      }
      const row = adminInfoRepository.save(adminInfo);
      return row;
    } else {
      return null;
    }
  }

  // //管理员注册
  // // register: async (username: string, password: string) => {
  // //   const admin = new Admin();
  // //   admin.username = username;
  // //   admin.password = password;
  // //   const row = await AppDataSource.manager.save(admin);
  // //   return row;
  // // }
}