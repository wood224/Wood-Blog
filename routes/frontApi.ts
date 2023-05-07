import express from 'express';
import { adminController } from '../controllers/adminController';
import { categoryController } from '../controllers/categoryController';
const router = express.Router();

/**
 * @apiDefine groupFront 客户端页面api
 */

/**
 * 
 * @api {get} /front/api/info 获取个人信息
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} type 请求标识
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *     "type" : "front"
 * }
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "avatar" : "/uploads/avatar/*.png",
 *     "name" : "wood224",
 *     "signature" : "愿你长寿，我的朋友。",
 *     "technology": "Vue,Echarts"
 * }
 * 
 * 
 */
router.get('/info', adminController.getInfo);

/**
 * 
 * @api {get} /front/api/category 获取分类列表
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} [limit] 每页个数
 * @apiParam  {Number} [offset] 偏移量
 * 
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object} categoryList 分类列表
 * @apiSuccess {Number} categoryList.id id
 * @apiSuccess {String} categoryList.name 名字
 * @apiSuccess {String} categoryList.coverImg 封面图片路径
 * @apiSuccess {String} categoryList.introduction 简介
 * @apiSuccess {String} categoryList.createTime 创建时间
 * @apiSuccess {String} categoryList.updateTime 更新时间
 * 
 * @apiSuccessExample {json} 成功响应(有参):
 * {
 *    "count" : 1,
 *    "categoryList":[{
 *        "id" : 33,
 *        "name" : "Vue3",
 *        "coverImg" : "/uploads/category/1681191866260-Vue3.png",
 *        "introduction" : "Vue3",
 *        "createTime" : "2023-04-11 11:00:58",
 *        "updateTime" : "2023-04-15 16:11:01"
 *    }]
 * }
 * @apiSuccessExample {json} 成功响应(无参):
 * [
 *    {
 *      "id": 33, 
 *      "name": 'Vue3',
 *      "coverImg" : "/uploads/category/1681191866260-Vue3.png"
 *    }
 * ]
 * 
 */
router.get('/categoryList', categoryController.getCategoryList);

export default router;