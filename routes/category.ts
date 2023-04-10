import express, { Request, Response } from 'express';
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const saveToUploads = require('../utils/saveToUploads');


router.get('/', (req: Request, res: Response) => {
  categoryController.getCategoryList(req, res);
});

router.post('/', (req: Request, res: Response) => {
  const file = req.body.coverImg;
  let coverImg = '';
  if (file) {
    coverImg = saveToUploads(file);
  }
  const form = {
    name: req.body.name,
    introduction: req.body.introduction,
    coverImg,
  }
  categoryController.addCategory(req, res, form);
})

module.exports = router;