import express, { Request, Response } from 'express';
const router = express.Router();
import { adminController } from '../controllers/adminController';
import { createCaptcha } from '../utils/captcha';

//解决在 req.session 中添加属性问题
declare module 'express-session' {
  interface SessionData {
    captcha: string;
  }
}

//管理员登录
router.post('/login', (req: Request, res: Response) => {
  const userCaptcha = req.body.captcha;
  const captcha = req.session.captcha;
  if (captcha && userCaptcha) {
    //正则表达式检查验证码
    const reg = new RegExp(captcha, 'i');
    if (!reg.test(userCaptcha)) {
      return res.send({ code: 401, msg: '验证码不正确！' });
    }
    adminController.login(req, res);
  }
  else {
    res.send({ code: 401, msg: '出错了，请重试' });
  }
})

//生成验证码
router.get('/captcha', (req: Request, res: Response) => {
  const { text, svg } = createCaptcha();
  req.session.captcha = text;
  res.type('svg');
  res.send(svg);
})

// //管理员注册
// router.post('/register', (req: Request, res: Response) => {
//   adminController.register(req, res, req.body);
// })

export default router;