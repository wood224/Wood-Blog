import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  categoryController.getCategoryList(req,res);
});

module.exports = router;