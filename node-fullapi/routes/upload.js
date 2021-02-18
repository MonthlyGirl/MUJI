var express = require('express');
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var path = require('path')

// localhost:8888/api/v1/upload/img
router.post('/img', (req, res)=>{
  // 创建实例，用于处理图片数据
  var form = new multiparty.Form()
  form.parse(req, (err, fields, files)=>{
    if(err) res.json({err: 1, msg: '图片上传失败'})

    console.log('files', files)
    var img = files.file[0]     // file 这个key是前端Upload组件给的名字
    // 要使用文件 fs 读取文件在服务器上的缓存数据流
    // 再将其写入到指定的服务器文件夹中
    var fileName = `${Date.now()}-${img.originalFilename}`
    var imgPath = path.resolve(__dirname, `../public/upload/${fileName}`)

    var readStream = fs.createReadStream(img.path)
    var writeStream = fs.createWriteStream(imgPath)
    readStream.pipe(writeStream)
    // 当fs模块把图片写入成功时，writeStream这个流会被关闭掉
    // 当这个流被关闭时，才表示图片真正地上传成功了
    writeStream.on('close', ()=>{
      res.json({err: 0, msg: '图片上传成功', data: {url:`/upload/${fileName}`}})
    })
  })
})

module.exports = router
