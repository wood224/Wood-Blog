import express from 'express';
const router = express.Router();
import { friendLinkController } from '../controllers/friendLinkController';

/**
 * @apiDefine groupFriendLink 友链
 */

/**
 * 
 * @api {get} /friendLink 获取友链列表
 * @apiGroup groupFriendLink
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {Number} [limit] 每页个数
 * @apiQuery  {Number} [offset] 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} friendLinkList 友链列表
 * @apiSuccess {Number} friendLinkList.id id
 * @apiSuccess {String} friendLinkList.name 名字
 * @apiSuccess {String} friendLinkList.introduction 简介
 * @apiSuccess {String} friendLinkList.link 链接
 * @apiSuccess {String} friendLinkList.createTime 创建时间
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *    "count" : 1,
 *    "friendLinkList": [{
 *        "createTime": "2023-05-10 18:47:26",
 *        "id": 8,
 *        "name": "必应",
 *        "introduction": "",
 *        "link": "www.bing.com",
 *    }]
 * }
 * 
 */
router.get('/', friendLinkController.getFriendLinkList);

/**
 * 
 * @api {post} /friendLink 添加友链
 * @apiGroup groupFriendLink
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {File | String} [img] 图片
 * @apiBody  {string} name 名字
 * @apiBody  {string} introduction 简介
 * @apiBody  {string} link 连接
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "name": "百度",
 *    "introduction": "百度一下，你就知道",
 *    "link": "https:www.baidu.com"
 * }
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
router.post('/', friendLinkController.addFriendLink);

router.put('/', friendLinkController.updateFriendLink)

router.delete('/:id', friendLinkController.deleteFriendLink)

export default router;