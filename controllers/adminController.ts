const adminService = require('../services/adminService');
const jwt = require('../utils/JWT');
const bcrypt = require('../utils/bcrypt');

class CheckResult {
  result: boolean;
  data: object | null;
  constructor(result: boolean, data: object | null = null) {
    this.result = result;
    this.data = data;
  }
}

const adminController = {
  //查询管理员
  check: async (form: any) => {
    const data = await adminService.check(form.username);
    if (data[0].length === 1) {
      return new CheckResult(true, data[0][0])
    } else {
      return new CheckResult(false, null);
    }
  },

  //管理员登录
  login: async (req: any, res: any, form: any) => {
    const result = await adminController.check(form);
    if (result.result) {
      const pwdData = await adminService.getCiphertext(form.username);  //获取密文
      if (bcrypt.verity(form.password, pwdData[0].password)) {          //校验密码是否正确
        const data = await adminService.login(form.username);
        //设置 token
        const token = jwt.generate(data[0], '1h');
        res.header('Authorization', token);
        res.send({ code: 200, msg: '登录成功！' });
      } else {
        res.send({ code: 401, msg: '用户名或密码错误！' });
      }
    } else {
      res.send({ code: 401, msg: '账号不存在！' });
    }
  },

  //管理员注册
  register: async (req: any, res: any, form: any) => {
    const result = await adminController.check(form);
    if (result.result) {
      res.send({ code: 401, msg: '账号已存在！' });
    } else {
      //对密码进行加密
      form.password = bcrypt.generate(form.password);
      const data = await adminService.register(form.username, form.password);
      if (data === 1) {
        res.send({ code: 200, msg: '注册成功！' });
      } else {
        res.send({ code: 401, msg: '注册失败！' });
      }
    }
  }
}

module.exports = adminController;