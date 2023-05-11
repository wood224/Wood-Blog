import express from 'express';
const router = express.Router();
import { archiveController } from '../controllers/archiveController';

/**
 * @apiDefine groupArchive 归档
 */

/**
 * 
 * @api {get} /archive 获取归档列表
 * @apiGroup groupArchive
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {Number} [limit] 每页个数
 * @apiQuery  {Number} [offset] 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} archiveList 归档列表
 * @apiSuccess {Number} archiveList.id id
 * @apiSuccess {String} archiveList.name 名字
 * @apiSuccess {String} archiveList.source 来源
 * @apiSuccess {String} archiveList.createTime 创建时间
 * @apiSuccess {String} archiveList.update 是否为修改
 * @apiSuccess {String} archiveList.pid 父id
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *    "count" : 1,
 *    "archiveList": [{
 *        "createTime": "2023-05-10 18:47:26",
 *        "id": 8,
 *        "name": "test123",
 *        "pid": 25,
 *        "source": "笔记",
 *        "type": 1,
 *        "update": false
 *    }]
 * }
 * 
 */
router.get('/', archiveController.getArchiveList);

/**
 * 
 * @api {get} /archive/search 搜索归档列表
 * @apiGroup groupArchive
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {String} name 名字
 * @apiQuery  {Number} limit 每页个数
 * @apiQuery  {Number} offset 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} archiveList 归档列表
 * @apiSuccess {Number} archiveList.id id
 * @apiSuccess {String} archiveList.name 名字
 * @apiSuccess {String} archiveList.source 来源
 * @apiSuccess {String} archiveList.createTime 创建时间
 * @apiSuccess {String} archiveList.update 是否为修改
 * @apiSuccess {String} archiveList.pid 父id
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *    "count" : 1,
 *    "archiveList": [{
 *        "createTime": "2023-05-10 18:47:26",
 *        "id": 8,
 *        "name": "test123",
 *        "pid": 25,
 *        "source": "笔记",
 *        "type": 1,
 *        "update": false
 *    }]
 * }
 * 
 */
router.get('/search', archiveController.searchArchive);

/**
 * 
 * @api {delete} /archive/:id 删除分类
 * @apiGroup groupArchive
 * @apiVersion  1.0.0
 * 
 * @apiParam {Number} id id
 * 
 * @apiParamExample {json} 请求示例:
 * {
 *    "id" : 1  
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
router.delete('/:id', archiveController.deleteArchive)

export default router;