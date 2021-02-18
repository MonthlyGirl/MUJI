var express = require('express')
var router = express.Router()
var goodModel = require('../model/goodModel')
var jwt = require('../utils/jwt')
var cateModel = require('../model/cateModel')

// 获取所有品类
router.get('/cates', (req, res)=>{
  cateModel.find({}).then(list=>{
    res.json({err:0, msg:'success', data: { list }})
  })
})


// 增
// http://localhost:8888/api/v1/good/add
router.post('/update', (req, res)=>{
  jwt.verifyToken(req, res).then(()=>{
    // 接收入参
    let { id, name, desc, img, price, cate, hot, rank } = req.body

    if(id) {
      // 编辑
      // 非必填参数处理
      let ele = {
        name,
        desc,
        img,
        price,
        cate,
        hot,
        rank
      }
      if(!name) delete ele.name
      if(!desc) delete ele.desc
      if(!img) delete ele.img
      if(!price) delete ele.price
      if(!cate) delete ele.cate
      if(rank!=0 && !rank) delete ele.rank
      if(hot!=false && !hot) delete ele.hot
      // 修改商品
      goodModel.updateOne({_id:id}, {$set: ele}).then(()=>{
        res.json({err: 0, msg:'修改成功'})
      })
    }else{
      // 新增
      // 必填参数验证
      if(!name) return res.json({err:1, msg:'name是必填参数'})
      // 非必填参数给默认值
      hot = hot || false
      // 准备入库
      let ele2 = {
        name,
        desc,
        price,
        img,
        cate,
        hot,
        rank: 0,
        create_time: Date.now(),
        status: 1
      }
      goodModel.insertMany([ele2]).then(()=>{
        res.json({err: 0, msg: '商品添加成功'})
      })
    }
  })
})

// 删
// http://localhost:8888/api/v1/good/del
router.get('/del', (req, res)=>{
  jwt.verifyToken(req, res).then(()=>{
    // 接收入参
    let { id } = req.query
    // 必填参数验证
    if(!id) return res.json({err: 1, msg: 'id 是必填'})

    // goodModel.deleteOne({_id: id}).then(()=>{
    //   res.json({err: 0, msg: '删除成功'})
    // })
    goodModel.updateOne({_id: id}, {$set:{status:0}}).then(()=>{
      res.json({err: 0, msg: '删除成功'})
    })
  })
})

// 改
// http://localhost:8888/api/v1/good/edit
router.post('/edit', (req, res)=>{
  jwt.verifyToken(req, res).then(()=>{
    
  })
})

// 查
// http://localhost:8888/api/v1/good/list
router.get('/list', (req, res)=>{
  jwt.verifyToken(req,res).then(()=>{
    // 接收入参
    let { name, cate, min_price, max_price, page, size, hot } = req.query
    // 非必填参数处理
    let params = {
      name,
      cate,
      hot,
      status: 1
    }
    if(!name) delete params.name
    if(name) params.name = new RegExp(name)
    if(!cate) delete params.cate
    if(hot!=false && !hot) delete params.hot

    min_price = min_price || 0
    max_price = max_price || 100000000
    page = parseInt(page || 1)
    size = parseInt(size || 12)

    var f = {...params, price:{$gte:min_price, $lte:max_price}}

    goodModel.find(f).count().then(total=>{
      console.log('--------------', total)
      goodModel
      .find(f)
      .sort({create_time: -1})
      .limit(size)
      .skip((page-1)*size).then(list=>{
        res.json({err:0,msg:'success',data: {list, total}})
      })
    })
  })
})

router.get('/info', (req, res)=>{
  let { id } = req.query
  if(!id) return res.json({err:1, msg:'id无效'})
  detailModel.findById({good_id: id}).then(info=>{
    res.json({err:0, msg:'success', data: info})
  })
})


module.exports = router
