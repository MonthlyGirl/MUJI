var express = require('express');
var router = express.Router();

var jwt = require('../utils/jwt')

var goodModel = require('../model/goodModel')

var cateModel = require('../model/cateModel')

var userModel = require('../model/userModel')

var cartModel = require('../model/cartModel')

var adModel = require('../model/adModel')

var orderModel = require('../model/orderModel')

var addrModel = require('../model/addrModel');
const md5 = require('md5');

// 获取所有品类
router.get('/cates', function(req, res) {
  cateModel.find({}).then(list=>{
    res.json({err: 0, msg: 'success', data: {list}})
  })
})


// 查询商品详情
router.get('/good/detail', function(req, res){
  var { id } = req.query
  goodModel.find({_id: id}).then(arr=>{
    res.json({err: 0, msg: 'success', data: arr})
  })
})

// 商品列表查询
router.get('/good/list', function(req, res) {
  var { size, page, cate, hot,rank } = req.query
  // 用于查询
  var params = {
    cate: (cate || ''),
    hot: (hot || false),
    status: 0,
    rank:(rank || 1)
  }
  if(!params.cate) delete params.cate
  if(!params.hot) delete params.hot
  
  // 用户分页
  size = parseInt(size || 10)
  page = parseInt(page || 1)
  // 查询总条数
  goodModel.find(params).count().then(total=>{
    
    // 查询当前页
    goodModel.find(params).limit(size).skip(size*(page-1)).sort({rank: -1}).then(list=>{
      res.json({err:0, msg:'success', data: {total, list}})
    })
  })
})

// 获取轮播图
router.get('/ad/list', (req,res)=>{
  adModel.find({}).then(list=>{
    res.json({err:0,msg:'success', data:{list}})
  })
})


// ============================================================
// 以下是购物车接口
// 购物车必须经过token验证
// ============================================================


// 加入购物车(token)
router.post('/cart/add', function(req, res) {
  let { num, good_id } = req.body

  num = num || 1
  if (!good_id) return res.json({err: 2, msg: 'good_id商品id是必填参数'})

  // 验证用户身份
  jwt.verifyToken(req, res).then(user=>{
    userModel.find(user).then(arr=>{
      let item = {
        user_id: arr[0]._id,  // 用户id
        good_id,   // 商品id
        num,
        create_time: Date.now(),
        status: 1
      }
  
      // 入参还要判断，如果在 carts 中已经存在了当前 good_id，直接num++即可，无须重复添加
      cartModel.find({good_id, user_id: item.user_id}).then(arr1=>{
        if (arr1.length == 0) {
          cartModel.insertMany([item]).then(()=>{
            res.json({err:0,msg:'加入购物车成功', data: 1})
          })
        } else {
          cartModel.updateOne({good_id, user_id: item.user_id}, {num: arr1[0].num+1}).then(()=>{
            res.json({err:0,msg:'加入购物车成功', data: 1})
          })
          
        }
      })
    })
  })
})

// 获取购物车列表
router.get('/cart/list', function(req, res, next) {
  let { page, size } = req.query

  page = parseInt(page||1)
  size = parseInt(size||1000)

  jwt.verifyToken(req, res).then(user=>{
    userModel.find(user).then((userArr)=>{
      // -1 按时间从大到小
      cartModel.find({status:1, user_id: userArr[0]._id}).limit(size).skip((page-1)*size).sort({create_time: -1}).then(arr1=>{
        if(arr1.length==0) return res.json({err:0, msg:'success', data: []})
        let list = []
        // 遍历获取商品信息，一起传递给购物车列表
        arr1.map((ele,idx)=>{
          goodModel.find({_id: ele.good_id}).then(arr2=>{
            list.push({
              _id: ele._id,
              good_id: ele.good_id,
              create_time: ele.create_time,
              user_id: ele.user_id,
              num: ele.num,
              status: ele.status,
              goodName: arr2[0].name,
              goodImg:arr2[0].img,
              price:arr2[0].price,
              quality:arr2[0].quality,
              totalPrice:arr2[0].price * ele.num
            })
            if (list.length == arr1.length) {
              res.json({err:0,msg:'success',data:list})
            }
          })
        })
      })
    })
  })
})

// 改变购物车商品数量
router.post('/cart/update', function(req, res, next) {
  let { num, id } = req.body

  if (!num) return res.json({err:2, msg:'num是必填参数'})
  if (num < 1) return res.json({err:2, msg:'num不能小于1'})
  if (!id) return res.json({err:2, msg:'id是必填参数'})

  jwt.verifyToken(req, res).then(user=>{
    cartModel.updateOne({_id: id}, {num}).then(()=>{
      res.json({err:0,msg:'成功'})
    })
  })
})

// 删除购物车商品
router.get('/cart/del', function(req, res, next) {
  let { id } = req.query

  if (!id) return res.json({err: 2, msg:'id是必填参数'})
  let count = 0
  jwt.verifyToken(req, res).then(user=>{
    let arr = id.split(';').filter(ele => ele)
    arr.map(ele => {
      cartModel.deleteMany({ _id: ele }).then(() => {
        count++
        if (count === arr.length) {
          res.json({ err: 0, msg: '删除成功' })
        }
      })

    })
  })
})

// 提交购物车
router.post('/cart/submit', function(req, res, next) {
  let { goods } = req.body

  // goods是用 ; 连接起来的 _id的字符串，不能用数组进行传递
  if (!goods) return res.json({err: 2, msg: 'goods是必填参数'})

  let goodIdArr = goods.split(';')
  goodIdArr.map((ele,idx)=>{
    if (!ele) goodIdArr.splice(idx,1)
  })

  jwt.verifyToken(req, res).then(user=>{
    let count = 0
    let item = null
    userModel.find(user).then(arr=>{
      goodIdArr.map(ele=>{
        cartModel.find({_id:ele}).then(cartres=>{
          goodModel.find({ _id: cartres[0].good_id}).then(goodres=>{
            //订单参数
            item = {
              user_id: arr[0]._id,  //用户id
              good_id: ele,  //商品id
              create_time: Date.now(),
              status: 0,    // 0 -待付款,1-待发货,2-待收货
              num: cartres[0].num, //商品数量,
              name: goodres[0].name,
              img: goodres[0].img,
              quality: goodres[0].quality,
              price: goodres[0].price
            };
            cartModel.deleteMany({ _id: ele }).then(() => {
              count++
              if (count == goodIdArr.length) {
                // 向'订单'集合中插入一条订单记录
                orderModel.insertMany([item]).then(() => {
                  res.json({ err: 0, msg: '提交成功', })
                })
              }
            })
          })
        })
      })
    })
  })
})

// 订单列表 get 请求 参数 {status} 0 -待付款,1-待发货,2-待收货,必填
router.get('/orderList',function(req,res,next){
  let { status } = req.query
  // status = parseInt(status || 0) 
  if(!status) return res.json({err:2,msg:"status是必填"})
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      orderModel.find({status:0,user_id:userArr[0]._id}).then(list=>{
        res.json({ err: 0, msg: 'success', data: list })
      })
    })
  })
})

//提交订单 post 请求,入参 {orders},订单id,必填
router.post('/order/submit',function(req,res){
  let { orders } = req.body

  // orders是用 ; 连接起来的 _id的字符串，不能用数组进行传递
  if (!orders) return res.json({ err: 2, msg: 'orders是必填参数' })
  let orderIdArr = orders.split(';')
  orderIdArr.map((ele, idx) => {
    if (!ele) orderIdArr.splice(idx, 1)
  })
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      orderIdArr.map(ele=>{
        //修改status状态为1,待发货状态
        orderModel.updateMany({ _id: ele, user_id: userArr[0]._id }, { $set: { status: 1 }}).then(()=>{
          res.json({err:0,msg:"下单成功"})
        })
      })
    })
  })
})

//收货
router.post('/order/Receipt',function(req,res){
  let {id} = req.body
  if(!id) return res.json({err:2,msg:"id是必填"})
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      orderModel.updateOne({_id:id,user_id:userArr[0]._id},{$set:{status:2}}).then(()=>{
        res.json({ err: 0, msg: "下单发货成功" })
      })
    })
  })
})

//全部订单
router.get('/orderAll',function (req,res) { 
   jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      orderModel.find({user_id:userArr[0]._id}).then(list=>{
        res.json({ err: 0, msg: 'success', data: list })
      })
    })
  })
})

//查询地址 /api/v1/jd/addr/list   get请求  
router.get('/addr/list',function (req,res) { 
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      addrModel.find({user_id:userArr[0]._id}).then(addrArr=>{
        res.json({ err: 0, msg: 'success', data: addrArr })
      })
    })
  })
})

//增加或修改地址  post请求  入参{name,tel,address,detail,} 都是必填,isDefault非必填
router.post('/upd/addr',function (req,res) { 
  let { id,name,tel,address,detail,isDefault } =req.body
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      //有id是修改
      if (id) {
        let ele = {
          name,
          tel,
          address,
          detail,
          isDefault
        }
        addrModel.updateOne({ _id: id, user_id: userArr[0]._id }, { $set: ele })
        .then(() => {
          res.json({ err: 0, msg: '修改成功' })
        })
      } else {
        //新增
        if (!name) return res.json({ err: 1, msg: 'name是必填参数' })
        if (!tel) return res.json({ err: 1, msg: 'tel是必填参数' })
        if (!address) return res.json({ err: 1, msg: 'address是必填参数' })
        if (!detail) return res.json({ err: 1, msg: 'detail是必填参数' })

        isDefault = parseInt(isDefault) || 0 
        let ele2 = {
          user_id: userArr[0]._id,
          name,
          tel,
          address,
          detail,
          isDefault
        }
        addrModel.insertMany([ele2]).then(() => {
          res.json({ err: 0, msg: '地址添加成功' })
        })
      }
    })
  })
})

//删除地址 get请求,必填入参 {id}
router.get('/del/addr',function (req,res) {
  let {id} = req.query
  jwt.verifyToken(req,res).then((user)=>{
    userModel.find(user).then(userArr=>{
      if (!id) return res.json({ err: 2, msg:'id是必填'})
      addrModel.deleteOne({_id:id,user_id:userArr[0]._id}).then(()=>{
        res.json({err:0,msg:'删除成功'})
      })
    })
  })
})

//获取默认地址
router.get('/addr/default',function (req,res) { 
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      console.log("userArr", userArr);
      addrModel.find({user_id:userArr[0]._id}).then(()=>{
        addrModel.find({ isDefault: 1 }).then(defaultAddr=>{
          res.json({ err: 0, msg: 'success', data: defaultAddr})
        })
      })
    })
  })
})

//修改默认地址
router.get('/updaddr/default',function(req,res){
  let { id } = req.query
  if(!id) return res.json({err:2,msg:'id是必填'})
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      addrModel.find({ user_id: userArr[0]._id })
        .updateMany({ user_id: userArr[0]._id, isDefault: 1 }, { $set: { isDefault: 0 } }).then(arr1=>{
          addrModel.updateOne({ user_id: userArr[0]._id,_id:id }, { $set: { isDefault:1}}).then(arr2=>{
            res.json({err:0,msg:'修改成功'})
          })
      })
    }) 
      
  })
})

//修改密码
router.post('/updpsw',function (req,res) { 
  let data = req.body
  let old_password = data.old_password
  let password = data.password
  let password2 = data.password2
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      if (userArr.length==1){
        if (userArr[0].password != md5(old_password)) {
          return res.json({ err: 2, msg: '原密码错误' })
        }else if (userArr[0].password == md5(password)) {
          return res.json({ err: 2, msg: '新旧密码不能相同' })
        }else if (password != password2) {
          return res.json({ err: 2, msg: '两次密码输入不一致' })
        }else{
          userModel.updateOne({_id:userArr[0]._id}, {$set:{ password: md5(password2)}}).then(() => {
            res.json({ err: 0, msg: '修改成功',data:'1' })
          })
        }
      }else{
        res.json({err:0,msg:'手机号码输入有误'})
      }
      
    })
  })
})

//用户中心
router.post('/userInfo',function(req,res){
  jwt.verifyToken(req,res).then(user=>{
    userModel.find(user).then(userArr=>{
      res.json({ err: 0, msg: 'success', data: userArr[0].userphone})
    })
  })
})

module.exports = router;
