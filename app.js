var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
// var cookieParser = require('cookie-parser');
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

// 访问日志----start
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
	// 测试环境
	app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, 'src', 'logs', 'access.log')
  
	const writeStream = fs.createWriteStream(logFileName, {
		flags: 'a'
	})
	app.use(logger('combined', {
		stream: writeStream
	}));
}
// 访问日志----end

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
