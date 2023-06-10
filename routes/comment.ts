import express from 'express';
const router = express.Router();
import { commentController } from '../controllers/commentController';

/**
 * @apiDefine groupComment 留言
 */

router.get('/', commentController.getCommentList);

router.delete('/', commentController.deleteComment);

export default router;