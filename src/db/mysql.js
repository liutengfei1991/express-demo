const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')
// 创建链接
const con = mysql.createConnection(MYSQL_CONF)
// 连接数据库
con.connect()

// 统一执行sql语句的函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if(err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

module.exports = {
    exec
}