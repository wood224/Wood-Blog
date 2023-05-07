import express from 'express';
const router = express.Router();
import { categoryController } from '../controllers/categoryController';

/**
 * @apiDefine groupCategory 分类
 */

/**
 * 
 * @api {get} /category 获取分类列表
 * @apiGroup groupCategory
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
router.get('/', categoryController.getCategoryList);

/**
 * 
 * @api {post} /category 新增分类
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} name 名字
 * @apiBody  {String} introduction 简介
 * @apiBody  {File} coverImg 封面
 * 
 * @apiParamExample  {multipart/form-data} 请求示例:
 * {
 *    name : "Vue3",
 *    introduction : "Vue3",
 *    coverImg : File
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
router.post('/', categoryController.addCategory);

/**
 * 
 * @api {put} /category 修改分类
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * @apiBody  {Number} id id
 * @apiBody  {String} name 名字
 * @apiBody  {String} introduction 简介
 * @apiBody  {File} coverImg 封面
 * 
 * @apiParamExample  {multipart/form-data} 请求示例:
 * {
 *    id : 1,
 *    name : "Vue3",
 *    introduction : "Vue3",
 *    coverImg : File
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
router.put('/', categoryController.updateCategory);

/**
 * 
 * @api {delete} /category/:id 删除分类
 * @apiGroup groupCategory
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
router.delete('/:id', categoryController.deleteCategory);

/**
 * 
 * @api {get} /category/search/:name 搜索分类
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} name 搜索词
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
 * @apiSuccessExample {json} 成功响应:
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
 * 
 * 
 */
router.get('/search', categoryController.searchCategory);

/**
 * 
 * @api {get} /category/count 各分类下笔记数量top5
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess {Number} count 数量
 * @apiSuccess {String} name 名字
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     [
 *        {
 *          "count": 1, 
 *          "name": "TypeScript"
 *        }
 *     ]     
 * }
 * 
 */
router.get('/count', categoryController.getCategoryNoteCount);
export default router;