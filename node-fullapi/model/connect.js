// MongoDB连接
var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/MUJI_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', ()=>{
  console.log('数据库连接失败')
})
db.once('open', ()=>{
  console.log('数据库连接成功')
})
