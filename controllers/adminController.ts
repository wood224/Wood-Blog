import { Request, Response } from 'express';
import { adminService } from "../services/adminService";
import { jwt } from '../utils/JWT';
import { bcrypt } from '../utils/bcrypt';
import { saveToUploads } from "../utils/saveToUploads";

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
  login: async (req: Request, res: Response) => {
    const userCaptcha = req.body.captcha;
    const captcha = req.session.captcha;
    if (captcha && userCaptcha) {
      //正则表达式检查验证码
      const reg = new RegExp(captcha, 'i');
      if (!reg.test(userCaptcha)) {
        return res.status(410).send({ code: 410, msg: '验证码不正确！' });
      }
      //校验账号密码
      const form = req.body;
      const result = await adminController.check(form);
      if (result.result && result.data) {
        const adminData = result.data as any;
        const id = adminData.id;
        const username = adminData.username;
        const password = adminData.password                    //获取密文
        if (bcrypt.verity(form.password, password)) {          //校验密码是否正确
          const dataObj = {   //转为 Object
            id,
            username,
          }
          //设置 token
          const token = jwt.generate(dataObj, '1h');
          res.header('Authorization', token);
          res.send({ code: 200, msg: '登录成功！' });
        } else {
          res.status(410).send({ code: 410, msg: '用户名或密码错误！' });
        }
      } else {
        res.status(410).send({ code: 410, msg: '账号不存在！' });
      }
    }
    else {
      res.status(410).send({ code: 410, msg: '出错了，请重试' });
    }
  },

  //获取个人信息
  getInfo: async (req: Request, res: Response) => {
    const type = req.query.type
    if (type === 'front') {
      const row = await adminService.getInfo();
      if (row) {
        const data = {
          avatar: row.avatar ? row.avatar : '',
          name: row.name,
          signature: row.signature,
          technology: row.technology,
          email: row.email
        }
        return res.send(data);
      }
    }
    else {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token);
        const row = await adminService.getInfo(payload.id);
        if (row) {
          const data = {
            id: payload.id,
            avatar: row.avatar ? row.avatar : '',
            name: row.name,
            signature: row.signature,
            technology: row.technology,
            email: row.email
          }
          return res.send(data);
        }
      }
      res.status(410).send({ code: 410, msg: '出错了！请重新登录。' });
    }
  },

  //修改个人信息
  updateInfo: async (req: Request, res: Response) => {
    const form = req.body;
    const file = form.avatar;
    let avatar = ''
    if (file) {
      avatar = await saveToUploads('avatar', file.path, form.name)
    }
    form.avatar = avatar;
    const row = await adminService.updateInfo(form);
    if (row) {
      res.send({ code: 200, msg: '修改成功！' });
    } else {
      res.status(410).send({ code: 410, msg: '修改失败！' });
    }
  }

  //  //管理员注册
  //  // register: async (req: Request, res: Response, form: any) => {
  //  //   const result = await adminController.check(form);
  //  //   if (result.result) {
  //  //     res.send({ code: 401, msg: '账号已存在！' });
  //  //   } else {
  //  //     //对密码进行加密
  //  //     form.password = bcrypt.generate(form.password);
  //  //     const data = await adminService.register(form.username, form.password);
  //  //     if (data) {
  //  //       res.send({ code: 200, msg: '注册成功！' });
  //  //     } else {
  //  //       res.send({ code: 401, msg: '注册失败！' });
  //  //     }
  //  //   }
  //  // }
}