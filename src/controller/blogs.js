const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
	if(author) {
		sql += `and author='${author}' `
	}
	if(keyword) {
		sql += `and like '%${keyword}%' `
    }
    console.log(sql)
    return exec(sql)
}
const getDetail = id => {
    let sql = `select * from blogs where id=${id} `
    return exec(sql)
}
const delBlog = id => {
    let sql = `DELETE FROM blogs WHERE id=${id}`
    return exec(sql)
}

module.exports = {
    getList, getDetail, delBlog
}