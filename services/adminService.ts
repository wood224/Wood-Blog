import connect from '../mysql/db';

const adminService = {
  //根据账号查询管理员
  check: async (username: string) => {
    const rows = await connect.query('select * from admin where username=?', [username]);
    return rows;
  },

  //获取密码密文
  getCiphertext: async (username: string) => {
    const rows = await connect.query('select password from admin where username=?', [username]);
    return rows[0];
  },

  //管理员登录
  login: async (username: string) => {
    const rows = await connect.query('select id, username from admin where username=?', [username]);
    return rows[0];
  },

  //管理员注册
  register: async (username: string, password: string) => {
    const rows = await connect.query('insert into admin (username, password) values (?, ?)', [username, password]);
    return rows[0].affectedRows;
  }
}

module.exports = adminService;