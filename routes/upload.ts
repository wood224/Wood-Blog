import express from 'express';
const router = express.Router();
import { uploadController } from '../controllers/uploadController';

/**
 * @apiDefine groupCategory 上传
 */

router.post('/', uploadController.upload);

export default router;