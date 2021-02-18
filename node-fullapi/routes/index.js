var express = require('express');
var router = express.Router();

var userModel = require('../model/userModel')

// M 数据库操作
// V 视图模板引擎
// Controler 后端控制器

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = { title: '2011' }
  // 模板引擎
  res.render('index', data)
})

router.get('/user', function(req, res) {
  // 查询 users 集合中的所有用户，通过json的方式返回给客户端
  userModel.find().then(arr=>{
    console.log('arr', arr)
    // res.json({err:0, msg:'success', data: arr})
    res.render('user', {title:'用户中心', list: arr})
  })
})

router.post('/getUserList', function(req, res) {
  // 查询 users 集合中的所有用户，通过json的方式返回给客户端
  userModel.find().then(arr=>{
    console.log('arr', arr)
    res.json({err:0, msg:'success', data: arr})
  })
})

module.exports = router;
