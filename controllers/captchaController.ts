//生成登录验证码
import { Request, Response } from 'express';
import { createCaptcha } from '../utils/captcha';

export const captchaController = {
  generateCaptcha: (req: Request, res: Response) => {
    const { text, svg } = createCaptcha();
    req.session.captcha = text;
    res.type('svg');
    res.send(svg);
  }
}