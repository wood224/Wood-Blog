import express from 'express';
const router = express.Router();
import { aboutController } from '../controllers/aboutController';

/**
 * @apiDefine groupAbout 关于
 */


router.get('/', aboutController.getAboutList);

router.post('/', aboutController.addAbout);

router.post('/info', aboutController.addAboutInfo);

router.put('/', aboutController.updateAbout);

router.put('/info', aboutController.updateAboutInfo);

router.delete('/:id', aboutController.deleteAbout);

router.delete('/info/:id', aboutController.deleteAboutInfo);

export default router;