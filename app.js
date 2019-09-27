var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
const cors = require('cors')

var app = express();
var Routers = require('./src/routes')
var JwtToken = require('./src/utils/jwt')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors({
	credentials: true
}))

// redis - s
// const redisClient = require('./src/db/redis')
// const sessionStore = new RedisStore({
// 	client: redisClient
// })
// app.use(session({
// 	resave: true,
// 	saveUninitialized: true,
// 	secret: 'Wjionl#32231',
// 	cookie: {
// 		// path: '/', // 默认配置
// 		// httpOnly: true, // 默认配置
// 		maxAge: 24 * 60 * 60 * 1000,
// 		secure: false
// 	},
// 	store: sessionStore
// }))
// redis - e

Routers(app)
JwtToken(app)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
