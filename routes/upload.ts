import express from 'express';
const router = express.Router();
import { uploadController } from '../controllers/uploadController';

/**
 * @apiDefine groupCategory 上传
 */

/**
 * 
 * @api {post} /upload 上传图片
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {File} img 图片
 * 
 * @apiParamExample  {multipart/form-data} 请求示例:
 * {
 *    "img" : File
 * }
 * 
 * 
 * @apiSuccess {String} url  图片相对路径
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "url":"/path.png"
 * }
 * 
 * 
 */
router.post('/', uploadController.upload);

export default router;