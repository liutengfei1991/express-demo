const { ErrorModel } = require('../model/resModel')
var jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    var token = req.headers.authorization.split(' ')[1];
    console.log(token)
	//用 加密密钥 解密，获得信息，包括生成及失效日期（如果设置了失效时间）
    jwt.verify(token, "secret", function(err, decoded) {
        if(decoded && decoded.exp - Date.now() / 1000 < 0) {
            console.log(1)
            res.json(
				new ErrorModel('登录失效')
            )
            return
        }
        if (err) {
            console.log(2)
            res.json(
				new ErrorModel('登录失效')
            )
            return
        }
        next();
    })
}