import express from 'express';
const router = express.Router();
import { adminController } from '../controllers/adminController';
import { captchaController } from '../controllers/captchaController';

//解决在 req.session 中添加属性问题
declare module 'express-session' {
  interface SessionData {
    captcha: string;
  }
}

//管理员登录
router.post('/login', adminController.login);

//生成验证码
router.get('/captcha', captchaController.generateCaptcha);

//获取个人信息
router.get('/info', adminController.getInfo);

//修改个人信息
router.put('/info', adminController.updateInfo);

// //管理员注册
// router.post('/register', (req: Request, res: Response) => {
//   adminController.register(req, res, req.body);
// })

export default router;