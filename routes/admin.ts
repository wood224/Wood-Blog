import express from 'express';
const router = express.Router();
import { adminController } from '../controllers/adminController';
import { captchaController } from '../controllers/captchaController';

//解决在 req.session 中添加属性问题
declare module 'express-session' {
  interface SessionData {
    captcha: string;
  }
}

/**
 * @apiDefine groupAdmin 管理员
 */

//管理员登录
/**
 * 
 * @api {post} /admin/login 登录
 * @apiGroup groupAdmin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {String} username 用户名
 * @apiBody  {String} password 密码
 * @apiBody  {String} captcha  验证码
 * 
 * @apiParamExample  {json} 请求示例:
 * {
 *     "username" : "1111",
 *     "password" : "2222",
 *     "captcha"  : "3333",
 * }
 * 
 * 
 * @apiSuccess (200) {Number} code 状态码
 * @apiSuccess (200) {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "code" : 200,
 *     "msg"  : "登陆成功"
 * }
 * 
 * 
 */
router.post('/login', adminController.login);

//生成验证码
/**
 * 
 * @api {get} /admin/captcha 获取验证码
 * @apiGroup groupAdmin
 * @apiVersion  1.0.0
 * 
 * @apiSuccess {String} svg svg标签字符串(无命名)
 * 
 * @apiSuccessExample {javascript} 成功响应:
 *    '<svg></svg>'
 */
router.get('/captcha', captchaController.generateCaptcha);

//获取个人信息
/**
 * 
 * @api {get} /admin/info 获取个人信息
 * @apiGroup groupAdmin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiSuccess {Number} id 状态码
 * @apiSuccess {string} avatar  头像图片路径
 * @apiSuccess {String} name  名字
 * @apiSuccess {String} signature  个性签名
 * @apiSuccess {String} technology  技术栈
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "id":9,
 *     "avatar":"/uploads/avatar/1682162872498-wood224.png",
 *     "name":"wood224",
 *     "signature":"愿你长寿，我的朋友。",
 *     "technology":"Vue,ECharts,Element-Plus,Express,TypeScript,typeORM,Canvas,MySQL"
 * }
 * 
 * 
 */
router.get('/info', adminController.getInfo);

//修改个人信息
/**
 * 
 * @api {put} /admin/info 修改个人信息
 * @apiGroup groupAdmin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiBody  {Number} id id
 * @apiBody  {File} avatar 头像图片
 * @apiBody  {String} name  名字
 * @apiBody  {String} signature  个性签名
 * @apiBody  {String} technology  技术栈
 * 
 * @apiParamExample  {multipart/form-data} 请求示例:
 * {
 *     id : 1,
 *     avatar : File,
 *     name : "111",
 *     signature : "2222",
 *     technology : "3,4,5,6,7",
 * }
 * 
 * @apiSuccess (200) {Number} code 状态码
 * @apiSuccess (200) {String} msg  消息
 * 
 * @apiSuccessExample {json} 成功响应:
 * {
 *     "code" : 200,
 *     "msg"  : "修改成功"
 * }
 * 
 * 
 */
router.put('/info', adminController.updateInfo);

//  //管理员注册
//  // router.post('/register', (req: Request, res: Response) => {
//  //   adminController.register(req, res, req.body);
//  // })

export default router;