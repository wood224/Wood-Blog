import express from 'express';
const router = express.Router();
import { tagController } from '../controllers/tagController';

router.get('/', tagController.getTagList);

router.post('/', tagController.addTag);

router.put('/', tagController.updateTag);

router.delete('/:id', tagController.deleteTag);

router.get('/search', tagController.searchTag)

router.get('/top', tagController.getTagTop);

export default router;