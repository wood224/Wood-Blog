import express from 'express';
const router = express.Router();
import { noteController } from '../controllers/noteController';

router.get('/', noteController.getNoteList);

export default router;