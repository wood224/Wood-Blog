import express, { Request, Response } from 'express';
const router = express.Router();
const adminController = require('../controllers/adminController');

//管理员登录
router.post('/login', (req: Request, res: Response) => {
  adminController.login(req, res, req.body);
})

// //管理员注册
// router.post('/register', (req: Request, res: Response) => {
//   adminController.register(req, res, req.body);
// })

module.exports = router;