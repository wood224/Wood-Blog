import express from 'express';
import { adminController } from '../controllers/adminController';
import { categoryController } from '../controllers/categoryController';
import { noteController } from '../controllers/noteController';
const router = express.Router();

/**
 * @apiDefine groupFront 客户端页面api
 */

/**
 * 
 * @api {get} /front/api/info/ 获取个人信息
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {String} type 请求标识
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
 * @apiSuccess {Object[]} categoryList 分类列表
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
 *    "categoryList": [{
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
 *      "name": "Vue3",
 *      "coverImg" : "/uploads/category/1681191866260-Vue3.png"
 *    }
 * ]
 * 
 */
router.get('/categoryList', categoryController.getCategoryList);

/**
 * 
 * @api {get} /front/api/noteList 获取笔记列表
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * @apiQuery  {Number} limit 每页个数
 * @apiQuery  {Number} offset 偏移量
 * 
 * @apiSuccess {Number} count 总数
 * @apiSuccess {Object[]} noteList 笔记列表
 * @apiSuccess {Number} noteList.id id
 * @apiSuccess {String} noteList.title 标题
 * @apiSuccess {String} noteList.subtitle 副标题
 * @apiSuccess {String} noteList.createTime 创建时间
 * @apiSuccess {String} noteList.updateTime 更新时间
 * @apiSuccess {Number} noteList.isDelete 是否删除
 * @apiSuccess {Object} noteList.category 所属分类
 * @apiSuccess {Number} noteList.category.id 所属分类id
 * @apiSuccess {String} noteList.category.name 所属分类名字
 * @apiSuccess {Object} noteList.category.categoryInfo 所属分类信息
 * @apiSuccess {String} noteList.category.categoryInfo.coverImg 所属分类封面
 * @apiSuccess {String} noteList.category.categoryInfo.introduction 所属分类简介
 * @apiSuccess {Object[]} noteList.tags 标签数组
 * @apiSuccess {Number} noteList.tags.id 标签id
 * @apiSuccess {String} noteList.tags.name 标签名字
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "count":1,
 *     "noteList": [
 *        {
 *          "id":2,
 *          "title":"test",
 *          "subtitle":"",
 *          "createTime":"2023-05-02 16:08:49",
 *          "updateTime":"2023-05-02 16:08:49",
 *          "isDelete":0,
 *          "category":{
 *              "id":83,
 *              "name":"Test",
 *              "categoryInfo":{
 *                  "coverImg" : "/uploads/category/test.png",
 *                  "introduction": "test"
 *              }
 *          },
 *          "tags": [
 *              {
 *                "id" : 6,
 *                "name" : "TypeScript",
 *              }
 *          ]
 *        }
 *     ] 
 * }
 * 
 * 
 */
router.get('/noteList', noteController.getNoteList)
export default router;