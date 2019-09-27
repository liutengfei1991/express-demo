const JwtToken = (app) => {
    var bodyParser = require("body-parser");
    var expressJwt = require("express-jwt");
    // var jwt = require("jsonwebtoken");

    // post请求中间件
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // jwt中间件
    app.use(expressJwt({
        secret: "secret"//加密密钥，可换
    }).unless({
        path: ["/login"]//添加不需要token的接口
    }));
    // 未携带token请求接口会出错，触发这个
    app.use(function(err, req, res, next) {
        if (err.name === "UnauthorizedError") {
            res.status(401).send(err);
        }
    });
}
module.exports = JwtToken