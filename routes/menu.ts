import express, { Request, Response } from 'express';
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', (req: Request, res: Response) => {
  menuController.getMenuList(req, res);
})

module.exports = router;