import express from 'express';
const router = express.Router();
import { noteController } from '../controllers/noteController';

router.get('/', noteController.getNoteList);

router.post('/', noteController.addNote);
export default router;