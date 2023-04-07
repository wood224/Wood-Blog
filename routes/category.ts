import express, { Request, Response } from 'express';

const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', (req: Request, res: Response) => {
  categoryController.getCategoryList(req, res);
});

module.exports = router;