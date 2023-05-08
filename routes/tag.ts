import express from 'express';
const router = express.Router();
import { tagController } from '../controllers/tagController';

/**
 * @apiDefine groupTag 标签
 */

/**
 * 
 * @api {get} /tag 获取标签列表
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {Number} [limit] 数量
 * @apiQuery  {Number} [offset] 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} tagList 标签列表
 * @apiSuccess {Number} tagList.id id
 * @apiSuccess {String} tagList.name 名字
 * @apiSuccess {String} tagList.createTime 创建时间
 * @apiSuccess {String} tagList.updateTime 更新时间
 * @apiSuccess {Number} tagList.isDelete 是否删除
 * 
 * @apiSuccessExample {json} 成功响应(有参):
 * {
 *     "count" : 10,
 *     "tagList" : [
 *        {
 *          "createTime" : "2023-05-06 17:21:13",
 *          "id" : 1,
 *          "isDelete" : 0,
 *          "name" : "MySQL",
 *          "updateTime" : "2023-05-06 17:57:36"
 *        }
 *     ]
 * }
 * @apiSuccessExample {json} 成功响应(无参):
 * [
 *    {
 *      "id": 1, 
 *      "name": "Vue3",
 *    }
 * ]
 * 
 */
router.get('/', tagController.getTagList);

/**
 * 
 * @api {post} /tag 添加标签
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} name 标签名
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "name": "test"
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
router.post('/', tagController.addTag);

/**
 * 
 * @api {put} /tag 修改标签
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * @apiBody  {Number} id 标签id
 * @apiBody  {String} name 标签名
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id" : 1,
 *    "name" : "test"
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
router.put('/', tagController.updateTag);

/**
 * 
 * @api {delete} /tag/:id 删除标签
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * @apiParam  {Number} id 标签id
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id" : 1,
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
 * 
 */
router.delete('/:id', tagController.deleteTag);

/**
 * 
 * @api {get} /tag/search 搜索标签列表
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {String} name 搜索词
 * @apiQuery  {Number} limit 每页个数
 * @apiQuery  {Number} offset 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} tagList 标签列表
 * @apiSuccess {Number} tagList.id id
 * @apiSuccess {String} tagList.name 名字
 * @apiSuccess {String} tagList.createTime 创建时间
 * @apiSuccess {String} tagList.updateTime 更新时间
 * @apiSuccess {Number} tagList.isDelete 是否删除
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "count":1,
 *     "tagList": [
 *        {
 *          "id":2,
 *          "name":"test",
 *          "createTime":"2023-05-02 16:08:49",
 *          "updateTime":"2023-05-02 16:08:49",
 *          "isDelete":0
 *        }
 *     ] 
 * }
 * 
 * 
 */
router.get('/search', tagController.searchTag)

/**
 * 
 * @api {get} /tag/top 获取标签排行榜
 * @apiGroup groupTag
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess {Number} count 数量
 * @apiSuccess {Number} tid id
 * @apiSuccess {String} name 名字
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     [
 *        {
 *          "count": 4, 
 *          "tid": 6, 
 *          "name": "TypeScript"
 *        }
 *     ]     
 * }
 * 
 */
router.get('/top', tagController.getTagTop);

export default router;