import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: 1 });
});

//屏蔽 favicon.ico 请求
router.get('/favicon.ico', (req: Request, res: Response) => res.status(204));

//获取首页信息
router.get('/home', (req: Request, res: Response) => {
  res.send({ ok: 1 });
});

export default router;
