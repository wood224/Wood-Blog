import express from 'express';
const router = express.Router();
import { noteController } from '../controllers/noteController';

/**
 * @apiDefine groupNote 笔记
 */

/**
 * 
 * @api {get} /note 获取笔记列表
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object} noteList 笔记列表
 * @apiSuccess {Number} noteList.id id
 * @apiSuccess {String} noteList.title 标题
 * @apiSuccess {String} noteList.subtitle 副标题
 * @apiSuccess {String} noteList.createTime 创建时间
 * @apiSuccess {String} noteList.updateTime 更新时间
 * @apiSuccess {Number} noteList.isDelete 是否删除
 * @apiSuccess {Object} noteList.category 所属分类
 * @apiSuccess {Number} noteList.category.id 所属分类id
 * @apiSuccess {String} noteList.category.name 所属分类名字
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "count":1,
 *     "noteList":[
 *        {
 *          "id":2,
 *          "title":"test",
 *          "subtitle":"",
 *          "createTime":"2023-05-02 16:08:49",
 *          "updateTime":"2023-05-02 16:08:49",
 *          "isDelete":0,
 *          "category":{
 *              "id":83,
 *              "name":"Test"
 *          }
 *        }
 *     ] 
 * }
 * 
 * 
 */
router.get('/', noteController.getNoteList);

/**
 * 
 * @api {post} /note 添加笔记
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} title 标题
 * @apiParam  {String} subtitle 副标题
 * @apiParam  {String} text 内容
 * @apiParam  {Number} categoryId 所属分类id
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "title": "test",
 *    "subtitle": "",
 *    "text": "# test",
 *    "categoryId": 1
 * }
 * 
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "code": 200, 
 *    "msg": "添加成功！" 
 * }
 * 
 * 
 */
router.post('/', noteController.addNote);

router.get('/:id', noteController.getInfo);

router.put('/:id', noteController.updateNote);
export default router;