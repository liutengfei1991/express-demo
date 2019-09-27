var express = require('express');
var router = express.Router();
const { getList, getDetail, delBlog } = require('../controller/blogs')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../model/loginCheck")

// 博客列表
router.get('/list', loginCheck, function(req, res, next) {
	let author = req.query.author || ''
	let keyword = req.query.keyword || ''
	console.log(req.userInfo.username)
	// 强制查询自己的博客
	author = req.userInfo.username
	const result = getList(author, keyword)
	result.then(listData => {
		res.json(
			new SuccessModel(listData)
		)
	})
});
// 博客详情
router.get('/detail', function(req, res, next) {
	const id = req.query.id
	const result = getDetail(id)
	result.then(detailData => {
		res.json(
			new SuccessModel(detailData)
		)
	})
});
// 删除路由
router.post('/del', loginCheck, function(req, res, next) {
	const id = req.body.id
	const result = delBlog(id)
	result.then(delData => {
		res.json(
			new SuccessModel(delData)
		)
	})
});


module.exports = router;
