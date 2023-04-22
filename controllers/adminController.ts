import { adminService } from "../services/adminService";
import { jwt } from '../utils/JWT';
import { bcrypt } from '../utils/bcrypt';
class CheckResult {
  result: boolean;
  data: object | null;
  constructor(result: boolean, data: any | null = null) {
    this.result = result;
    this.data = data;
  }
}

export const adminController = {
  //查询管理员
  check: async (form: any) => {
    const row = await adminService.check(form.username);
    if (row) {
      return new CheckResult(true, row)
    } else {
      return new CheckResult(false, null);
    }
  },

  //管理员登录
  login: async (req: any, res: any) => {
    const form = req.body;
    const result = await adminController.check(form);
    if (result.result && result.data) {
      const adminData = result.data as any;
      const password = adminData.password                    //获取密文
      if (bcrypt.verity(form.password, password)) {          //校验密码是否正确
        const dataObj = {   //转为 Object
          password: password,
        }
        //设置 token
        const token = jwt.generate(dataObj, '1h');
        res.header('Authorization', token);
        res.send({ code: 200, msg: '登录成功！' });
      } else {
        res.send({ code: 401, msg: '用户名或密码错误！' });
      }
    } else {
      res.send({ code: 401, msg: '账号不存在！' });
    }
  },

  // //管理员注册
  // register: async (req: any, res: any, form: any) => {
  //   const result = await adminController.check(form);
  //   if (result.result) {
  //     res.send({ code: 401, msg: '账号已存在！' });
  //   } else {
  //     //对密码进行加密
  //     form.password = bcrypt.generate(form.password);
  //     const data = await adminService.register(form.username, form.password);
  //     if (data) {
  //       res.send({ code: 200, msg: '注册成功！' });
  //     } else {
  //       res.send({ code: 401, msg: '注册失败！' });
  //     }
  //   }
  // }
}