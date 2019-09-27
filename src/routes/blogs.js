var express = require('express');
var router = express.Router();
const { getList, getDetail } = require('../controller/blogs')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../model/loginCheck")

// 博客列表
router.get('/list', loginCheck, function(req, res, next) {
	const author = req.query.author || ''
	const keyword = req.query.keyword || ''
	// 强制查询自己的博客
	// author = req.session.username
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



module.exports = router;
