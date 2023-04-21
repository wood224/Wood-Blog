import express, { Request, Response } from 'express';
const router = express.Router();
import { categoryController } from '../controllers/categoryController';

router.get('/', (req: Request, res: Response) => {
  categoryController.getCategoryList(req, res);
});

router.post('/', async (req: Request, res: Response) => {
  categoryController.addCategory(req, res);
})

router.put('/', async (req: Request, res: Response) => {
  categoryController.updateCategory(req, res);
})

router.delete('/:id', async (req: Request, res: Response) => {
  categoryController.deleteCategory(req, res);
})

router.get('/search/:name', async (req: Request, res: Response) => {
  categoryController.searchCategory(req, res);
})

export default router;