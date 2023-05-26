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
router.get('/', noteController.getNoteList);

/**
 * 
 * @api {post} /note 添加笔记
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} title 标题
 * @apiBody  {String} subtitle 副标题
 * @apiBody  {String} text 内容
 * @apiBody  {Number} categoryId 所属分类id
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

/**
 * 
 * @api {get} /path/:id 获取笔记内容
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id id
 * 
 * 
 * @apiSuccess  {Number} id id
 * @apiSuccess  {String} title 标题
 * @apiSuccess  {String} subtitle 副标题
 * @apiSuccess  {String} createTime 创建时间
 * @apiSuccess  {String} updateTime 修改时间
 * @apiSuccess  {String} isDelete 是否被删除
 * @apiSuccess  {Object} noteInfo 笔记信息
 * @apiSuccess  {Number} noteInfo.id 笔记信息id
 * @apiSuccess  {String} noteInfo.noteText 笔记内容
 * @apiSuccess  {Object} category 所属分类
 * @apiSuccess  {Number} category.id 所属分类id
 * @apiSuccess  {String} category.name 所属分类名字
 * @apiSuccess  {Object[]} noteList.tags 标签数组
 * @apiSuccess  {Number} noteList.tags.id 标签id
 * @apiSuccess  {String} noteList.tags.name 标签名字
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *    "id":1,
 *    "title":"TypeORM是什么",
 *    "subtitle":"TypeORM的介绍",
 *    "createTime":"2023-04-24T09:21:26.000Z",
 *    "updateTime":"2023-05-02T14:43:51.000Z",
 *    "isDelete":0,
 *    "noteInfo":{
 *        "id":1,
 *        "noteText":"# TypeORM是什么\n  TypeORM 是一个ORM框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用。 它的目标是始终支持最新的 JavaScript 特性并提供额外的特性以帮助你开发任何使用数据库的（不管是只有几张表的小型应用还是拥有多数据库的大型企业应用）应用程序。"
 *    },
 *    "category":{
 *        "id":50,
 *        "name":"TypeORM"
 *    },
 *    "tags": [
 *              {
 *                "id" : 6,
 *                "name" : "TypeScript",
 *              }
 *          ]
 * }
 * 
 * 
 */
router.get('/info/:id', noteController.getInfo);

/**
 * 
 * @api {put} /note/:id 修改笔记
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * @apiParam  {Number} id id
 * @apiBody  {String} title 标题
 * @apiBody  {String} subtitle 副标题
 * @apiBody  {String} text 内容
 * @apiBody  {Number} categoryId 所属分类id
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *    "id": 1,
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
 *    "msg": "修改成功！" 
 * }
 * 
 * 
 */
router.put('/:id', noteController.updateNote);

/**
 * 
 * @api {delete} /note/:id 删除笔记
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id id
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
router.delete('/:id', noteController.deleteNote);

/**
 * 
 * @api {get} /note/search 搜索笔记列表
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiQuery  {String} title 搜索词
 * @apiQuery  {Number} limit 每页个数
 * @apiQuery  {Number} offset 偏移量
 * @apiQuery  {Number} [categoryId] 搜索分类id
 * @apiQuery  {Number[]} [tagIds] 搜索标签id数组
 * 
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
 *              "name":"Test"
 *          },
 *         "tags": [
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
router.get('/search', noteController.searchNote);

/**
 * 
 * @api {get} /note/new 获取5日内新增笔记数量
 * @apiGroup groupNote
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess {String} count 数量
 * @apiSuccess {String} date 日期
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     [
 *        {
 *          "count": "2", 
 *          "date": "2023-01-01"
 *        }
 *     ]     
 * }
 * 
 */
router.get('/new', noteController.newNotes);

export default router;