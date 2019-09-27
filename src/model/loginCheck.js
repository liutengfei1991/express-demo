const { ErrorModel } = require('../model/resModel')
var jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    var token = req.headers.authorization.split(' ')[1];
	//用 加密密钥 解密，获得信息，包括生成及失效日期（如果设置了失效时间）
    jwt.verify(token, "secret", function(err, decoded) {
        req.userInfo = decoded || {}
        if(decoded && decoded.exp - Date.now() / 1000 < 0) {
            res.json(
				new ErrorModel('登录失效')
            )
            return
        }
        if (err) {
            res.json(
				new ErrorModel('登录失效')
            )
            return
        }
        next();
    })
}