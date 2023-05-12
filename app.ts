import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
const session = require('express-session');
const formData = require('express-form-data');
const os = require('os');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import { jwt } from './utils/JWT';

import { sessionConfig } from './config';

import indexRouter from './routes/index';
import categoryRouter from './routes/category';
import adminRouter from './routes/admin';
import noteRouter from './routes/note';
import tagRouter from './routes/tag';
import archiveRouter from './routes/archive';
import friendLinkRouter from './routes/friendLink';

import frontApiRouter from './routes/frontApi';

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}
app.use(cors(corsOptions));

// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173,http://localhost:224');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Expose-Headers', 'Authorization');
//   next();
// })

//token校验
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes('login') || req.url.includes('captcha') || req.url.includes('front/api')) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const payload = jwt.verify(token);
    if (payload) {
      const newToken = jwt.generate({
        id: payload.id,
        username: payload.username,
      }, '1h');
      res.header('Authorization', newToken);
      next();
    } else {
      res.status(401).send({ errCode: 401, errInfo: 'token过期' });
    }
  } else {
    next();
  }
})

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
app.use(formData.parse(options));   //解析
app.use(formData.format());         //删除大小为0的文件
app.use(formData.stream());         //将文件对象更改为fs.ReadStream
app.use(formData.union());          //将正文和文件结合起来

app.use(logger('dev'));
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/note', noteRouter);
app.use('/tag', tagRouter);
app.use('/archive', archiveRouter)
app.use('/friendLink', friendLinkRouter);

app.use('/front/api', frontApiRouter);


app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
