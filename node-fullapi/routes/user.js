var express = require('express');
var router = express.Router()
// var verify = require('../utils/verify')
var userModel = require('../model/userModel')
var md5 = require('md5')
var jwt = require('../utils/jwt')

// 注册
// http://10.36.149.14:8889/api/v1/user/regist
router.post('/regist', (req, res)=>{
  // 要什么入参？怎么接收入参？
  // 验证必须参数有没有传？
  let { userphone, password, password2 } = req.body

  // 验证必填
  if (!userphone) return res.json({ err: 1, msg:'userphone是必填'})
  if(!password) return res.json({err:1, msg:'password是必填'})
  if(!password2) return res.json({err:1, msg:'password2是必填'})
  //验证手机号格式
  let telStr = /^[1]([3|5|7|8|9])[0-9]{9}$/
  if (!telStr.test(userphone)) return res.json({err:2,msg:'手机号格式错误'})
  // 判断两次密码是否相同
  if(password!=password2) return res.json({err:2,msg:'两次密码不相同'})

  // 验证用户名是否已经被注册过
  userModel.find({ userphone}).then(arr=>{
    if(arr.length==0){
      // 所有数据验证成功之后
      var ele = {
        userphone,
        password: md5(password),
        create_time: Date.now()
      }
      // 把准备好的文档插入到users集合中去
      userModel.insertMany([ele]).then(()=>{
        res.json({ err: 0, msg: '注册成功', data: { userphone}})
      })
    }else{
      res.json({ err: 2, msg: `${userphone} 已被注册`})
    }
  })
})

// 登录
router.post('/login', (req, res)=>{
  // 前端入参是什么？
  let { userphone, password } = req.body
  // 必须参数检查
  if (!userphone) return res.json({ err: 1, msg:'userphone是必填'})
  if(!password) return res.json({err:1, msg:'password是必填'})
  //验证手机号格式
  let telStr = /^[1]([3|5|7|8|9])[0-9]{9}$/
  if (!telStr.test(userphone)) return res.json({ err: 2, msg: '手机号格式错误' })

  userModel.find({ userphone}).then(arr=>{
    // console.log('arr: ', arr);
    if(arr.length === 1) {
      console.log("arr",arr);
      if(arr[0].password !=md5(password)) {
        res.json({ err: 1, msg: '密码错误'})
      }else{
        var token = jwt.createToken({
          userphone,
          password: md5(password)
        })
        res.json({ err: 0, msg: '登录成功', data: { token } }) 
      }
     
    }else{
      res.json({ err: 1, msg: `${userphone} 不存在`})
    }
  })
})

// 一、使用cookie和session实现登录鉴权
// 客户端提交用户名和密码到后端
// 后端验证其有效性、生产session，并且把登录凭证写入到cookie
// 之后，这个客户端每次再发起其它http请求时，都会携带上cookie
// 服务器收到http携带的cookie时，是不是就能判断你是谁了呀？

// 二、使用token实现登录鉴权
// 客户端提交用户名和密码到后端
// 后端查询数据库，验证用户名和密码的正确性
// 验证成功，表示用户名和密码是匹配成功的，也就是合法的
// 后端jsonwebtoken生成一个token(用户记录用户信息)，并将返回给客户端
// 客户端收到登录成功的token，将其存储到localStorage中
// 在axios请求拦截器中，添加上 token
// 以后每次再向服务器发起请求时，后端都能收到一个token

module.exports = router;
