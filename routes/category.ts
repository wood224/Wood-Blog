import express from 'express';
const router = express.Router();
import { categoryController } from '../controllers/categoryController';

router.get('/', categoryController.getCategoryList);

router.post('/', categoryController.addCategory);

router.put('/', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

router.get('/search/:name', categoryController.searchCategory);

export default router;