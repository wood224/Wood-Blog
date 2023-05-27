import express from 'express';
const router = express.Router();
import { frontApiController } from '../controllers/frontApiController';

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
router.get('/info', frontApiController.getInfo);

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
router.get('/categoryList', frontApiController.getCategoryList);

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
router.get('/noteList', frontApiController.getNoteList);

/**
 * 
 * @api {get} /front/api/allCount/ 获取 笔记、分类、标签 的总数
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccessExample {json} 成功响应:
 * [
 *    { name: '笔记', count: 0 },
 *    { name: '分类', count: 0 },
 *    { name: '标签', count: 0 }
 * ]
 * 
 * 
 */
router.get('/allCount', frontApiController.getAllCount);

/**
 * 
 * @api {get} /front/api/note/:id 获取笔记信息
 * @apiGroup groupFront
 * @apiVersion  1.0.0
 * 
 * @apiParam  {Number} id id
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
router.get('/note/:id', frontApiController.getNoteInfo);

/**
 * 
 * @api {get} /front/api/searchNote 搜索笔记列表
 * @apiGroup groupFront
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
router.get('/searchNote', frontApiController.searchNote);

/**
 * 
 * @api {get} /front/api/archiveList 获取归档列表
 * @apiGroup groupFront
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
router.get('/archiveList', frontApiController.getArchiveList);

/**
 * 
 * @api {get} /front/api/category/:id 获取分类列表
 * @apiGroup groupCategory
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id id
 * 
 * 
 * @apiSuccess {Number} id id
 * @apiSuccess {String} name 名字
 * @apiSuccess {String} coverImg 封面图片路径
 * @apiSuccess {String} introduction 简介
 * @apiSuccess {String} createTime 创建时间
 * 
 * @apiSuccessExample {json} 成功响应(有参):
 * {
 *    coverImg: "",
 *    createTime: "2020-01-11 22:22:22",
 *    id: 1,
 *    introduction: "TypeScript",
 *    name: "TypeScript"
 * }
 * 
 */
router.get('/category/:id', frontApiController.getCategoryInfo);

/**
 * 
 * @api {get} /about 获取关于列表
 * @apiGroup groupAbout
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess  {String} name description
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
router.get('/aboutList', frontApiController.getAboutList);
export default router;