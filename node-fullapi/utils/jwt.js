var jwt = require('jsonwebtoken')

// 生成token
function createToken(data){
  return jwt.sign({
    exp: Math.floor(Date.now()/1000) + (60*60*24),  // token有效期，单位是秒
    data
  }, 'qf')
}

// 验证token
function verifyToken(req, res) {
  return new Promise((resolve, reject)=>{
    const token = req.headers.authorization
    if(!token) {
      res.json({err:-1, msg:'token不存在'})
    }else{
      try {
        // 要保证token是一个字符串，否则 jwt.verify 会语法报错
        var decoded = jwt.verify(token, 'qf')
        console.log('解密结果', decoded)
        // 对应 .then()
        resolve(decoded.data)
      } catch(err) {
        // reject(err)
        res.json({err:-1, msg:'token无效'})
      }
    }
  })
}

module.exports = {
  createToken,
  verifyToken
}
