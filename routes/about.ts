import express from 'express';
const router = express.Router();
import { aboutController } from '../controllers/aboutController';

/**
 * @apiDefine groupAbout 关于
 */

/**
 * 
 * @api {get} /about 获取关于列表
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess  {Number} id id
 * @apiSuccess  {String} name 版块名
 * @apiSuccess  {String} createTime 版块创建时间
 * @apiSuccess  {String} updateTime 版块修改时间
 * @apiSuccess  {Object[]} aboutInfos 内容
 * @apiSuccess  {Number} aboutInfos.id 内容id
 * @apiSuccess  {String} aboutInfos.title 内容标题
 * @apiSuccess  {String} aboutInfos.content 内容详情
 * @apiSuccess  {String} aboutInfos.createTime 内容创建时间
 * @apiSuccess  {String} aboutInfos.updateTime 内容更新时间
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "aboutInfos": [
 *          {
 *            "id": 1, 
 *            "title": "标题", 
 *            "content": "内容", 
 *            "createTime": "2023-05-26 21:53:21",
 *            "updateTime": "2023-05-26 21:53:21"
 *          }
 *     ]
 *     "createTime": "2023-05-26 21:49:56",
 *     "id": 1,
 *     "name": "版块名",
 *     "updateTime": "2023-05-26 21:49:56"
 * }
 * 
 * 
 */
router.get('/', aboutController.getAboutList);

/**
 * 
 * @api {post} /about 添加版块
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} name 版块名
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "name": "版块名"
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
router.post('/', aboutController.addAbout);

/**
 * 
 * @api {post} /about/info 添加内容
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} title 内容标题
 * @apiBody  {String} content 内容详情
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "title": "内容标题",
 *    "content": "内容详情"
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
 */
router.post('/info', aboutController.addAboutInfo);

/**
 * 
 * @api {put} /about 修改版块
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * @apiBody  {Number} id id
 * @apiBody  {String} name 版块名
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id": 1,
 *    "name": "版块名"
 * }
 * 
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "code": 200, 
 *    "msg": "修改成功！" 
 * }
 * 
 * 
 */
router.put('/', aboutController.updateAbout);

/**
 * 
 * @api {put} /about/info 修改内容
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {Number} id id
 * @apiBody  {Number} AId 所属版块id
 * @apiBody  {String} title 内容标题
 * @apiBody  {String} content 内容详情
 * 
 * @apiParamExample  {json} 请求示例:
 * {  
 *    "id": 1,
 *    "AId": 1,
 *    "title": "内容标题",
 *    "content": "内容详情"
 * }
 * 
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "code": 200, 
 *    "msg": "修改成功！" 
 * }
 * 
 */
router.put('/info', aboutController.updateAboutInfo);

/**
 * 
 * @api {delete} /about/:id 删除版块
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id id
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id": 1
 * }
 * 
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "code": 200, 
 *    "msg": "删除成功！" 
 * }
 * 
 */
router.delete('/:id', aboutController.deleteAbout);

/**
 * 
 * @api {delete} /about/info/:id 删除内容
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id id
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id": 1
 * }
 * 
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * { 
 *    "code": 200, 
 *    "msg": "删除成功！" 
 * }
 * 
 */
router.delete('/info/:id', aboutController.deleteAboutInfo);

export default router;