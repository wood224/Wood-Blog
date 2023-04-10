import express, { Request, Response } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

//获取首页信息
router.get('/home', (req: Request, res: Response) => {
  console.log(req.params);
  res.send({ ok: 1 });
})

module.exports = router;
