import express, { NextFunction, Request, Response } from 'express';
const formData = require('express-form-data');
const os = require('os');
var createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('./utils/JWT');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const adminRouter = require('./routes/admin');

const app = express();

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
})

//token校验
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes('login')) {
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);

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