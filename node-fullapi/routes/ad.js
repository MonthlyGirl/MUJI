var express = require('express');
var router = express.Router();
var adModel = require('../model/adModel')

router.post('/update', (req,res)=>{
    let {id,name,img} = req.body
    if(id) {
        let ele = {
            name,
            img
        }
        if(!ele.name) delete ele.name
        if(!ele.img) delete ele.img
        adModel.updateOne({_id:id}, {$set:ele}).then(()=>{
            res.json({err:0,msg:'success'})
        })
    }else{
        var ele2 = {
            name,
            img,
            create_time: Date.now()
        }
        adModel.insertMany([ele2]).then(()=>{
            res.json({err:0,msg:'success'})
        })
    }
})

router.get('/del', (req,res)=>{
    let {id} = req.query
    adModel.deleteOne({_id:id}).then(()=>{
        res.json({err:0, msg:'删除成功'})
    })
})

router.get('/list', (req,res)=>{
    adModel.find({}).then(list=>{
        res.json({err:0, msg: 'success', data: {list}})
    })
})


module.exports = router