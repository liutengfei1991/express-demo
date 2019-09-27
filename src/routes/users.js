var express = require('express');
var router = express.Router();
const { login } = require("../controller/users")
const { SuccessModel, ErrorModel } = require('../model/resModel')
var jwt = require("jsonwebtoken");

router.post('/login', function(req, res, next) {
	const { username, password } = req.body
	console.log(username, password)
	const result = login(username, password)
	return result.then(data => {
		if(data.username) {
			// 加密，获取token
			var authToken = jwt.sign({
				username: username,
				password:password
			}, "secret",{
				expiresIn : 60*60*24// 授权时效24小时
			});
			res.json(
				new SuccessModel({
					token: authToken
				})
			)
			return
		}
		res.json(
			new ErrorModel('登录失败')
		)
	})
})

module.exports = router
