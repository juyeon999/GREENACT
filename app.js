const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const methodOverride = require('method-override'); //PUT, DELETE
const http = require('http');

dotenv.config();
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const boardRouter = require('./routes/board');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();// 패스포트 설정

const hostname = '3.34.157.240'

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

app.set('port', process.env.PORT || 4000);

app.set('views', __dirname + '/views'); // 변경하기
app.set('view engine', 'ejs'); // 변경하기


app.get('/', (req, res) => {
  res.send('Hello')
});

// app.set('view engine', 'html');
// nunjucks.configure('views', {
//   express: app,
//   watch: true,
// });
sequelize.sync({ force: false })
    .then(() => {
      console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
      console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/board', boardRouter);
app.use('/board', boardRouter);

//404 응답 미들웨어
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});