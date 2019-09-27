const { exec } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const login = (username, password) => {
    // 生成加密密码
    password = genPassword(password)
    console.log('密码:', password)

    let sql = `select username from users where username='${username}' and password='${password}'`
    
    return exec(sql).then(res => {
        return res[0] || {}
    })
}
module.exports = {
    login
}