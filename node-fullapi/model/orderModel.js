var mongoose = require('mongoose')

module.exports = mongoose.model('orderLists', new mongoose.Schema({
  good_id: String,
  user_id: String,
  create_time: Number,  // 购买时间
  status: Number ,    // 0-待付款， 1-代发货, 2-待收货
  num:Number,
  name:String,
  img:String,
  quality:String,
  price: Number
}))